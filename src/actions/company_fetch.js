export const COMPANY_FETCH = 'COMPANY_FETCH'

export function fetchinfo(selectedOption) {
    const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol='+selectedOption+'&interval=1min&apikey=34W739RI2MX2SYQT';
    return (dispatch) => {  
        return fetch(url, {
            method: 'GET'
        })
        .then(Response => Response.json())
        .then(json => {
            dispatch (loadinfo(json));
        })
        .catch(error => console.log(error))
    }
}

export function loadinfo(results) {
    return {
        type: 'COMPANY_FETCH',
        payload: results
    }
}