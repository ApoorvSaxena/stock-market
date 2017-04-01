import StockMarketChannel from '../channels/stock-market.js';
import CacheStorage from '../storage/cache.js';

const CACHE_NAMESPACE = 'stocks';

const init = () => {
	StockMarketChannel.subscribeTo('SYNCED', update);
}

const update = data => {
	var stockName,
		stockPrice,
		stockUpdate;

	const stocks = CacheStorage.getItem(CACHE_NAMESPACE) || {};
	const currentTime = (new Date()).getTime();

	for (var i = 0; i < data.length; i++) {
		[stockName, stockPrice] = data[i];
		stockUpdate = [stockPrice, currentTime];
		if (!stocks[stockName]) {
			stocks[stockName] = {
				priceHistory: [
					stockUpdate
				]
			};
		} else {
			stocks[stockName].priceHistory.push(stockUpdate);
		}
	}

	CacheStorage.setItem(CACHE_NAMESPACE, stocks);
	StockMarketChannel.publishTo('UPDATED');
}

const getAll = () => CacheStorage.getItem(CACHE_NAMESPACE)

export default {
	init,
	getAll
}
