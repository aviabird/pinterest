import { browser, element, by } from 'protractor';

export class PinterestPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('pin-root h1')).getText();
  }
}
