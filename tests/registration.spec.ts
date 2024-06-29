import {test, expect} from '@playwright/test'

test('successful registration', {tag: '@regression'}, async ({ page }) => {
  await page.goto('/');
  const header = page.locator('.header');
  const signInBtn = header.getByRole('button', {name: 'Sign in'});
  const modal = page.locator('.modal-content');
  const registerBtn = modal.getByRole('button', {name: 'registration'}).or(modal.getByRole('button', {name: 'реєстрація'}));
  const firstNameInput = modal.locator('#signupName');
  const lastNameInput = modal.locator('#signupLastName');
  const emailInput = modal.locator('#signupEmail');
  const passwordInput = modal.locator('#signupPassword');
  const confirmPasswordInput = modal.locator('#signupRepeatPassword');
  const buttonToCheck = page.locator('button', { hasText: 'Register' });

  await signInBtn.click();
  await registerBtn.click();
  await firstNameInput.fill('Peter');
  await lastNameInput.fill('Petersen');
  await emailInput.fill('petersen@test.com');
  await passwordInput.fill('Password123!');
  await confirmPasswordInput.fill('Password123!');

  await expect(buttonToCheck).toBeEnabled();

});

test('registration declined due to invalid first name', {tag: '@regression'}, async ({ page }) => {
  await page.goto('/');
  const header = page.locator('.header');
  const signInBtn = header.getByRole('button', {name: 'Sign in'});
  const modal = page.locator('.modal-content');
  const registerBtn = modal.getByRole('button', {name: 'registration'}).or(modal.getByRole('button', {name: 'реєстрація'}));
  const firstNameInput = modal.locator('#signupName');
  const errorMsg = modal.locator('.invalid-feedback')

  await signInBtn.click();
  await registerBtn.click();
  await firstNameInput.focus()
  await firstNameInput.fill('');
  await firstNameInput.blur()
  await expect.soft(errorMsg, 'Error "Name required" is shown').toHaveText('Name required')
  await expect.soft(firstNameInput).toHaveClass(/is-invalid/gm)
  await expect.soft(firstNameInput, 'Input with red border').toHaveCSS('border-color', 'rgb(220, 53, 69)')
});

test('registration declined due to incorrect first name', {tag: '@regression'}, async ({ page }) => {
  await page.goto('/');
  const header = page.locator('.header');
  const signInBtn = header.getByRole('button', {name: 'Sign in'});
  const modal = page.locator('.modal-content');
  const registerBtn = modal.getByRole('button', {name: 'registration'}).or(modal.getByRole('button', {name: 'реєстрація'}));
  const firstNameInput = modal.locator('#signupName');
  const errorMsg = modal.locator('.invalid-feedback')

  await signInBtn.click();
  await registerBtn.click();
  await firstNameInput.focus()
  await firstNameInput.fill('2');
  await firstNameInput.blur()
  await expect.soft(errorMsg, 'Error "Name has to be from 2 to 20 characters long" is shown').toHaveText('Name is invalidName has to be from 2 to 20 characters long')
  await expect.soft(firstNameInput).toHaveClass(/is-invalid/gm)
  await expect.soft(firstNameInput, 'Input with red border').toHaveCSS('border-color', 'rgb(220, 53, 69)')
});

test('registration declined due to invalid last name', {tag: '@regression'}, async ({ page }) => {
  await page.goto('/');
  const header = page.locator('.header');
  const signInBtn = header.getByRole('button', {name: 'Sign in'});
  const modal = page.locator('.modal-content');
  const registerBtn = modal.getByRole('button', {name: 'registration'}).or(modal.getByRole('button', {name: 'реєстрація'}));
  const firstNameInput = modal.locator('#signupName');
  const lastNameInput = modal.locator('#signupLastName');
  const errorMsg = modal.locator('.invalid-feedback') 

  await signInBtn.click();
  await registerBtn.click();
  await firstNameInput.fill('Peter');
  await lastNameInput.focus()
  await lastNameInput.fill('');
  await lastNameInput.blur()

  await expect.soft(errorMsg, 'Error "Last name required" is shown').toHaveText('Last name required')
  await expect.soft(lastNameInput).toHaveClass(/is-invalid/gm)
  await expect.soft(lastNameInput, 'Input with red border').toHaveCSS('border-color', 'rgb(220, 53, 69)')
});

test('registration declined due to incorrect email', {tag: '@regression'}, async ({ page }) => {
  await page.goto('/');
  const header = page.locator('.header');
  const signInBtn = header.getByRole('button', {name: 'Sign in'});
  const modal = page.locator('.modal-content');
  const registerBtn = modal.getByRole('button', {name: 'registration'}).or(modal.getByRole('button', {name: 'реєстрація'}));
  const firstNameInput = modal.locator('#signupName');
  const lastNameInput = modal.locator('#signupLastName');
  const emailInput = modal.locator('#signupEmail');
  const passwordInput = modal.locator('#signupPassword');
  const confirmPasswordInput = modal.locator('#signupRepeatPassword');

  await signInBtn.click();
  await registerBtn.click();
  await firstNameInput.fill('Peter');
  await lastNameInput.fill('Martensen');
  await emailInput.fill('peter@incorrect_email');
  await passwordInput.fill('Password123!');
  await confirmPasswordInput.fill('Password123!');

  await expect.soft(page.getByText('Email is incorrect')).toBeVisible();
});

test('registration declined due to invalid email', {tag: '@regression'}, async ({ page }) => {
  await page.goto('/');
  const header = page.locator('.header');
  const signInBtn = header.getByRole('button', {name: 'Sign in'});
  const modal = page.locator('.modal-content');
  const registerBtn = modal.getByRole('button', {name: 'registration'}).or(modal.getByRole('button', {name: 'реєстрація'}));
  const firstNameInput = modal.locator('#signupName');
  const lastNameInput = modal.locator('#signupLastName');
  const emailInput = modal.locator('#signupEmail');
  const errorMsg = modal.locator('.invalid-feedback')

  await signInBtn.click();
  await registerBtn.click();
  await firstNameInput.fill('Peter');
  await lastNameInput.fill('Martensen');
  await emailInput.focus()
  await emailInput.fill('');
  await emailInput.blur()

  await expect.soft(errorMsg, 'Error "Email required" is shown').toHaveText('Email required')
  await expect.soft(emailInput).toHaveClass(/is-invalid/gm)
  await expect.soft(emailInput, 'Input with red border').toHaveCSS('border-color', 'rgb(220, 53, 69)')
});
