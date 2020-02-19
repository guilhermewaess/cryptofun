import { getCurrency, getCryptoValue } from './cryptoService';
import { CurrencyResponse, CryptoResponse } from '../interfaces';

describe('cryptoService', () => {
  let fetchMock: jest.SpyInstance;
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchMock = jest.spyOn(global as any, 'fetch');
  });
  afterEach(() => {
    fetchMock.mockClear();
  });

  describe('when calls getCurrency', () => {
    let returnedValue: CurrencyResponse;
    it('should call the correct api', async () => {
      await getCurrency();
      expect(fetchMock).toHaveBeenCalledWith('https://api.exchangeratesapi.io/latest?symbols=USD,BRL,GBP,AUD');
    });
    it('should call the api only once', async () => {
      await getCurrency();
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
    describe('and getCurrency returns 200', () => {
      beforeEach(() => {
        returnedValue = {
          rates: { AUD: 1.6195, BRL: 4.7009, USD: 1.0816, GBP: 0.82985 },
          base: 'EUR',
          date: '2020-02-18',
        };
        fetchMock.mockReturnValue(
          Promise.resolve({
            ok: true,
            json() {
              return returnedValue;
            },
          }),
        );
      });
      it('should return the backend response', async () => {
        const response = await getCurrency();
        expect(response).toEqual(returnedValue);
      });
    });
    describe('when getCurrency returns error', () => {
      beforeEach(() => {
        fetchMock.mockReturnValue(
          Promise.resolve({
            ok: false,
          }),
        );
      });
      it('should throw specific error', async (done: Function) => {
        expect(getCurrency()).rejects.toThrow('Error on getting currency values');
        done();
      });
    });
  });

  describe('when calls getCryptoValue', () => {
    let returnedValue: Partial<CryptoResponse>;
    let cryptoSymbol: string;

    beforeEach(() => {
      cryptoSymbol = 'BTC';
    });
    describe('and getCryptoValue returns 200', () => {
      beforeEach(() => {
        returnedValue = {
          status: {
            // eslint-disable-next-line @typescript-eslint/camelcase
            error_code: 0,
            // eslint-disable-next-line @typescript-eslint/camelcase
            error_message: '',
            // eslint-disable-next-line @typescript-eslint/camelcase
            credit_count: 0,
            elapsed: 0,
            timestamp: '',
            notice: null,
          },
        };
        fetchMock.mockReturnValue(
          Promise.resolve({
            ok: true,
            json() {
              return returnedValue;
            },
          }),
        );
      });
      it('should call the correct api', async () => {
        await getCryptoValue(cryptoSymbol);
        expect(fetchMock).toHaveBeenCalledWith(`/cryptocurrency/quotes/latest?symbol=${cryptoSymbol}&convert=EUR`, {
          headers: { 'X-CMC_PRO_API_KEY': process.env.REACT_APP_API_KEY },
        });
      });
      it('should call the api only once', async () => {
        await getCryptoValue(cryptoSymbol);
        expect(fetchMock).toHaveBeenCalledTimes(1);
      });
      it('should return the backend response', async () => {
        const response = await getCryptoValue(cryptoSymbol);
        expect(response).toEqual(returnedValue);
      });
    });
    describe('when getCryptoValue returns error', () => {
      let errorMessage: string;

      beforeEach(() => {
        errorMessage = 'Incorrect symbol';
        fetchMock.mockReturnValue(
          Promise.resolve({
            ok: false,
            json: () =>
              Promise.resolve({
                status: {
                  // eslint-disable-next-line @typescript-eslint/camelcase
                  error_code: 400,
                  // eslint-disable-next-line @typescript-eslint/camelcase
                  error_message: errorMessage,
                },
              }),
          }),
        );
      });
      it('should throw the error with error_message', (done: Function) => {
        expect(getCryptoValue(cryptoSymbol)).rejects.toThrow(errorMessage);
        done();
      });
    });
    describe('when getCryptoValue fails to connect on the API', () => {
      beforeEach(() => {
        fetchMock.mockReturnValue(
          Promise.resolve({
            ok: false,
            json: () => Promise.resolve({}),
          }),
        );
      });
      it('should throw the error with error_message', (done: Function) => {
        expect(getCryptoValue(cryptoSymbol)).rejects.toThrow('Error on getting crypto value');
        done();
      });
    });
  });
});
