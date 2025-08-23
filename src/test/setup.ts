import '@testing-library/jest-native/extend-expect';

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
}));

jest.mock('@shopify/flash-list', () => ({
  FlashList: ({ data, renderItem }: any) => {
    const React = require('react');
    const { ScrollView } = require('react-native');
    
    return React.createElement(
      ScrollView,
      { testID: 'flash-list' },
      data?.map((item: any, index: number) => 
        React.createElement(
          'div',
          { key: index },
          renderItem({ item, index })
        )
      )
    );
  },
}));

global.fetch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});
