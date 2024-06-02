import { Order } from '../../src/core/models/entities/order';
import { ShoppingCart } from '../../src/core/models/entities/shopping-cart';
import { CartItem } from '../../src/core/models/value-objects/cart-item.vo';
import { CustomerInfo } from '../../src/core/models/entities/customer-info';
import { randomUUID } from 'crypto';

export function makeValidOrder() {
    let item1 = new CartItem('SKU1234', 1, 56.00, 1, 0, 0, 0, 0, 0, 'Produto 1234', 'Produto 1234 - XPTO - ABCD');
    let item2 = new CartItem('SKU1235', 1, 56.00, 1, 0, 0, 0, 0, 0, 'Produto 1234', 'Produto 1234 - XPTO - ABCD');
    let shoppingCart = new ShoppingCart([item1, item2]);

    let order = new Order();

    order.shoppingCart = shoppingCart;
    order.billingAddress = {
        postalCode: '09123456',
        street: 'Rua de teste, 404',
        district: 'Teste',
        city: 'Sao Paulo',
        state: 'Sap Paulo',
        countryCode: 'BR'
    };
    order.shippingAddress = {
        postalCode: '09123456',
        street: 'Rua de teste, 404',
        district: 'Teste',
        city: 'Sao Paulo',
        state: 'Sap Paulo',
        countryCode: 'BR'
    };

    order.currency = 'BRL';
    order.customerInfoId = randomUUID();


    return order;
}

export function makeInvalidOrder() {
    let item1 = new CartItem('SKU1234', 1, 5.00, 1, 0, 0, 0, 0, 0, 'Produto 1234', 'Produto 1234 - XPTO - ABCD');
    let item2 = new CartItem('SKU1235', 1, 6.00, 1, 0, 0, 0, 0, 0, 'Produto 1234', 'Produto 1234 - XPTO - ABCD');
    let shoppingCart = new ShoppingCart([item1]);

    let order = new Order();

    order.shoppingCart = shoppingCart;
    order.billingAddress = {
        postalCode: '09123456',
        street: 'Rua de teste, 404',
        district: 'Teste',
        city: 'Sao Paulo',
        state: 'Sap Paulo',
        countryCode: 'BR'
    };
    order.shippingAddress = {
        postalCode: '09123456',
        street: 'Rua de teste, 404',
        district: 'Teste',
        city: 'Sao Paulo',
        state: 'Sap Paulo',
        countryCode: 'BR'
    };

    order.currency = 'BRL';
    order.customerInfoId = randomUUID();

    return order;
}