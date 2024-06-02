import { randomUUID } from "crypto";
import { PaymentPlatformReponse } from "../../../core/dto/payment-platform-reponse.dto";
import { IOrderRepository } from "../../../core/interfaces/order.repository.interface";
import { Order } from "../../../core/models/entities/order";
import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { OrderState } from "../../../core/enums";

export class OrderRepository implements IOrderRepository {

    private repository: ModelStatic<Model<any, any>>;

    constructor(private readonly database: Sequelize) {
        this.repository = this.database.define('TX001', {
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
            orderObject: {
                type: DataTypes.JSON
            },
            platformResponse: {
                type: DataTypes.JSON
            }
        }, {
            paranoid: true,
            tableName: 'ORDRS0001'
        });
    }

    public async saveCreatedOrder(order: Order, paymentPlatformResponse: PaymentPlatformReponse): Promise<Order> {
        order.orderState = OrderState.PENDING;

        if (paymentPlatformResponse.platformResponse?.links) {
            order.paymentInfo!.approveUrl = paymentPlatformResponse.platformResponse!.links!.filter((item: { rel?: string; }) => item.rel! === 'approval_url').map((item: { href?: any; }) => item.href!)[0]
        }

        order.paymentInfo!.platformToken = paymentPlatformResponse.platformResponse?.id;

        await this.repository.create({
            id: randomUUID(),
            token: order.paymentInfo!.token,
            orderObject: order,
            platformResponse: paymentPlatformResponse
        });

        return order;
    }

    public async findByTokenAndCustomerInfoId(token: string): Promise<Order> {
        let order: Order;

        let found = await this.repository.findOne({
            where: {
                token: token
            }
        });

        order = found?.get('orderObject') as Order;
        order.orderState! = OrderState[found?.get('status')! as keyof typeof OrderState];

        return order;
    }

    public async finalize(token: string, platformResponse: any): Promise<Order> {
        let found = await this.repository.findOne({
            where: {
                token: token
            }
        });

        switch (platformResponse.platformResponse.state) {
            case 'approved': found!.set('status', OrderState.COMPLETED);
                break;
            case 'completed': found!.set('status', OrderState.COMPLETED);
                break;
            case 'refunded': found!.set('status', OrderState.REFUNDED);
                break;
            case 'partially_refunded': found!.set('status', OrderState.PARTIALLY_REFUNDED);
                break;
            case 'denied': found!.set('status', OrderState.DECLINED);
                break;
            default: found!.set('status', OrderState.PENDING);
                break;
        }

        
        found!.set('platformResponse', platformResponse);

        let saved = await found!.save({
            fields: ['status', 'platformResponse']
        });

        let order = saved?.get('orderObject') as Order;
        order.orderState! = OrderState[saved?.get('status')! as keyof typeof OrderState];

        return order;
    }
}