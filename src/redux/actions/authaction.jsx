import {USER_LOGIN_SUCCESS,USER_LOGIN_START,USER_LOGIN_FAILED} from './type';
import Axios from 'axios';

export const LoginUser=({username, password}) => {
    return (dispatch) => {
        dispatch ({type:USER_LOGIN_START})
        if(username==='' || password===''){
            console.log('dispatch login')
            dispatch({type:USER_LOGIN_FAILED,payload: 'Lengkapi dulu datanya'})
        }else{
            // Axios.get('http://localhost:2000/users?username=${data.username}&password=${data.password}')
            Axios.get('http://localhost:2000/users',{
                params:{
                    username:username,
                    password:password
                }
            })
            .then((res)=>{
                if(res.data.length){
                    dispatch({type:USER_LOGIN_SUCCESS, payload:res.data[0]})
                }else{
                    dispatch({type:USER_LOGIN_FAILED, payload:'username atau password tidak terdaftar'})
                }
            }).catch((err)=>{
                console.log(err)
                dispatch({type:USER_LOGIN_FAILED, payload:err.message})
            })
        }
    }
}

export const errormessageclear=()=>{
    return {
        type:'ErrorClear'
    }
}