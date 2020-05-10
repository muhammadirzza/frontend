export const today=()=>{
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let mm = new Date().getMonth()+1
    let dd = new Date().getDay()
    let yy = new Date().getFullYear()
    let hh = new Date().getHours()
    let mn = new Date().getMinutes()
    let ss = new Date().getSeconds()

    return `${days[dd]} - ${mm}/${dd}/${yy} - ${hh}:${mn}:${ss}`
}