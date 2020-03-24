import React, { Component } from 'react';
import {connect} from 'react-redux';
import {API_url} from './../supports/APIurl'
import Axios from 'axios';
import { Table,Modal,ModalBody,ModalFooter,ModalHeader,Button } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {changetoRupiah} from './../supports/changetorupiah';
import {countCart} from './../redux/actions';
import {Redirect} from 'react-router-dom';

const MySwal = withReactContent(Swal)

class Cart extends Component {
    state={
        isicart:[],
        isModaladdOpen:false
    }

    componentDidMount() {
        this.getdata()
    }

    renderIsiData=()=>{
        return this.state.isicart.map((val, index)=>{
            return(
                <tr key={index} style={{verticalAlign:"middle"}}>
                    <td width="5%">{index+1}</td>
                    <td width="20%">{val.dataprod.name}</td>
                    <td width="15%">
                        <div className="rounded" style={{height:"150px", width:"250px"}}>
                            <img src={val.dataprod.image} height="100%" width="100%" alt=""/>
                        </div>
                    </td>
                    <td width="5%">{val.qty}</td>
                    <td width="12.5%">{changetoRupiah(val.qty*val.dataprod.harga)}</td>
                    <td width="12.5%"><button className="btn rounded-pill delete" onClick={()=>this.deleteconfirm(index, val.id)}>Delete</button></td>
                </tr>
            )
        })
    }

    renderTotal=()=>{
        let total=0
        this.state.isicart.forEach((val)=>{
            total+=val.qty*val.dataprod.harga
        })
        return(
            <tr style={{verticalAlign:"middle"}}>
                <td colSpan="2" style={{verticalAlign:"middle", fontSize:20, fontWeight:"bolder"}}>Total</td>
                <td colSpan="2" ></td>
                <td style={{fontWeight:"bolder", fontSize:20}}>{changetoRupiah(total)}</td>
            </tr>
        )
    }


    onCheckoutClick=()=>{
        this.setState({isModaladdOpen:!this.state.isModaladdOpen})
    }

    getdata=()=>{
        Axios.get(`${API_url}/transactions?_embed=transactiondetails&userId=${this.props.User.id}&status=oncart`)
        .then((res)=>{
            console.log(this.props.User.id)
            // axios.get hasilnya objek, axios.all hasilnya array
            var newarrforprod=[]
            res.data[0].transactiondetails.forEach(element =>{
                newarrforprod.push(Axios.get(`${API_url}/products/${element.productId}`))
            })
            console.log(newarrforprod)
            Axios.all(newarrforprod)
            .then((res2)=>{
                console.log(res2)
                res2.forEach((val, index)=>{
                    res.data[0].transactiondetails[index].dataprod=val.data //buat masukin data ke objeknya
                })
                console.log(res.data[0].transactiondetails)
                this.setState({isicart:res.data[0].transactiondetails})
                console.log(this.state.isicart)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    deleteconfirm=(index,id)=>{
        MySwal.fire({
            title: `Are you sure wanna delete ${this.state.isicart[index].dataprod.name} ?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
              Axios.delete(`${API_url}/transactiondetails/${id}`)
              .then((res)=>{
                  MySwal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  ).then((result)=>{
                      if(result.value){
                          this.getdata()
                          this.props.countCart(this.props.User.id)
                        //   console.log(this.props.User.id)
                      }
                  })
              }).catch((err)=>{
                  console.log(err)
              }) 
            }
          })
    }

    render() {
        if(this.props.User.role==="user"){
            return (
                <div className="paddingatas">
                    <Modal isOpen={this.state.isModaladdOpen} toggle={this.onCheckoutClick}>
                        <ModalHeader toggle={this.toogleadd}>Add data</ModalHeader>
                        <ModalBody>
                            <select ref='categoryadd' className='form-control mt-2'>
                                <option value="" hidden>Pilih Pembayaran</option>
                                <option value="cc">Credit Card</option>
                            </select>
                            <input type="number" ref='hargaadd' placeholder='Masukkan Nomor Kartu ' className='form-control mt-2'/>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary">Bayar</Button>
                        </ModalFooter>
                    </Modal>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Nama</th>
                                <th>Foto</th>
                                <th>qty</th>
                                <th>Harga</th>
                                <th>Hapus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {   
                                this.renderIsiData()
                            }
                        </tbody>
                        <tfoot>
                            {
                                this.renderTotal()
                            }
                        </tfoot>
                    </Table>
                    <button className="btn rounded-pill delete" onClick={this.onCheckoutClick}>Checkout</button>
                </div>
            )
        }else{
            return <Redirect to="/notfound"/>
        }
    }

}

const MapstatetoProps=(state)=>{
    return {
        User:state.Auth
    }
}
export default connect(MapstatetoProps,{countCart}) (Cart);
