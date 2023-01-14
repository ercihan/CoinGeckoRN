export interface ICoin {
	id: string;
	name: string;
	symbol: string;
	image: ICoinImage;
	description: ICoinDescription;
	market_data: ICoinMarketData;
	market_cap_rank: number;
}

interface ICoinImage {
	thumb: string;
	small: string;
	large: string;
}

interface ICoinDescription {
	en: string;
}

interface ICoinMarketData {
	current_price: ICoinPrices;
	market_cap: ICoinPrices;
}

interface ICoinPrices {
	usd: number;
	chf: number;
}


export interface ICoinResults {
	coins: ICoinResult[];
}

export interface ICoinResult {
	id: string;
	name: string;
	symbol: string;
	market_cap_rank: number;
	thumb: string;
	large: string;
}
