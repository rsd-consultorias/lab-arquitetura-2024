import { nextToken } from "../domain/token.domain";
import { IPaymentService } from "../interfaces/payment-service.interface";
import { TransactionState, Transaction } from "../models/transaction";
import { ITransactionRepository } from "../interfaces/transaction-repository.interface";
import { PaymentInfo } from "../models/payment-info";

export class TransactionService {

    constructor(
        private paymentService: IPaymentService,
        private transactionRepository: ITransactionRepository) { }

    public async createOrder(transaction: Transaction): Promise<Transaction> {
        transaction.transactionState! = TransactionState.PENDING;
        transaction.paymentInfo! = { token: nextToken() } as PaymentInfo;

        // TODO: Creates account if not exists, otherwise returns existing account
        let payment = await this.paymentService.createPaymentRequest(transaction);
        await this.transactionRepository.saveCreatedTransaction(transaction, payment);

        return transaction;
    }
}