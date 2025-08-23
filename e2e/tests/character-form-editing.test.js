const { by, element, expect, device } = require('detox');
const { ALERT_MESSAGES } = require('../../src/screens/character-details-screen/hooks/constants');

async function fillField(testID, text) {
  const input = element(by.id(testID));
  await input.tap();
  await input.clearText();
  await input.typeText(text);
}

describe('Character Form Editing', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  describe('when editing character information', () => {
    it('should allow editing multiple fields', async () => {
      await element(by.text('Luke Skywalker')).tap();
      
      await waitFor(element(by.id('edit-button')))
        .toBeVisible()
        .withTimeout(5000);
      
      await element(by.id('edit-button')).tap();
      
      await fillField('height-field-input', '175');
      await fillField('mass-field-input', '80');
      
      await element(by.id('save-button')).tap();
      
      await waitFor(element(by.text('175')))
        .toBeVisible()
        .withTimeout(5000);
    });

    it('should cancel editing and revert changes', async () => {
      await element(by.text('Luke Skywalker')).tap();
      
      await waitFor(element(by.id('edit-button')))
        .toBeVisible()
        .withTimeout(5000);
      
      await element(by.id('edit-button')).tap();
      
      await fillField('height-field-input', '200');
      
      await element(by.id('cancel-button')).tap();
      
      await waitFor(element(by.text('Luke Skywalker')))
        .toBeVisible()
        .withTimeout(5000);
      
      await expect(element(by.text('200'))).not.toBeVisible();
    });

    it('should reset character to original state', async () => {
      await element(by.text('Luke Skywalker')).tap();
      
      await waitFor(element(by.id('edit-button')))
        .toBeVisible()
        .withTimeout(5000);
      
      await element(by.id('edit-button')).tap();
      
      await fillField('height-field-input', '200');
      
      await element(by.id('save-button')).tap();
      
      await waitFor(element(by.text('200')))
        .toBeVisible()
        .withTimeout(5000);
      
      await element(by.id('reset-button')).tap();
      
      await waitFor(element(by.text(ALERT_MESSAGES.RESET)))
        .toBeVisible()
        .withTimeout(2000);
      
      const resetButton = element(by.text(ALERT_MESSAGES.RESET));
      await resetButton.tap();
      
      await waitFor(element(by.text('Luke Skywalker')))
        .toBeVisible()
        .withTimeout(5000);
    });

    it('should handle form validation errors', async () => {
      await element(by.text('Luke Skywalker')).tap();
      
      await waitFor(element(by.id('edit-button')))
        .toBeVisible()
        .withTimeout(5000);
      
      await element(by.id('edit-button')).tap();
      
      await fillField('height-field-input', '');
      await element(by.id('save-button')).tap();
      
      await waitFor(element(by.text('Height is required')))
        .toBeVisible()
        .withTimeout(5000);
    });
  });

  describe('form field interactions', () => {
    it('should handle multiline text input', async () => {
      await element(by.text('Luke Skywalker')).tap();
      
      await waitFor(element(by.id('edit-button')))
        .toBeVisible()
        .withTimeout(5000);
      
      await element(by.id('edit-button')).tap();
      
      await fillField('hair-color-field-input', 'Blond\nwith\nhighlights');
      
      await element(by.id('save-button')).tap();
      
      await waitFor(element(by.text('Blond\nwith\nhighlights')))
        .toBeVisible()
        .withTimeout(5000);
    });

    it('should handle numeric field input', async () => {
      await element(by.text('Luke Skywalker')).tap();
      
      await waitFor(element(by.id('edit-button')))
        .toBeVisible()
        .withTimeout(5000);
      
      await element(by.id('edit-button')).tap();
      
      await fillField('height-field-input', '180');
      await fillField('mass-field-input', '75');
      
      await element(by.id('save-button')).tap();
      
      await waitFor(element(by.text('180')))
        .toBeVisible()
        .withTimeout(5000);
      
      await waitFor(element(by.text('75')))
        .toBeVisible()
        .withTimeout(5000);
    });
  });
});
