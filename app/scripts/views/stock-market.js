import _ from 'lodash';
import Moment from 'moment';
import StockMarketChannel from '../channels/stock-market.js';
import StockMarketModel from '../models/stock-market.js';
import StockMarketTemplate from '../../templates/stock-market.html';

const $UI = {
	stockMarket: $('#stock-market')
};

const Template = {
	stockMarket: _.template(StockMarketTemplate)
};

const init = () => {
	StockMarketChannel.subscribeTo('UPDATED', render);
}

const render = () => {
	let stocks = StockMarketModel.getAll();
	$UI.stockMarket.html(Template.stockMarket({
		stocks,
		getClassForStock,
		getLastPrice,
		getTimeDifference
	}));
}

const getClassForStock = stock => {
	let state = getState(stock);
	switch(state) {
		case 'INCREASED':
			return 'background--green';
			break;
		case 'DECREASED':
			return 'background--red';
			break;
	}
	return 'background--white';
}

const getState = stock => {
	if(stock.priceHistory.length === 1) {
		return 'STARTED';
	}
	else {
		let lastTwoPrices = stock.priceHistory.slice(-2);
		return (lastTwoPrices[0][0] < lastTwoPrices[1][0]) ? 'INCREASED' : 'DECREASED';
	}
}

const getLastPrice = stock => stock.priceHistory[stock.priceHistory.length - 1][0]

const getTimeDifference = stock => {
	window.moment = Moment;
	let lastTimeStamp = stock.priceHistory[stock.priceHistory.length - 1][1];
	return Moment(lastTimeStamp).fromNow();
}

export
default {
	init
}