import StockMarketChannel from '../channels/stock-market.js';

const init = () => {
	connect();
}

const connect = () => {
	const socket = new WebSocket('ws://stocks.mnet.website');
	socket.onmessage = evt => {
		StockMarketChannel.publishTo('SYNCED', JSON.parse(evt.data));
	};
}

export
default {
	init
};