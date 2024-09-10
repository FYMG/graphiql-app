import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useAuth } from '@auth/providers/AuthProvider';
import Header from './Header';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));
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

describe('Header', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockClear();
  });

  it('renders the header', () => {
    (useAuth as jest.Mock).mockReturnValue({ logout: jest.fn(), isAuth: true });
    render(<Header />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders the logo', () => {
    (useAuth as jest.Mock).mockReturnValue({ logout: jest.fn(), isAuth: true });
    render(<Header />);
    expect(screen.getByAltText('header-logo-alt')).toBeInTheDocument();
  });

  it('renders the logout button when authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({ logout: jest.fn(), isAuth: true });
    render(<Header />);
    expect(screen.getByText('logout')).toBeInTheDocument();
  });

  it('renders login and register links when not authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({ logout: jest.fn(), isAuth: false });
    render(<Header />);
    expect(screen.getByText('login')).toBeInTheDocument();
    expect(screen.getByText('register')).toBeInTheDocument();
  });

  it('toggles sticky class on scroll', () => {
    (useAuth as jest.Mock).mockReturnValue({ logout: jest.fn(), isAuth: true });
    render(<Header />);
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    expect(screen.getByTestId('header')).toHaveClass('fixed');
    fireEvent.scroll(window, { target: { scrollY: 0 } });
    expect(screen.getByTestId('header')).not.toHaveClass('fixed');
  });
});
