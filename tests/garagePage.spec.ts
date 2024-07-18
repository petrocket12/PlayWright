import { test, expect } from '@playwright/test';
import { GaragePage } from '../page-objects/pages/garagePage';
import { users } from '../test-data/states/credentials';


test.describe('Garage tests with POM', () => {
    let garagePage: GaragePage;

    test.beforeEach(async ({ page }) => {
        garagePage = new GaragePage(page);
        await page.goto('/');
        await garagePage.openAsLoggedUser(users.mainUser.email, users.mainUser.password);
        await garagePage.clickAddCarButton();
    })

    test.afterEach(async () => {
        await garagePage.removeLastCar();
    })

    test('@smoke Add [Audi] [A8] car to the garage', async ({ page }) => {

        await garagePage.selectBrand('Audi');
        await garagePage.selectModel('A8');
        await garagePage.enterMileage('222');
        await garagePage.clickAddButton();
        await expect(garagePage.firstCarName).toHaveText('Audi A8');
    });

    test('Add [BMW] [X5] car to the garage', async () => {
        await garagePage.selectBrand('BMW');
        await garagePage.selectModel('X5');
        await garagePage.enterMileage('1222');
        await garagePage.clickAddButton();
        await expect(garagePage.firstCarName).toHaveText('BMW X5');
    })

    test('Add [Ford] [Fiesta] car to the garage', async () => {
        await garagePage.selectBrand('Ford');
        await garagePage.selectModel('Fiesta');
        await garagePage.enterMileage('1222');
        await garagePage.clickAddButton();
        await expect(garagePage.firstCarName).toHaveText('Ford Fiesta');
    })

    test('Add [Ford] [Focus] car to the garage', async () => {
        await garagePage.selectBrand('Ford');
        await garagePage.selectModel('Focus');
        await garagePage.enterMileage('1222');
        await garagePage.clickAddButton();
        await expect(garagePage.firstCarName).toHaveText('Ford Focus');
    })

    test('Add [Porsche] [911] car to the garage', async () => {
        await garagePage.selectBrand('Porsche');
        await garagePage.selectModel('911');
        await garagePage.enterMileage('1222');
        await garagePage.clickAddButton();
        await expect(garagePage.firstCarName).toHaveText('Porsche 911');
    })

});