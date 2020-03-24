import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { API_url } from '../supports/APIurl';
import {connect} from 'react-redux';
import {changetoRupiah} from './../supports/changetorupiah';
import {Modal, ModalBody, ModalFooter} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {countCart} from './../redux/actions'
const MySwal = withReactContent(Swal)



const ProductDetail=(props)=>{
    console.log(props.match.params.idprod)

    const [data, setdata]=useState({})
    const [qty, setqty]=useState(1)
    const [modalopen, setmodalopen]=useState(false)
    const [redirectlog, setredirectlog]=useState(false)
    const [id, setid]=useState(0)

    //didmount
    useEffect(()=>{
        console.log(props.User.id)
        Axios.get(`${API_url}/products/${props.match.params.idprod}`)
        .then((res)=>{
            console.log(res.data)
            setdata(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const qtychange=(e)=>{
        console.log(e.target.value)
        if(e.target.value===''){//kalau inputnya kosong maka qtynya mulai dari 0
            setqty(0)
        }
        if(Number(e.target.value)){//inputnya cuma bisa number
            if(qty===0){
                setqty(e.target.value[1])
            }else{
                if(e.target.value>stok){//jika valuenya lebih besar maka qtynya akan maksimal
                    setqty(stok)
                }else if(e.target.value<1){//jika valuenya lebih kecil maka qtynya akan 1
                    setqty(1)
                }else{
                    setqty(e.target.value)
                }
            }
        }
    }

    const sendtoCart=()=>{
        if(props.User.islogin&&props.User.role==='user'){
            var objecttransaction={
                status:'oncart',
                userId:props.User.id
            }
            console.log(props.User.id)
            Axios.get(`${API_url}/transactions?status=oncart&userId=${props.User.id}`)
            .then((res1)=>{
                if(res1.data.length){
                    var objectdetails={
                        transactionId:res1.data[0].id,
                        productId:data.id,
                        qty:qty
                    }
                    // harusnya disini get data dulu, kalo ada di looping buat cek kalau ga ada baru di post
                    Axios.get(`${API_url}/transactions?_embed=transactiondetails&userId=${props.User.id}&status=oncart`)
                    .then((res4)=>{
                        var add=false
                        console.log(res4.data[0].transactiondetails)
                        res4.data[0].transactiondetails.map((val)=>{
                            console.log(val.productId)
                            if(val.productId===data.id){
                                console.log('harusnya masuk sini dulu')
                                Axios.patch(`${API_url}/transactiondetails/${val.id}`, {qty:val.qty+qty})
                                add=true
                                console.log(add)
                                    MySwal.fire({
                                        icon:'success',
                                        title:'Berhasil Masuk Cart'
                                    }).then((res)=>{
                                        props.countCart(props.User.id)
                                    })
                                }
                            })

                            if(add===false){
                                Axios.post(`${API_url}/transactiondetails`,objectdetails) //masukin data belanjaan
                                .then((res3)=>{
                                    console.log(res3.data)
                                    MySwal.fire({
                                        icon:'success',
                                        title:'Berhasil Masuk Cart'
                                    }).then((res)=>{
                                        props.countCart(props.User.id)
                                    })
                                })
                            }
                    })
                }else{
                    Axios.post(`${API_url}/transactions`, objecttransaction) //masukin data user ke cart
                    .then((res2)=>{
                        var objectdetails={
                            transactionId:res2.data.id,
                            productId:data.id,
                            qty:qty
                        }
                        Axios.get(`${API_url}/transactions?_embed=transactiondetails&userId=${props.User.id}&status=oncart`)
                        .then((res4)=>{
                            var add=false
                            res4.data[0].transactiondetails.map((val)=>{
                                if(val.productId===data.id){
                                    add=true
                                    Axios.patch(`${API_url}/transactiondetails/${val.id}`, {qty:val.qty+qty})
                                    MySwal.fire({
                                        icon:'success',
                                        title:'Berhasil Masuk Cart'
                                    }).then((res)=>{
                                        props.countCart(props.User.id)
                                    })
                                }
                            })
                            if(add===false){
                                Axios.post(`${API_url}/transactiondetails`,objectdetails) //masukin data belanjaan
                                .then((res3)=>{
                                    console.log(res3.data)
                                    MySwal.fire({
                                        icon:'success',
                                        title:'Berhasil Masuk Cart'
                                    }).then((res)=>{
                                        props.countCart(props.User.id)
                                    })
                                })
                            }
                        })
                    })
                }
            })
            // setid(this.props.User.id)
            
        }else{
            setmodalopen(true)
        }
    }

    const onToLoginClick=()=>{
        if(props.User.role==='admin'){
            setmodalopen(false)
        }else{
            setmodalopen(false)
            setredirectlog(true)
        }
    }

    const {name, image, seen, stok, harga, deskripsi}=data
    if(redirectlog){
        return <Redirect to='/login' />
    }
    if(data){
        return (
            <div className="paddingatas">
                <Modal centered toggle={()=>setmodalopen(false)} isOpen={modalopen}>
                    <ModalBody>
                        {
                            props.User.role==='admin'?
                            'maaf and admin'
                            :
                            'Maaf anda harus login dahulu'
                        }
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-primary' onClick={onToLoginClick}>Ok</button>
                    </ModalFooter>
                </Modal>
                <div className="row">
                    <div className="col-md-4 p-5">
                        <div className="product-detail">
                            <img src={image} alt={name} width="100%" className="rounded img-fluid"/>
                        </div>  
                    </div>
                    <div className="col-md-8 pt-4">
                        <div className="border-headerdetail">
                            <div className="font-weight-bolder font-nameprod">
                                {name}
                            </div>
                            <div className="font-typographysmall">
                                <span className="font-weigth-bold">{qty}&nbsp;</span> dibeli
                            </div>
                        </div>
                        <div className="border-headerdetail" style={{lineHeight:'40px'}}>
                            <div className="row">
                                <div className="col-md-1 font-weight-bolder">
                                    Stok
                                </div>
                                <div className="col-md-11">
                                    {stok}pcs
                                </div>
                            </div>
                        </div>
                        <div className="border-header-detail" style={{lineHeight:'40px'}}>
                            <div className="row" style={{verticalAlign:'center'}}>
                                <div className="col-md-11 font-weight-bolder">
                                    Harga
                                </div>
                                <div className="col-md-11 pt-0">
                                    {changetoRupiah(harga*qty)}
                                </div>
                            </div>
                        </div>
                        <div className="border-header-detail" style={{lineHeight:'40px'}}>
                            <div className="row" style={{verticalAlign:'center'}}>
                                <div className="col-md-11 font-weight-bolder">
                                    Deskripsi
                                </div>
                                <div className="col-md-11 pt-0">
                                    {deskripsi}
                                </div>
                            </div>
                        </div>
                        <div className="border-headerdetail">
                            <div className="row">
                                {/* <div className="col-md-1 font-typographymed py-3">
                                    Jumlah
                                </div> */}
                                <div className="col-md-11 d-flex py-2" style={{alignItems:"center"}}>
                                    <button className="btn p-0 delete" style={{width:"60px", height:"20px", textAlign:"center", verticalAlign:"middle"}} disabled={qty<=1?true:false} onClick={()=>setqty(qty-1)}>-</button>
                                    <div className="rounded" style={{border:'1px solid black'}}>
                                        <input
                                            type="text"
                                            style={{width:'90px', height:'40px', textAlign:'center', backgroundColor:'transparent', border:'0px'}}
                                            value={qty}
                                            onChange={qtychange} 
                                        />
                                    </div>
                                    <button className="btn p-0 delete" style={{width:"60px", height:"20px", textAlign:"center", verticalAlign:"middle"}} disabled={qty>=stok?true:false} onClick={()=>setqty(parseInt(qty)+1)}>+</button>
                                </div>
                            </div>
                        </div>
                        <div className="border-headerdetail" style={{lineHeight:'40px'}}>
                            <button className="btn rounded-pill update" onClick={sendtoCart}>Buy Now</button>
                        </div>
    
                    </div>
                </div>
                {/* <h1>Ini Produk Detail</h1> */}
            </div>
        )
    }
    return <div className="paddingatas">Loading...</div>

}

const MapstatetoProps=(state)=>{
    return {
        User:state.Auth
    }
}

export default connect(MapstatetoProps,{countCart}) (ProductDetail)