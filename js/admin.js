import { createRowTable } from "./functions.js";

const tbody = document.getElementById('tbody');
const name = document.getElementById('name');
const price = document.getElementById('price');
const category = document.getElementById('category');
const description = document.getElementById('description');
const button = document.getElementById('button');
const form = document.getElementById('form');
let backDataLength = 0;

document.addEventListener('DOMContentLoaded', function () {
    fetch("https://auth-rg69.onrender.com/api/products/all", {
        method: "GET"
    })
        .then(res => res.json())
        .then(data => {
            if (data.length) {
                backDataLength = data.length;

                data.forEach((phone, index) => {
                    let tr = createRowTable(phone, index + 1);
                    tbody.innerHTML += tr;
                });

                const deleteButtons = document.querySelectorAll('td i.bi-archive');
                deleteButtons.length && deleteButtons.forEach(del => {
                    del.addEventListener("click", function () {
                        let isDelete = confirm("Rostdan ham o'chirmoqchimisiz");
                        if (isDelete) {
                            let deleteId = this.parentNode.getAttribute('data-id');
                            if (deleteId) {
                                fetch(`https://auth-rg69.onrender.com/api/products/${deleteId}`, {
                                    method: "DELETE"
                                })
                                    .then(res => res.json())
                                    .then(data => {
                                        if (data.massage) {
                                            window.location.reload();
                                        }

                                    })
                                    .catch(err => {
                                        console.log(err);
                                    })
                            }
                        }
                    })
                })

                const editButtons = document.querySelectorAll('td i.bi-pen-fill');
                editButtons.length && editButtons.forEach(edit => {

                    edit.addEventListener('click', function () {
                        let editId = this.parentNode.getAttribute('data-id');
                        if (edit) {
                            window.location.assign(`http://127.0.0.1:5500/pages/update.html?id=${editId}`);
                        }
                    })
                })
            }
        })


        .catch(err => {
            console.log(err);
        })
});

function validate() {
    if (!name.value) {
        alert('Namega malumot kiritilishi shart')
        name.focus();
        return false
    }

    if (!price.value) {
        alert('Pricega malumot kiritilishi shart')
        price.focus();
        return false
    }

    if (!category.value) {
        alert('Categoryga malumot kiritilishi shart')
        category.focus();
        return false
    }

    if (price.value <= 0) {
        alert('Pricega bunday malumot kiritilishi mumkin emas')
        price.focus();
        return false
    }

    return true
}

button && button.addEventListener('click', function (e) {
    e.preventDefault();
    if (validate(name, price, category, description)) {
        let phone = {
            name: name.value,
            price: price.value,
            category_id: category.value,
            description: description.value,
            status: 'active'
        }

        fetch("https://auth-rg69.onrender.com/api/products", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json;charset=utf-8'
            },
            body: JSON.stringify(phone)
        })
            .then(res => res.json())
            .then(data => {
                if (data.id) {
                    let tr = createRowTable(data, backDataLength + 1);
                    backDataLength++;
                    tbody.innerHTML += tr;
                }

                form.reset();
            })
            .catch(err => {
                console.log(err);
            })

    } else {
        console.log("Validatsiyadan o'tmadi");
    }
})