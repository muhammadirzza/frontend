const INITIAL_STATE={
    // username:'',
    // id:0,
    loadingp:false,
    ischange:false,
    errormespass:'',
    // role:''
}


export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case "USER_FORGOT_START":
            return {...state,loadingp:true}
        case "USER_FORGOT_SUCCESS":
            return {...state,loadingp:false,ischange:true}
        case "USER_FORGOT_FAILED":
            return{...state,loadingp:false,errormespass:action.payload}
        case 'ErrorPassClear':
            return INITIAL_STATE
        default:
            return state
    }
}