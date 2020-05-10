import React, { Component } from 'react';
import {Table, Modal, ModalBody, ModalFooter, ModalHeader, Button} from 'reactstrap';
import {MDBBtn} from 'mdbreact';
import Axios from 'axios';
import { API_url } from '../supports/APIurl';
import { shallowEqual, connect } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {changetoRupiah} from '../supports/changetorupiah';
import {capitalfirst} from '../supports/sentencecase'
import { Redirect } from 'react-router-dom';
const MySwal = withReactContent(Swal)


class ManageAdmin extends Component{
    state = {
        products:[],
        filterproducts:[],
        // isModalOpen:false,
        // isModalEdit:false,
        // indexdelete:-1,
        // indexedit:-1,
        // category:[]
    }

    componentDidMount() {
        Axios.get(`${API_url}/transactions?_expand=user`)
        .then((res)=>{
            this.setState({
                products:res.data,
                filterproducts:res.data
            })
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    renderProduct=()=>{
        const {filterproducts} = this.state
        return filterproducts.map((val, index)=>{
                return (
                    <tr key={index}>
                        <td scope="row">{index+1}</td>
                        <td>{val.tr}</td>
                        <td>{val.date}</td>
                        <td>{val.user.username}</td>
                        <td>{val.method}</td>
                        <td>{val.cc}</td>
                        <td>{val.status}</td>
                            {
                                val.status==="pending"?
                                <td>
                                    <button className="btn edit rounded-pill" onClick={()=>this.approveConfirm(index,val.id)} style={{width:"128px"}}>Confirm</button>
                                    <button className="btn delete rounded-pill" onClick={()=>this.deleteConfirm(index,val.id)} style={{width:"120px"}}>Delete</button>
                                </td>
                                :
                                <td></td>
                            }
                    </tr>
                )
            // }
        })
    }

    toggleadd=()=> {
        this.setState({isModalOpen:!this.state.isModalOpen})
        console.log(this.state.products)
    }
    
    onStatusClick = (e) => {
        var stat = e.target.value
        var hasilFilter=this.state.products.filter((val)=>{
            if(stat==='all'){
                return this.state.products
            }else{
                return (
                    val.status.includes(stat)                
                )
            }
        })
        this.setState({filterproducts:hasilFilter}) 
        // console.log(stat)
    }

    // onSaveaddDataClick=()=>{
    //     var namaadd=this.refs.namaadd.value
    //     console.log(namaadd)
    //     var imageadd=this.refs.imageadd.value
    //     var stokadd=parseInt(this.refs.stokadd.value)
    //     var categoryadd=parseInt(this.refs.categoryadd.value)
    //     var hargadd=parseInt(this.refs.hargadd.value)
    //     var deskripsiadd=this.refs.deskripsiadd.value
    //     var obj={
    //         name:namaadd,
    //         image:imageadd,
    //         stok:stokadd,
    //         categoryId:categoryadd,
    //         harga:hargadd,
    //         deskripsi:deskripsiadd
    //     }        
    //     console.log(obj)
    //     Axios.post(`${API_url}/products`,obj)
    //     .then((res)=>{
    //         console.log(res.data)
    //         Axios.get(`${API_url}/products?_expand=category`)
    //         .then((resakhir)=>{
    //             this.setState({products:resakhir.data, isModalOpen:false})
    //         }).catch((errakhir)=>{
    //             console.log(errakhir)
    //         })
    //     }).catch((err)=>{
    //         console.log(err)
    //     })
    // }

    // rendercategoryadd = () => {
    //     return this.state.category.map((val, index) =>{
    //         return <option key={index} value={val.id}>{val.nama}</option>
    //     })
    // }

    // onUpdateDataClick=(id)=>{
    //     var nameedit=this.refs.editnama.value
    //     console.log(nameedit)
    //     var imagedit=this.refs.editimage.value
    //     var stokedit=parseInt(this.refs.editstok.value)
    //     var categoryedit=parseInt(this.refs.editcategory.value)
    //     var hargedit=parseInt(this.refs.editharga.value)
    //     var deskripsiedit=this.refs.editdeskripsi.value
    //     // var dataprducts=this.state.products        
    //     // console.log(obj)
    //     Axios.put(`${API_url}/products/${id}`, {name:nameedit, image:imagedit, stok:stokedit, categoryId:categoryedit, harga:hargedit, deskripsi:deskripsiedit, })
    //     .then((res)=>{
    //         console.log(res.data)
    //         Axios.get(`${API_url}/products?_expand=category`)
    //         .then((resakhir)=>{
    //             this.setState({products:resakhir.data, indexedit:-1})
    //         }).catch((errakhir)=>{
    //             console.log(errakhir)
    //         })
    //     }).catch((err)=>{
    //         console.log(err)
    //     })
    // }
    approveConfirm =(index, id) => {
        Swal.fire({
            title: `Are you sure wanna approve tansaction ${this.state.filterproducts[index].tr} ?`,
            text: "Make Sure the payment is valid!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Confirm!'
        }).then((resultswal)=>{
            if(resultswal.value) {
                Axios.patch(`${API_url}/transactions/${id}`,{
                    status:"confirmed"
                })
                .then((resdelete)=>{
                    Swal.fire(
                        'Approved!',
                        'The Transaction Has Been Approved.',
                        'success'
                    ).then((resultswal_2)=>{
                        if(resultswal_2.value) {
                            Axios.get(`${API_url}/transactions?_expand=user`)
                            .then((res_get)=>{
                                this.setState({
                                    products:res_get.data,
                                    filterproducts:res_get.data
                                })
                            })
                        }
                    })
                }).catch((errdelete)=>{
                    console.log(errdelete)
                })
            }
        })
    }

    deleteConfirm =(index, id) => {
        Swal.fire({
            title: `Are you sure wanna delete tansaction ${this.state.filterproducts[index].tr} ?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((resultswal)=>{
            if(resultswal.value) {
                Axios.delete(`${API_url}/transactions/${id}`)
                .then((resdelete)=>{
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    ).then((resultswal_2)=>{
                        if(resultswal_2.value) {
                            Axios.get(`${API_url}/transactions?_expand=user`)
                            .then((res_get)=>{
                                this.setState({
                                    products:res_get.data,
                                    filterproducts:res_get.data
                                })
                            })
                        }
                    })
                }).catch((errdelete)=>{
                    console.log(errdelete)
                })
            }
        })
    }

    // onBtnedit = (index) => {
    //     this.setState({indexedit:index})
    //     console.log(index)
    //   }
    
    // oncancelBtnedit = () => {
    //     this.setState({indexedit:-1})
    //   }

    render() {
        if(this.props.User.role==='admin'){
            return(
                <div style={{marginTop:"5%"}}>
                    {/* <Modal isOpen={this.state.isModalOpen} toggle={this.toggleadd}>
                        <ModalHeader toggle={this.toggleadd}>Modal title</ModalHeader>
                            <ModalBody>
                                <input type="text" ref="namaadd" placeholder='Product Name' className="form-control mt-2"></input>
                                <input type="text" ref="imageadd" placeholder='url image' className="form-control mt-2"></input>
                                <input type="number" ref="stokadd" placeholder='Jumlah Stok' className="form-control mt-2"></input>
                                {/* <input type="text" ref="namaadd" placeholder='Product Name' className="form-control mt-2"></input> */}
                                {/* <select ref="categoryadd" className='form-control mt-2'>
                                    <option value="" hidden>Pilih Kategori</option>
                                    {
                                        this.rendercategoryadd()
                                    } */}
                                    {/* <option value="1" >Kategori 1</option>
                                    <option value="2" >Kategori 2</option>
                                    <option value="3" >Kategori 3</option> */}
                                {/* </select> */}
                                {/* <input type="number" ref="hargadd" placeholder='Harga' className="form-control mt-2"></input> */}
                                {/* <input type="text" ref="namaadd" placeholder='Product Name' className="form-control mt-2"></input> */}
                                {/* <textarea cols="20" rows="5" ref="deskripsiadd" className="form-control mt-2"></textarea> */}
                            {/* </ModalBody>
                            <ModalFooter>
                                <Button className="rounded-pill" color="#81d4fa light-blue lighten-3" style={{color: 'white'}} onClick={this.onSaveaddDataClick}>Save</Button>{' '}
                                <Button className="rounded-pill" color="danger" onClick={this.toggleadd}>Cancel</Button>
                            </ModalFooter>
                    </Modal> */}
                                                                            
                      <MDBBtn className="rounded-pill mt-3" outline onClick={(e) => this.onStatusClick(e)} value='all'>All Transactions</MDBBtn >
                      <MDBBtn className="rounded-pill mt-3" outline onClick={(e) => this.onStatusClick(e)} value='confirmed'>Confirmed</MDBBtn >
                      <MDBBtn className="rounded-pill mt-3" outline onClick={(e) => this.onStatusClick(e)} value='pending'>In Progress</MDBBtn >
                    <Table striped className="mt-4">
                        <thead  align="center">
                            <tr>
                                <th style={{fontSize:20}}>No</th>
                                <th style={{fontSize:20}}>Transaction Id</th>
                                <th style={{fontSize:20}}>Dates</th>
                                <th style={{fontSize:20}}>Name</th>
                                <th style={{fontSize:20}}>Method</th>
                                <th style={{fontSize:20}}>CC Number</th>
                                <th style={{fontSize:20}}>Status</th>
                                <th style={{fontSize:20}}>Action</th>
                            </tr>
                        </thead>
                        <tbody align="center">
                            {
                                this.renderProduct()
                            }
                        </tbody>
                    </Table>
                </div>
            )
        }else{
           return <Redirect to="/notfound"/>
        }
        
    }
}
const MapstatetoProps=(state)=>{
    return{
        User:state.Auth
    }
}
export default connect(MapstatetoProps) (ManageAdmin)