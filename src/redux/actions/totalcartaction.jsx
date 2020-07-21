import Axios from 'axios'
import {API_url} from '../../supports/APIurl'

export const countCart=(id)=>{
    console.log(id)
    return (dispatch)=>{
        // dispatch ({type:"CART_START"})
        Axios.get(`${API_url}/transactions?_embed=transactiondetails&userId=${id}&status=oncart`)
        .then((res)=>{
            if (res.data.length) {
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
                    // console.log(res.data[0].transactiondetails)
                    // this.setState({isicart:res.data[0].transactiondetails})
                    let total=0
                    res.data[0].transactiondetails.forEach((val)=>{
                        total+=val.qty
                    })
                    dispatch({type:"COUNT_CART",payload: total})
                })
            } else {
                dispatch({type:"CART0",payload:0})
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
}