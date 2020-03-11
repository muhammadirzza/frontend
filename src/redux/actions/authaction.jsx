import {USER_LOGIN_SUCCESS,USER_LOGIN_START,USER_LOGIN_FAILED} from './type';
import Axios from 'axios';
import {API_url} from '../../supports/APIurl';

export const LoginUser=({username, password}) => {
    return (dispatch) => {
        dispatch ({type:USER_LOGIN_START})
        if(username==='' || password===''){// kalau ada input yang kosong
            console.log('dispatch login')
            dispatch({type:USER_LOGIN_FAILED,payload: 'Lengkapi dulu datanya'})
        }else{
            // Axios.get('http://localhost:2000/users?username=${data.username}&password=${data.password}')
            Axios.get(`${API_url}/users`,{
                params:{
                    username:username,
                    password:password
                }
            }).then((res)=>{
                if(res.data.length){// kalau user ada
                    localStorage.setItem('iduser', res.data[0].id) //buat nyimpen data user yang masuk
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

export const KeepLogin=(data)=>{
    return {
        type:USER_LOGIN_SUCCESS,
        payload:data
    }
}