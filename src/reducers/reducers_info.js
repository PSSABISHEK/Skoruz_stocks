import { COMPANY_FETCH } from "../actions/company_fetch";

const info = (state = [], action) => {
  switch (action.type) {
    case COMPANY_FETCH:
      const arr = action.payload;
      const b = [];
      for (let key in arr["Time Series (1min)"]) {
        b.push({
          time: key.slice(11, 16).replace(":", "."),
          value: arr["Time Series (1min)"][key]["1. open"]
        });
      }
      return b;
    default:
      return state;
  }
};

export default info;
