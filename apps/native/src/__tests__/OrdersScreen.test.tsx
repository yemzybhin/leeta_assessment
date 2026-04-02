import React from 'react';
import { render } from '@testing-library/react-native';
import OrdersScreen from '../screens/OrdersScreen';

// 🔥 MOCK: @repo/ui
jest.mock('@repo/ui', () => ({
  useOrders: () => ({
    priceperkg: 650,
    setPricePerKg: jest.fn(),
    orders: [],
    allOrders: [],
    loading: false,
    error: null,
    updatingId: null,
    refresh: jest.fn(),
    markToTransit: jest.fn(),
    markAsRejected: jest.fn(),
    filterStatus: 'all',
    setFilterStatus: jest.fn(),
  }),
}));

// 🔥 MOCK: Toast
jest.mock('../components/Toast', () => ({
  Toast: () => null,
  useToast: () => ({
    toast: { message: '', type: '', visible: false },
    showToast: jest.fn(),
  }),
}));

// 🔥 MOCK: UI Components (prevent crashes)
jest.mock('../components/OrderCard', () => ({
  OrderCard: () => null,
}));

jest.mock('../components/FilterTabs', () => ({
  FilterTabs: () => null,
}));

jest.mock('../components/headerActions', () => ({
  OrdersHeader: ({ title }) => React.createElement(React.Fragment, null, title),
}));

jest.mock('../components/statsPill', () => ({
  StatPill: () => null,
}));

jest.mock('../components/LoadingState', () => ({
  LoadingState: () => null,
}));

jest.mock('../components/ErrorState', () => ({
  ErrorState: () => null,
}));

jest.mock('../components/EmptyState', () => ({
  EmptyState: () => null,
}));

// 🔥 MOCK: Icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

jest.mock(
  '../../assets/icons/order.png',
  () => 'order.png'
);
jest.mock(
  '../../assets/icons/card.png',
  () => 'card.png'
);

describe('OrdersScreen', () => {
  it('renders screen title', () => {
    const { getByText } = render(<OrdersScreen/>);

    expect(getByText('Orders')).toBeTruthy();
  });

  it('shows empty state message', () => {
    const { getByText } = render(<OrdersScreen />);

    expect(getByText('No orders assigned yet.')).toBeTruthy();
  });

  it('renders update price button', () => {
    const { getByText } = render(<OrdersScreen />);

    expect(getByText('Update price')).toBeTruthy();
  });
});