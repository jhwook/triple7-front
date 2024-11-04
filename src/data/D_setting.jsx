import I_personWhite from '../img/icon/I_personWhite.svg';
import I_financeWhite from '../img/icon/I_financeWhite.svg';
import I_orders from '../img/icon/I_orders.svg';
import I_historyWhite from '../img/icon/I_historyWhite.svg';

export const D_settingNavList = [
  {
    icon: I_personWhite,
    key: 'My Profile',
    url: 'prof',
  },
  {
    icon: I_historyWhite,
    key: 'Trading History',
    url: 'history',
  },
];

export const D_referralCategoryList = ['Follower', 'Following'];

export const D_Follower = [
  'No',
  'Follower Account',
  'Crypto',
  'Amount',
  'Max Percent',
  'Date of subscription',
  'Follow Period',
];

export const D_Following = [
  'No',
  'Following Account',
  'Crypto',
  'Amount',
  'Max Percent',
  'Date of subscription',
  'Follow Period',
];

export const D_recommenderList = [
  {
    account: 'sdfsf199@gmail.com',
    level: 1,
    subscriptionDate: new Date(),
    amount: 1,
    profit: 1.92,
    received: 1,
  },
  {
    account: 'sdfsf199@gmail.com',
    level: 1,
    subscriptionDate: new Date(),
    amount: 1,
    profit: 1.92,
    received: 1,
  },
];

export const D_historyListHeader = [
  'No',
  'Account',
  'Amount',
  'Cashback Percent',
  'Balance',
  'Date',
];

export const D_financeNavList = [
  {
    icon: I_financeWhite,
    key: 'Finance',
    url: 'data',
  },
  {
    icon: I_orders,
    key: 'Orders',
    url: 'orders',
  },
];
