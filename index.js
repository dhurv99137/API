// Initially display all products
fetch("https://dummyjson.com/products")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        displayProducts(data.products);
    });

// Event listeners for category buttons
document.getElementById("smartphones").addEventListener("click", () => {
    search("smartphones");
});

document.getElementById("laptops").addEventListener("click", () => {
    search("laptops");
});

document.getElementById("fragrances").addEventListener("click", () => {
    search("fragrances");
});

document.getElementById("skincare").addEventListener("click", () => {
    search("skincare");
});

document.getElementById("groceries").addEventListener("click", () => {
    search("groceries");
});

document.getElementById("home-decoration").addEventListener("click", () => {
    search("home-decoration");
});

// Event listener for search input
document.getElementById("search").addEventListener("input", () => {
    search();
});

// Search function with optional category parameter
const search = (category = "") => {
    const query = document.getElementById("search").value.toLowerCase();

    fetch("https://dummyjson.com/products")
        .then(response => response.json())
        .then(data => {
            const filteredProducts = data.products.filter(product => {
                const title = product.title.toLowerCase();
                const description = product.description.toLowerCase();
                const brand = product.brand.toLowerCase();
                const productCategory = product.category.toLowerCase();
                
                return (!category || productCategory === category.toLowerCase()) &&
                       (title.includes(query) || description.includes(query) || brand.includes(query) || productCategory.includes(query));
            });

            displayProducts(filteredProducts);
        });
}


const displayProducts = (products) => {
    let tableData = "";
    products.forEach((product) => {
        tableData += `
        <tr>
            <td>${product.title}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>@${product.brand}</td>
            <td>${product.category}</td>
            <td><img src="${product.thumbnail}" alt="Thumbnail"></td>
        </tr>
        `;
    });
    document.getElementById("table-body").innerHTML = tableData;
}
