import { env } from "process"

export module Configuration {
    export const SERVER_PORT = env.SERVER_PORT || '3080';

    export const PAYPAL_URL = env.PAYPAL_URL || 'https://api-m.sandbox.paypal.com';
    export const PAYPAL_CLIENT_ID = env.PAYPAL_CLIENT_ID || '';
    export const PAYPAL_CLIENT_SECRET = env.PAYPAL_CLIENT_SECRET || '';

    export const TRANSACTION_APPROVED_URL = env.TRANSACTION_APPROVED_URL || 'http://192.168.100.64:4200/checkout-approved';
    export const TRANSACTION_CANCELED_URL = env.TRANSACTION_CANCELED_URL || 'http://192.168.100.64:4200/checkout-canceled';
}