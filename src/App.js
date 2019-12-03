import React, { Component } from "react";
import Select from "react-select";
import FlightIcon from "@material-ui/icons/Flight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";

import "./App.css";
import { Typography, Link } from "@material-ui/core";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airports: [],
      selectedAirport: null,
      loading: false
    };
  }

  options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" }
  ];

  handleChange = selectedAirport => {
    this.setState({ selectedAirport }, () =>
      console.log(`Option selected:`, this.state.selectedAirport)
    );
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {!this.state.selectedAirport && (
            <div className={"Search-Container"}>
              <FlightIcon style={{ fontSize: 300, color: "white" }} />
              <div style={{ width: "50vw", color: "#282c34" }}>
                <Select
                  autoFocus
                  options={this.options}
                  placeholder={"Enter airport name"}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          )}
          {this.state.selectedAirport && (
            <div className="Detail-Container">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/84/Aerial_view_of_Singapore_Changi_Airport_and_Changi_Air_Base_-_20110523.jpg"
                className={"Cover-Image"}
              />
              <div className={"Detail-Content"}>
                <Link
                  className={"Back-Button"}
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ selectedAirport: null });
                  }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <KeyboardArrowLeftIcon />
                  Back
                </Link>
                <div className={"Abi"}>
                  <h1>Singapore Changi Airport</h1>
                  <Typography
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Link
                      href="http://www.wikidata.org/entity/Q1812824"
                      target="_blank"
                    >
                      <h2 style={{ margin: 0 }}>Changi</h2>
                    </Link>
                    <Link
                      href="http://www.wikidata.org/entity/Q1812824"
                      target="_blank"
                    >
                      <h2 style={{ margin: 0 }}>Singapore</h2>
                    </Link>
                    <Link
                      href="http://www.wikidata.org/entity/Q1812824"
                      target="_blank"
                    >
                      <h2 style={{ margin: 0 }}>Asia</h2>
                    </Link>
                  </Typography>
                  <hr />
                  <Typography
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <b>Type</b>
                    <span>Large Airport</span>
                  </Typography>
                  <Typography
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <b>IATA Code</b>
                    <span>SIN</span>
                  </Typography>
                  <Typography
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <b>ICAO Code</b>
                    <span>WSSS</span>
                  </Typography>
                  <Typography
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <b>Latitude</b>
                    <span>1.35019</span>
                  </Typography>
                  <Typography
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <b>Longitude</b>
                    <span>103.994003</span>
                  </Typography>
                  <Typography
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <b>Elevation Height</b>
                    <span>22</span>
                  </Typography>
                  <Typography
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Link>More information</Link>
                  </Typography>
                </div>
              </div>
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
