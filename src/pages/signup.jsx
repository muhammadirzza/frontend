import React,{Component, useState} from "react";
import {  MDBInput, MDBBtn,MDBAlert } from 'mdbreact';
import {connect} from 'react-redux'
import {SignupUser,errormessageclear} from './../redux/actions'
import {Redirect} from 'react-router-dom' 
import Axios from 'axios'
import {API_url} from '../supports/APIurl'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Signup = (props)=>{
    // class Signup extends Component{
        const [data,setdata]=useState({
            username:'',
            password:'',
            confirmpassword:''
        })    
    

        const dataOnChange=(e)=>{
            setdata({...data,[e.target.name]:e.target.value})
            console.log(data)
        }
        const onFormSubmit=(e)=>{
            e.preventDefault()
            props.SignupUser(data)
        }

        if(props.issignup){
            return <Redirect to='/login'/>      
        }
        
        // render() {
            return (
                <div className="paddingatas">
                    <div className='d-flex justify-content-center align-items-center' style={{height:'90vh'}}>
                        <form style={{width:'30%'}} onSubmit={onFormSubmit}>
                            <p className="h3 text-center mb-4">Sign Up</p>
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
                                <MDBInput value={data.password} label="Type your password" name='password'  icon="lock" group type="password"  onChange={dataOnChange} validate />
                                <MDBInput value={data.confirmpassword} label="Confirm your password" name='confirmpassword' icon="lock" group type="password"  onChange={dataOnChange} validate />
                                {/* <MDBInput value={data.password2} label="Confirm your password" name='confirmpassword'  icon="lock" group type="password"  onChange={dataOnChange} validate/> */}
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
                                <MDBBtn type='submit' disabled={props.loading}>Sign Up</MDBBtn>
                            </div>
                        </form>
                    </div>
                    {/* <input type="text" ref='username' placeholder='username' className='form-control mt-2 ' onChange={this.getdata}/>
                    <input type="password" ref='password' placeholder='password' className='form-control mt-2'/>
                    <input type="password" ref='confirmpassword' placeholder='confirmpassword' className='form-control mt-2'/>
                    <button onClick={this.onclicksubmit}>Submit</button> */}
                
                </div>
            );
    
        // }
    // }
    
}

const MapstatetoProps=(state)=>{
    return state.Sign
}

export default connect(MapstatetoProps,{SignupUser,errormessageclear}) (Signup);


