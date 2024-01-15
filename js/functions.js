function createRowTable(phone,index) {
    return `
        <tr>
            <td>${index}</td>
            <td>${phone.name}</td>
            <td>${phone.price}</td>
            <td>${phone.description}</td>
            <td>${phone.category_id}</td>
            <td>${phone.status}</td>
            <td>
                <i class="bi bi-archive text-danger"></i>
                <i class="bi bi-pen-fill text-info"></i>
            </td>
        </tr>
    `
}

export{createRowTable}