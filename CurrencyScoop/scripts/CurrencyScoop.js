//Element Containers.
var e = React.createElement;
var content = [
	e('p', {className: 'chart-heading', key: 'currency-heading'}, 'Name of Currency'),
	e('p', {className: 'chart-heading', key: 'country-heading'}, 'Country/Countries Using It')
];

//Web service request info and response container.
var currencies = {};
const endpoint = 'currencies';
const key = '20313d0bc44c01c2f60c711102e67deb';
const type = 'fiat';

//ajax request.
//Currently, this fails.
$.ajax({
	url: 'https://api.currencyscoop.com/v1/' + endpoint + '?api_key=' + key + '&type=' + type,
	dataType: 'jsonp',
	success: function(currencies){
		alert(currencies);
	}
});

//Proof-of-concept data (to show that the ReactJS code works).
currencies = {
	"quotes":[
		{"currency": "Dollar", "countries": "USA, Canada, Australia, New Zealand"},
		{"currency": "Pound", "countries": "United Kingdom"},
		{"currency": "Euro", "countries": "France, Germany, Italy"},
		{"currency": "Yen", "countries": "Japan"},
		{"currency": "Yuan", "countries": "China"},
		{"currency": "Ruble", "countries": "Russia"},
	]
};

//Populate content with table data.
var currencyID, countryID;
for(var i=0; i<currencies.quotes.length; i++){
	currencyID = 'currency'+i.toString();
	countryID = 'country'+i.toString();
	content.push(
		e('p', {className: 'chart-content', key: currencyID}, currencies.quotes[i].currency)
	);
	content.push(
		e('p', {className: 'chart-content', key: countryID}, currencies.quotes[i].countries)
	);
}

class CurrencyChart extends React.Component{
	constructor(props){
		super(props);
	}
	
	render(){
		return e(
			'div', {className: 'currency-chart'}, content
		);
	}
};

ReactDOM.render(e(CurrencyChart), document.querySelector('#chart-container'));

//API URL w/ Endpoint and Key: https://api.currencyscoop.com/v1/currencies?api_key=20313d0bc44c01c2f60c711102e67deb
