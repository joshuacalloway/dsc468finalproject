import * as d3 from 'd3'

import axios from 'axios'
import noop from 'lodash/noop'

const CURRENT = 'https://covidtracking.com/api/v1/states/current.json'

const fetchCurrentCovid19 = (setError=noop, setResult=noop, setLoading=noop) => {
    setLoading(true)
    axios.get(CURRENT)
        .then(({data, status}) => {
            console.log('in axios, then, data is ', data)
            setResult(data)
            setLoading(false)
        })
        .catch(error => {
            setError(true)
            setLoading(false)
        })
   
    return { };
}

export default fetchCurrentCovid19;

