import { Order } from '../../src/core/models/entities/order';
import { ShoppingCart } from '../../src/core/models/entities/shopping-cart';
import { CartItem } from '../../src/core/models/value-objects/cart-item.vo';
import { BuyerInfo } from '../../src/core/models/entities/buyer-info';

export function makeValidOrder() {
    let item1 = new CartItem('SKU1234', 1, 56.00, 1, 0, 0, 0, 0, 0, 'Produto 1234', 'Produto 1234 - XPTO - ABCD');
    let item2 = new CartItem('SKU1235', 1, 56.00, 1, 0, 0, 0, 0, 0, 'Produto 1234', 'Produto 1234 - XPTO - ABCD');
    let shoppingCart = new ShoppingCart([item1, item2]);

    let order = new Order(
        shoppingCart,
        {
            postalCode: '09123456',
            street: 'Rua de teste, 404',
            district: 'Teste',
            city: 'Sao Paulo',
            state: 'Sap Paulo',
            countryCode: 'BR'
        },
        {
            postalCode: '09123456',
            street: 'Rua de teste, 404',
            district: 'Teste',
            city: 'Sao Paulo',
            state: 'Sap Paulo',
            countryCode: 'BR'
        }
    );

    order.currency = 'BRL';
    order.buyerInfo = new BuyerInfo(
        'Fulano', 'de Tal',
        new Date('1984-08-01'),
        '12345678901',
        'sb-brznd30619124@personal.example.com',
        '12324423434535');


    return order;
}

export function makeInvalidOrder() {
    let item1 = new CartItem('SKU1234', 1, 5.00, 1, 0, 0, 0, 0, 0, 'Produto 1234', 'Produto 1234 - XPTO - ABCD');
    let item2 = new CartItem('SKU1235', 1, 6.00, 1, 0, 0, 0, 0, 0, 'Produto 1234', 'Produto 1234 - XPTO - ABCD');
    let shoppingCart = new ShoppingCart([item1]);

    let order = new Order(
        shoppingCart,
        {
            postalCode: '09123456',
            street: 'Rua de teste, 404',
            district: 'Teste',
            city: 'Sao Paulo',
            state: 'Sap Paulo',
            countryCode: 'BR'
        },
        {
            postalCode: '09123456',
            street: 'Rua de teste, 404',
            district: 'Teste',
            city: 'Sao Paulo',
            state: 'Sap Paulo',
            countryCode: 'BR'
        }
    );

    order.currency = 'BRL';
    order.buyerInfo = new BuyerInfo(
        'Fulano', 'de Tal',
        new Date('1984-08-01'),
        '12345678901',
        'sb-brznd30619124@personal.example.com',
        '12324423434535');

    return order;
}