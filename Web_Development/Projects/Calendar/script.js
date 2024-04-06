const date = new Date()
const weekDay = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

document.getElementById('date').innerHTML = date.getDate()
document.getElementById('day').innerHTML = weekDay[date.getDay()]
document.getElementById('month').innerHTML = months[date.getMonth()]
document.getElementById('year').innerHTML = date.getFullYear()

