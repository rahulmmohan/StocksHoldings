import {UserHolding} from '../types';

function create<T>(
  url: string,
  method: 'GET' | 'PUT' | 'POST' | 'DELETE',
): Promise<T> {
  return fetch(url, {method: method, redirect: 'follow'})
    .then(response => response.json())
    .then((payload: any = {}) => {
      const {data} = payload ?? {};
      if (data) {
        return data;
      } else {
        throw 'Error';
      }
    })
    .catch((error: any) => {
      throw error;
    });
}

class StocksRepo {
  static getStocksHoldings = () =>
    create<{userHolding: UserHolding[]}>(
      'https://35dee773a9ec441e9f38d5fc249406ce.api.mockbin.io/',
      'GET',
    );
}

export default StocksRepo;
