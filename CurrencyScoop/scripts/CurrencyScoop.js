//Element Containers.
var e = React.createElement;
var content = [
	e('p', {className: 'chart-heading', key: 'currency-heading'}, 'Name of Currency'),
	e('p', {className: 'chart-heading', key: 'country-heading'}, 'Country/Countries Using It')
];

//Retrieve and format data using XMLHTTPRequest and JSON functionality.
var CSRequest = new XMLHttpRequest();
var CSResponse;
CSRequest.open("GET", "https://api.currencyscoop.com/v1/currencies?api_key=20313d0bc44c01c2f60c711102e67deb&type=fiat");
CSRequest.send();
CSRequest.onload = function(){
	CSResponse = JSON.parse(CSRequest.response);								//Create JSON object.
	var currencyKeys = Object.keys(CSResponse.response.fiats);					//Keys are defined by currency codes. This array stores those.
	var i = 0;																	//ID iterator.
	currencyKeys.forEach(function(key){											//Iterate through currency keys.
		var currencyName = CSResponse.response.fiats[key].currency_name;		//Get currency name.
		var countryName = CSResponse.response.fiats[key].countries;				//Get currency countries.
		var currencyID = "currency" + i.toString();
		var countryID = "countries" + i.toString();
		content.push(	//Add currency to React sub-component array.
			e('p', {className: 'chart-content', key: currencyID}, currencyName)
		);
		content.push(	//Add countries to React sub-component array.
			e('p', {className: 'chart-content', key: countryID}, countryName)
		);
		i++;
	});
	
	//React component.
	//The logic of constructing the vast majority of the component is handled above, so all that is necessary is to hand the array to the main div.
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
	
	//Display the chart.
	ReactDOM.render(e(CurrencyChart), document.querySelector('#chart-container'));
};