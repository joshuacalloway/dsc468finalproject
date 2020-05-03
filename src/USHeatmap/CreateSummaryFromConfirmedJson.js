

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

    // let states = Object.keys(summary);
    // let values = Object.values(summary);
    
    return summary;


}

export default createSummaryFromConfirmedJson;

