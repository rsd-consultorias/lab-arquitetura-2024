import { Order } from "core/models/entities/order";

export function ValidateMinimalShoppingTotal(order: Order): string | undefined {
    return order.sumTotal() < 100 ? 'COMPRA ABAIXO DE R$ 100,00 NÃO É ACEITA.' : undefined;
}

export function ValidateMinimalCartItems(order: Order): string | undefined {
    return order.shoppingCart!.items!.length! < 2 ? 'COMPRA ABAIXO DE 2 ITENS NÃO É ACEITA.' : undefined;
}