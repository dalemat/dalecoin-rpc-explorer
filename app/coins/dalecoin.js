var Decimal = require("decimal.js");
Decimal8 = Decimal.clone({ precision:8, rounding:8 });

var btcCurrencyUnits = [
	{
		name:"DALECOIN",
		multiplier:1,
		default:true,
		values:["", "dalecoin", "DALECOIN"],
		decimalPlaces:8
	},
	{
		name:"mDALECOIN",
		multiplier:1000,
		values:["mdalecoin"],
		decimalPlaces:5
	},
	{
		name:"bits",
		multiplier:1000000,
		values:["bits"],
		decimalPlaces:2
	},
	{
		name:"sat",
		multiplier:100000000,
		values:["sat", "satoshi"],
		decimalPlaces:0
	}
];

module.exports = {
	name:"DALECOIN",
	ticker:"DALECOIN",
	logoUrl:"/img/logo/dalecoin.svg",
	siteTitle:"DALECOIN Explorer",
	siteDescriptionHtml:"<b>Welcome to the DALECOIN block explorer!</b> This is a tool you can use to review the entire blockchain history, which includes transactions packed into blocks.",
	nodeTitle:"DALECOIN Full-Node",
	nodeUrl:"https://explorer.dalecoin.org/",
	demoSiteUrl: "https://btc.chaintools.io",
	miningPoolsConfigUrls:[
		"https://raw.githubusercontent.com/blockchain/Blockchain-Known-Pools/master/pools.json",
		"https://raw.githubusercontent.com/btccom/Blockchain-Known-Pools/master/pools.json"
	],
	maxBlockWeight: 4000000,
	currencyUnits:btcCurrencyUnits,
	currencyUnitsByName:{"DALECOIN":btcCurrencyUnits[0], "mBSHA3":btcCurrencyUnits[1], "bits":btcCurrencyUnits[2], "sat":btcCurrencyUnits[3]},
	baseCurrencyUnit:btcCurrencyUnits[3],
	feeSatoshiPerByteBucketMaxima: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 50, 75, 100, 150],
	genesisBlockHash: ""0000d9badf5d39afaa47451111a931672baaa3ce9bbbfb9165f414b9e6e69d61",",
	genesisCoinbaseTransactionId: "307f8dab7ff067f5f109826128140f79e672ae99a7e5c3e018e5433127466722",
	genesisCoinbaseTransaction: {
		"hex": "",
		"txid": "307f8dab7ff067f5f109826128140f79e672ae99a7e5c3e018e5433127466722",
		"hash": "307f8dab7ff067f5f109826128140f79e672ae99a7e5c3e018e5433127466722",
		"size": 289,
		"vsize": 289,
		"version": 4,
		"confirmations":6563,
		"vin": [
			{
				"coinbase": "0004ffff001d013c48424243204e6577732032302f4f63742f32303138205553204d656761204d696c6c696f6e73206c6f7474657279206a61636b706f742068697473207265636f72642024312e36626e",
				"sequence": 4294967295
			}
		],
		"vout": [
			{
				"value": 50,
				"n": 0,
				"scriptPubKey": {
					"asm": "04f5eeb2b10c944c6b9fbcfff94c35bdeecd93df977882babc7f3a2cf7f5c81d3b09a68db7f0e04f21de5d4230e75e6dbe7ad16eefe0d4325a62067dc6f369446a OP_CHECKSIG",
					"hex": "4104f5eeb2b10c944c6b9fbcfff94c35bdeecd93df977882babc7f3a2cf7f5c81d3b09a68db7f0e04f21de5d4230e75e6dbe7ad16eefe0d4325a62067dc6f369446aac",
					"reqSigs": 1,
					"type": "pubkey",
					"addresses": [
						"1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
					]
				}
			}
		],
		"blockhash": "0000d9badf5d39afaa47451111a931672baaa3ce9bbbfb9165f414b9e6e69d61    88c4d65f1",
		"time": 1540053565,
		"blocktime":1540053565 
	},
	genesisCoinbaseOutputAddressScripthash:"8b01df4e368ea28f8dc0423bcf7a4923e3a12d307c875e47a0cfbf90b5c39161",
	historicalData: [
	],
	exchangeRateData:{
		jsonUrl:"https://api.coinmarketcap.com/v1/ticker/Bitcoin/",
		exchangedCurrencyName:"usd",
		responseBodySelectorFunction:function(responseBody) {
			if (responseBody[0] && responseBody[0].price_usd) {
				return 0; //responseBody[0].price_usd;
			}
			
			return -1;
		}
	},
	blockRewardFunction:function(blockHeight) {
		var eras = [ new Decimal8(50) ];
		for (var i = 1; i < 34; i++) {
			var previous = eras[i - 1];
			eras.push(new Decimal8(previous).dividedBy(2));
		}

		var index = Math.floor(blockHeight / 210000);

		return eras[index];
	}
};
