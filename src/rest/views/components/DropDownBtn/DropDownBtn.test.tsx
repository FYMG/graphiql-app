import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import DropDownBtn from './DropDownBtn';

describe('BodyEditor', () => {
  it('should show "Show text" if isHidden is true', () => {
    render(<DropDownBtn isHidden onClick={() => {}} text="text" />);
    expect(screen.getByText(/Show text/i)).toBeInTheDocument();
  });

  it('should show "Hide text" if isHidden is false', () => {
    render(<DropDownBtn isHidden={false} onClick={() => {}} text="text" />);
    expect(screen.getByText(/Hide text/i)).toBeInTheDocument();
  });

  it('should show ChevronDown icon if isHidden true', () => {
    render(<DropDownBtn isHidden text="test text" onClick={() => {}} />);
    expect(screen.getByTestId('FiChevronDown')).toBeInTheDocument();
  });

  it('should show ChevronUp icon if isHidden false', () => {
    render(<DropDownBtn isHidden={false} text="once more text" onClick={() => {}} />);
    expect(screen.getByTestId('FiChevronUp')).toBeInTheDocument();
  });

  it('should call onClick then button is cliked', () => {
    const handleClick = jest.fn();

    render(<DropDownBtn isHidden={false} text="test" onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
