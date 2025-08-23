describe('Home Screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  describe('Initial Load', () => {
    it('should display app title', async () => {
      await expect(element(by.id('search-header-title'))).toBeVisible();
      await expect(element(by.text('Star Wars Heroes'))).toBeVisible();
    });

    it('should display search input', async () => {
      await expect(element(by.id('search-header-input'))).toBeVisible();
      await expect(element(by.placeholder('Search characters...'))).toBeVisible();
    });

    it('should load characters list', async () => {
      await waitFor(element(by.id('character-item-name')))
        .toBeVisible()
        .withTimeout(10000);
      
      await expect(element(by.id('character-item-name'))).toBeVisible();
    });
  });

  describe('Search Functionality', () => {
    it('should search for character by name', async () => {
      const searchInput = element(by.id('search-header-input'));
      
      await searchInput.tap();
      await searchInput.typeText('Luke');
      
      await waitFor(element(by.text('Luke Skywalker')))
        .toBeVisible()
        .withTimeout(5000);
      
      await expect(element(by.text('Luke Skywalker'))).toBeVisible();
    });

    it('should clear search results', async () => {
      const searchInput = element(by.id('search-header-input'));
      
      await searchInput.tap();
      await searchInput.typeText('Luke');
      
      await searchInput.clearText();
      
      await waitFor(element(by.id('character-item-name')))
        .toBeVisible()
        .withTimeout(5000);
    });
  });

  describe('Character Navigation', () => {
    it('should navigate to character details when tapping character', async () => {
      await waitFor(element(by.id('character-item-name')))
        .toBeVisible()
        .withTimeout(10000);
      
      await element(by.id('character-item')).atIndex(0).tap();
      
      await waitFor(element(by.id('character-name-field-label')))
        .toBeVisible()
        .withTimeout(5000);
      
      await expect(element(by.text('Name'))).toBeVisible();
    });
  });
});
