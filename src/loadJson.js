
import * as d3 from 'd3'

export const loadJson = () => {
    console.log("loadJson entry");
    const jsonUrl = 'http://dummy.restapiexample.com/api/v1/employees'
    d3.json('/users.json',  function(data) {
      console.log("loaded json from")
      console.log(data)
    })
}