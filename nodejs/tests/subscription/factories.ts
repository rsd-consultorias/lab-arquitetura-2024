import { Order } from '../../src/core/models/order';
import { randomUUID } from "crypto";

export function makeValidOrder() {
    let order = new Order(
        {
            id: randomUUID(),
            items: [
                {
                    sku: 'SKU1234',
                    quantity: 1,
                    price: 56.00,
                    tax: 1,
                    shipping: 0,
                    insurance: 0,
                    handlingFee: 0,
                    shippingDiscount: 0,
                    discount: 0,
                    name: 'Produto 1234',
                    description: 'Produto 1234 - XPTO - ABCD'
                },
                {
                    sku: 'SKU5678',
                    quantity: 1,
                    price: 56.00,
                    tax: 1,
                    shipping: 0,
                    insurance: 0,
                    handlingFee: 0,
                    shippingDiscount: 0,
                    discount: 0,
                    name: 'Produto 5678',
                    description: 'Produto 5678 - XPTO - ABCD'
                }
            ]
        },
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
        },
        {}
    );

    order.currency = 'BRL';
    order.buyerInfo = {
        firstName: 'Fulano',
        lastName: 'de Tal',
        birthDate: new Date('1984-08-01'),
        fiscalIdentificationNumber: '12345678901',
        email: 'sb-brznd30619124@personal.example.com',
        phone: '12324423434535'
    }

    return order;
}

export function makeInvalidOrder() {
    let order = new Order(
        {
            id: randomUUID(),
            items: [
                {
                    sku: 'SKU1234',
                    quantity: 1,
                    price: 1.00,
                    tax: 1,
                    shipping: 0,
                    insurance: 0,
                    handlingFee: 0,
                    shippingDiscount: 0,
                    discount: 0,
                    name: 'Produto 1234',
                    description: 'Produto 1234 - XPTO - ABCD'
                },
                {
                    sku: 'SKU5678',
                    quantity: 1,
                    price: 5.00,
                    tax: 1,
                    shipping: 0,
                    insurance: 0,
                    handlingFee: 0,
                    shippingDiscount: 0,
                    discount: 0,
                    name: 'Produto 5678',
                    description: 'Produto 5678 - XPTO - ABCD'
                }
            ]
        },
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
        },
        {}
    );

    order.currency = 'BRL';
    order.buyerInfo = {
        firstName: 'Fulano',
        lastName: 'de Tal',
        birthDate: new Date('1984-08-01'),
        fiscalIdentificationNumber: '12345678901',
        email: 'sb-brznd30619124@personal.example.com',
        phone: '12324423434535'
    }

    return order;
}