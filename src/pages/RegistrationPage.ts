import { Page } from 'playwright';
import BasePage from './BasePage';
import Header from './Header';
import Modal from './Modal';

class RegistrationPage extends BasePage {
  private header: Header;
  private modal: Modal;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);
    this.modal = new Modal(page);
  }

  async registerNewUser(firstName: string, lastName: string, email: string, password: string, confirmPassword: string): Promise<void> {
    await this.header.clickSignIn();
    await this.modal.clickRegister();
    await this.modal.fillRegistrationForm(firstName, lastName, email, password, confirmPassword);
  }

  async validateFirstName(): Promise<void> {
    await this.header.clickSignIn();
    await this.modal.clickRegister();
    await this.modal.focusAndBlurFirstNameInput();
    await this.modal.checkErrorMessage();
  }
}

export default RegistrationPage;
