import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Loading from './../components/loading';
import {API_url} from './../supports/APIurl';
import {capitalfirst} from './../supports/sentencecase';
import {changetoRupiah} from './../supports/changetorupiah';
import {CardSubtitle} from 'reactstrap';
import {Link} from 'react-router-dom';


import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBView, MDBIcon, MDBCarousel,  MDBCarouselInner, MDBCarouselItem, MDBMask } from 'mdbreact';


const SearchPage=(props)=>{
    console.log(props)
    console.log(props.match.params.keyword)

    const [products, setproducts]=useState({})
    const [loading, setloading]=useState(true)

    useEffect(()=>{
        // var tes={
        //     name:`${props.match.params.keyword}`
        // }
        // console.log(props.User.id)
        Axios.get(`${API_url}/products?_expand=category&name_like=${props.match.params.keyword}`)
        .then((res)=>{
            console.log(res.data)
            setproducts(res.data)
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            setloading(false)
          })
    },[props.match.params.keyword])



const renderProduct=()=>{
        return(
            products.map((val, index)=>{
                return(
                    <MDBCol key={index} style={{display:"flex", justifyContent:"center", alignItems:"center", height:"450px"}}>
                        <MDBCard style={{ width: "350px", height:"100%" }} className="">
                            <div className="view overlay zoom" style={{ width: "100%", height:"60%" }}>
                                <Link to={`/productdetail/${val.id}`} >
                                    <img 
                                        className="rounded img-fluid "
                                        src={val.image} 
                                        alt={val.name}  
                                        style={{width:"100%", height:"90%", backgroundPosition:"center", overflow:"hidden"}}
                                    />
                                </Link>
                            </div>
                            <MDBCardBody>
                                <MDBCardTitle>
                                    <strong>{val.name}</strong>
                                </MDBCardTitle>
                                <MDBCardText>
                                    <CardSubtitle className='font-weight-bold'>{changetoRupiah(val.harga)}</CardSubtitle>
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

    if(loading){
        return (
            <div className="mt-5" style={{display:"flex", height:"50vh", justifyContent:"center", alignItems:"center"}}>
                <Loading/>
            </div>
        )
    }

    return (
        <div style={{display:"flex", justifyContent:"space-evenly"}} className="mt-5 py-5 px-5">
            <div>
                
            </div>
            {/* <MDBRow md='4'> */}
                {
                    renderProduct()
                }
            {/* </MDBRow> */}
        </div>
        // <div className="mt-4">
        //     <h1>
        //         Ini Search
        //     </h1>
        // </div>
    )
}


export default SearchPage