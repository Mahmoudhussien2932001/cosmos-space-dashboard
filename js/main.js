// ===============================
// Get HTML Elements
// ===============================

var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var productImage = document.getElementById("productImage");

var productsContainer = document.getElementById("productsContainer");
var searchInput = document.getElementById("searchInput");
var addBtn = document.getElementById("addBtn");


// ===============================
// Products Array
// ===============================

var products = [];


// ===============================
// Update Index
// ===============================

var updateIndex = null;


// ===============================
// Load Products From LocalStorage
// ===============================

if (localStorage.getItem("products") !== null) {

  products = JSON.parse(
    localStorage.getItem("products")
  );

  displayProducts(products);
}


// ===============================
// Add Product
// ===============================

function addProduct() {

  if (
    productName.value.trim() === "" ||
    productPrice.value.trim() === "" ||
    productCategory.value.trim() === "" ||
    productDesc.value.trim() === ""
  ) {

    alert("Please fill all fields");

    return;
  }


  if (updateIndex !== null) {

    updateProduct();

    return;
  }


  var file = productImage.files[0];


  if (file) {

    var reader = new FileReader();

    reader.onload = function () {

      createProduct(reader.result);

    };

    reader.readAsDataURL(file);

  } else {

    createProduct(
      "https://placehold.co/600x400?text=No+Image"
    );

  }

}


// ===============================
// Create Product
// ===============================

function createProduct(image) {

  var product = {

    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDesc.value,
    image: image

  };


  products.push(product);


  saveProducts();

  displayProducts(products);

  clearForm();

}


// ===============================
// Display Products
// ===============================

function displayProducts(productList) {

  var cartona = "";


  for (var i = 0; i < productList.length; i++) {

    var actualIndex = products.indexOf(productList[i]);


    cartona += `

      <div class="col-md-6 col-lg-4">

        <div class="card product-card h-100 border-0 shadow-sm">

          <img
            src="${productList[i].image}"
            class="product-image"
            alt="${productList[i].name}"
          >

          <div class="card-body">

            <h4 class="card-title fw-bold">
              ${productList[i].name}
            </h4>

            <p class="text-muted">
              ${productList[i].description}
            </p>

            <p class="mb-1">
              <strong>Price :</strong>
              ${productList[i].price}
            </p>

            <p class="mb-4">
              <strong>Category :</strong>
              ${productList[i].category}
            </p>

            <div class="d-flex justify-content-between">

              <button
                onclick="setProductForUpdate(${actualIndex})"
                class="btn btn-warning"
              >
                <i class="fa-solid fa-pen me-1"></i>
                Update
              </button>

              <button
                onclick="deleteProduct(${actualIndex})"
                class="btn btn-danger"
              >
                <i class="fa-solid fa-trash me-1"></i>
                Delete
              </button>

            </div>

          </div>

        </div>

      </div>

    `;

  }


  productsContainer.innerHTML = cartona;

}


// ===============================
// Clear Form
// ===============================

function clearForm() {

  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDesc.value = "";
  productImage.value = "";

  updateIndex = null;

  addBtn.innerHTML = "Add Product";

  addBtn.classList.remove("btn-warning");
  addBtn.classList.add("btn-primary");

}


// ===============================
// Delete Product
// ===============================

function deleteProduct(index) {

  var confirmDelete = confirm(
    "Are you sure you want to delete this product?"
  );


  if (!confirmDelete) {

    return;

  }


  products.splice(index, 1);


  saveProducts();

  displayProducts(products);

}


// ===============================
// Set Product For Update
// ===============================

function setProductForUpdate(index) {

  updateIndex = index;


  productName.value = products[index].name;

  productPrice.value = products[index].price;

  productCategory.value = products[index].category;

  productDesc.value = products[index].description;


  addBtn.innerHTML = "Update Product";

  addBtn.classList.remove("btn-primary");
  addBtn.classList.add("btn-warning");


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


// ===============================
// Update Product
// ===============================

function updateProduct() {

  var file = productImage.files[0];


  if (file) {

    var reader = new FileReader();


    reader.onload = function () {

      products[updateIndex] = {

        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        description: productDesc.value,
        image: reader.result

      };


      finishUpdate();

    };


    reader.readAsDataURL(file);

  } else {

    products[updateIndex].name =
      productName.value;

    products[updateIndex].price =
      productPrice.value;

    products[updateIndex].category =
      productCategory.value;

    products[updateIndex].description =
      productDesc.value;


    finishUpdate();

  }

}


// ===============================
// Finish Update
// ===============================

function finishUpdate() {

  saveProducts();

  displayProducts(products);

  clearForm();

}


// ===============================
// Search Products
// ===============================

function searchProducts() {

  var searchValue =
    searchInput.value.toLowerCase();


  var filteredProducts =
    products.filter(function (product) {

      return (
        product.name
          .toLowerCase()
          .includes(searchValue)

        ||

        product.category
          .toLowerCase()
          .includes(searchValue)
      );

    });


  displayProducts(filteredProducts);

}


// ===============================
// Save Products
// ===============================

function saveProducts() {

  localStorage.setItem(
    "products",
    JSON.stringify(products)
  );

}