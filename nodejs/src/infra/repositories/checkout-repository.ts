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
                type: DataTypes.STRING,
                defaultValue: 'CREATED'
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
        checkoutSummary.checkoutState = CheckoutState.CREATED;

        if (platformResponse.links) {
            checkoutSummary.paymentInfo = {
                approveUrl: platformResponse.links.filter((item: { rel: string; }) => item.rel === 'approval_url').map((item: { href: any; }) => item.href)[0]
            }
        }

        await this._repository.create({
            id: checkoutSummary.transactionId,
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

        return checkoutSummary;
    }

    public async finalize(transactionId: string, platformResponse: any): Promise<CheckoutSummary> {
        let found = await this._repository.findOne({
            where: {
                id: transactionId
            }
        });

        if(platformResponse.state) {
            let checkout = found?.get('checkout') as CheckoutSummary;
            checkout.checkoutState = platformResponse.state === 'approved' ? CheckoutState.PAYMENT_ACCEPTED : CheckoutState.ACCEPTED;
            found?.set('checkout', checkout);
        }

        found?.set('platformResponse', platformResponse);

        let saved = await found?.save();

        return saved?.get('checkout') as CheckoutSummary;
    }
}