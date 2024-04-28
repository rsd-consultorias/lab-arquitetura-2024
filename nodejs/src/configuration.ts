import { env } from "process"

export module Configuration {
    export const SERVER_PORT = env.SERVER_PORT || '3080';

    export const PAYPAL_URL = env.PAYPAL_URL || 'https://api-m.sandbox.paypal.com';
    export const PAYPAL_CLIENT_ID = env.PAYPAL_CLIENT_ID || '';
    export const PAYPAL_CLIENT_SECRET = env.PAYPAL_CLIENT_SECRET || '';
}