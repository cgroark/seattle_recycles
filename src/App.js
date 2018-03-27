import React, { Component } from 'react';
import Recycling from './Recycling.js';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      recData: [],
      startYear: '',
      endYear: ''
    }

  this.handleClick = this.handleClick.bind(this)
  this.startYear = this.startYear.bind(this)

  }

  handleClick(e){
    e.preventDefault();
    let year = [];
    let recApi = "https://performance.seattle.gov/resource/28jq-psn3.json?$$app_token=gPJkv0UyrUI43VB2spGv2uKxz"
    fetch(recApi)
      .then((response) => {
        response.json().then((json) => {
        console.log('json', json)
        let slicedData = json.map(item => {
            var yearEach = item.year.slice(0,4);
            year.push(parseInt(yearEach))
        })
        let indexFirst = year.indexOf(parseInt(this.state.startYear));
        let indexLast = year.indexOf(parseInt(this.state.endYear))
        console.log('state of start year', indexFirst, indexLast)
        let range = json.slice(indexFirst,indexLast + 1)
        console.log(range)
        this.setState({recData: range});
      }).catch((err) => {
        console.log("error found in parsing", err)
      }); 
      })
  }
  startYear = (e) => {
    e.preventDefault();
    this.setState({startYear: e.target.value});
  }
  endYear = (e) => {
    e.preventDefault();
    this.setState({endYear: e.target.value});
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Seattle Recycling Rates</h1>
        </header>
        <p className="App-intro">Compare Seattle Recycling rates for 2003-2015</p>
        <input type="button" value="Fetch Data" onClick={this.handleClick} />
        <select className="drop-down" required onChange={this.startYear}>
            <option  defaultValue="">Start Year</option>
            <option  value="2003">2003</option>
            <option  value="2004">2004</option>
            <option  value="2005">2005</option>
            <option  value="2006">2006</option>
            <option  value="2007">2007</option>
            <option  value="2008">2008</option>
            <option  value="2009">2009</option>
            <option  value="2010">2010</option>
            <option  value="2011">2011</option>
            <option  value="2012">2012</option>
            <option  value="2013">2013</option>
            <option  value="2014">2014</option>
          </select>

          <select className="drop-down" required onChange={this.endYear}>
            <option  defaultValue="">End Year</option>
            <option  value="2004">2004</option>
            <option  value="2005">2005</option>
            <option  value="2006">2006</option>
            <option  value="2007">2007</option>
            <option  value="2008">2008</option>
            <option  value="2009">2009</option>
            <option  value="2010">2010</option>
            <option  value="2011">2011</option>
            <option  value="2012">2012</option>
            <option  value="2013">2013</option>
            <option  value="2014">2014</option>
            <option  value="2015">2015</option>
          </select>
        <Recycling recycle = {this.state.recData} start = {this.state.startYear} end = {this.state.endYear} />
      </div>
    );
  }
}

export default App;
