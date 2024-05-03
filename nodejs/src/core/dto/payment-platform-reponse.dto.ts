import { Transaction } from "../models/transaction";
import { PaymentInfo } from "../models/payment-info";

export class PaymentPlatformReponse {
    transaction?: Transaction;
    paymentInfo?: PaymentInfo;
    platformResponse?: PlatformResponse;
}

export class PlatformResponse {
    id?: string;
    links?: Link[];
}

export class Link {
    href?: string;
    rel?: string;
    method?: string;
}