

import Page from './page';

class SchoolPage extends Page {
  get selectLevel() {
    return $('#select-level-school');
  }

  get btnFilter() {
    return $('#btn-filter-school');
  }

  async filterWithLevel(level) {
    await this.selectLevel.selectByAttribute('value', level);

    await this.btnFilter.click();
  }

  open() {
    return super.open('');
  }
}

export default new SchoolPage();
