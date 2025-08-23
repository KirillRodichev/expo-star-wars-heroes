# Testing Strategy for Star Wars Heroes App

## 🚀 Running Tests

### Unit & Integration Tests
```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- path/to/test.test.ts
```

### UI Tests
```bash
# Run UI component tests
npm test -- src/screens/**/__tests__/
```

### E2E Tests
```bash
# Run E2E tests (iOS)
npm run test:e2e:ios

# Run E2E tests (Android)
npm run test:e2e:android

# Build for E2E
npm run build:e2e:ios
npm run build:e2e:android
```
