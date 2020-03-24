import Axios from 'axios'
import { API_url } from '../../supports/APIurl'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal)


export const ForgotUser=({username,password,newpassword})=>{
    return (dispatch)=>{
        dispatch({type:"USER_FORGOT_START"})
        if(username==='' || password==='' || newpassword===''){//kalo ada input yang kosong
            dispatch({type:"USER_FORGOT_FAILED",payload:'lengkapi datanya'})
            console.log('isi kosong')
        }else{
            Axios.get(`${API_url}/users`,{
                params:{
                    username:username,
                    password:password
                }
            })
            .then((res)=>{
                if(res.data.length){
                    Axios.patch(`${API_url}/users/${res.data[0].id}`,{password:newpassword})
                    .then((res2)=>{
                        console.log(res2)
                        MySwal.fire(
                            'Password Berhasil Diganti!',
                            'Silahkan Login Ulang Untuk Masuk!',
                            'success'
                          ).then((result)=>{                                //saat di click ok baru jalanin user forgot sucess
                              if(result.value){
                                  dispatch({type:"USER_FORGOT_SUCCESS"})
                              }
                          })
                    }).catch((err2)=>{
                        console.log(err2)
                    })
                    
                }else{
                    console.log('data tidak ditemukan')
                    dispatch({type:"USER_FORGOT_FAILED",payload:'data user tidak ditemukan'})

                }
            }).catch((err)=>{
                console.log(err)
                dispatch({type:"USER_FORGOT_FAILED",payload:err.message})
            })
        }
    }
}

export const errormessageclear=()=>{
    return{
        type:'ErrorClear'
    }
}