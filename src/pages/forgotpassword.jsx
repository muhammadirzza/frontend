import React,{useState} from "react";
import {  MDBInput, MDBBtn,MDBAlert } from 'mdbreact';
import {connect} from 'react-redux'
import {ForgotUser,errormessageclear} from '../redux/actions'
import {Redirect} from 'react-router-dom' 
// import Axios from 'axios'
// import {API_URL} from './../supports/ApiUrl'
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

const Forgotpassword = (props)=>{
        const [data,setdata]=useState({
            username:'',
            password:'',
            newpassword:''
        })    
    
        const dataOnChange=(e)=>{
            setdata({...data,[e.target.name]:e.target.value})
            console.log(data)
        }

        const onFormSubmit=(e)=>{
            e.preventDefault()
            props.ForgotUser(data)
        }
    
        if(props.ischange){
            return <Redirect to='/login'/>      
        }
        
        return (
            <div className="paddingatas">
                <div className='d-flex justify-content-center align-items-center' style={{height:'90vh'}}>
                    <form style={{width:'30%'}} onSubmit={onFormSubmit}>
                        <p className="h3 text-center mb-4">Forgot Password</p>
                        <div className="grey-text">
                            <MDBInput 
                                label="Type your Username" 
                                name='username' 
                                onChange={dataOnChange} 
                                icon="user" 
                                group 
                                type="text" 
                                validate 
                                error='dsadas'
                                value={data.username}
                            />
                            <MDBInput value={data.password} label="Type your old password" name='password'  icon="lock" group type="password"  onChange={dataOnChange} validate />
                            <MDBInput value={data.newpassword} label="Confirm your new password" name='newpassword' icon="lock" group type="password"  onChange={dataOnChange} validate />
                        </div>
                        {
                            props.errormes?
                            <MDBAlert color="danger" >
                                {props.errormes} <span className='float-right hovererr font-weight-bold' onClick={()=>props.errormessageclear()}>X</span>
                            </MDBAlert>
                            :
                            null
                        }
                        <div className="text-center">
                            <MDBBtn type='submit' disabled={props.loading}>Change Password</MDBBtn>
                        </div>
                    </form>
                </div>                
            </div>
        );
}

const MapstatetoProps=(state)=>{
    return (
        state.Forgotpass,
        state.Auth
    )
}

export default connect(MapstatetoProps,{ForgotUser,errormessageclear}) (Forgotpassword);