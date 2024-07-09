import { test } from '@playwright/test';
import RegistrationPage from '../src/pages/RegistrationPage';

test('successful registration', { tag: '@regression' }, async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  await registrationPage.goto('/');
  await registrationPage.registerNewUser('Peter', 'Armersen', 'armersen@test.com', 'Password123!', 'Password123!');
});

test('registration declined due to invalid first name', { tag: '@regression' }, async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  await registrationPage.goto('/');
  await registrationPage.validateFirstName();
});