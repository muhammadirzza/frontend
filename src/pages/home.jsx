import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Axios from 'axios';
import {API_url} from './../supports/APIurl';
import Numeral from 'numeral';
import {capitalfirst} from './../supports/sentencecase';
import {IsHome,NotHome} from "./../redux/actions";
import { 
    MDBBtn, MDBCard, MDBCardBody, 
    MDBCardTitle, MDBCardText, 
    MDBCol, MDBView, 
    MDBCarousel,  MDBCarouselInner, 
    MDBCarouselItem, MDBMask 
    } from 'mdbreact';
//MDBCardImage, MDBRow, MDBIcon,  
import {CardSubtitle} from 'reactstrap';

class Home extends Component {
    state = {
        products:[],
        photos:[
            './images/arcade-buttons-computer-design-371924.jpg',
            './images/view-of-vintage-camera-325153.jpg'
        ]
    }

    componentDidMount=()=>{
        this.props.IsHome()
        Axios.get(`${API_url}/products?_expand=category&_limit=5`)
        .then((res)=>{
            this.setState({products:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    componentWillUnmount=()=>{
        this.props.NotHome()
    }
    
    renderPhoto=()=>{
        return this.state.photos.map((val,index)=>{
            return (
                <MDBCarouselItem key={index} itemId={index+1}>
                    <MDBView width="50vh">
                        <div style={{width:'100%',height:750,display:'flex',}}>
                            <img
                                // className=""
                                src={val}
                                alt="First slide"
                                // height='100%'
                                width='100%'
                                backgroundposition="center"
                                backgroundsize="cover"
                                backgroundrepeat="no-repeat"
                            />
                        </div>
                        <MDBMask overlay="black-slight" />
                    </MDBView>
                </MDBCarouselItem>
            )
        })
    }

    renderProduct=()=>{
        return(
            this.state.products.map((val, index)=>{
                return(
                    <MDBCol key={index}>
                        <MDBCard style={{ width: "100%", height:"100%" }} className="">
                            <div className="view overlay zoom" style={{ width: "100%", height:"60%" }}>
                                <Link to={`/productdetail/${val.id}`} >
                                    <img 
                                        className="rounded img-fluid "
                                        src={val.image} 
                                        alt={val.name}  
                                        style={{width:"100%", height:"100%", backgroundPosition:"center", overflow:"hidden"}}
                                    />
                                </Link>
                                {/* <MDBCardImage 
                                    className="img-fluid" 
                                    backgroundPosition="center"
                                    height="50px"
                                    src={val.image}
                                    alt={val.name}
                                    style={{width:"100%", height:"100%"}}
                                    hover
                                    overlay='white-slight'
                                    className='card-img-top'
                                    waves 
                                /> */}
                            </div>
                            <MDBCardBody>
                                <MDBCardTitle>
                                    <strong>{val.name}</strong>
                                </MDBCardTitle>
                                <MDBCardText>
                                    <CardSubtitle className='font-weight-bold'>{'Rp.'+Numeral(val.harga).format(0.0)}</CardSubtitle>
                                </MDBCardText>
                                <MDBBtn href="#" className="btn rounded-pill px-2 delete" style={{width:"90px"}}>
                                    {capitalfirst(val.category.nama)}
                                </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    
                )
            })
        )
    }

    render() {
        // if(this.props.islogin){
            return (
                <div>
                    <MDBCarousel
                        activeItem={1}
                        length={this.state.photos.length}
                        interval={1800}
                        showIndicators={true}
                        showControls={false}
                    >
                        <MDBCarouselInner>
                            {
                                this.renderPhoto()
                            }
                        </MDBCarouselInner>
                    </MDBCarousel>
                    <div style={{display:"flex", justifyContent:"space-evenly"}} className="px-5 py-5">
                        {/* <MDBRow md='4'> */}
                            {
                                this.renderProduct()
                            }
                        {/* </MDBRow> */}
                    </div>
                    <div style={{display:"flex", justifyContent:"space-evenly"}} className="px-5 py-5">
                        <Link to="/allproducts">
                            <button className="btn rounded-pill update">All Products</button>
                        </Link>
                    </div>
                </div>
            )
        // }
        // return(
        //     <Redirect to='/login' />
        // )
    }
}

const MapstatetoProps=({Auth})=>{
    return {
        islogin: Auth.islogin
    }
}

export default connect(MapstatetoProps,{IsHome,NotHome}) (Home)
