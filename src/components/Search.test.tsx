import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Search, Props } from './Search';

describe('Search', () => {
  let props: Props;
  let searchTerm: string;
  let searchInput: HTMLElement;
  let submitButton: HTMLElement;
  beforeEach(() => {
    searchTerm = 'BTC';
    props = {
      onSearch: jest.fn(),
    };

    const { getByTestId } = render(<Search {...props} />);
    searchInput = getByTestId('search-input');
    submitButton = getByTestId('submit-btn');
  });
  it('should have button disabled when input empty', () => {
    expect(submitButton).toBeDisabled();
  });
  it('should have button enabled when input has value', () => {
    fireEvent.change(searchInput, { target: { value: searchTerm } });

    expect(submitButton).toBeEnabled();
  });
  it('should call onSearch when submit form', () => {
    fireEvent.change(searchInput, { target: { value: searchTerm } });
    submitButton.click();

    expect(props.onSearch).toHaveBeenCalledWith(searchTerm);
  });
});
