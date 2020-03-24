const INITIAL_STATE={
    username:'',
    // id:0,
    loading:false,
    issignup:false,
    errormes:'',
    role:''
}


export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case "USER_SIGNUP_START":
            return {...state,loading:true}
        case "USER_SIGNUP_SUCCESS":
            return {...state,loading:false,issignup:true}
        case "USER_SIGNUP_FAILED":
            return{...state,loading:false,errormes:action.payload}
        case 'ErrorClear':
            return INITIAL_STATE
        default:
            return state
    }
}