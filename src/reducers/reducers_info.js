import { COMPANY_FETCH } from "../actions/company_fetch";

const info = (state = [], action) => {
  switch (action.type) {
    case COMPANY_FETCH:
      const arr = action.payload
      const b = []
      for (let key in arr["Time Series (1min)"]) {    
          b.push({
              Date: key,
              Value: arr["Time Series (1min)"][key]['1. open']
          });
      }
      return b;      
    default:
      return state;
  }
};

export default info;
