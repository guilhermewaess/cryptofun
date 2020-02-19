import React from 'react';
import { render } from '@testing-library/react';
import { ApiError, Props } from './ApiError';

describe('ApiError', () => {
  let props: Props;
  let error: string;

  beforeEach(() => {
    error = 'ApiError';
    props = {
      error,
      onDismiss: jest.fn(),
    };
  });
  it('should show the current error', () => {
    const { getByTestId } = render(<ApiError {...props} />);
    const currentText = getByTestId('error-msg').textContent;
    expect(currentText).toEqual(props.error);
  });
  it('should execute onDismiss when button clicked', () => {
    const { getByTestId } = render(<ApiError {...props} />);
    getByTestId('dismiss-btn').click();
    expect(props.onDismiss).toHaveBeenCalledTimes(1);
  });
});
