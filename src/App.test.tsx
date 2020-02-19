import { fireEvent, render, RenderResult, waitForElement, act, wait, waitForDomChange } from '@testing-library/react';
import React from 'react';
import { App } from './App';
import { CurrencyResponse } from './interfaces';
import { getCryptoValue, getCurrency } from './services/cryptoService';

jest.mock('./services/cryptoService');

describe('App', () => {
  let currencyRates: CurrencyResponse;
  let getCurrencyMock: jest.Mock;

  beforeEach(() => {
    getCurrencyMock = getCurrency as jest.Mock;
    jest.resetAllMocks();

    currencyRates = {
      rates: { AUD: 1.6195, BRL: 4.7009, USD: 1.0816, GBP: 0.82985 },
      base: 'EUR',
      date: '2020-02-18',
    };
  });
  describe('when mounted', () => {
    beforeEach(() => {
      getCurrencyMock.mockImplementation(() => Promise.resolve(currencyRates));
    });
    it('should call getCurrencies', async (done: Function) => {
      const { getByTestId } = render(<App />);
      await waitForElement(() => {
        getByTestId('crypto-container');
        expect(getCurrencyMock).toHaveBeenCalledTimes(1);
        done();
      });
    });
    it('should mount crypto cards', async (done: Function) => {
      const { getAllByTestId } = render(<App />);
      await waitForElement(() => {
        const cards = getAllByTestId('crypto-value-card');
        expect(cards.length).toEqual(5);
        done();
      });
    });
  });
  describe('when user perfom a search', () => {
    let getCryptoValueMock: jest.Mock;

    beforeEach(() => {
      getCryptoValueMock = getCryptoValue as jest.Mock;
      getCurrencyMock.mockImplementation(() => Promise.resolve(currencyRates));
    });
    it('should getCryptoValue', () => {
      const { getByTestId } = render(<App />);
      const searchInput = getByTestId('search-input');
      const submitButton = getByTestId('submit-btn');
      fireEvent.change(searchInput, { target: { value: 'btc' } });
      submitButton.click();
      expect(getCryptoValueMock).toHaveBeenCalledWith('BTC');
    });
    describe('and the api throws error', () => {
      beforeEach(() => {
        getCryptoValueMock.mockImplementation(() => {
          throw new Error('error');
        });
      });
      it('should show the error', () => {
        const { getByTestId } = render(<App />);
        const searchInput = getByTestId('search-input');
        const submitButton = getByTestId('submit-btn');

        fireEvent.change(searchInput, { target: { value: 'BTC' } });
        submitButton.click();
        expect(getByTestId('error-msg')).toBeInTheDocument();
      });
      it('should dismiss the error when user clicks on dismiss', () => {
        const { getByTestId, queryByTestId } = render(<App />);
        const searchInput = getByTestId('search-input');
        const submitButton = getByTestId('submit-btn');

        fireEvent.change(searchInput, { target: { value: 'BTC' } });
        submitButton.click();

        const dismiss = getByTestId('dismiss-btn');
        dismiss.click();
        expect(queryByTestId('error-msg')).toBeNull();
      });
    });
    describe('and the api returns success', () => {
      let searchTerm: string;
      beforeEach(() => {
        searchTerm = 'BTC';

        getCryptoValueMock.mockImplementation(() =>
          Promise.resolve({
            data: {
              [searchTerm]: {
                quote: {
                  EUR: {
                    price: 1,
                  },
                },
              },
            },
          }),
        );
      });
      it('should update cryptoValue', async (done: Function) => {
        const { getByTestId, getAllByTestId } = render(<App />);
        const searchInput = getByTestId('search-input');
        const submitButton = getByTestId('submit-btn');
        fireEvent.change(searchInput, { target: { value: 'BTC' } });
        submitButton.click();

        await waitForDomChange();
        expect(getAllByTestId('quote-value')[0].textContent).toEqual('1,62');
        done();
      });
    });
  });
});
