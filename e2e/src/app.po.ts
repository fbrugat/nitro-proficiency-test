import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getCreatePostButton() {
    return element(by.css('#top-buttons .left button')).getText() as Promise<string>;
  }

  getGroupByOption1() {
    return element(by.css('#top-buttons .right mat-button-toggle:nth-child(1)')).getText() as Promise<string>;
  }

  getGroupByOption2() {
    return element(by.css('#top-buttons .right mat-button-toggle:nth-child(2)')).getText() as Promise<string>;
  }

  getGroupByOption3() {
    return element(by.css('#top-buttons .right mat-button-toggle:nth-child(3)')).getText() as Promise<string>;
  }

  getAllEditButtons() {
    return element.all(by.css('#posts .group mat-card mat-card-header .buttons')).getText() as Promise<any>;
  }

  getAllPostTitles() {
    return element.all(by.css('#posts .group mat-card mat-card-header mat-card-title')).getText() as Promise<any>;
  }

  getAllPostSubtitles() {
    return element.all(by.css('#posts .group mat-card mat-card-header mat-card-subtitle')).getText() as Promise<any>;
  }

  getAllPostContents() {
    return element.all(by.css('#posts .group mat-card mat-card-content p')).getText() as Promise<any>;
  }
}
