import React, { Component } from "react";
import Select from "react-select";

import { fetchinfo } from "../actions/company_fetch";
import { connect } from "react-redux";

const options = [
  { value: "FB", label: "Facebook Inc." },
  { value: "MSFT", label: "Microsoft Corporation" },
  { value: "AAPL", label: "Apple Inc." },
  { value: "BAC", label: "Bank of America Corperation" },
  { value: "TTM", label: "Tata Motors Limited" }
];

class Searchcomp extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(fetchinfo("FB"));
    this.state = {
      selectedOption: { value: "FB", label: "Facebook Inc." }
    };
  }

  handleChange = selectedOption => {
    this.setState({
      selectedOption
    });
    this.props.dispatch(fetchinfo(selectedOption.value));
  };

  render() {
    const { selectedOption } = this.state;
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
              />
            </div>
          </div>
        </div>
        <br />
        <h1>{this.state.selectedOption.label}</h1>
        <br />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
const Searchcom = connect(mapStateToProps)(Searchcomp);

export default Searchcom;
