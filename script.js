let products = [
    {
        name: "Congratulations",
        image: "https://res.cloudinary.com/fleurop/h_550,q_auto,f_auto/products/national/fullsize/bs_76568.jpg",
        price: 35,
        qtty: 1
    },
    {
        name: "Happy Day!",
        image: "https://res.cloudinary.com/fleurop/h_550,q_auto,f_auto/products/national/fullsize/bs_79610_s.jpg",
        price: 40,
        qtty: 1
    },
    {
        name: "Happy Day with Thermal Gin",
        image: "https://res.cloudinary.com/fleurop/h_550,q_auto,f_auto/products/national/fullsize/at_happy_day_thermal_gin.jpg",
        price: 49,
        qtty: 1
    },
    {
        name: "Milka Hauchzarte Herzen",
        image: "https://res.cloudinary.com/fleurop/h_550,q_auto,f_auto/products/national/fullsize/at0560.jpg",
        price: 59,
        qtty: 1
    },
    {
        name: "Sunny vibes",
        image: "https://res.cloudinary.com/fleurop/h_550,q_auto,f_auto/products/national/fullsize/bs_75524_s.jpg",
        price: 79,
        qtty: 1
    },
    {
        name: "Fairy Tale in Pink",
        image: "https://res.cloudinary.com/fleurop/h_550,q_auto,f_auto/products/national/fullsize/bs_79826_s.jpg",
        price: 60,
        qtty: 1
    }
];

for (let product of products) {
    document.getElementById("grid").innerHTML += `
        <div>
            <div class="card" style="width: 18rem;">
                <img src="${product.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text"><i>${product.name}</i></p>
                    <p class="card-text">${product.qtty}</p>
                    <p class="card-text">${product.price}€</p>
                    <button type="button" class="btn btn-primary addToCart">Add Cart</button>
                </div>
            </div>
        </div>
    `;
}

let cart = [];
let btns = document.getElementsByClassName("addToCart");

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        if (cart.find((value) => value.name === products[i].name)) {
            products[i].qtty++;
        } else {
            cart.push(products[i]);
            console.log(products[i]);
        }
        console.table(cart);
        createCart();
    });
}

function createCart() {
    document.getElementById("cart").innerHTML = "";
    for (let val of cart) {
        document.getElementById("cart").innerHTML += `
            <div class="flex">
                <p><img src="${val.image}" width="100"></p>
                <p>${val.name}</p>
                <p><span class="minus">-</span> <span class="qtty">${val.qtty}</span> <span class="plus">+</span></p>
                <p>${val.price}€</p>
                <p class="closeX">X</p>
            </div>
        `;
    }
    
    let plus = document.getElementsByClassName("plus");
    let minus = document.getElementsByClassName("minus");
    let closeX = document.getElementsByClassName("closeX");
    
    for (let i = 0; i < plus.length; i++) {
        plus[i].addEventListener("click", function () {
            cart[i].qtty++;
            document.getElementsByClassName("qtty")[i].innerHTML = cart[i].qtty;
            total();
        });
    
        minus[i].addEventListener("click", function () {
            if (cart[i].qtty === 1) {
                cart.splice(i, 1);
                createCart();
            } else {
                cart[i].qtty--;
                document.getElementsByClassName("qtty")[i].innerHTML = cart[i].qtty;
            }
            total();
        });
    
        closeX[i].addEventListener("click", function () {
            cart[i].qtty = 1;
            cart.splice(i, 1);
            createCart();
            total();
        });
    }
    
    total();
}

function total() {
    let total = 0;
    for (let val of cart) {
        total += val.price * val.qtty;
    }
    document.getElementById("total").innerHTML = `${total}€`;
}

createCart();
