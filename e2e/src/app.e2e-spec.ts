import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('Nitro Proficiency Test', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have a "Create Post" button', () => {
    page.navigateTo();
    expect(page.getCreatePostButton()).toEqual('Create Post');
  });

  it('should have a "Group By" buttons with the following options: "Posting Week", "Author" and "Location"', () => {
    page.navigateTo();
    expect(page.getGroupByOption1()).toEqual('Posting Week');
    expect(page.getGroupByOption2()).toEqual('Author');
    expect(page.getGroupByOption3()).toEqual('Location');
  });

  it('each post should have a "Edit" button', () => {
    page.navigateTo();
    page.getAllEditButtons().then(e => {
      e.forEach(i => {
        expect(i).toEqual('Edit');
      });
    });

  });

  it('each post should have a "Author", "Date", "Location" and "Text"', () => {
    page.navigateTo();
    page.getAllPostTitles().then(e => {
      e.forEach(i => {
        expect(i).not.toBe('');
      });
    });
    page.getAllPostSubtitles().then(e => {
      e.forEach(i => {
        expect(i).not.toBe('');
      });
    });
    page.getAllPostContents().then(e => {
      e.forEach(i => {
        expect(i).not.toBe('');
      });
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    }));
  });
});
