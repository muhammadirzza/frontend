export const IsHome=()=>{
    console.log('home')
    return{
        type:'HOME'
    }
}
export const NotHome=()=>{
    console.log('bukan home')
    return{
        type:'BUKANHOME'
    }
}
export const Keyword=(data)=>{
    console.log('ini keywordnya'+data)
    return{
        type:'INPUTKEY',
        payload:data
    }
}