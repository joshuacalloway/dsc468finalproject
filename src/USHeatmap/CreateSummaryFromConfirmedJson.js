import * as d3 from 'd3'


const createSummaryFromConfirmedJson = (confirmedJson) => {
    // // get a summary of the number of cases of each state
    let summary = {};
    for (let i = 0; i < confirmedJson.length; i++) {
        let data_point = confirmedJson[i];
        if (data_point.Status == "confirmed") {
            if (data_point.Province in summary) {
                summary[data_point.Province] = summary[data_point.Province] + data_point['Cases'] + 1;
            } else {
                summary[data_point.Province] = data_point['Cases'] + 1;
                //console.log(data_point.Province.length);
            }
        }
    }
    delete summary[""];

    let values = Object.values(summary);
    console.log(summary);

    // create a color pallette to set the range of high low cases
    let lowColor = '#f9f9f9';
    let highColor = '#bc2a66';

    let minVal = d3.min(values);
    let maxVal = d3.max(values);
    let colorFunction = d3.scaleLinear().domain([minVal, maxVal]).range([lowColor, highColor])

    return { summary, colorFunction };
}

export default createSummaryFromConfirmedJson;

