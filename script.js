// Detect current page
var currentPage = document.body.getAttribute("data-page");

//Disable search on non-product pages
var searchInput = document.getElementById("searchInput");
var searchButton = document.querySelector(".header-icons button");

if(currentPage !== "product"){
    if (searchInput) searchInput.disabled = true;
    if (searchButton) searchButton.disabled = true;
}

// Search
function searchProducts(){
    var input = document.getElementById("searchInput").value.toLowerCase();
    var products = document.querySelectorAll(".product-card");
    var found = false;

    products.forEach(function(box){
        var img = box.querySelector("img");
        var productName = img.alt.toLowerCase();

        if (productName.includes(input)){
            box.style.display = "block";
            found = true;
        }

        else{
            box.style.display = "none";
        }
    });
    if (!found){
        alert("No matching products found.");
    }
}
    

//Product Details
function showProductDetails(name, description){
    alert("Product Name: " + name + "\n\nDescription: " + description);
}

//Cart logic
function addToCart(productName){
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(productName);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(productName + " added to cart. ");
}

function clearCart(){
    localStorage.removeItem("cart");
    location.reload();
}

//Filter
function filterProducts(category){
    var products = document.querySelectorAll(".image-box");

    products.forEach(function (product){
        if (category === "all" || product.dataset.category === category ){
            product.style.display = "block"; 
        }
        else{
            product.style.display = "none";
        }
    });
}

//Cart display
document.addEventListener("DOMContentLoaded", function(){
    var cartList = document.getElementById("cartItems");

    if (cartList){
        var cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (cart.length === 0){
            cartList.innerHTML = "<li><strong>Your cart is empty.</strong></li>";
        }
        else{
            cart.forEach(function(item){
                var li = document.createElement("li");
                li.textContent = item;
                cartList.appendChild(li);
            });
        }
        
    }
    //feedback form
    var feedbackForm = document.getElementById("feedbackForm");
    if (feedbackForm){
        feedbackForm.addEventListener("submit", function (event){
            event.preventDefault();

            var name = document.getElementById("name").value.trim();
            var email = document.getElementById("email").value.trim();
            var message = document.getElementById("message").value.trim();

            if (!name || !email || !message){
                alert("Please fill in all the fields before submitting.");
            }
            else{
                alert("Thank you for your feedback!");
                feedbackForm.reset();
            }
        });
    }
});