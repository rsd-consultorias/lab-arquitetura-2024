import { randomUUID } from "crypto";
import { PaymentPlatformReponse } from "../../core/dto/payment-platform-reponse.dto";
import { ITransactionRepository } from "../../core/interfaces/transaction-repository.interface";
import { Transaction, TransactionState } from "../../core/models/transaction";
import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";

export class TransactionRepository implements ITransactionRepository {

    private _repository: ModelStatic<Model<any, any>>;

    constructor(private readonly database: Sequelize) {
        this._repository = this.database.define('tx001_transaction', {
            id: {
                type: DataTypes.UUIDV4,
                primaryKey: true
            },
            status: {
                type: DataTypes.ENUM('COMPLETED', 'DECLINED', 'PARTIALLY_REFUNDED', 'PENDING', 'REFUNDED', 'FAILED'),
                defaultValue: 'PENDING'
            },
            platform: {
                type: DataTypes.STRING(10),
                defaultValue: 'paypal-v1'
            },
            token: {
                type: DataTypes.STRING(36)
            },
            transaction: {
                type: DataTypes.JSON
            },
            platformResponse: {
                type: DataTypes.JSON
            }
        }, {
            paranoid: true
        });
    }

    public async saveCreatedTransaction(transaction: Transaction, paymentPlatformResponse: PaymentPlatformReponse): Promise<Transaction> {
        transaction.transactionState = TransactionState.PENDING;

        if (paymentPlatformResponse.platformResponse?.links) {
            transaction.paymentInfo!.approveUrl = paymentPlatformResponse.platformResponse!.links!.filter((item: { rel?: string; }) => item.rel! === 'approval_url').map((item: { href?: any; }) => item.href!)[0]
        }

        transaction.paymentInfo!.platformToken = paymentPlatformResponse.platformResponse?.id;

        await this._repository.create({
            id: randomUUID(),
            token: transaction.paymentInfo!.token,
            transaction: transaction,
            platformResponse: paymentPlatformResponse
        });

        return transaction;
    }

    public async findByToken(token: string): Promise<Transaction> {
        let transaction: Transaction;

        let found = await this._repository.findOne({
            where: {
                token: token
            }
        });

        transaction = found?.get('transaction') as Transaction;
        transaction.transactionState! = TransactionState[found?.get('status')! as keyof typeof TransactionState];

        return transaction;
    }

    public async finalize(token: string, platformResponse: any): Promise<Transaction> {
        let found = await this._repository.findOne({
            where: {
                token: token
            }
        });

        switch (platformResponse.platformResponse.state) {
            case 'approved': found!.set('status', TransactionState.COMPLETED);
                break;
            case 'completed': found!.set('status', TransactionState.COMPLETED);
                break;
            case 'refunded': found!.set('status', TransactionState.REFUNDED);
                break;
            case 'partially_refunded': found!.set('status', TransactionState.PARTIALLY_REFUNDED);
                break;
            case 'denied': found!.set('status', TransactionState.DECLINED);
                break;
            default: found!.set('status', TransactionState.PENDING);
                break;
        }

        
        found!.set('platformResponse', platformResponse);

        let saved = await found!.save({
            fields: ['status', 'platformResponse']
        });

        let transaction = found?.get('transaction') as Transaction;
        transaction.transactionState! = TransactionState[saved?.get('status')! as keyof typeof TransactionState];

        return transaction;
    }
}