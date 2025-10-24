
let products = ["Sony Xperia", "Samsung Galaxy", "Nokia 6", "Xiaomi Redmi Note 4", "Apple iPhone 6S", "Xiaomi Mi 5s Plus", "Apple iPhone 8 Plus", "Fujitsu F-04E", "Oppo A71"];

const PRList = document.getElementById('product-list');
const count = document.getElementById('product-count');
const msge = document.getElementById('message');

function displayProducts() {
    PRList.innerHTML = ''; 
    count.textContent = products.length;

    products.forEach((productName, index) => {
        const row = PRList.insertRow(); 
        
        row.insertCell(0).textContent = index + 1; 

        row.insertCell(1).textContent = productName; 

        const editCell = row.insertCell(2);
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';

        editButton.onclick = () => showEditForm(index, productName); 
        editCell.appendChild(editButton);


        const deleteCell = row.insertCell(3);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';

        deleteButton.onclick = () => deleteProduct(index); 
        deleteCell.appendChild(deleteButton);
    });
}

displayProducts();

document.getElementById('product-form').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const newProductNameInput = document.getElementById('product-name');
    const newProductName = newProductNameInput.value.trim();

    if (newProductName) {
        
        products.push(newProductName); 
        
        displayProducts(); 
        
        newProductNameInput.value = '';
        showMessage(`Added: "${newProductName}" to the List.`);
    } else {
        showMessage('Please fill the product name', 'red');
    }
});

function showMessage(msg, color = 'green') {
    msge.textContent = msg;
    msge.style.color = color;
    setTimeout(() => {
        msge.textContent = '';
    }, 3000); 
}

const editForm = document.getElementById('edit-form');
const editNameInput = document.getElementById('edit-product-name');
const editIdInput = document.getElementById('edit-id');
const cancelEditBtn = document.getElementById('cancel-edit-btn');

function showEditForm(index, productName) {
    
    editForm.style.display = 'block';
    editNameInput.value = productName; 
    editIdInput.value = index;         
    document.getElementById('product-name').focus(); 
    showMessage(`Editing the product name number ${index + 1}.`);
}

editForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const index = parseInt(editIdInput.value); 
    const newName = editNameInput.value.trim(); 

    if (newName) {
        
        products[index] = newName; 
           
        displayProducts(); 
        
        editForm.style.display = 'none';
        showMessage(`Edited Product number ${index + 1} to "${newName}"`);
    } else {
        showMessage('Product name cannot be blank.', 'red');
    }
});

cancelEditBtn.addEventListener('click', () => {
    editForm.style.display = 'none';
    showMessage('');
});

function deleteProduct(index) {
    const productName = products[index];


    if (confirm(`Are you sure want to delete product: "${productName}"?`)) {
        
        products.splice(index, 1); 

        displayProducts();
        showMessage(`Deleted "${productName}" out of the list.`);
        editForm.style.display = 'none'; 
    }
}