const INITIAL_STATE={
    ishome:false,
    keyword:''
}

export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'BUKANHOME': 
            return {...state,ishome:false}
        case 'HOME':
            return {...state,ishome:true}
        case 'INPUTKEY':
            return {...state,keyword:action.payload}
        default:
            return state
    }
}