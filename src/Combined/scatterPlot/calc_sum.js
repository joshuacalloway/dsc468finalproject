import stateHash from '../../data/states_hash.json';
const calc_sum=function(covidjson,status){
    let summary = {};
    for (let i = 0; i < covidjson.length; i++) {
        let data_point = covidjson[i];
        let state =stateHash[data_point.state]
        if (state in summary) {
            summary[state] = summary[state] + data_point[status];
        } else {
            summary[state] = data_point[status];
            //console.log(data_point.Province.length);
        }
        
    }
    return summary;
    }
export default calc_sum;