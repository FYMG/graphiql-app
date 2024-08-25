import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import EmptyResponseField from './EmptyResponseField';

jest.mock('next/image', () => {
  function MockedImage({
    src,
    alt,
    width,
    height,
  }: {
    alt: string;
    height: string;
    src: string;
    width: string;
  }) {
    return <img src={src} alt={alt} width={width} height={height} />;
  }
  MockedImage.displayName = 'Image';

  return MockedImage;
});

describe('EmptyResponseField component', () => {
  it('renders the image with correct src, alt, width, and height', () => {
    render(<EmptyResponseField />);

    const image = screen.getByAltText('Empty URL field');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/rest-img.png');
    expect(image).toHaveAttribute('width', '100');
    expect(image).toHaveAttribute('height', '100');
  });

  it('renders the text message correctly', () => {
    render(<EmptyResponseField />);

    const textElement = screen.getByText(
      'Enter the URL and click Send to get a response'
    );

    expect(textElement).toBeInTheDocument();
  });
});
