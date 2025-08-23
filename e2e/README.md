# E2E Tests for Star Wars Heroes App

This directory contains End-to-End (E2E) tests using Detox for the Star Wars Heroes React Native app.

## 🚀 Setup

### Prerequisites
- Node.js 16+
- iOS Simulator (for iOS tests)
- Android Emulator (for Android tests)
- Xcode (for iOS builds)
- Android Studio (for Android builds)

### Installation
```bash
# Install Detox globally (optional)
npm install -g detox-cli

# Install project dependencies
npm install
```

## 📁 Test Structure

```
e2e/
├── tests/
│   ├── home-screen.test.js      # Home screen functionality
│   ├── character-details.test.js # Character details screen
│   └── user-journey.test.js     # Complete user flows
├── jest.config.js               # Jest configuration for E2E
├── package.json                 # E2E dependencies
└── README.md                    # This file
```

## 🧪 Running Tests

### iOS Tests
```bash
# Build and run iOS tests
npm run build:ios
npm run test:ios

# Or use Detox directly
detox build --configuration ios.sim.debug
detox test --configuration ios.sim.debug
```

### Android Tests
```bash
# Build and run Android tests
npm run build:android
npm run test:android

# Or use Detox directly
detox build --configuration android.emu.debug
detox test --configuration android.emu.debug
```

### All Tests
```bash
# Run all E2E tests
npm run test
```

## 📋 Test Scenarios

### Home Screen Tests
- ✅ App title display
- ✅ Search input functionality
- ✅ Characters list loading
- ✅ Search for characters
- ✅ Clear search results
- ✅ Navigate to character details

### Character Details Tests
- ✅ Navigation to character details
- ✅ Character information display
- ✅ Character name display
- ✅ All character fields display
- ✅ Back navigation

### User Journey Tests
- ✅ Complete user flow (search → view → back)
- ✅ Search with no results
- ✅ Multiple character searches
- ✅ Error handling

## 🔧 Configuration

### Detox Configuration (`.detoxrc.js`)
- **iOS Simulator**: iPhone 15
- **Android Emulator**: Pixel 3a API 30
- **Test Runner**: Jest
- **Timeout**: 120 seconds

### Jest Configuration (`e2e/jest.config.js`)
- **Test Pattern**: `e2e/**/*.test.js`
- **Timeout**: 120 seconds
- **Max Workers**: 1 (for stability)
- **Environment**: Detox

## 🎯 Test IDs Used

Our E2E tests rely on test IDs that match our UI components:

### Home Screen
- `search-header-title` - App title
- `search-header-input` - Search input
- `character-item` - Character list item
- `character-item-name` - Character name
- `character-item-details` - Character details

### Character Details
- `character-name-field-label` - Name field label
- `character-name-field-value` - Name field value
- `character-height-field-label` - Height field label
- `character-mass-field-label` - Mass field label
- `character-birth-year-field-label` - Birth year field label
- `character-gender-field-label` - Gender field label

## 🐛 Debugging

### View Test Results
```bash
# Run tests with verbose output
detox test --configuration ios.sim.debug --loglevel trace
```

### Debug Mode
```bash
# Run in debug mode (slower but more detailed)
detox test --configuration ios.sim.debug --debug-synchronization 200
```

### Record Videos
```bash
# Record test execution videos
detox test --configuration ios.sim.debug --record-logs all
```

## 📊 Test Coverage

| Feature | Test Coverage |
|---------|---------------|
| App Launch | ✅ |
| Home Screen | ✅ |
| Search Functionality | ✅ |
| Character Navigation | ✅ |
| Character Details | ✅ |
| Back Navigation | ✅ |
| Error Handling | ✅ |
| User Journeys | ✅ |

## 🚨 Common Issues

### iOS Issues
- **Simulator not found**: Make sure Xcode is installed and simulator is available
- **Build fails**: Check Xcode project configuration
- **Tests timeout**: Increase timeout in `.detoxrc.js`

### Android Issues
- **Emulator not found**: Make sure Android Studio is installed and emulator is running
- **Build fails**: Check Android project configuration
- **ADB issues**: Restart ADB server with `adb kill-server && adb start-server`

### General Issues
- **Tests flaky**: Increase timeouts and add more `waitFor` statements
- **Element not found**: Check test IDs match component test IDs
- **Network issues**: Ensure app has internet access for API calls

## 🔄 Continuous Integration

For CI/CD, add these steps:

```yaml
# Example GitHub Actions
- name: Install dependencies
  run: npm install

- name: Build iOS app
  run: detox build --configuration ios.sim.debug

- name: Run E2E tests
  run: detox test --configuration ios.sim.debug
```

## 📈 Performance

- **Test Execution Time**: ~2-3 minutes per platform
- **Memory Usage**: ~500MB per test run
- **Storage**: ~100MB for test artifacts

## 🤝 Contributing

When adding new E2E tests:

1. Follow the existing test structure
2. Use descriptive test names
3. Add proper `waitFor` statements
4. Test both positive and negative scenarios
5. Update this README with new test scenarios
