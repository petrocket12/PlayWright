import { test, expect } from '@playwright/test';
import { Profile } from '../page-objects/pages/profile';
import { users } from '../test-data/states/credentials';


test.describe('Profile tests with POM', () => {
    let profile: Profile;

    test.beforeEach(async ({ page }) => {
        profile = new Profile(page);
        await page.goto('/');
    })

    test('Verify edit profile', async ({ page }) => {
        const testData =
    
        {
            "status": "ok",
            "data": {
                "userId": 128851,
                "photoFilename": "default-user.png",
                "name": "Peter",
                "lastName": "Martin"
            }
        }

        await page.route('**/api/users/profile', route => route.fulfill({
            status: 200,
            body: JSON.stringify(testData),     
        }));
        
    });

    test('Verify wrong ID profile', async ({ page }) => {
        const testData =
    
        {
            "status": "ok",
            "data": {
                "userId": 128822222222222,
                "photoFilename": "default-user.png",
                "name": "Peter",
                "lastName": "Martin"
            }
        }

        await page.route('**/api/users/profile', route => route.fulfill({
            status: 200,
            body: JSON.stringify(testData),
        }));
        
    });
});