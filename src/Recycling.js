import React, { Component} from 'react';
import './App.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

class Recycling extends Component{
	constructor(props){
		super(props)
		this.state={
			recData: []
		}
	}
	componentDidMount(){
	
		let recApi = "https://performance.seattle.gov/resource/28jq-psn3.json?$$app_token=gPJkv0UyrUI43VB2spGv2uKxz"
		fetch(recApi)
			.then((response) => {
				return response.json()
			}).then((json) => {
				this.setState({recData: json});
			}).catch((err) => {
				console.log("error found in parsing", err)
			});	
	}
	render(){
		let years = []
		let percent = []
		const dataRate = []
		const dataTonn = []
		let allData = this.state.recData.map(item => {
			let eachRate = {}
			let eachTonn = {}
			let year = item.year.slice(0,4)
			years.push(year)
			percent.push(item.recycle_rate)
			eachRate.year = year
			let rate = (item.recycle_rate * 100).toFixed(2)
			eachRate.Rate= rate
			dataRate.push(eachRate)
			eachTonn.year = year
			eachTonn.Disposed = item.disposed 
			eachTonn.Recycled = item.recycled 
			dataTonn.push(eachTonn)

			return(
				<div className="rec_section">
					<h3>Year: {item.year}</h3>
					<h4>Rate: {item.recycle_rate}</h4>
				</div>
			)
		})
		console.log('dataaaa', dataRate, dataTonn)
	
		return(
			<div>
			<div className="line-chart">
				<h3>Annual recycling rates (%)</h3>
				<LineChart width={400} height={400} data={dataRate}
					margin={{top: 5, right: 20, bottom: 5, left: 0}}>
					<Line type="monotone" dataKey="Rate" stroke="#82ca9d" />
					<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
					<XAxis dataKey="year"/>
					<YAxis ticks={[10, 20 ,30, 40, 50, 60]} domain={[30, 60]} unit = "%" name="recyling rate" />
	       			<Tooltip />
	      			<Legend />
				</LineChart>
			</div>
			<div className="bar-chart">
			<h3>Waste disposed vs. recycled (tons) (%)</h3>
				<BarChart width={600} height={400} data={dataTonn} margin={{top: 20, right: 50, left: 50, bottom: 5}}>
					<Bar dataKey="Disposed" stackId="a" fill="black" />
					<Bar dataKey="Recycled" stackId="a" fill="#82ca9d" />
			       	<XAxis dataKey="year"/>
					<YAxis unit=" tons" ticks={[100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 550000, 600000, 700000, 750000, 800000, 850000, 900000]} />
			       	<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
			       	<Tooltip/>
			       	<Legend />
	      		</BarChart>
	      		</div>
			</div>
		)
	}
}


export default Recycling;