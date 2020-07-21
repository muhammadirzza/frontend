import React, { Component } from 'react';
import {connect} from 'react-redux';
import {API_url} from './../supports/APIurl'
import Axios from 'axios';
import { Table,Modal,ModalBody,ModalFooter,ModalHeader,Button, InputGroup, InputGroupAddon, Input,InputGroupText } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {changetoRupiah} from './../supports/changetorupiah';
import {countCart} from './../redux/actions';
import {Redirect} from 'react-router-dom';
import {today} from '../supports/date'
import { FaRegTrashAlt,FaInfoCircle } from 'react-icons/fa';
import { MDBBtn, MDBInputGroup } from 'mdbreact' 

const MySwal = withReactContent(Swal)

class Cart extends Component {
    state={
        isicart:[],
        isModaladdOpen:false,
        transactionsId:[],
        shipping:10000,
        discount:5000,
        coupon:'',
        removeindex:null
    }

    componentDidMount() {
        this.getdata()
        // console.log(today())
    }

    renderIsiData=()=>{
        return this.state.isicart.map((val, index)=>{
            return(
                <div className={this.state.removeindex===val.id?'d-flex removed-item':'d-flex'} style={{alignItems:'center', padding:'20px', justifyContent:'space-around', backgroundColor:'#e8eaf6', borderRadius:'10px', marginBottom:'10px'}}>
                    <div className='d-flex'style={{width:"40%"}}>
                        <div className="imagetd">
                                <img src={val.dataprod.image} height="250px" width="150px" alt=""/>
                        </div>
                        <div className="tex-td" style={{marginLeft:'5%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                            <div className="name-td" style={{width:'100%'}}>
                                <h3 width="50%">{val.dataprod.name}</h3>
                            </div>
                            <div>
                                <p style={{fontSize:'15px'}}>{val.dataprod.deskripsi}</p>
                            </div>
                        </div>
                    </div>
                    <div className="qty-td">
                        {/* <td width="5%" style={{textAlign:'center', verticalAlign:'middle', fontSize:'20px'}}> */}
                            <button className="btn p-0" onClick={()=>this.onMinqty(index, val.id)} style={{color:'white', width:"30px", height:"20px", textAlign:"center", verticalAlign:"middle", backgroundColor:'#281e5a', boxShadow:'none', marginRight:'15px'}} >-</button>
                            {val.qty}
                            <button className="btn p-0" onClick={()=>this.onPlusqty(index, val.id)} disabled={val.qty===val.dataprod.stok} style={{color:'white', width:"30px", height:"20px", textAlign:"center", verticalAlign:"middle", backgroundColor:'#281e5a', boxShadow:'none', marginLeft:'15px'}} >+</button>
                        {/* </td> */}
                    </div>
                    <div width="25%" style={{fontSize:'18px'}}>{changetoRupiah(val.qty*val.dataprod.harga)}</div>
                    <div width="5%"><button className=" delete" style={{borderRadius:'10px', border: '1px solid #f76c6c', outline:'none'}} onClick={()=>this.deleteconfirm(index, val.id)}><FaRegTrashAlt/></button></div>
                </div>
                // <tr key={index} style={{verticalAlign:"middle"}}>
                //     <td width="5%">{index+1}</td>
                //     <td width="40%" style={{textAlign:'center', verticalAlign:'middle'}}>
                //         <div className='d-flex'>
                //             <div className="imagetd">
                //                     <img src={val.dataprod.image} height="250px" width="150px" alt=""/>
                //             </div>
                //             <div className="tex-td" style={{marginLeft:'5%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                //                 <div className="name-td">
                //                     <h3 width="20%">{val.dataprod.name}</h3>
                //                 </div>
                //                 <div className="qty-td">
                //                     <td width="5%" style={{textAlign:'center', verticalAlign:'middle', fontSize:'20px'}}>
                //                         <button className="btn p-0 " style={{color:'white', width:"30px", height:"20px", textAlign:"center", verticalAlign:"middle", backgroundColor:'#281e5a', boxShadow:'none', marginRight:'15px'}} >-</button>
                //                         {val.qty}
                //                         <button className="btn p-0 " style={{color:'white', width:"30px", height:"20px", textAlign:"center", verticalAlign:"middle", backgroundColor:'#281e5a', boxShadow:'none', marginLeft:'15px'}} >+</button>
                //                     </td>
                //                 </div>
                //             </div>
                //         </div>
                //     </td>
                //     <td width="25%" style={{fontSize:'18px'}}>{changetoRupiah(val.qty*val.dataprod.harga)}</td>
                //     <td width="5%"><button className=" delete" style={{borderRadius:'10px', border: '1px solid #f76c6c', outline:'none'}} onClick={()=>this.deleteconfirm(index, val.id)}><FaRegTrashAlt/></button></td>
                // </tr>
            )
        })
    }

    renderTotal=()=>{
        let total=0
        this.state.isicart.forEach((val)=>{
            total+=val.qty*val.dataprod.harga
        })
        return(
            // <tr style={{verticalAlign:"middle"}}>
            //     <td colSpan="2" style={{verticalAlign:"middle", fontSize:20, fontWeight:"bolder"}}>Total</td>
            //     <td ></td>
            //     <td style={{fontWeight:"bolder", fontSize:20}}>{changetoRupiah(total)}</td>
            // </tr>
            total
        )
    }

    onCheckoutClick=()=>{
        this.setState({isModaladdOpen:!this.state.isModaladdOpen})
    }

    totalPrice=()=>{
        return this.renderTotal() + this.state.shipping - this.state.discount
    }

    getdata=()=>{
        Axios.get(`${API_url}/transactions?_embed=transactiondetails&userId=${this.props.User.id}&status=oncart`)
        .then((res)=>{
            console.log(this.props.User.id)
            // console.log(res.data)
            this.setState({transactionsId:res.data})
            // console.log(this.state.transactionsId)
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

    onPlusqty=(index,id)=>{
        Axios.patch(`${API_url}/transactiondetails/${id}`,{
            qty:this.state.isicart[index].qty+1
        })
        .then((res)=>{
            console.log(this.state.isicart[index].qty)
            this.getdata()
            this.props.countCart(this.props.User.id)
        }).catch((err)=>{
            console.log(err)
        })
    }

    onMinqty=(index,id)=>{
        Axios.patch(`${API_url}/transactiondetails/${id}`,{
            qty:this.state.isicart[index].qty-1
        })
        .then((res)=>{
            console.log(res)
            this.getdata()
            this.props.countCart(this.props.User.id)
            if(res.data.qty===0){
                Axios.delete(`${API_url}/transactiondetails/${id}`)
                .then((res2)=>{
                    this.getdata()
                    this.props.countCart(this.props.User.id)
                }).catch((err2)=>{
                    console.log(err2)
                })
            }
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
                          this.setState({removeindex:id})
                          const timer = setTimeout(() => {
                              this.getdata()
                              this.props.countCart(this.props.User.id)
                            }, 850);
                            return () => clearTimeout(timer)
                        }
                        //   console.log(this.props.User.id)
                  })
              }).catch((err)=>{
                  console.log(err)
              }) 
            }
          })
    }

    BayarClick = () => {
        var method = this.refs.method.value
        var ccid = this.refs.ccnums.value
        var tes = this.state.transactionsId
        var yy =new Date().getFullYear()
        var mm =new Date().getMonth()
        var dd =new Date().getDate()
        var ms =new Date().getMilliseconds()
        console.log(tes)
        console.log(method)
        Axios.patch(`${API_url}/transactions/${tes[0].id}`,{
            method,
            userId:this.props.User.id,
            status:"pending",
            // id:tes[0].id,
            date:today(),
            date2:"",
            cc:ccid,
            tr:method+tes[0].id+yy+mm+dd+ms
        })
        .then((res)=>{
            this.getdata()
            this.setState({isModaladdOpen:!this.state.isModaladdOpen})
            this.setState({isicart:[]})
            // console.log(res.data)
        }).catch((errbayar)=>{
            console.log(errbayar)
        })
    }

    render() {
        if(this.props.User.role==="user"){
            return (
                <div className="paddingatas" style={{paddingLeft:'10%', paddingRight:'10%', display:'flex'}}>
                    <Modal isOpen={this.state.isModaladdOpen} toggle={this.onCheckoutClick}>
                        <ModalHeader toggle={this.toogleadd}>Add data</ModalHeader>
                        <ModalBody>
                            <select ref='method' className='form-control mt-2'>
                                <option value="" hidden>Pilih Pembayaran</option>
                                <option value="cc">Credit Card</option>
                            </select>
                            <input type="number" ref='ccnums' placeholder='Masukkan Nomor Kartu ' className='form-control mt-2'/>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.BayarClick}>Bayar</Button>
                        </ModalFooter>
                    </Modal>
                    <div style={{flex:3, marginTop:'20px'}}>
                            {   
                                this.renderIsiData()
                            }
                    </div>
                    {/* <Table borderless style={{flex:3}}>
                        <thead style={{borderBottom:'2px solid black'}}>
                            <tr>
                                <th style={{fontWeight:'bolder', fontSize:'20px'}}>No</th>
                                <th style={{fontWeight:'bolder', fontSize:'20px'}}>Product</th> */}
                                {/* <th></th> */}
                                {/* <th style={{fontWeight:'bolder', fontSize:'20px'}}>Price</th>
                                <th style={{fontWeight:'bolder', fontSize:'20px'}}>Action</th> */}
                                {/* <th></th> */}
                            {/* </tr>
                        </thead>
                        <tbody>
                        </tbody> */}
                        {/* <tfoot style={{borderTop:'2px solid gray'}}>
                            {
                                this.renderTotal()
                            }
                        </tfoot> */}
                    {/* </Table> */}
                    <div style={{display:'flex', flexDirection:'column', flex:1}}>
                        <div className="box-info2" style={{flex:1, marginLeft:'15px', marginTop:'20px', justifyContent:'space-around'}}>
                            <div style={{display:'flex', width:'100%', marginBottom:'20px', justifyContent:'center'}}>
                                <div style={{verticalAlign:'middle'}}>
                                    <p style={{color:'#281e5a', fontSize:'20px', fontWeight:'bolder'}}>Summary</p>
                                </div>
                            </div>
                            <div>
                                <div style={{display:'flex', width:'100%'}}>
                                    <div style={{verticalAlign:'middle'}}>
                                        <p style={{color:'#281e5a', fontSize:'15px', fontWeight:'bolder'}}>Subtotal</p>
                                    </div>
                                    <div style={{flex:1, textAlign:'right', verticalAlign:'middle'}}>{ changetoRupiah(this.renderTotal()) }</div>
                                </div>
                                <div style={{display:'flex', width:'100%'}}>
                                    <div style={{verticalAlign:'middle'}}>
                                        <p style={{color:'#281e5a', fontSize:'15px', fontWeight:'bolder'}}>Discount</p>
                                    </div>
                                    <div style={{flex:1, textAlign:'right', verticalAlign:'middle', color:this.state.discount?'red':'#281e5a'}}>
                                        {this.state.discount?
                                        `- ${changetoRupiah(this.state.discount)}`
                                        :
                                        changetoRupiah(this.state.discount)
                                        }
                                    </div>
                                </div>
                                <div style={{display:'flex', width:'100%'}}>
                                    <div style={{verticalAlign:'middle'}}>
                                        <p style={{color:'#281e5a', fontSize:'15px', fontWeight:'bolder'}}>Shipping</p>
                                    </div>
                                    <div style={{flex:1, textAlign:'right', verticalAlign:'middle'}}>{changetoRupiah(this.state.shipping)}</div>
                                </div>
                            </div>
                            <div style={{display:'flex', width:'100%', borderTop:'1px solid #281e5a', paddingTop:'10px'}}>
                                <div style={{verticalAlign:'middle'}}>
                                    <p style={{color:'#281e5a', fontSize:'15px', fontWeight:'bolder'}}>Total</p>
                                </div>
                                <div style={{flex:1, textAlign:'right', verticalAlign:'middle'}}>{ changetoRupiah(this.totalPrice()) }</div>
                            </div>
                            <button className="btn" style={{backgroundColor:'#2B4C80', color:'white', borderRadius:'10px'}} disabled={!this.state.isicart.length} onClick={this.onCheckoutClick}>Checkout</button>
                        </div>
                        <div  style={{flex:1, marginLeft:'15px', marginTop:'20px', width:'100%'}}>
                            <div className="box-info3" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                {/* <div style={{verticalAlign:'middle'}}> */}
                                <MDBInputGroup
                                    hint="insert your code..."
                                    containerClassName=""
                                    append={
                                        <button style={{backgroundColor:'#2B4C80', color:'white', height:'38px', outline:'none', border:'1px solid #2B4C80', borderTopRightRadius:'3px', borderBottomRightRadius:'3px', fontFamily:'Roboto', fontWeight:'lighter'}} className="m-0 px-3 py-1">
                                        Redeem
                                        </button>
                                    }
                                />
                                    {/* <p style={{color:'#281e5a', fontSize:'20px', fontWeight:'bolder'}}>Summary</p> */}
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
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
