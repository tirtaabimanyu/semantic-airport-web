import React, { Component } from "react";
import Select from "react-select";
import FlightIcon from "@material-ui/icons/Flight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";

import "./App.css";
import { Typography, Link } from "@material-ui/core";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airports: [],
      selectedAirport: null,
      loading: false,
      detail: null
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios.get("http://localhost:5000/resources/").then(response => {
      const airports = response["data"].map(x => {
        return { value: x.uri, label: x.name };
      });
      this.setState({ airports, loading: false });
    });
  }

  handleChange = async selectedAirport => {
    const url =
      "http://localhost:5000/resources/" +
      selectedAirport["value"].split(/[/]+/).pop();
    await axios.get(url).then(response => {
      console.log(response);
      const detail = response["data"].reduce((map, obj) => {
        const key = obj["p"].split(/[/]+/).pop();
        map[key] = obj["o"];
        return map;
      }, {});
      this.setState({ detail });
    });
    this.setState({ selectedAirport });
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
                  disabled={this.state.loading}
                  options={this.state.airports}
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
                  <h1>{this.state.selectedAirport.label}</h1>
                  <Typography
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      maxWidth: "50vw",
                      flexWrap: "wrap"
                    }}
                  >
                    {this.state.detail.Muncipality && (
                      <Link
                        href={this.state.detail.Muncipality}
                        target="_blank"
                      >
                        <h2 style={{ margin: 0 }}>
                          {this.state.detail.Muncipality.split(/[/]+/).pop()}
                        </h2>
                      </Link>
                    )}
                    {this.state.detail.Country && (
                      <Link href={this.state.detail.Country} target="_blank">
                        <h2 style={{ margin: 0 }}>
                          {this.state.detail.Country.split(/[/]+/).pop()}
                        </h2>
                      </Link>
                    )}
                    {this.state.detail.Continent && (
                      <Link href={this.state.detail.Continent} target="_blank">
                        <h2 style={{ margin: 0 }}>
                          {this.state.detail.Continent.split(/[/]+/).pop()}
                        </h2>
                      </Link>
                    )}
                  </Typography>
                  <hr />
                  {this.state.detail["22-rdf-syntax-ns#type"] && (
                    <Typography
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <b>Type</b>
                      <span>
                        {this.state.detail["22-rdf-syntax-ns#type"]
                          .split(/[/]+/)
                          .pop()}
                      </span>
                    </Typography>
                  )}
                  {this.state.detail["IATACode"] && (
                    <Typography
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <b>IATA Code</b>
                      <span>{this.state.detail["IATACode"]}</span>
                    </Typography>
                  )}
                  {this.state.detail["ICAOCode"] && (
                    <Typography
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <b>ICAO Code</b>
                      <span>{this.state.detail["ICAOCode"]}</span>
                    </Typography>
                  )}
                  {this.state.detail["CoordinateLat"] && (
                    <Typography
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <b>Latitude</b>
                      <span>{this.state.detail["CoordinateLat"]}</span>
                    </Typography>
                  )}
                  {this.state.detail["CoordinateLong"] && (
                    <Typography
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <b>Longitude</b>
                      <span>{this.state.detail["CoordinateLong"]}</span>
                    </Typography>
                  )}
                  {this.state.detail["ElevationHeight"] && (
                    <Typography
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <b>Elevation Height</b>
                      <span>{this.state.detail["ElevationHeight"]}</span>
                    </Typography>
                  )}
                  <Typography
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Link href={this.state.detail.P1659} target="_blank">
                      More information
                    </Link>
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
