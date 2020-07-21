import React,{ useState, useEffect } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import ReactImageMagnify from 'react-image-magnify';
import { MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import { connect } from 'react-redux';
import Axios from 'axios';
import {API_url} from '../supports/APIurl';
import {Redirect} from 'react-router-dom';
import {changetoRupiah} from './../supports/changetorupiah';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import {countCart} from './../redux/actions'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal)
// import '../App.css'




const ProductGramed = (props) => {

    const [activeItem, setactiveItem] = useState('1')
    const [data, setdata]=useState({})
    const [qty, setqty]=useState(1)
    const [modalopen, setmodalopen]=useState(false)
    const [redirectlog, setredirectlog]=useState(false)
    // const [price, setprice] = useState(0)

    const {name, image, seen, stok, harga, deskripsi}=data

    useEffect(()=>{
        // console.log(props.User.id)
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

    const toggle = tab => e => {
      if (activeItem !== tab) {
        setactiveItem(tab)
      }
    };

    const onToLoginClick=()=>{
        if(props.User.role==='admin'){
            setmodalopen(false)
        }else{
            setmodalopen(false)
            setredirectlog(true)
        }
    }

    if(redirectlog){
        return <Redirect to='/login' />
    }

    if(data){
        return(
            <div className="containers" >
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
                <div className="inner-container" >
                    <div className="top-inner" >
                        <div className="left-top-inner">
                            <div className="cards" >
                                <div className="cards-image" >
                                <ReactImageMagnify style={{cursor:'zoom-in'}} {...{
                                        smallImage: {
                                            alt: name,
                                            isFluidWidth: true,
                                            src: image
                                        },
                                        largeImage: {
                                            src: image,
                                            width: 800,
                                            height: 1400
                                        },
                                        enlargedImageContainerDimensions: {
                                            width: '200%',
                                            height: '100%'
                                        },
                                        enlargedImagePortalId: 'portal'
                                    }} /> 
                                    {/* <img src="https://cdn.gramedia.com/uploads/items/9786230017193_cover_Demon_Slayer_01__w414_hauto.jpg" width="100%" height="100%" alt="kimetsu" /> */}
                                </div>
                                <div className="cards-body" >
                                    <div className=" d-flex py-2" style={{alignItems:"center"}}>
                                        <button className="btn p-0" style={{color:'white', width:"60px", height:"20px", textAlign:"center", verticalAlign:"middle", backgroundColor:'#281e5a'}} disabled={qty<=1?true:false} onClick={()=>setqty(qty-1)} >-</button>
                                        <div className="rounded" style={{border:'1px solid black'}}>
                                            <input
                                                type="text"
                                                style={{width:'90px', height:'40px', textAlign:'center', backgroundColor:'transparent', border:'0px'}}
                                                value={qty}
                                                onChange={qtychange} 
                                            />
                                        </div>
                                        <button className="btn p-0 " style={{color:'white', width:"60px", height:"20px", textAlign:"center", verticalAlign:"middle", backgroundColor:'#281e5a'}} disabled={qty>=stok?true:false} onClick={()=>setqty(parseInt(qty)+1)} >+</button>
                                    </div>
                                    <div>
                                    <div className=" d-flex pt-3" style={{alignItems:"center", justifyContent:'center'}}>
                                        <p style={{fontSize:'18px', fontWeight:'bold'}}>
                                            {changetoRupiah(harga*qty)},00
                                        </p>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="middle-top-inner" style={{flex:1, paddingLeft:'20px'}}>
                            <div className="book-title" >
                                <h1>{name}</h1>
                                <h3>Koyoharu Gotouge</h3>
                                <p> 4.50 (6,691 rating Goodreads)</p>
                                <div id='portal'>
    
                                </div>
                            </div>
                        </div>
                        <div className="right-top-inner">
                            <div className="transaction" >
                                <div className='inner-transaction'>
                                    <div className="transaction-info">
                                        <div className="box-info" >
                                            <div style={{display:'flex', width:'100%'}}>
                                                <div style={{flex:2, verticalAlign:'middle'}}>
                                                    <p style={{color:'#281e5a', fontSize:'16px', fontWeight:'bolder'}}>Soft Cover</p>
                                                </div>
                                                <div style={{flex:1, textAlign:'right', verticalAlign:'middle'}}><FaInfoCircle/></div>
                                            </div>
                                            <div>
                                                <p>20%</p>
                                            </div>
                                            <div>
                                                <p>{changetoRupiah(harga*qty)},00</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-button" >
                                        <div>
                                            <button className="buttoncart" onClick={sendtoCart} >Tambah Keranjang</button>
                                        </div>
                                        <div>
                                            <button className="buttonwish" >Tambah Wishlist</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-inner">
                        <MDBNav className="nav-tabs">
                            <MDBNavItem>
                                <MDBNavLink link to="#" active={activeItem === "1"} onClick={toggle("1")} role="tab" >
                                Deskripsi
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink link to="#" active={activeItem === "2"} onClick={toggle("2")} role="tab" >
                                Detail
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink link to="#" active={activeItem === "3"} onClick={toggle("3")} role="tab" >
                                Ulasan
                                </MDBNavLink>
                            </MDBNavItem>
                        </MDBNav>
                        <MDBTabContent activeItem={activeItem} >
                            <MDBTabPane tabId="1" role="tabpanel">
                                <p className="mt-2">
                                {deskripsi}
                                </p>
                                <p>
                                Quisquam aperiam, pariatur. Tempora, placeat ratione porro
                                voluptate odit minima. Lorem ipsum dolor sit amet,
                                consectetur adipisicing elit. Nihil odit magnam minima,
                                soluta doloribus reiciendis molestiae placeat unde eos
                                molestias.
                                </p>
                            </MDBTabPane>
                            <MDBTabPane tabId="2" role="tabpanel">
                                <p className="mt-2">
                                Quisquam aperiam, pariatur. Tempora, placeat ratione porro
                                voluptate odit minima. Lorem ipsum dolor sit amet,
                                consectetur adipisicing elit. Nihil odit magnam minima,
                                soluta doloribus reiciendis molestiae placeat unde eos
                                molestias.
                                </p>
                                <p>
                                Quisquam aperiam, pariatur. Tempora, placeat ratione porro
                                voluptate odit minima. Lorem ipsum dolor sit amet,
                                consectetur adipisicing elit. Nihil odit magnam minima,
                                soluta doloribus reiciendis molestiae placeat unde eos
                                molestias.
                                </p>
                            </MDBTabPane>
                            <MDBTabPane tabId="3" role="tabpanel">
                                <p className="mt-2">
                                Quisquam aperiam, pariatur. Tempora, placeat ratione porro
                                voluptate odit minima. Lorem ipsum dolor sit amet,
                                consectetur adipisicing elit. Nihil odit magnam minima,
                                soluta doloribus reiciendis molestiae placeat unde eos
                                molestias.
                                </p>
                                <p>
                                Quisquam aperiam, pariatur. Tempora, placeat ratione porro
                                voluptate odit minima. Lorem ipsum dolor sit amet,
                                consectetur adipisicing elit. Nihil odit magnam minima,
                                soluta doloribus reiciendis molestiae placeat unde eos
                                molestias.
                                </p>
                            </MDBTabPane>
                        </MDBTabContent>
                    </div>
                </div>
            </div>
        )
    }
}

const MapstatetoProps=(state)=>{
    return {
        User:state.Auth
    }
}

export default connect(MapstatetoProps,{countCart}) (ProductGramed)