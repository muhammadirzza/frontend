import React, { useState } from 'react';
import { MDBInput, MDBAlert, MDBBtn } from 'mdbreact';
import './../App.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {LoginUser,errormessageclear} from './../redux/actions'

const Login = (props) => {
    
    const [data,setdata]=useState({
        username:'',
        password:''
    })
    
    const DataOnChange=(e) => {
        console.log(e.target)
        setdata({...data,[e.target.name]:e.target.value})
    }

    const onFormSubmit=(e)=>{
        e.preventDefault()
        console.log(data)
        props.LoginUser(data)
    }

    if(props.islogin){
        return <Redirect to='/' />
    }else{
        return (
            <div className='d-flex justify-content-center align-items-center' style={{height:'90vh'}}>
                <form style={{width:'30%'}} onSubmit={onFormSubmit}>
                    <p className="h5 text-center mb-4">Sign in</p>
                    <div className="grey-text">
                        <MDBInput
                            label="Type your Username"
                            name='username'
                            onChange={DataOnChange}
                            icon="user"
                            group type="text"
                            validate
                            value={data.username}
                        />
                        <MDBInput
                            label="Type your Password"
                            name='password'
                            onChange={DataOnChange}
                            icon="lock"
                            group type="password"
                            validate
                            value={data.password}
                        />
                        <div className="text-center">
                            {
                                props.errormes?
                                <MDBAlert color="danger">
                                    {props.errormes}<span className='float-right hoverer front-weight-bold' onClick={()=>props.errormessageclear()}>X</span>                                    
                                </MDBAlert>
                                :
                                null
                            }
                            <MDBBtn type='submit' disabled={props.loading}>Login</MDBBtn>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const MapstatetoProps=(state)=>{
    return state.Auth
}

export default connect (MapstatetoProps,{LoginUser,errormessageclear}) (Login)