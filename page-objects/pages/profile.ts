import { expect, type Locator, type Page } from '@playwright/test';
import { SignInForm } from '../forms/signInForms';
import { users } from '../../test-data/states/credentials';

export class Profile {
    readonly page: Page;
    readonly pageHeader: Locator;
    readonly userProfile: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageHeader = page.locator('h1', { hasText: 'Profile' })
        this.userProfile = page.locator('.profile_name display-4');
    }

    async open() {
        const signInForm = new SignInForm(this.page);
        await signInForm.open();
        await signInForm.loginWithCredentials(users.mainUser.email, users.mainUser.password);
        await expect(this.page.locator('h1')).toHaveText('Profile');
        await expect(this.pageHeader).toBeVisible();
    }
}