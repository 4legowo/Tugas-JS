document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('shopping-form');
    const itemList = document.getElementById('item-list');
    const grandTotalElement = document.getElementById('grand-total');
    

    let shoppingList = [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const date = document.getElementById('date').value;
        const itemName = document.getElementById('item-name').value;
        const itemUnit = document.getElementById('item-unit').value;
        const itemPrice = parseFloat(document.getElementById('item-price').value);
        const itemQuantity = parseInt(document.getElementById('item-quantity').value);

        if (date && itemName && itemUnit && !isNaN(itemPrice) && !isNaN(itemQuantity) && itemPrice >= 0 && itemQuantity >= 1) {
            const newItem = {
                id: Date.now(), 
                date,
                name: itemName,
                unit: itemUnit,
                price: itemPrice,
                quantity: itemQuantity,
                total: itemPrice * itemQuantity
            };

            shoppingList.push(newItem);
            renderList();
            form.reset();
        } else {
            alert('Mohon lengkapi semua kolom dengan nilai yang valid.');
        }
    });

    function renderList() {
        itemList.innerHTML = '';
        let grandTotal = 0;

        shoppingList.forEach(item => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${item.date}</td>
                <td>${item.name}</td>
                <td>${item.unit}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>${item.total.toFixed(2)}</td>
                <td><button class="delete-btn" onclick="deleteItem(${item.id})">Hapus</button></td>
            `;

            itemList.appendChild(row);
            grandTotal += item.total;
        });

        grandTotalElement.textContent = grandTotal.toFixed(2);
    }

    
    window.deleteItem = function(id) {
        shoppingList = shoppingList.filter(item => item.id !== id);
        renderList();
    };

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    document.getElementById('date').value = formattedDate;
})