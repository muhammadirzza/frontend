import Axios from 'axios'
// import { USER_SIGNUP_START, USER_SIGNUP_FAILED, USER_SIGNUP_SUCCESS } from './type'
import { API_url } from '../../supports/APIurl'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal)


export const SignupUser=({username,password,confirmpassword})=>{
    return (dispatch)=>{
        dispatch({type:"USER_SIGNUP_START"})
        if(username==='' || password==='' || confirmpassword===''){//kalo ada input yang kosong
            dispatch({type:"USER_SIGNUP_FAILED",payload:'lengkapi datanya'})
            console.log('isi kosong')
        }else{
            Axios.get(`${API_url}/users/?username=${username}`)
            .then((res)=>{
                if(res.data.length){//user ada
                    // localStorage.setItem('iduser',res.data[0].id)
                    dispatch({type:"USER_SIGNUP_FAILED",payload:'username sudah dipakai'})
                }else{
                    console.log(confirmpassword)
                    if(password===confirmpassword){
                        Axios.post(`${API_url}/users`,{
                                username:username,
                                password:password,
                                role:"user"
                        }).then((res2)=>{
                            console.log(res2)
                            Swal.fire(
                                'Register Berhasil!',
                                'Silahkan Login Ulang Untuk Masuk!',
                                'success'
                              ).then((result)=>{                                //saat di click ok baru jalanin user signup sucess
                                  if(result.value){
                                      dispatch({type:"USER_SIGNUP_SUCCESS"})
                                  }
                              })
                        }).catch((err)=>{
                            console.log(err)
                        })
                    }else{
                        dispatch({type:"USER_SIGNUP_FAILED",payload:'password harus sesuai'})
                    }
                }
            }).catch((err)=>{
                console.log(err)
                dispatch({type:"USER_SIGNUP_FAILED",payload:err.message})
            })
        }
    }
}

export const errormessageclear=()=>{
    return{
        type:'ErrorClear'
    }
}