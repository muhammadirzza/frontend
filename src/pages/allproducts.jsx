import React, { Component } from 'react'
import Axios from 'axios';
import {API_url} from './../supports/APIurl';
import Numeral from 'numeral';
// // import ProductItem from "./ProductItem"
import {connect} from 'react-redux';
import {capitalfirst} from './../supports/sentencecase';
import { 
    MDBBtn, MDBCard, MDBCardBody,  
    MDBCardTitle, MDBCardText, MDBCol 
} from 'mdbreact';
//MDBView, MDBIcon, MDBCarousel, MDBRow, MDBCardImage, MDBCarouselInner, MDBCarouselItem, MDBMask 
import {CardSubtitle} from 'reactstrap';
import {Link} from 'react-router-dom'
// import NotLogin from './NotLogin'


class Allproducts extends Component{

    state={
        products:[],
        searchProducts:[],
        sortNama:0,
        sortPrice:0,
        category:"All Category"

    }

    componentDidMount() {
        Axios.get(`${API_url}/products?_expand=category`)
        .then((res)=>{
            this.setState(
                {
                    products:res.data,
                    searchProducts:res.data

                }
            )
        }).catch(()=>{

        })
    }

    ongunplaClick=()=>{
        Axios.get(`${API_url}/products?categoryId=3&_expand=category`)
        .then((res1)=>{
            this.setState({searchProducts:res1.data})
            this.setState({category:"Gunpla"})
        }).catch((err)=>{
            
        })
    }
    
    oncasetClick=()=>{
        Axios.get(`${API_url}/products?categoryId=2&_expand=category`)
        .then((res1)=>{
            this.setState({searchProducts:res1.data})
            this.setState({category:"Video_game"})
        }).catch((err)=>{
            
        })
    }

    onConsoleClick=()=>{
        Axios.get(`${API_url}/products?categoryId=1&_expand=category`)
        .then((res1)=>{
            this.setState({searchProducts:res1.data})
            this.setState({category:"Console"})
        }).catch((err)=>{
            
        })
    }
    // Search and Filter
    onSearchClick=()=>{
        let inputName=this.name.value
        // let inputCat=this.name.value
        let inputMin=parseInt(this.min.value)
        let inputMax=parseInt(this.max.value)
        
        
        let hasilFilter=this.state.products.filter((product)=>{
            
            return (
                // akan mereturn true atau false 
                product.name.toLowerCase().includes(inputName.toLowerCase())
                
            )
        })
        let hasilFilterPrice=hasilFilter.filter((product)=>{
            
                if (!inputMax && !inputMin){
                    return hasilFilter
                } if (inputMax && inputMin) {
                    return (product.harga>=inputMin && product.harga<=inputMax)
                } if (inputMax && !inputMin){
                    return (product.harga<=inputMax)
                } if (!inputMax && inputMin){
                    return (product.harga>=inputMin)
                }
        })

        this.setState({searchProducts:hasilFilterPrice})
    }

    onResetClick=()=>{
        this.name.value=''
        this.min.value=''
        this.max.value=''
        this.setState({category:"All Category"})
        this.setState((prevState)=>{
            return{
                searchProducts: prevState.products
            }
        })
    }

    urut=(a,b)=>{
        return a.harga-b.harga
    }
    urutDes=(a,b)=>{
        return b.harga-a.harga
    }
      
