export enum FrequencyUnits {
    /** Maximum 365 days */
    DAY = 'DAY',
    /** Maximum 52 weeks */
    WEEK = 'WEEK',
    /** Maximum 12 months */
    MONTH = 'MONTH',
    /** Maximum 1 year */
    YEAR = 'YEAR'
}

export enum TenureTypes {
    TRIAL = 'TRIAL',
    REGULAR = 'REGULAR'
}

// Order Enums
export enum OrderState {
    COMPLETED = 'COMPLETED',
    DECLINED = 'DECLINED',
    PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
    PENDING = 'PENDING',
    REFUNDED = 'REFUNDED',
    FAILED = 'FAILED'
}

// Subscription Enums
export enum SubscriptionState {
    APPROVAL_PENDING = 'APPROVAL_PENDING',
    APPROVED = 'APPROVED',
    ACTIVE = 'ACTIVE',
    SUSPENDED = 'SUSPENDED',
    CANCELLED = 'CANCELLED',
    EXPIRED = 'EXPIRED'
}