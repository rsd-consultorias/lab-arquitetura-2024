import { CheckoutSummary, CheckoutState } from "../../core/models/checkout-summary";
import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";

export class CheckoutRepository {

    private _repository: ModelStatic<Model<any, any>>;

    constructor(private readonly database: Sequelize) {
        this._repository = this.database.define('checkout_summary', {
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
            checkout: {
                type: DataTypes.JSON
            },
            platformResponse: {
                type: DataTypes.JSON
            }
        }, {
            paranoid: true
        });
    }

    public async saveCreatedCheckout(checkoutSummary: CheckoutSummary, platformResponse: any): Promise<CheckoutSummary> {
        checkoutSummary.checkoutState = CheckoutState.PENDING;


        if (platformResponse.links) {
            checkoutSummary.paymentInfo = {
                approveUrl: platformResponse.links.filter((item: { rel: string; }) => item.rel === 'approval_url').map((item: { href: any; }) => item.href)[0]
            }
        }

        checkoutSummary.paymentInfo!.token! = platformResponse!.id;

        await this._repository.create({
            id: checkoutSummary.transactionId,
            token: checkoutSummary.paymentInfo!.token,
            checkout: checkoutSummary,
            platformResponse: platformResponse
        });

        return checkoutSummary;
    }

    public async findByTransactionId(transactionId: string): Promise<CheckoutSummary> {
        let checkoutSummary: CheckoutSummary;

        let found = await this._repository.findOne({
            where: {
                id: transactionId
            }
        });

        checkoutSummary = found?.get('checkout') as CheckoutSummary;
        checkoutSummary.checkoutState! = CheckoutState[found?.get('status')! as keyof typeof CheckoutState];

        return checkoutSummary;
    }

    public async finalize(transactionId: string, platformResponse: any): Promise<CheckoutSummary> {
        let found = await this._repository.findOne({
            where: {
                token: platformResponse.id
            }
        });

        switch (platformResponse.state!) {
            case 'approved': found!.set('status', CheckoutState.COMPLETED);
                break;
            case 'completed': found!.set('status', CheckoutState.COMPLETED);
                break;
            case 'refunded': found!.set('status', CheckoutState.REFUNDED);
                break;
            case 'partially_refunded': found!.set('status', CheckoutState.PARTIALLY_REFUNDED);
                break;
            case 'denied': found!.set('status', CheckoutState.DECLINED);
                break;
            default: found!.set('status', CheckoutState.PENDING);
                break;
        }

        found!.set('platformResponse', platformResponse);

        let saved = await found!.save({
            fields: ['status', 'platformResponse']
        });

        return saved?.get('checkout') as CheckoutSummary;
    }
}