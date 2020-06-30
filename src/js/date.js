export let today = new Date();

let date = today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear();
document.getElementById('current_date').innerHTML = date;

   