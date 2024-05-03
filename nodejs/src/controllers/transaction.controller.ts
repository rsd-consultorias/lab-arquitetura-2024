import { ParamsDictionary } from "express-serve-static-core";
import { Transaction } from "../core/models/transaction";
import { IPaymentService } from "../core/interfaces/payment-service.interface";
import { PaymentInfo } from "../core/models/payment-info";
import { IHttpServer } from "../infra/http-server";
import { APIResponse } from "../view-models/api-response";
import { AccountQueueService } from "../infra/message-broker/account.queue";
import { SubscriptionQueueService } from "../infra/message-broker/subscription.queue";
import { TransactionService } from "../core/services/transaction.service";
import { ITransactionRepository } from "../core/interfaces/transaction-repository.interface";

const TRANSACTION_URL_API = '/v1/transaction';

export class TransactionController {

    constructor(
        private transactionRepository: ITransactionRepository,
        private accountQueue: AccountQueueService,
        private subscriptionQueue: SubscriptionQueueService,
        private paymentService: IPaymentService,
        private httpServer: IHttpServer) {

        let transactionService = new TransactionService(paymentService, transactionRepository);

        // INFO: creates transaction
        httpServer.register(`${TRANSACTION_URL_API}/create`, 'post',
            async (params: ParamsDictionary, body: Transaction) => {
                try {
                    let transaction: Transaction = body;
                    transaction = await transactionService.createOrder(transaction);

                    return new APIResponse<Transaction>(true, undefined, transaction);
                } catch (error) {
                    console.error(error);
                    return new APIResponse<Transaction>(false, 'INTERNAL_SERVER_ERROR');
                }
            });

        // INFO: lists transaction details
        httpServer.register(`${TRANSACTION_URL_API}/:token`, 'get',
            async (params: ParamsDictionary) => {
                try {
                    let token = params['token'];
                    let transaction = await this.transactionRepository.findByToken(token);

                    return new APIResponse<Transaction>(true, undefined, transaction);
                } catch (error) {
                    console.error(error);
                    return new APIResponse<Transaction>(false, 'INTERNAL_SERVER_ERROR');
                }
            });

        // INFO: finalizes transaction
        httpServer.register(`${TRANSACTION_URL_API}/:token/finalize`, 'post',
            async (params: ParamsDictionary, body: PaymentInfo) => {
                try {
                    let token = params['token'];
                    let paymentInfo = body;

                    // call payment service
                    let plaftformResponse = (await this.paymentService.executePaymentRequest(paymentInfo!));
                    let transaction = await this.transactionRepository.finalize(token, plaftformResponse);

                    // sends data to start processing the order
                    // let subscriptionReponse = await this.subscriptionQueue.sendShoppingCartToFinalizeSubscription(transaction.shoppingCart);

                    return new APIResponse<Transaction>(true, undefined, transaction);
                } catch (error) {
                    console.error(error);
                    return new APIResponse<Transaction>(false, 'INTERNAL_SERVER_ERROR');
                }
            }
        );
    }
}