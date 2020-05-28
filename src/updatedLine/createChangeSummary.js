const createChangeSummary = function (data,states,type) {
    let summary = {};
    for(let i=0;i<states.length;i++){
        let state=states[i];
        summary[state]={};
    }

    for (let i = 0; i < data.length; i++) {

        let data_point = data[i];
        let status=data_point['Status']
        let state=data_point['Province']
        if (status== type && states.includes(state)) {

            let date = data_point['Date'];
            date = date.substring(0, 10);
            if(date in summary[state]){
                summary[state][date]+=data_point['Cases']+1;
            } else {
                summary[state][date]=data_point['Cases']+1;
            }

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
                temp['value']=(value-prev_value)/prev_value;
            }
            temp['date']=date;
            
            stateSum['values'].push(temp)

        }
        result.push(stateSum);
    }
    
    return result;
}

export default createChangeSummary;

