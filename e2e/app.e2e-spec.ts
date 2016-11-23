import { PinterestPage } from './app.po';

describe('pinterest App', function() {
  let page: PinterestPage;

  beforeEach(() => {
    page = new PinterestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('pin works!');
  });
});
