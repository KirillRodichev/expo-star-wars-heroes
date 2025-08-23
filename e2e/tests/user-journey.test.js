describe('Complete User Journey', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  describe('Full User Flow', () => {
    it('should complete full user journey: search -> view details -> back', async () => {
      await waitFor(element(by.id('search-header-title')))
        .toBeVisible()
        .withTimeout(5000);
      
      await expect(element(by.text('Star Wars Heroes'))).toBeVisible();
      
      const searchInput = element(by.id('search-header-input'));
      await searchInput.tap();
      await searchInput.typeText('Luke');
      
      await waitFor(element(by.text('Luke Skywalker')))
        .toBeVisible()
        .withTimeout(5000);
      
      await expect(element(by.text('Luke Skywalker'))).toBeVisible();
      
      await element(by.id('character-item')).atIndex(0).tap();
      
      await waitFor(element(by.id('character-name-field-label')))
        .toBeVisible()
        .withTimeout(5000);
      
      await expect(element(by.text('Name'))).toBeVisible();
      await expect(element(by.text('Height'))).toBeVisible();
      await expect(element(by.text('Mass'))).toBeVisible();
      
      await device.pressBack();
      
      await waitFor(element(by.id('search-header-title')))
        .toBeVisible()
        .withTimeout(3000);
      
      await expect(element(by.text('Star Wars Heroes'))).toBeVisible();
      
      await waitFor(element(by.id('character-item-name')))
        .toBeVisible()
        .withTimeout(5000);
    });

    it('should handle search with no results', async () => {
      await waitFor(element(by.id('search-header-title')))
        .toBeVisible()
        .withTimeout(5000);
      
      const searchInput = element(by.id('search-header-input'));
      await searchInput.tap();
      await searchInput.typeText('NonExistentCharacter123');
      
      await device.pause(2000);
      
      await expect(element(by.id('character-item-name'))).not.toBeVisible();
    });

    it('should handle multiple character searches', async () => {
      await waitFor(element(by.id('search-header-title')))
        .toBeVisible()
        .withTimeout(5000);
      
      const searchInput = element(by.id('search-header-input'));
      
      await searchInput.tap();
      await searchInput.typeText('Luke');
      await waitFor(element(by.text('Luke Skywalker')))
        .toBeVisible()
        .withTimeout(5000);
      
      await searchInput.clearText();
      await searchInput.typeText('Darth');
      await waitFor(element(by.text('Darth Vader')))
        .toBeVisible()
        .withTimeout(5000);
      
      await searchInput.clearText();
      await searchInput.typeText('Leia');
      await waitFor(element(by.text('Leia Organa')))
        .toBeVisible()
        .withTimeout(5000);
    });
  });

  describe('Error Handling', () => {
    it('should handle network errors gracefully', async () => {
      await waitFor(element(by.id('search-header-title')))
        .toBeVisible()
        .withTimeout(5000);
      
      await expect(element(by.text('Star Wars Heroes'))).toBeVisible();
    });
  });
});
