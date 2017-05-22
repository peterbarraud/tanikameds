import { TanikamedsPage } from './app.po';

describe('tanikameds App', function() {
  let page: TanikamedsPage;

  beforeEach(() => {
    page = new TanikamedsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
