import React, { Component } from "react";
import AsyncSelect from "react-select/async";
import FlightIcon from "@material-ui/icons/Flight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import LinearProgress from "@material-ui/core/LinearProgress";

import axios from "axios";
import debounce from "lodash.debounce";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      selectedAirport: null,
      loading: false,
      detail: null
    };
  }

  handleChange = selectedAirport => {
    this.setState({ loading: true }, () =>
      axios.get(selectedAirport.value).then(response => {
        const detail = response.data.results.bindings.reduce((map, obj) => {
          const key = obj.pLabel && obj.pLabel.value;
          if (!key) return map;
          if (obj.o.type == "uri") {
            map[key] = {
              uri: obj.o.value,
              desc: obj.oDesc && obj.oDesc.value,
              label: obj.oLabel && obj.oLabel.value
            };
          } else {
            map[key] = obj.o.value;
          }
          return map;
        }, {});
        this.setState({ detail, loading: false });
      })
    );
    this.setState({ selectedAirport });
  };

  handleInputChange = inputValue => {
    this.setState({ inputValue });
    return inputValue;
  };

  loadOptions = debounce((inputValue, callback) => {
    axios
      .get("http://semantic.yeay.xyz/resources/?q=" + inputValue)
      .then(response => {
        const airports = response.data.results.bindings.map(x => {
          const value =
            "http://semantic.yeay.xyz/resources/" +
            x.s.value.split(/[/]+/).pop();
          const label = x.sLabel.value;
          return {
            value,
            label
          };
        });
        callback(airports);
      });
  }, 500);

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {!this.state.detail && (
            <div className={"Search-Container"}>
              <FlightIcon style={{ fontSize: 300, color: "white" }} />
              <div
                style={{
                  width: "50vw",
                  color: "#282c34",
                  position: "relative"
                }}
              >
                <AsyncSelect
                  autoFocus
                  cacheOptions
                  placeholder={"Enter airport name"}
                  disabled={this.state.loading}
                  onChange={this.handleChange}
                  loadOptions={this.loadOptions}
                  onInputChange={this.handleInputChange}
                />
                {this.state.loading && (
                  <LinearProgress
                    style={{
                      marginTop: "16px",
                      float: "left",
                      position: "absolute",
                      width: "100%"
                    }}
                  />
                )}
              </div>
            </div>
          )}
          {!this.state.loading && this.state.selectedAirport && (
            <div className="Detail-Container">
              <img
                src={this.state.detail.Image.uri}
                alt={this.state.selectedAirport.label}
                className={"Cover-Image"}
              />
              <div className={"Detail-Content"}>
                <Link
                  className={"Back-Button"}
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ detail: null, selectedAirport: null });
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
                  <h1 style={{ textAlign: "center" }}>
                    {this.state.selectedAirport.label}
                  </h1>
                  <Typography
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      maxWidth: "50vw",
                      flexWrap: "wrap"
                    }}
                    component="div"
                  >
                    {this.state.detail.Muncipality && (
                      <Tooltip
                        interactive
                        title={this.state.detail.Muncipality.desc}
                      >
                        <Link
                          style={{ cursor: "pointer" }}
                          href={this.state.detail.Muncipality.uri}
                          target="_blank"
                          component="h2"
                          gutterBottom
                        >
                          {this.state.detail.Muncipality.label}
                        </Link>
                      </Tooltip>
                    )}
                    {this.state.detail.Country && (
                      <Tooltip
                        interactive
                        title={this.state.detail.Country.desc}
                      >
                        <Link
                          style={{ cursor: "pointer" }}
                          href={this.state.detail.Country.uri}
                          target="_blank"
                          component="h2"
                          gutterBottom
                        >
                          {this.state.detail.Country.label}
                        </Link>
                      </Tooltip>
                    )}
                    {this.state.detail.Continent && (
                      <Tooltip
                        interactive
                        title={this.state.detail.Continent.desc}
                      >
                        <Link
                          style={{ cursor: "pointer" }}
                          href={this.state.detail.Continent.uri}
                          target="_blank"
                          component="h2"
                          gutterBottom
                        >
                          {this.state.detail.Continent.label}
                        </Link>
                      </Tooltip>
                    )}
                  </Typography>
                  <hr />
                  {this.state.detail["IATA Code"] && (
                    <Typography
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <b>IATA Code</b>
                      <span>{this.state.detail["IATA Code"]}</span>
                    </Typography>
                  )}
                  {this.state.detail["ICAO Code"] && (
                    <Typography
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <b>ICAO Code</b>
                      <span>{this.state.detail["ICAO Code"]}</span>
                    </Typography>
                  )}
                  {this.state.detail["Latitude"] && (
                    <Typography
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <b>Latitude</b>
                      <span>{this.state.detail["Latitude"]}</span>
                    </Typography>
                  )}
                  {this.state.detail["Longitude"] && (
                    <Typography
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <b>Longitude</b>
                      <span>{this.state.detail["Longitude"]}</span>
                    </Typography>
                  )}
                  {this.state.detail["Elevation Height"] && (
                    <Typography
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <b>Elevation Height</b>
                      <span>{this.state.detail["Elevation Height"]}</span>
                    </Typography>
                  )}
                  <Typography
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Link
                      href={this.state.detail["Wikidata Entry"].uri}
                      target="_blank"
                    >
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
