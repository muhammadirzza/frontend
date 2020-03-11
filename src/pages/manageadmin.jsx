import React, { Component } from 'react';
import {Table, Modal, ModalBody, ModalFooter, ModalHeader, Button} from 'reactstrap';
import {MDBBtn} from 'mdbreact';
import Axios from 'axios';
import { API_url } from '../supports/APIurl';
import { shallowEqual } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal)


class ManageAdmin extends Component{
    state = {
        products:[],
        isModalOpen:false,
        isModalEdit:false,
        // indexdelete:-1,
        indexedit:-1,
        category:[]
    }

    componentDidMount() {
        Axios.get(`${API_url}/products?_expand=category`)
        .then((res)=>{
            Axios.get(`${API_url}/categories`)
            .then((categories)=>{
                this.setState({products:res.data, category:categories.data})
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    renderProduct=()=>{
        const {products} = this.state
        return products.map((val, index)=>{
            if(val.id===this.state.indexedit+1){
                return (
                    <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td><input type="text" ref="editnama" placeholder={val.name} defaultValue={this.state.products[this.state.indexedit].name}></input></td>
                        <td><input type="text" ref="editimage" placeholder={val.image} defaultValue={this.state.products[this.state.indexedit].image}></input></td>
                        <td><input type="number" ref="editstok" placeholder={val.stok} defaultValue={this.state.products[this.state.indexedit].stok}></input></td>
                        <td>
                            <select ref="editcategory" placeholder={val.categoryId} defaultValue={this.state.products[this.state.indexedit].categoryId}>
                                <option value="" hidden>Pilih Kategori</option>
                                {
                                    this.rendercategoryadd()
                                }
                                {/* <option value="1" >Kategori 1</option>
                                <option value="2" >Kategori 2</option>
                                <option value="3" >Kategori 3</option> */}
                            </select>
                        </td>
                        <td><input type="number" ref="editharga" placeholder={val.harga} defaultValue={this.state.products[this.state.indexedit].harga}></input></td>
                        <td><input type="text" ref="editdeskripsi" placeholder={val.deskripsi} defaultValue={this.state.products[this.state.indexedit].deskripsi}></input></td>
                        <td>
                            <button className="btn btn-primary" onClick={()=>this.onUpdateDataClick(val.id)}>Update</button>
                            <button className="btn btn-danger" onClick={this.oncancelBtnedit}>Cancel</button>
                        </td>
                    </tr>
                )
            }else{
                return (
                    <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{val.name}</td>
                        <td><img src={val.image} alt={val.name} width='250' height='150' style={{background:'cover'}}/></td>
                        <td>{val.stok}</td>
                        <td>{val.category.nama}</td>
                        <td>{val.harga}</td>
                        <td>{val.deskripsi}</td>
                        <td>
                            <button className="btn btn-primary" onClick={()=>this.onBtnedit(index)}>Edit</button>
                            <button className="btn btn-danger" onClick={()=>this.deleteConfirm(index,val.id)}>Delete</button>
                        </td>
                    </tr>
                )
            }
        })
    }

    toggleadd=()=> {
        this.setState({isModalOpen:!this.state.isModalOpen})
        console.log(this.state.products)
    }

    onSaveaddDataClick=()=>{
        var namaadd=this.refs.namaadd.value
        console.log(namaadd)
        var imageadd=this.refs.imageadd.value
        var stokadd=parseInt(this.refs.stokadd.value)
        var categoryadd=parseInt(this.refs.categoryadd.value)
        var hargadd=parseInt(this.refs.hargadd.value)
        var deskripsiadd=this.refs.deskripsiadd.value
        var obj={
            name:namaadd,
            image:imageadd,
            stok:stokadd,
            categoryId:categoryadd,
            harga:hargadd,
            deskripsi:deskripsiadd
        }        
        console.log(obj)
        Axios.post(`${API_url}/products`,obj)
        .then((res)=>{
            console.log(res.data)
            Axios.get(`${API_url}/products?_expand=category`)
            .then((resakhir)=>{
                this.setState({products:resakhir.data, isModalOpen:false})
            }).catch((errakhir)=>{
                console.log(errakhir)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    rendercategoryadd = () => {
        return this.state.category.map((val, index) =>{
            return <option key={index} value={val.id}>{val.nama}</option>
        })
    }

    onUpdateDataClick=(id)=>{
        var nameedit=this.refs.editnama.value
        console.log(nameedit)
        var imagedit=this.refs.editimage.value
        var stokedit=parseInt(this.refs.editstok.value)
        var categoryedit=parseInt(this.refs.editcategory.value)
        var hargedit=parseInt(this.refs.editharga.value)
        var deskripsiedit=this.refs.editdeskripsi.value
        // var dataprducts=this.state.products        
        // console.log(obj)
        Axios.put(`${API_url}/products/${id}`, {name:nameedit, image:imagedit, stok:stokedit, categoryId:categoryedit, harga:hargedit, deskripsi:deskripsiedit, })
        .then((res)=>{
            console.log(res.data)
            Axios.get(`${API_url}/products?_expand=category`)
            .then((resakhir)=>{
                this.setState({products:resakhir.data, indexedit:-1})
            }).catch((errakhir)=>{
                console.log(errakhir)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    deleteConfirm =(index, id) => {
        Swal.fire({
            title: `Are you sure wanna delete ${this.state.products[index].name} ?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((resultswal)=>{
            if(resultswal.value) {
                Axios.delete(`${API_url}/products/${id}`)
                .then((resdelete)=>{
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    ).then((resultswal_2)=>{
                        if(resultswal_2.value) {
                            Axios.get(`${API_url}/products?_expand=category`)
                            .then((res_get)=>{
                                this.setState({products:res_get.data})
                            })
                        }
                    })
                }).catch((errdelete)=>{
                    console.log(errdelete)
                })
            }
        })
    }

    onBtnedit = (index) => {
        this.setState({indexedit:index})
        console.log(index)
      }
    
    oncancelBtnedit = () => {
        this.setState({indexedit:-1})
      }

    render() {
        return(
            <div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleadd}>
                    <ModalHeader toggle={this.toggleadd}>Modal title</ModalHeader>
                        <ModalBody>
                            <input type="text" ref="namaadd" placeholder='Product Name' className="form-control mt-2"></input>
                            <input type="text" ref="imageadd" placeholder='url image' className="form-control mt-2"></input>
                            <input type="number" ref="stokadd" placeholder='Jumlah Stok' className="form-control mt-2"></input>
                            {/* <input type="text" ref="namaadd" placeholder='Product Name' className="form-control mt-2"></input> */}
                            <select ref="categoryadd" className='form-control mt-2'>
                                <option value="" hidden>Pilih Kategori</option>
                                {
                                    this.rendercategoryadd()
                                }
                                {/* <option value="1" >Kategori 1</option>
                                <option value="2" >Kategori 2</option>
                                <option value="3" >Kategori 3</option> */}
                            </select>
                            <input type="number" ref="hargadd" placeholder='Harga' className="form-control mt-2"></input>
                            {/* <input type="text" ref="namaadd" placeholder='Product Name' className="form-control mt-2"></input> */}
                            <textarea cols="20" rows="5" ref="deskripsiadd" className="form-control mt-2"></textarea>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.onSaveaddDataClick}>Save</Button>{' '}
                            <Button color="secondary" onClick={this.toggleadd}>Cancel</Button>
                        </ModalFooter>
                </Modal>

                  <MDBBtn rounded={true} outline onClick={this.toggleadd} >Add Data</MDBBtn >
                <Table striped>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Stok</th>
                            <th>Category</th>
                            <th>Harga</th>
                            <th>Deskripsi</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.renderProduct()
                        }
                    </tbody>
                </Table>
            </div>
        )
        
    }
}

export default ManageAdmin