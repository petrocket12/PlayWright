import { Page, Locator } from 'playwright';

class Header {
  private page: Page;
  private header: Locator;
  private signInBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('.header');
    this.signInBtn = this.header.getByRole('button', { name: 'Sign in' });
  }

  async clickSignIn(): Promise<void> {
    await this.signInBtn.click();
  }
}

export default Header;