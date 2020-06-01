import stateHash from '../Data/states_hash.json';
import calc_sum from'./calc_sum';
//export default calc_sum;

const computer_rate = function(states,data){
    let c_sum = calc_sum(data, "positiveIncrease");
    let r_sum = calc_sum(data, "hospitalizedIncrease");
    let d_sum = calc_sum(data, "deathIncrease");
    //console.log('d_sum is ',d_sum)
    let result=[];
    for(let i=0;i<states.length;i++){
        let state=states[i];
        let temp={}
        temp['hospital_rate']=(r_sum[state]/c_sum[state]);
        temp['death_rate']=(d_sum[state]/c_sum[state]);
        temp['confirmed_toll']=c_sum[state];
        temp['state']=state;
        result.push(temp);

    }
    return result;
    
}
export default computer_rate;
