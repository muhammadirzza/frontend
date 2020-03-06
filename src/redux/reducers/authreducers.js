import {USER_LOGIN_SUCCESS,USER_LOGIN_START,USER_LOGIN_FAILED} from './../actions/type';

const INTIAL_STATE={
    username:'',
    id:0,
    loading:false,
    islogin:false,
    errormes:''
}

export default (state=INTIAL_STATE, action) => {
    switch (action.type) {
        case USER_LOGIN_START :
            return{...state, loading:true}
        case USER_LOGIN_SUCCESS :
            return{...state, loading:false,...action.payload,islogin:true}
        case USER_LOGIN_FAILED :
            return{...state, loading:false,errormes:action.payload}
        case 'ErrorClear' :
            return INTIAL_STATE
        default :
            return state
    }
}
