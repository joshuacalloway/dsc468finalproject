const calc_sum=function(covidjson,status){
let summary = {};
for (let i = 0; i < covidjson.length; i++) {
    let data_point = covidjson[i];
    if (data_point.Status === status) {
        if (data_point.Province in summary) {
            summary[data_point.Province] = summary[data_point.Province] + data_point['Cases']+1;
        } else {
            summary[data_point.Province] = data_point['Cases']+1;
            //console.log(data_point.Province.length);
        }
    }
}
return summary;
}
//export default calc_sum;

const computer_rate = function(states,confirmed,death,recover){
    let c_sum = calc_sum(confirmed, 'confirmed');
    let r_sum = calc_sum(recover, 'recovered');
    let d_sum = calc_sum(death, 'deaths');
    let result=[];
    for(let i=0;i<states.length;i++){
        let state=states[i];
        let temp={}
        temp['recover_rate']=(r_sum[state]/c_sum[state])*100;
        temp['death_rate']=(d_sum[state]/c_sum[state])*100;
        temp['confirmed_toll']=c_sum[state];
        temp['state']=state;
        result.push(temp);

    }
    return result;
    
}
export default computer_rate;
