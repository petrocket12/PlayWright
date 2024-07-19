import test, { expect } from "@playwright/test";
import { users } from "../../test-data/states/credentials";

test('/cars/models public request', async ({ request }) => {
    const response = await request.get('/api/cars/models');
    const body = await response.json();
    const allCars = body.data;
    const carTitle = allCars[10].title;
    expect(carTitle).toEqual('Fiesta');
    expect(allCars.length).toEqual(23);
    expect(body.status).toEqual('ok');
});

test('/cars/Ford', async ({ request }) => {
    const response = await request.get('/api/cars/models');
    const body = await response.json();
    const allCars = body.data;
    const carTitle = allCars[14].title;
    expect(carTitle).toEqual('Sierra');
    expect(allCars.length).toEqual(23);
    expect(body.status).toEqual('ok');
});

test('/cars/Porsche', async ({ request }) => {
    const response = await request.get('/api/cars/models');
    const body = await response.json();
    const allCars = body.data;
    const carTitle = allCars[15].title;
    expect(carTitle).toEqual('911');
    expect(allCars.length).toEqual(23);
    expect(body.status).toEqual('ok');
});

test('/cars/Fiat', async ({ request }) => {
    const response = await request.get('/api/cars/models');
    const body = await response.json();
    const allCars = body.data;
    const carTitle = allCars[22].title;
    expect(carTitle).toEqual('Scudo');
    expect(allCars.length).toEqual(23);
    expect(body.status).toEqual('ok');
});

test('/cars/wrong 1', async ({ request }) => {
    const response = await request.get('/api/cars/models');
    const body = await response.json();

    expect(response.status()).toBe(200);

    const allCars = body.data;
    expect(allCars.length).toBe(23);
    expect(body.status).toBe('ok');

    try {
        const carTitle = allCars[9].title;
        expect(carTitle).not.toBe('Scudo');
    } catch (error) {
        
        console.error('error:', error);
    }
});

test('/cars/wrong 2', async ({ request }) => {
    const response = await request.get('/api/cars/models');
    const body = await response.json();

    expect(response.status()).toBe(200);

    const allCars = body.data;
    expect(allCars.length).toBe(23);
    expect(body.status).toBe('ok');

    try {
        const carTitle = allCars[9].title;
        expect(carTitle).not.toBe('1dfgkjdf');
    } catch (error) {
        
        console.error('error:', error);
    }
});

