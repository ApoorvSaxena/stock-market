import Moment from 'moment';

import Snackbar from '../utils/snackbar.js';

import StockMarketService from '../services/stocks.js';
import StockMarketModel from '../models/stock-market.js';
import StockMarketChannel from '../channels/stock-market.js';
import StockMarketView from '../views/stock-market.js';

const init = () => {
	StockMarketService.init();
	StockMarketModel.init();
	StockMarketView.init();
	StockMarketChannel.subscribeTo('UPDATED', publishSyncUpdate);
	Snackbar.show('Stock Market is now open!');
}

const publishSyncUpdate = () => {
	Snackbar.show('Stock Market updated!');
}

export
default {
	init
}
