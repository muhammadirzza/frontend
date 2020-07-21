import React, { useEffect, useState } from 'react';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn } from "mdbreact";
import Axios from 'axios';


const HomeGramed = () => {

    const [data, setdata]=useState([])
    const [loading, setloading]=useState(true)


    useEffect(()=>{
        Axios.get('https://cors-anywhere.herokuapp.com/https://www.gramedia.com/api/products/?category=fantasi-1')
        .then((res)=>{
            setdata(res.data)
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
        .finally(()=>{
            setloading(false)
        })
    },[])

    const renderKartu = () => {
        if(data.length) {
            return data.slice(0,5).map((val,index)=>{
                return(
                    <div style={{ width: "220px", height:"529px", paddingLeft:"10px" }}>
                        {/* <div style={{width:"220px", height:"421px"}}> */}
                            <MDBCardImage  width="220px" height="350px" src={val.thumbnail} waves />
                        {/* </div> */}
                        <MDBCardBody style={{ width: "80%", paddingLeft:0 }}>
                        <p style={{fontSize:'15px', fontWeight:'bolder'}}>{val.name}</p>
                            <MDBCardText>
                                {val.authors[0].title}
                            </MDBCardText>
                            <MDBCardText>
                                {val.formats[0].basePrice}
                            </MDBCardText>
                            {/* <MDBBtn href="#">MDBBtn</MDBBtn> */}
                        </MDBCardBody>
                    </div>
                )
            })
        }
    }

    return(
        <div className='paddingatas'>
            <div className="container-1 mt-3" style={{display:"flex", flexDirection:"column", marginBottom:"7px"}}>
                <div className="tulisan" style={{border:"1px solid black", width:"100%", display:"flex", justifyContent:'flex-end', padding:"5px"}}>
                    Lihat Semua
                </div>
            <div className="gambar-container" style={{border:"1px solid black", width:"100%", display:"flex"}}>
                <div className="gambar-carousel" style={{flex:2, border:"1px solid black", padding:"5px"}}>
                    <div style={{borderRadius:"10px", overflow:"hidden"}}> 
                        <MDBCarousel
                            activeItem={1}
                            length={3}
                            showControls={true}
                            showIndicators={true}
                            className="z-depth-1"
                            slide
                        >
                            <MDBCarouselInner>
                            <MDBCarouselItem itemId="1">
                                <MDBView>
                                <img
                                    className="d-block w-100"
                                    src="https://cdn.gramedia.com/uploads/marketing/promo_detail_banner_XntzXQK.png"
                                    alt="First slide"
                                />
                                </MDBView>
                            </MDBCarouselItem>
                            <MDBCarouselItem itemId="2">
                                <MDBView>
                                <img
                                    className="d-block w-100"
                                    src="https://cdn.gramedia.com/uploads/marketing/myvalue_storefront.jpg"
                                    alt="Second slide"
                                />
                                </MDBView>
                            </MDBCarouselItem>
                            <MDBCarouselItem itemId="3">
                                <MDBView>
                                <img
                                    className="d-block w-100"
                                    src="https://cdn.gramedia.com/uploads/marketing/bca_MEI_storefront.jpg"
                                    alt="Third slide"
                                />
                                </MDBView>
                            </MDBCarouselItem>
                            </MDBCarouselInner>
                        </MDBCarousel>

                    </div>
                {/* <MDBContainer> */}
                {/* </MDBContainer> */}
                </div>
                <div className="gambar-biasa" style={{flex:1, border:"1px solid black"}}>
                    <div className="gambar-atas" style={{padding:"5px"}}>
                        <div style={{borderRadius:"10px", overflow:"hidden"}}> 
                            <img
                                className="d-block w-100"
                                src="https://cdn.gramedia.com/uploads/marketing/socmed_storefront_SCl42PY.png"
                                alt="Third slide"
                            />
                        </div>
                    </div>
                    <div className="gambar-bawah" style={{padding:"5px"}}>
                        <div style={{borderRadius:"10px", overflow:"hidden"}}> 
                            <img
                                className="d-block w-100"
                                src="https://cdn.gramedia.com/uploads/marketing/Promo_Detail_Banner-Hanya_3_Hari_BIP_Mei_2020.jpg"
                                alt="Third slide"
                            />
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className="product" style={{display:"flex", flexDirection:"column", marginBottom:"7px"}}>
                <div className="tulisan" style={{border:"1px solid black", width:"100%", display:"flex"}}>
                    <div className="tulisan-kanan" style={{border:"1px solid black", display:"flex", justifyContent:'flex-start', alignItems:'center', padding:"5px", flex:2}}>
                        <h1>
                            Rekomendasi Gramedia
                        </h1>
                    </div>
                    <div className="tulisan-kiri" style={{border:"1px solid black", display:"flex", justifyContent:'flex-end', alignItems:'center', padding:"5px", flex:1}}>
                        <div>
                            Lihat Semua
                        </div>
                    </div>
                </div>
                <div className="product-gambar" style={{marginTop:"10px", display:"flex", width:"100%"}}>
                    <div className="gambar-samping" style={{border:"1px solid black", paddingRight:"5px", height:"542px", width:"359px"}}>
                        {/* <div style={{border:"1px solid black", paddingRight:"5px", height:"412px", width:"219px"}}> */}
                            <img src="https://cdn.gramedia.com/uploads/items/9786020639512_selena_cov__w414_hauto.jpg" alt="image" height="100%" width="100%" display="block"/>
                        {/* </div> */}
                    </div>
                    <div className="kartu" style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                        {
                            loading?
                            <div className="loading">
                                loading...
                            </div>
                            :
                            renderKartu()
                        }
                        {/* <div style={{ width: "220px", height:"529px", paddingLeft:"10px" }}>
                            <MDBCardImage className="img-fluid" width="220px" height="421px" src="https://cdn.gramedia.com/uploads/items/9786230017193_cover_Demon_Slayer_01__w414_hauto.jpg" waves />
                            <MDBCardBody style={{ width: "80%", paddingLeft:0 }}>
                                <MDBCardTitle>Demon Slayer</MDBCardTitle>
                                <MDBCardText>
                                    Koyouharu Gotouge
                                </MDBCardText>
                                <MDBCardText>
                                    Rp 32.000,00
                                </MDBCardText>
                                <MDBBtn href="#">MDBBtn</MDBBtn>
                            </MDBCardBody>
                        </div>
                        <div style={{ width: "220px", height:"529px", paddingLeft:"10px" }}>
                            <MDBCardImage className="img-fluid" width="220px" height="421px" src="https://cdn.gramedia.com/uploads/items/9786230017193_cover_Demon_Slayer_01__w414_hauto.jpg" waves />
                            <MDBCardBody style={{ width: "80%", paddingLeft:0 }}>
                                <MDBCardTitle>Demon Slayer</MDBCardTitle>
                                <MDBCardText>
                                    Koyouharu Gotouge
                                </MDBCardText>
                                <MDBCardText>
                                    Rp 32.000,00
                                </MDBCardText>
                                <MDBBtn href="#">MDBBtn</MDBBtn>
                            </MDBCardBody>
                        </div>
                        <div style={{ width: "220px", height:"529px", paddingLeft:"10px" }}>
                            <MDBCardImage className="img-fluid" width="220px" height="421px" src="https://cdn.gramedia.com/uploads/items/9786230017193_cover_Demon_Slayer_01__w414_hauto.jpg" waves />
                            <MDBCardBody style={{ width: "80%", paddingLeft:0 }}>
                                <MDBCardTitle>Demon Slayer</MDBCardTitle>
                                <MDBCardText>
                                    Koyouharu Gotouge
                                </MDBCardText>
                                <MDBCardText>
                                    Rp 32.000,00
                                </MDBCardText>
                                <MDBBtn href="#">MDBBtn</MDBBtn>
                            </MDBCardBody>
                        </div>
                        <div style={{ width: "220px", height:"529px", paddingLeft:"10px" }}>
                            <MDBCardImage className="img-fluid" width="220px" height="421px" src="https://cdn.gramedia.com/uploads/items/9786230017193_cover_Demon_Slayer_01__w414_hauto.jpg" waves />
                            <MDBCardBody style={{ width: "80%", paddingLeft:0 }}>
                                <MDBCardTitle>Demon Slayer</MDBCardTitle>
                                <MDBCardText>
                                    Koyouharu Gotouge
                                </MDBCardText>
                                <MDBCardText>
                                    Rp 32.000,00
                                </MDBCardText>
                                <MDBBtn href="#">MDBBtn</MDBBtn>
                            </MDBCardBody>
                        </div>
                        <div style={{ width: "220px", height:"529px", paddingLeft:"10px" }}>
                            <MDBCardImage className="img-fluid" width="220px" height="421px" src="https://cdn.gramedia.com/uploads/items/9786230017193_cover_Demon_Slayer_01__w414_hauto.jpg" waves />
                            <MDBCardBody style={{ width: "80%", paddingLeft:0 }}>
                                <MDBCardTitle>Demon Slayer</MDBCardTitle>
                                <MDBCardText>
                                    Koyouharu Gotouge
                                </MDBCardText>
                                <MDBCardText>
                                    Rp 32.000,00
                                </MDBCardText>
                                <MDBBtn href="#">MDBBtn</MDBBtn>
                            </MDBCardBody>
                        </div> */}
                    {/* <MDBCard style={{ width: "200px", height:"529px" }}> */}
                    {/* </MDBCard> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeGramed