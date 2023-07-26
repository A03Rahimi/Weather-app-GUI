// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';


export default class Iphone extends Component {
	//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props) {
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
		this.state.display = this.fetchWeatherData
		this.location = "london";
		this.isCelcius = true;
	}

	componentDidMount() {
		this.fetchWeatherData(this.location, this.isCelcius);
	}
	// a call to fetch weather data via wunderground
	fetchWeatherData = (city, isCelcius) => {
		var unit = "metric";
		if (!isCelcius) {
			unit = "imperial"
		}
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + unit + "&APPID=d78de1e555f08e8cdc3517bd913c4314";
		var url1 = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=" + unit + "&APPID=d78de1e555f08e8cdc3517bd913c4314";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success: this.parseResponse,
			error: function (req, err) { console.log('API call failed ' + err); }
		})

		$.ajax({
			url: url1,
			dataType: "jsonp",
			success: this.parseResponse1,
			error: function (req, err) { console.log('API call failed ' + err); }
		})

		// once the data grabbed, hide the button
		this.setState({ display: false });
	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		var tempStyles;
		if (this.isCelcius) {
			tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		} else {
			tempStyles = this.state.temp ? `${style.temperature} ${style.filled1}` : style.temperature;
		}

		var tempStyles1 = this.state.temp ? `${style.temperature} ${style.filled2}` : style.temperature;
		this.daytime = this.state.isDay ? "day" : "night";
		this.widgetPath = "../../assets/icons/" + this.state.icon + "-" + this.daytime + ".ico";

		this.clothing1Path = "../../assets/icons/" + this.state.icon + "-" + this.daytime + ".png";
		this.clothing2Path = "../../assets/icons/" + this.state.icon + "-" + this.daytime + ".jpg";

		this.forecast = this.state.forecast;

		var background;
		var background1;

		if (this.state.icon === "clear") {
			background1 = "background-image: url(../../assets/backgrounds/" + this.state.icon + "-" + this.daytime + ".jpg" + ");";
			background = "background-image: url(../../assets/backgrounds/" + this.state.icon + "-" + this.daytime + ".png" + ");";
		}
		else if (this.state.icon === "rainy" || this.state.icon === "snowy") {
			background = "background-image: url(../../assets/backgrounds/snow-rain.jpg);";
			background1 = "background-image: url(../../assets/backgrounds/snow-rain.png);";
		}
		else {
			background = "background-image: url(../../assets/backgrounds/wind-cloud.jpg);";
			background1 = "background-image: url(../../assets/backgrounds/wind-cloud.png);";
		}

		// display all weather data
		return (
			<div class={style.pageContainer}>
				<div class={this.state.isDay ? style.containertop : style.containertopnight}>
					<div class={style.header}>
						<div class={style.menu}>
							<img src={this.isCelcius ? "../../assets/icons/f.ico" : "../../assets/icons/c.ico"} alt="unit" height="20" onClick={this.changeUnit} />
						</div>
						<div class={style.search}>
							<input type="text" placeholder="Search" list="search-list" onChange={this.handleInput}>

							</input>
						</div>
						<div class={style.goHome}>
							<img src="../../assets/icons/goHome.ico" alt="goHome" height="28" onClick={this.goHome} />
						</div>
					</div>

					<div class={style.temp}>
						<div class={style.city}>{this.state.locate} <img src="../../assets/icons/pin.ico" alt="pin" height="20" /> </div>
						<span class={tempStyles}>{this.state.temp}</span>
						<div class={style.feels}>Feels like {this.state.feels}°</div>

						<div class={style.details}></div>
					</div>
					<div class={style.widget}>
						<img src={`${this.widgetPath}`} alt="widget" height="85" />
					</div>

					<div class={style.forecast}>
						<div class={style.conditions}> <p>24-hour forecast (local time)</p></div>
						<div><hr></hr></div>
						<div class={style.hourly}>
							<div class={style.hour}>
								<div class={style.hourlyTemp}>{this.forecast ? this.forecast['temp']['0'] : ""}°{this.isCelcius ? 'C' : 'F'}</div>
								<img src={this.forecast ? this.forecast['paths']['0'] : ""} alt="hourly" height="35" />
								<div class={style.hourlyTime}>{this.forecast ? this.forecast['times']['0'] : ""}</div>
							</div>
							<div class={style.hour}>
								<div class={style.hourlyTemp}>{this.forecast ? this.forecast['temp']['1'] : ""}°{this.isCelcius ? 'C' : 'F'}</div>
								<img src={this.forecast ? this.forecast['paths']['1'] : ""} alt="hourly" height="35" />
								<div class={style.hourlyTime}>{this.forecast ? this.forecast['times']['1'] : ""}</div>
							</div>
							<div class={style.hour}>
								<div class={style.hourlyTemp}>{this.forecast ? this.forecast['temp']['2'] : ""}°{this.isCelcius ? 'C' : 'F'}</div>
								<img src={this.forecast ? this.forecast['paths']['2'] : ""} alt="hourly" height="35" />
								<div class={style.hourlyTime}>{this.forecast ? this.forecast['times']['2'] : ""}</div>
							</div>
							<div class={style.hour}>
								<div class={style.hourlyTemp}>{this.forecast ? this.forecast['temp']['3'] : ""}°{this.isCelcius ? 'C' : 'F'}</div>
								<img src={this.forecast ? this.forecast['paths']['3'] : ""} alt="hourly" height="35" />
								<div class={style.hourlyTime}>{this.forecast ? this.forecast['times']['3'] : ""}</div>
							</div>
							<div class={style.hour}>
								<div class={style.hourlyTemp}>{this.forecast ? this.forecast['temp']['4'] : ""}°{this.isCelcius ? 'C' : 'F'}</div>
								<img src={this.forecast ? this.forecast['paths']['4'] : ""} alt="hourly" height="35" />
								<div class={style.hourlyTime}>{this.forecast ? this.forecast['times']['4'] : ""}</div>
							</div>
							<div class={style.hour}>
								<div class={style.hourlyTemp}>{this.forecast ? this.forecast['temp']['5'] : ""}°{this.isCelcius ? 'C' : 'F'}</div>
								<img src={this.forecast ? this.forecast['paths']['5'] : ""} alt="hourly" height="35" />
								<div class={style.hourlyTime}>{this.forecast ? this.forecast['times']['5'] : ""}</div>
							</div>
							<div class={style.hour}>
								<div class={style.hourlyTemp}>{this.forecast ? this.forecast['temp']['6'] : ""}°{this.isCelcius ? 'C' : 'F'}</div>
								<img src={this.forecast ? this.forecast['paths']['6'] : ""} alt="hourly" height="35" />
								<div class={style.hourlyTime}>{this.forecast ? this.forecast['times']['6'] : ""}</div>
							</div>
							<div class={style.hour}>
								<div class={style.hourlyTemp}>{this.forecast ? this.forecast['temp']['7'] : ""}°{this.isCelcius ? 'C' : 'F'}</div>
								<img src={this.forecast ? this.forecast['paths']['7'] : ""} alt="hourly" height="35" />
								<div class={style.hourlyTime}>{this.forecast ? this.forecast['times']['7'] : ""}</div>
							</div>
						</div>
					</div>

					<div class={style.status}>
						<div class={style.conditions}> <p>{this.state.cond} | low:{this.state.low}° - high:{this.state.high}°</p></div>
						<div><hr></hr></div>
						<div class={style.wind}>
							<img src="../../assets/icons/wind.ico" alt="windspeed" height="45" />{this.state.windspeed} {this.isCelcius ? "KM/H" : "MPH"}
						</div>
						<div class={style.humidity}>
							<img src="../../assets/icons/humidity.ico" alt="humidity" height="45" /> {this.state.humidity}%
						</div>
					</div>

					<div class={style.clothing}>
						<div class={style.conditions}> <p>Recommended for this weather</p></div>
						<div><hr></hr></div>
						<div class={style.cloth1}>
							<img src={this.clothing1Path} alt="cloth1" height="45" />
						</div>
						<div class={style.cloth2}>
							<img src={this.clothing2Path} alt="cloth2" height="45" />
						</div>
					</div>
					<div class={style.swipe}>
						<p>Swipe for Recommendations</p>
					</div>
				</div>

				<div class={style.container} style={background} >
					<div class={style.city}></div>
					<span class={tempStyles1}></span>
				</div>

				<div class={style.container1} style={background1}>
					<div class={style.header}>

					</div>
					<div class={style.city}></div>
					<div class={style.conditions}></div>
					<span class={tempStyles1}></span>

				</div>
			</div>
		);
	}

	goHome = (e) => {
		this.location = "london";
		this.fetchWeatherData(this.location, this.isCelcius)
	}

	changeUnit = (e) => {
		this.isCelcius = !this.isCelcius;
		this.fetchWeatherData(this.location, this.isCelcius)
	}

	handleInput = (e) => {
		const oldState = this.state
		const selectedValue = e.target.value;
		this.location = selectedValue;
		try {
			this.fetchWeatherData(this.location, this.isCelcius)
		}
		catch (exception) {
			console.log("location not found")
			this.state = oldState
		}
		e.target.value = ''; // clear the input field
	}
	parseResponse = (parsed_json) => {
		var location = parsed_json['name'];
		var temp_c = parsed_json['main']['temp'];
		var conditions = parsed_json['weather']['0']['description'];
		var min_temps = parsed_json['main']['temp_min'];
		var max_temps = parsed_json['main']['temp_max'];
		var feels_like = parsed_json['main']['feels_like'];
		var windspeed = parsed_json['wind']['speed'];
		var conditionIcon;
		if (conditions.includes('rain')) {
			conditionIcon = 'rainy';
		} else if (conditions.includes('wind')) {
			conditionIcon = 'windy';
		} else if (conditions.includes('partly') || conditions.includes('broken') || conditions.includes('scattered') || conditions.includes('few') || conditions.includes('haze')) {
			conditionIcon = 'partlycloudy';
		} else if (conditions.includes('cloud')) {
			conditionIcon = 'cloudy';
		} else if (conditions.includes('snow')) {
			conditionIcon = 'snowy';
		} else {
			conditionIcon = 'clear';
		}
		const humidity = parsed_json['main']['humidity'];

		const sunrise = parsed_json['sys']['sunrise'];
		const sunset = parsed_json['sys']['sunset'];
		const now = Date.now() / 1000; // get current timestamp in seconds
		const isDay = now > sunrise && now < sunset;


		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: Math.round(temp_c),
			cond: conditions,
			icon: conditionIcon,
			low: Math.round(min_temps),
			high: Math.round(max_temps),
			feels: Math.round(feels_like),
			windspeed: windspeed,
			isDay: isDay,
			humidity: humidity
		});
	}

	parseResponse1 = (parsed_json) => {
		const forecastList = parsed_json['list'];
		var forecast = {};
		forecast['times'] = [];
		forecast['temp'] = [];
		forecast['statusIcon'] = [];
		forecast['paths'] = [];
		for (let i = 0; i < 8; i++) {
			var timestamp = forecastList[i]['dt']
			var date = new Date(timestamp * 1000);
			var hour = date.getHours().toString().padStart(2, "0");
			var minute = date.getMinutes().toString().padStart(2, "0");
			var timeString = `${hour}:${minute}`;
			forecast['times'].push(timeString);
			forecast['temp'].push(Math.round(forecastList[i]['main']['temp']));
			var statusIcon;
			if (forecastList[i]['weather'][0]['description'].includes('rain')) {
				statusIcon = 'rainy';
			} else if (forecastList[i]['weather'][0]['description'].includes('wind')) {
				statusIcon = 'windy';
			} else if (forecastList[i]['weather'][0]['description'].includes('partly') || forecastList[i]['weather'][0]['description'].includes('broken') || forecastList[i]['weather'][0]['description'].includes('scattered') || forecastList[i]['weather'][0]['description'].includes('few') || forecastList[i]['weather'][0]['description'].includes('haze')) {
				statusIcon = 'partlycloudy';
			} else if (forecastList[i]['weather'][0]['description'].includes('cloud')) {
				statusIcon = 'cloudy';
			} else if (forecastList[i]['weather'][0]['description'].includes('snow')) {
				statusIcon = 'snowy';
			} else {
				statusIcon = 'clear';
			}
			var dayTime;
			if (parseInt(hour) < 18 && parseInt(hour) > 5) {
				dayTime = "day";
			} else {
				dayTime = "night";
			}
			forecast['statusIcon'].push(statusIcon)
			forecast['paths'].push("../../assets/icons/" + statusIcon + "-" + dayTime + ".ico")

			this.setState({
				forecast: forecast
			});
		}
	}


}

