function showSidebar() {
    const sidebar = document.querySelector('.container-2');
    sidebar.style.display = 'flex';
}

function hideSidebar() {
    const sidebar = document.querySelector('.container-2');
    sidebar.style.display = 'none';
}

function showAdd() {
    const sidebar = document.querySelector('.container-3');
    sidebar.style.display = 'flex';
}

function closeAdd() {
    const sidebar = document.querySelector('.container-3');
    sidebar.style.display = 'none';
}

let productList = JSON.parse(localStorage.getItem('productList')) || [];

function addbtn(event) {
    event.preventDefault();

    const prodName = document.getElementById('name').value;
    const prodDesc = document.getElementById('desc').value;
    const prodPrice = document.getElementById('price').value;
    const imageUpload = document.querySelector('#imageUpload');

    const newProduct = {
        name: prodName,
        description: prodDesc,
        price: prodPrice,
        image: '' 
    };

    if (imageUpload.files && imageUpload.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            newProduct.image = e.target.result;

            productList.push(newProduct);
            localStorage.setItem('productList', JSON.stringify(productList));

            document.getElementById('itemAddForm').reset();
            displayProductList();
        };
        reader.readAsDataURL(imageUpload.files[0]);
    } else {
        newProduct.image = './img/question-mark.jpg';
        productList.push(newProduct);
        localStorage.setItem('productList', JSON.stringify(productList));

        document.getElementById('itemAddForm').reset();
        displayProductList();
    }
}

function displayProductList() {
    const container = document.querySelector('.container-1');
    const sidebarContainer = document.getElementById('productSidebarContainer');
    container.innerHTML = '';
    sidebarContainer.innerHTML = '';

    productList.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        const img = document.createElement('img');
        img.src = item.image || './img/question-mark.jpg';
        itemDiv.appendChild(img);

        const itemName = document.createElement('span');
        itemName.textContent = 'Product Name: ' + item.name;
        itemDiv.appendChild(itemName);

        const desc = document.createElement('span');
        desc.textContent = 'Description: ' + item.description;
        itemDiv.appendChild(desc);

        const price = document.createElement('span');
        price.textContent = 'Price: P' + item.price;
        itemDiv.appendChild(price);

        const doneButton = document.createElement('button');
        doneButton.textContent = 'Done';
        doneButton.addEventListener('click', () => {
            productList = productList.filter(product => product.name !== item.name);
            localStorage.setItem('productList', JSON.stringify(productList));
            displayProductList();
        });
        itemDiv.appendChild(doneButton);

        container.appendChild(itemDiv);

        const sidebarProductName = document.createElement('span');
        sidebarProductName.textContent = item.name;
        sidebarContainer.appendChild(sidebarProductName);
    });
}

displayProductList();
