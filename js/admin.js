import { createRowTable } from "./functions.js";

const tbody = document.getElementById('tbody');
const name = document.getElementById('name');
const price = document.getElementById('price');
const category = document.getElementById('category');
const description = document.getElementById('description');
const button = document.getElementById('button');

document.addEventListener('DOMContentLoaded', function () {
    fetch("https://auth-rg69.onrender.com/api/products/all", {
        method: "GET"
    })
        .then(res => res.json())
        .then(data => {
            if (data.length) {
                data.forEach((phone,index) => {
                    let tr  = createRowTable(phone,table + 1);  
                    tbody.innerHTML += tr;
                });
            }
        })
        .catch(err => {
            console.log(err);
        })
});

function validate(){

    return true
}

button && button.addEventListener('click', function() {
    e.preventDefault();
    if (validate) {
        
    }else{
        console.log("Validatsiyadan o'tmadi");
    }
})