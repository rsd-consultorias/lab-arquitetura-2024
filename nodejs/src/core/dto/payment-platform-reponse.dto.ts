import { Order } from "../models/order";
import { PaymentInfo } from "../models/payment-info";

/** DTO */
export class PaymentPlatformReponse {
    order?: Order;
    paymentInfo?: PaymentInfo;
    platformResponse?: PlatformResponse;
}

/** DTO */
export class PlatformResponse {
    id?: string;
    links?: Array<Link>;
}

/** DTO */
export class Link {
    href?: string;
    rel?: string;
    method?: string;
}