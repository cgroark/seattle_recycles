import React, { Component } from 'react';
import Recycling from './Recycling.js';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      recData: []
    }

  this.handleClick = this.handleClick.bind(this)
  this.startYear = this.startYear.bind(this)

  }

  handleClick(e){
    e.preventDefault();
    let recApi = "https://performance.seattle.gov/resource/28jq-psn3.json?$$app_token=gPJkv0UyrUI43VB2spGv2uKxz"
    fetch(recApi)
      .then((response) => {
        response.json().then((json) => {
        this.setState({recData: json});
      }).catch((err) => {
        console.log("error found in parsing", err)
      }); 
      })
  }
  startYear(e){
    e.preventDefault();
    let years = []
    let allData = this.state.recData.map(item => {
      let year = item.year.slice(0,4)
      years.push(year)
      console.log(years)

    })
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
            <option  value="2008">2010</option>
            <option  value="2008">2011</option>
            <option  value="2008">2012</option>
            <option  value="2008">2013</option>
            <option  value="2008">2014</option>
          </select>

          <select className="drop-down" required onChange={this.endYear}>
            <option  defaultValue="">End Year</option>
            <option  value="2004">2004</option>
            <option  value="2005">2005</option>
            <option  value="2006">2006</option>
            <option  value="2007">2007</option>
            <option  value="2008">2008</option>
            <option  value="2008">2010</option>
            <option  value="2008">2011</option>
            <option  value="2008">2012</option>
            <option  value="2008">2013</option>
            <option  value="2008">2014</option>
            <option  value="2008">2015</option>
          </select>
        <Recycling recycle = {this.state.recData} />
      </div>
    );
  }
}

export default App;
