import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { app } from '@shared/configs';
import Footer from './Footer';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('Footer', () => {
  it('renders the footer with the correct class', () => {
    render(<Footer className="custom-class" />);
    const footer = screen.getByTestId('footer');

    expect(footer).toHaveClass('custom-class');
  });

  it('renders the course link with the correct href', () => {
    render(<Footer />);
    const courseLink = screen.getByRole('link', { name: /course-name/i });

    expect(courseLink).toHaveAttribute('href', app.curseLink);
  });

  it('renders authors with correct links', () => {
    render(<Footer />);
    app.authors.forEach((author) => {
      const authorLink = screen.getByRole('link', { name: author.name });

      expect(authorLink).toHaveAttribute('href', author.link);
    });
  });

  it('renders mentors with correct links', () => {
    render(<Footer />);
    app.mentors.forEach((mentor) => {
      const mentorLink = screen.getByRole('link', { name: mentor.name });

      expect(mentorLink).toHaveAttribute('href', mentor.link);
    });
  });
});