    urutHuruf=(a,b)=>{
        
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
    }   
    urutHurufDes=(a,b)=>{
        
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA > nameB) {
            return -1;
        }
        if (nameA < nameB) {
            return 1;
        }
    }   

    onSortName=()=>{
        if (!this.state.sortNama){
            var hasilFilter=this.state.searchProducts.sort(this.urutHuruf)
            this.setState({searchProducts:hasilFilter})
            this.setState({sortNama:1})
        } if (this.state.sortNama){
            var hasilFilter=this.state.searchProducts.sort(this.urutHurufDes)
            this.setState({searchProducts:hasilFilter})
            this.setState({sortNama:0})
        }
    }
    onSortPrice=()=>{
        if (!this.state.sortPrice){
            var hasilFilter=this.state.searchProducts.sort(this.urut)
            this.setState({searchProducts:hasilFilter})
            this.setState({sortPrice:1})
        } if (this.state.sortPrice){
            var hasilFilter=this.state.searchProducts.sort(this.urutDes)
            this.setState({searchProducts:hasilFilter})
            this.setState({sortPrice:0})
        }
    }

    // membuat list, akan menggunakan map
    renderList=()=>{
        // products adalah array of object [{}, {}, {},..]
        // product adalah {id, name, desc, price, pic}
        return this.state.searchProducts.map((val,index)=>{
            return(
                <MDBCol key={index} className="pt-3">
                        <MDBCard style={{ width: "183px", height:"350px" }} className="">
                            <div className="view overlay zoom" style={{ width: "100%", height:"150px"}}>
                                <Link to={`/productdetail/${val.id}`} >
                                    <img 
                                        className="rounded img-fluid "
                                        src={val.image} 
                                        alt={val.name}  
                                        style={{width:"100%", height:"100%", backgroundPosition:"center", overflow:"hidden"}}
                                    />
                                </Link>
                            </div>
                            <MDBCardBody>
                                <MDBCardTitle>
                                    <strong>{val.name}</strong>
                                </MDBCardTitle>
                                <MDBCardText>
                                    <CardSubtitle className='font-weight-bold'>{'Rp.'+Numeral(val.harga).format(0.0)}</CardSubtitle>
                                </MDBCardText>
                                <MDBBtn href="#" className="btn rounded-pill px-2 delete" style={{width:"90px", height:"30px", fontSize:"10px", padding:8}}>
                                    {capitalfirst(val.category.nama)}
                                </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
            )
            
        })  
    }
    
    render() {
        
        // if (!this.props.username){
            return (
                <div>
                    <div className="container paddingatas">
                        <div className="row">
                        {/* div untuk search  */}
                            <div className="col-3">
                                <div className="card mt-5 p-3 shadow-sm mr-2">
                                    <div className="card-title border-bottom border-dark">
                                        <h3 className="d-inline">Search</h3>
                                        <div>Category : {this.state.category}</div>
                                    </div>
                                    <form className="form-group mb-0 mx-2">
                                        <h5>Name :</h5>
                                        <input 
                                            onChange={this.onSearchClick} 
                                            ref={(input)=>{this.name=input}} 
                                            className="form-control my-3 btn-light" 
                                            placeholder="product" 
                                            type="text" 
                                            name="" 
                                            id=""
                                        />
        
                                        <h5>Price :</h5>
                                        <input 
                                            onChange={this.onSearchClick} 
                                            ref={(input)=>{this.min=input}} 
                                            className="form-control btn-light" 
                                            placeholder="minimum" 
                                            type="text" 
                                            name="" 
                                            id=""
                                        />
                                        <input 
                                            onChange={this.onSearchClick} 
                                            ref={(input)=>{this.max=input}} 
                                            className="form-control my-3 btn-light" 
                                            placeholder="maximum" 
                                            type="text" 
                                            name="" 
                                            id=""
                                        />
                                    </form>
                                    <div className="">
                                        <MDBBtn className="rounded-pill " onClick={this.ongunplaClick}>Gunpla</MDBBtn>
                                        <MDBBtn className="rounded-pill " onClick={this.oncasetClick}>Video-Game</MDBBtn>
                                        <MDBBtn className="rounded-pill " onClick={this.onConsoleClick}>Console</MDBBtn>
                                    </div>
                                    <div className="d-inline-block align-bottom text-right">
                                        <button onClick={this.onResetClick} className="btn btn-block btn-sm btn-secondary">Refresh</button>
                                    </div>
                                </div>
                                <div className="card mt-2 p-3 shadow-sm mr-2">
                                    <div className="card-title border-bottom border-dark">
                                        <h3 className="d-inline">Sort by</h3>
                                    </div>
                                    <div className="mx-2">
                                        <button onClick={this.onSortName} className="btn btn-sm btn-block btn-warning">Product Name</button>
                                        <button onClick={this.onSortPrice} className="btn btn-sm btn-block btn-warning">Product Price</button>
                                    </div>
                                </div>
                            </div>
        
                        {/* div untuk list */}
                            <div className="col-9 row mt-5 p-0" style={{height:"30px"}}>
                                <div className="col-12 display-4 text-center mb-2 shadow-sm p-2 ">Our Product List</div>
                                    {
                                        this.renderList()
                                    }
                            </div>
                            <div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            )
        // } else{
        //     return(
        //         <div className="container paddingatas">
        //                 <div className="row">
        //                 {/* div untuk search  */}
        //                     <div className="col-3">
        //                         <div className="card mt-5 p-3 shadow-sm mr-2">
        //                             <div className="card-title border-bottom border-dark">
        //                                 <h3 className="d-inline">Search</h3>
        //                             </div>
        //                             <form className="form-group mb-0 mx-2">
        //                                 <h5>Name :</h5>
        //                                 <input onChange={this.onSearchClick} 
        //                                 ref={(input)=>{this.name=input}} 
        //                                 className="form-control my-3 btn-light" placeholder="product" type="text" name="" id=""/>
        
        //                                 <h5>Price :</h5>
        //                                 <input onChange={this.onSearchClick} 
        //                                 ref={(input)=>{this.min=input}} 
        //                                 className="form-control btn-light" placeholder="minimum" type="text" name="" id=""/>
        //                                 <input onChange={this.onSearchClick} 
        //                                 ref={(input)=>{this.max=input}} 
        //                                 className="form-control my-3 btn-light" placeholder="maximum" type="text" name="" id=""/>
        //                             </form>
        //                             <div className="d-inline-block align-bottom text-right">
        //                                 <button onClick={this.onResetClick} className="btn btn-block btn-sm btn-secondary">Refresh</button>
        //                             </div>
        //                         </div>
        //                         <div className="card mt-2 p-3 shadow-sm mr-2">
        //                             <div className="card-title border-bottom border-dark">
        //                                 <h3 className="d-inline">Sort by</h3>
        //                             </div>
        //                             <div className="mx-2">
        //                                 <button onClick={this.onSortName} className="btn btn-sm btn-block btn-warning">Product Name</button>
        //                                 <button onClick={this.onSortPrice} className="btn btn-sm btn-block btn-warning">Product Price</button>
        //                             </div>
        //                         </div>
        //                     </div>
        
        //                 {/* div untuk list */}
        //                     <div className="col-9 row mt-5 p-0" style={{height:"30px"}}>
        //                         <div className="col-12 display-4 text-center mb-2 shadow-sm p-2 card ">Our Product List</div>
        //                             {this.renderList()}
        //                     </div>
        //                 </div>
        //             </div>
        //     )
        // }
    }
}

const mapStateToProps=state=>{
    return {
      User: state.Auth
    }
  }

export default connect(mapStateToProps)(Allproducts)