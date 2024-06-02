import { Order } from "../models/entities/order";
import { PaymentInfo } from "../models/entities/payment-info";

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