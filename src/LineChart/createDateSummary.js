import * as d3 from 'd3'
const createDateSummary = function (data, type) {
    let summary = {};
    for (let i = 0; i < data.length; i++) {

        let data_point = data[i];
        if (data_point['Status'] == type) {

            let date = data_point['Date'];
            date = date.substring(0, 10);
            if(date in summary){
                summary[date]+=data_point['Cases'];
            } else {
                summary[date]=data_point['Cases'];
            }

        }



    }
    return summary;
}

export default createDateSummary;
