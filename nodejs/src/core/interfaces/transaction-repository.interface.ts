import { PaymentPlatformReponse } from "../dto/payment-platform-reponse.dto";
import { Transaction } from "../models/transaction";

export interface ITransactionRepository {
    saveCreatedTransaction(transaction: Transaction, platformResponse: PaymentPlatformReponse): Promise<Transaction>;
    findByToken(token: string): Promise<Transaction>;
    finalize(token: string, platformResponse: PaymentPlatformReponse): Promise<Transaction>;
}