import React from 'react';
import { render } from '@testing-library/react';
import { CryptoValueCard, Props } from './CryptoValueCard';

describe('CryptoValueCard', () => {
  let props: Props;
  beforeEach(() => {
    props = {
      cryptoValue: 9388.697136389876,
      currencyValue: 1.6195,
      currencySymbol: 'AUD',
    };
  });
  it('should show the currency symbol', () => {
    const { getByTestId } = render(<CryptoValueCard {...props} />);
    const currentText = getByTestId('quote-symbol').textContent;
    expect(currentText).toEqual(props.currencySymbol);
  });
  it('should show the crypto value in australian dolar', () => {
    const { getByTestId } = render(<CryptoValueCard {...props} />);
    const currentText = getByTestId('quote-value').textContent;
    expect(currentText).toEqual('15.205,00');
  });
});
