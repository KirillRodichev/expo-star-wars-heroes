describe('Character Details Screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  describe('Navigation to Character Details', () => {
    it('should navigate to character details and display character info', async () => {
      await waitFor(element(by.id('character-item-name')))
        .toBeVisible()
        .withTimeout(10000);
      
      await element(by.id('character-item')).atIndex(0).tap();
      
      await waitFor(element(by.id('character-name-field-label')))
        .toBeVisible()
        .withTimeout(5000);
      
      await expect(element(by.text('Name'))).toBeVisible();
      await expect(element(by.text('Height'))).toBeVisible();
      await expect(element(by.text('Mass'))).toBeVisible();
      await expect(element(by.text('Birth Year'))).toBeVisible();
      await expect(element(by.text('Gender'))).toBeVisible();
    });
  });

  describe('Character Information Display', () => {
    it('should display character name correctly', async () => {
      await waitFor(element(by.id('character-item-name')))
        .toBeVisible()
        .withTimeout(10000);
      
      await element(by.id('character-item')).atIndex(0).tap();
      
      await waitFor(element(by.id('character-name-field-value')))
        .toBeVisible()
        .withTimeout(5000);
      
      await expect(element(by.id('character-name-field-value'))).toBeVisible();
    });

    it('should display character details correctly', async () => {
      await waitFor(element(by.id('character-item-name')))
        .toBeVisible()
        .withTimeout(10000);
      
      await element(by.id('character-item')).atIndex(0).tap();
      
      await waitFor(element(by.id('character-height-field-label')))
        .toBeVisible()
        .withTimeout(5000);
      
      await expect(element(by.id('character-height-field-label'))).toBeVisible();
      await expect(element(by.id('character-mass-field-label'))).toBeVisible();
      await expect(element(by.id('character-birth-year-field-label'))).toBeVisible();
      await expect(element(by.id('character-gender-field-label'))).toBeVisible();
    });
  });

  describe('Back Navigation', () => {
    it('should navigate back to home screen', async () => {
      await waitFor(element(by.id('character-item-name')))
        .toBeVisible()
        .withTimeout(10000);
      
      await element(by.id('character-item')).atIndex(0).tap();
      
      await waitFor(element(by.id('character-name-field-label')))
        .toBeVisible()
        .withTimeout(5000);
      
      await device.pressBack();
      
      await waitFor(element(by.id('search-header-title')))
        .toBeVisible()
        .withTimeout(3000);
      
      await expect(element(by.text('Star Wars Heroes'))).toBeVisible();
    });
  });
});
