import React,{useState} from 'react';
import {Keyword} from './../redux/actions';
import {connect} from 'react-redux';
import {MDBFormInline, MDBIcon} from 'mdbreact'
import { Redirect, Link } from 'react-router-dom';

const Search = (props) => {
    const [keyword,setkeyword]=useState("")
    const [redirectlog, setredirectlog]=useState(false)
    
    const DataOnChange=(e) => {
        console.log(e.target)
        setkeyword([e.target.name]=e.target.value)
        console.log(keyword)
    }

    const onFormSubmit=(e)=>{
        e.preventDefault()
        console.log(keyword)
        setredirectlog(true)
        sendData()
        // props.Keyword(data.keyword)
    }
    const sendData = () => {
        props.parentCallback(keyword);
   }

    // if(redirectlog){
    //     return <Link to={`/search/${props.data.keyword}`}/>      
    // }
    return (
        <MDBFormInline waves>
            <div className="md-form my-0" onSubmit={onFormSubmit}>
            
                <MDBIcon icon="search" className="ml-5 warnaicon" style={{color:"white !important"}}/>
                <input className="form-control" type="text" placeholder="Search" aria-label="Search" name="keyword" onChange={DataOnChange}/>
            
            </div>
        </MDBFormInline>
    )
}

const MapstatetoProps=(state)=>{
    return state.Header
}

export default connect (null,{Keyword}) (Search)
