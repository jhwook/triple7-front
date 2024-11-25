const url = 'http://localhost:8082';
const version = '/api/v1';
export const URL = url;

export const API = {
  SIGNUP: URL + version + '/auth/signup', //type
  LOGIN: URL + version + '/auth/signin',
  GET_USER_WALLET: URL + version + '/wallets',
  GET_USER_INFO: URL + version + '/users',
  GET_MY_FOLLOWERS: URL + version + '/subscriptions/follower',
  GET_MY_FOLLOWERWINGS: URL + version + '/subscriptions/following',
  GET_CRYPTO_LIST: URL + version + '/cryptos/list',
  GET_TRADE_HISTORY: URL + version + '/cryptos/trades/pagination',
  GET_LATEST_CRYPTO_PRICE: URL + version + '/cryptos/latest/price',
  GET_RANKING: URL + version + '/rankings',
  DEPOSIT: URL + version + '/wallets/charge',
  GET_DEPOSIT_HISTORY: URL + version + '/wallets/history',
  GET_TOP_RANKING: URL + version + '/rankings/top',
  REQUEST_FOLLOW: URL + version + '/subscriptions',
  POST_TRADE: URL + version + '/cryptos',
  GET_ORDERBOOK_PRE_DATA: URL + version + '/cryptos/orderbook/data',
};
