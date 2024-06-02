import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { Subscription } from "../../../core/models/entities/subscription";
import { nextSubscriptionToken } from "../../../core/domain/token.domain";
import { randomUUID } from "crypto";

export class SubscriptionRepository {
    private repository: ModelStatic<Model<any, any>>;

    constructor(private readonly database: Sequelize) {
        this.repository = this.database.define('SU001', {
            id: {
                type: DataTypes.UUIDV4,
                primaryKey: true
            },
            subscriptionToken: {
                type: DataTypes.STRING(36)
            },
            buyerToken: {
                type: DataTypes.STRING(36)
            },
            subscription: {
                type: DataTypes.JSON
            },
            platformResponse: {
                type: DataTypes.JSON
            }
        }, {
            paranoid: true
        });
    }

    public async saveNewSubscription(newSubscription: Subscription): Promise<Subscription> {
        newSubscription.token = nextSubscriptionToken();

        let created = await this.repository.create({
            id: randomUUID(),
            subscriptionToken: newSubscription.token,
            buyerToken: newSubscription.subscriber.token!,
            subscription: newSubscription
        });

        return created.get('subscription') as Subscription;
    }
}