const wrapper = document.getElementById("wrapper");

function createHtml(data) {
    return `

    <h3>${data.name}</h3>
    <h3>${data.price}</h3>
    <p>${data.description}</p>
    <p>${data.category_id}</p>

    `
}

document.addEventListener('DOMContentLoaded', function () {
    let elId = window.location.href.substring(window.location.href.search('id=') + 3);
    if (elId && elId.length == 36) {
        fetch(`https://auth-rg69.onrender.com/api/products/${elId}`)
            .then(res => res.json())
            .then(data => {
                let block = createHtml(data)
                wrapper.innerHTML = block
            })
    } else {
        window.location.assign('http://127.0.0.1:5500/index.html');
    }
})