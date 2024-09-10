import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAuth } from '@auth/providers/AuthProvider';
import MainView from './MainView';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

jest.mock('../../../auth/providers/AuthProvider', () => ({
  useAuth: jest.fn(),
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('MainView', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockClear();
  });

  it('renders welcome message for authenticated users', () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuth: true,
      user: { email: 'test@example.com' },
    });
    render(<MainView />);
    expect(screen.getByText('welcome-back, test@example.com')).toBeInTheDocument();
  });

  it('renders welcome message for unauthenticated users', () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuth: false, user: null });
    render(<MainView />);
    expect(screen.getByText('welcome!')).toBeInTheDocument();
  });

  it('renders links for authenticated users', () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuth: true,
      user: { email: 'test@example.com' },
    });
    render(<MainView />);
    expect(screen.getByText('graphql-client')).toBeInTheDocument();
    expect(screen.getByText('rest-client')).toBeInTheDocument();
    expect(screen.getByText('requests-history')).toBeInTheDocument();
  });

  it('renders login and register links for unauthenticated users', () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuth: false, user: null });
    render(<MainView />);
    expect(screen.getByText('login')).toBeInTheDocument();
    expect(screen.getByText('register')).toBeInTheDocument();
  });
});
