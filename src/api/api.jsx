//export const URL = "http://options1.net:30708";
// export const URL = "http://litriggy.com:30708";
// export const URL = "https://options1.net:30718";
// const url = process.env.REACT_APP_SERVER_HOST;
const url = 'http://localhost:8082';
const version = '/api/v1';
export const CLOSED_SOCKET_URL = url;
export const URL = url;

export const API = {
  GET_ASSETS_TICKER_PRICE: 'http://localhost:30708' + '/assets/ticker/price', //:symbol
  GET_ASSETS: URL + '/assets/list',

  SIGNUP: URL + version + '/auth/signup', //type
  LOGIN: URL + version + '/auth/signin',
  GET_USER_WALLET: URL + version + '/wallets',
  GET_USER_INFO: URL + version + '/users',
  GET_MY_FOLLOWERS: URL + version + '/subscriptions/follower',
  GET_MY_FOLLOWERWINGS: URL + version + '/subscriptions/following',
  GET_CRYPTO_LIST: URL + version + '/cryptos/list',
  GET_TRADE_HISTORY: URL + version + '/cryptos',
  GET_LATEST_CRYPTO_PRICE: URL + version + '/cryptos/latest/price',
  GET_RANKING: URL + version + '/rankings/crypto',
  DEPOSIT: URL + version + '/wallets/charge',
  GET_DEPOSIT_HISTORY: URL + version + '/wallets/history',
  GET_TOP_RANKING: URL + version + '/rankings/top',
  REQUEST_FOLLOW: URL + version + '/subscriptions',

  AUTH: URL + '/users/auth',
  RESET_PW: URL + '/users/reset/password', //:type
  RESET_VERIFY: URL + '/users/reset/verify', //:type/:code
  CHANGE_PW: URL + '/users/change/password', //:type
  REFRESH: URL + '/users/refresh',
  EDIT_REF: URL + '/users/edit/ref',
  MY_POSITION: URL + '/users/my/position',
  USER_PROFILE: URL + '/users/profile',
  USER_DAILY_SUMMARY: URL + '/users02/daily-summary',
  USER_SEND_CERTIFICATION: URL + '/users/send/verification', //:type
  USER_VERIFY: URL + '/users/verify', //:type/:code
  USER_QUERY: URL + '/users/query', //tablename/offset/limit
  USER_BALANCE: URL + '/users/balance', //:type
  USER_BRANCH: URL + '/users/branch', //:offset/:limit/:orderkey/:orderval
  USER_BRANCH_FEE_LOG: URL + '/users/branch/fee/log', //:offset/:limit/:orderkey/:orderval
  USER_PREDEPOSIT: URL + '/users/predeposit',
  USER_BETLOGS: URL + '/users/betlogs', //:type/:offset/:limit
  USER_DEMO_TOKEN: URL + '/users/demo/token',
  USER_REFERRAL: URL + '/users/myreferrals', //:offset/:limit/id/DESC
  NOTI: URL + '/users/notice/setting',
  USER_REFERRAL_HISTORY: URL + '/users/myreferrals/fee/log', //:offset/:limit/id/DESC
  INQUIRY_ENROLL: URL + '/inquiry/enroll',
  NOTI_SET: URL + '/users/notice/set',

  PHONE_COUNTRY_CODE: URL + '/queries/v1/rows/country_code', //:offset/:limit

  BETS: URL + '/bets/join', // /:type/:assetId/:amount/:dur/:side
  MY_BETS: URL + '/bets/my', // type

  TRANSACTION_BRANCH_LIST: URL + '/transactions/branch/list',
  TRANSACTION_BRANCH_TRANSFER: URL + '/transactions/branch/transfer',
  TRANS_DEPOSIT: URL + '/transactions/live/DEPOSIT', //:amount
  LISTEN_TRANSACTION: URL + '/transactions/listen',

  TRANS_DEMO_FUND: URL + '/transactions/demo/fund', //:amount

  TRANS_WITHDRAW: URL + '/transactions/live/withdraw', //:amount
  WITHDRAW: URL + '/transactions/withdraw',

  BOOKMARKS: URL + '/bookmarks', //:type/:targetId
  BOOKMARKS_MY: URL + '/bookmarks/my',

  QUERIES_FOREX: URL + '/queries/forex', //:type

  ADMIN_LEVEL_FEE: URL + '/admins/level/fee',
  ADMIN_FEE_SETTING: URL + '/admins/fee/setting', //:level
  ADMIN_QR: URL + '/admins/domain/setting/qr',
};
