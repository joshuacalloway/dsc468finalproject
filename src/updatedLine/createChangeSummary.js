import stateHash from '../Data/states_hash.json';
const createChangeSummary = function (data,states,type) {
    let WAdates=[]
    for(let i=0;i<data.length;i++){
        if(data[i].state==='WA'){
            WAdates.push(data[i].date);
        }
    }

    //console.log('statehas is ',stateHash);
    let summary = {};
    for(let i=0;i<states.length;i++){
        let state=states[i];
        summary[state]={};
        for(let j=0;j<WAdates.length;j++){
            let d=WAdates[j];
            summary[state][d]=0;
        }
    }
    let previous={};
    for(let i=0;i<states.length;i++){
        let state=states[i];
        previous[state]=0;
    }

    for (let i = data.length-1; i >=0; i--) {

        let data_point = data[i];
        
        let state=stateHash[data_point['state']];
        if (states.includes(state)) {

            let date = data_point['date'];
            
            summary[state][date]=data_point[type]+previous[state];
            
            previous[state]=summary[state][date];
            

        }
    }
    let result=[];

    for(let i=0;i<states.length;i++){
        let state=states[i];
        let values=summary[state];
        let dates=Object.keys(values);
        let stateSum={}
        stateSum['state']=state;
        stateSum['values']=[];
        for(let i=0;i<dates.length;i++){
            let date=dates[i];
            
            let temp={}
            if(i===0){temp['value']=0;}
            else{
                let value=values[date];
                let prev_date=dates[i-1];
                let prev_value=values[prev_date];
                if(prev_value==0){temp['value']=0;}
                else{temp['value']=value-prev_value;}
                
            }
            temp['date']=date;
            
            stateSum['values'].push(temp)

        }
        result.push(stateSum);
    }
    
    return result;
}

export default createChangeSummary;

