const INITIAL_STATE={
    username:'',
    // id:0,
    loading:false,
    ischange:false,
    errormes:'',
    role:''
}


export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case "USER_FORGOT_START":
            return {...state,loading:true}
        case "USER_FORGOT_SUCCESS":
            return {...state,loading:false,ischange:true}
        case "USER_FORGOT_FAILED":
            return{...state,loading:false,errormes:action.payload}
        case 'ErrorClear':
            return INITIAL_STATE
        default:
            return state
    }
}