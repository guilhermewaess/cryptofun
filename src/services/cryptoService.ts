/* eslint-disable @typescript-eslint/camelcase */
import { CurrencyResponse, CryptoResponse } from '../interfaces';

export function getCurrency(): Promise<CurrencyResponse> {
  return Promise.resolve({
    rates: { AUD: 1.6129, BRL: 4.6739, USD: 1.0835, GBP: 0.83238 },
    base: 'EUR',
    date: '2020-02-18',
  });
}

export async function getCryptoValue(cryptoSymbol: string): Promise<CryptoResponse> {
  // const response = await fetch(
  //   `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${cryptoSymbol}&convert=EUR`,
  //   {
  //     method: 'GET',
  //     headers: { 'X-CMC_PRO_API_KEY': 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c' },
  //   },
  // );

  return Promise.resolve({
    status: {
      timestamp: '2020-02-18T13:55:21.960Z',
      error_code: 0,
      error_message: null,
      elapsed: 16,
      credit_count: 1,
      notice: null,
    },
    data: {
      BTC: {
        id: 1,
        name: 'Bitcoin',
        symbol: 'BTC',
        slug: 'bitcoin',
        num_market_pairs: 7718,
        date_added: '2013-04-28T00:00:00.000Z',
        tags: ['mineable'],
        max_supply: 21000000,
        circulating_supply: 18224212,
        total_supply: 18224212,
        platform: null,
        cmc_rank: 1,
        last_updated: '2020-02-18T13:54:42.000Z',
        quote: {
          EUR: {
            price: 8925.681875130009,
            volume_24h: 39047478497.843414,
            percent_change_1h: -0.48641223,
            percent_change_24h: 0.80902583,
            percent_change_7d: -1.92435728,
            market_cap: 162663518736.92682,
            last_updated: '2020-02-18T13:54:01.000Z',
          },
        },
      },
    },
  });
}
