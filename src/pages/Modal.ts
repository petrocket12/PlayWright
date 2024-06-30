import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';

class Modal {
  private page: Page;
  private modal: Locator;
  private registerBtn: Locator;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private emailInput: Locator;
  private passwordInput: Locator;
  private confirmPasswordInput: Locator;
  private errorMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modal = page.locator('.modal-content');
    this.registerBtn = this.modal.getByRole('button', { name: 'registration' }).or(this.modal.getByRole('button', { name: 'реєстрація' }));
    this.firstNameInput = this.modal.locator('#signupName');
    this.lastNameInput = this.modal.locator('#signupLastName');
    this.emailInput = this.modal.locator('#signupEmail');
    this.passwordInput = this.modal.locator('#signupPassword');
    this.confirmPasswordInput = this.modal.locator('#signupRepeatPassword');
    this.errorMsg = this.modal.locator('.invalid-feedback');
  }

  async clickRegister(): Promise<void> {
    await this.registerBtn.click();
  }

  async fillRegistrationForm(firstName: string, lastName: string, email: string, password: string, confirmPassword: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  async focusAndBlurFirstNameInput(): Promise<void> {
    await this.firstNameInput.focus();
    await this.firstNameInput.fill('');
    await this.firstNameInput.blur();
  }

  async checkErrorMessage(): Promise<void> {
    await expect.soft(this.errorMsg, 'Error "Name required" is shown').toHaveText('Name required');
    await expect.soft(this.firstNameInput).toHaveClass(/is-invalid/gm);
    await expect.soft(this.firstNameInput, 'Input with red border').toHaveCSS('border-color', 'rgb(220, 53, 69)');
  }
}

export default Modal;