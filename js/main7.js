window.addEventListener("scroll", function () {
    const nav = document.querySelector(".nav");
    let x = scrollY;
    if (x > 200) {
        nav.style.transform = "translateY(0)";
    } else {
        nav.style.transform = "translateY(calc(-100% + -1px))";
    };
});

let bars = document.querySelector(".bars");
let close1 = document.querySelector(".close");
let aside = document.querySelector(".aside1");

bars.addEventListener("click", function () {
    aside.style.transform = "translateX(0)";
});

close1.addEventListener("click", function () {
    aside.style.transform = "translateX(calc(-100% + -2px))"
});

let right = document.getElementById("right");
let left = document.getElementById("left");
let rowSlide = document.querySelector(".testing-row");

right.addEventListener("click", function () {
    rowSlide.style.transform = "translateX(-50%)"
});

left.addEventListener("click", function () {
    rowSlide.style.transform = "translateX(0%)"
});

let fourButtons = document.querySelectorAll(".four-buttons button");

function count() {
    setInterval(() => {
        fourButtons[3].innerHTML--;
        if (fourButtons[3].innerHTML == 0) {
            fourButtons[3].innerHTML = 60;
            fourButtons[2].innerHTML--
            if (fourButtons[2].innerHTML == 0) {
                fourButtons[2].innerHTML = 59
                fourButtons[1].innerHTML--
            }
        };
        if (fourButtons[1].innerHTML == 0) {
            fourButtons[3].innerHTML = 0
            fourButtons[2].innerHTML = 0
            fourButtons[1].innerHTML = 0
        }
    }, 1000)
};
count();

let row = document.getElementById("row");
let spanCount = document.querySelector(".cart i span");
let navLinks = document.querySelectorAll(".nav-links");

let list = [];

let cart;
if (localStorage.getItem("kk") == null) {
    cart = [];
} else {
    cart = JSON.parse(localStorage.getItem("kk"));
}

const getData = async function (swap) {
    let api = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${swap}`);
    let response = await api.json();
    let recipes = response.recipes;
    list = recipes;
    displayProducts(recipes);
};
getData("Pizza");

function displayProducts(take) {
    let card = "";
    take.forEach((item, index) => {
        card += `
        <div class="cards">
        <div class="image2">
            <span>sale</span>
            <img src="${item.image_url}" alt="">
            <div class="icons2">
                <div class="icon2" onclick="counts()"><i class="scale fa-regular fa-heart"></i></div>
                <div class="icon2"><i class="scale fa-regular fa-eye"></i></div>
                <div class="icon2"><i class="rotate fa-solid fa-rotate"></i></div>
            </div>
            <button class="addToCart" onclick="addToCart(${index})">
                add to cart
            </button>
        </div>
        <div class="card-body2">
            <h4>${item.title}</h4>
            <h5>${item.publisher}</h5>
            <h5>$${item.social_rank}</h5>
            <button class="quick" onclick="openInfo(${index})">
                Quick View
            </button>
        </div>
    </div>
        `
    });
    row.innerHTML = card;
};

navLinks.forEach((items) => {
    items.addEventListener("click", function (e) {
        getData(e.target.textContent);
    });
});

function addToCart(index) {
    let choosenProduct = list[index];
    let final = cart.find((item) => item.recipe_id == choosenProduct.recipe_id);
    if (final) {
        final.count++;
    } else {
        cart.push({
            ...choosenProduct,
            count: 1
        });
    };
    spanCount.innerHTML = cart.length;
    localStorage.setItem("kk", JSON.stringify(cart));
};

let overlay = document.querySelector(".overlay");
let leftImage = document.querySelector(".left-image")
let closeInfo = document.querySelector(".close2");
let h3 = document.querySelector(".right-info h3");

function openInfo(index) {
    overlay.style.display = "flex";
    let src = list[index].image_url;
    let name = list[index].title;
    leftImage.style.backgroundImage = `url(${src})`;
    h3.innerText = name;
};

closeInfo.addEventListener("click", function () {
    overlay.style.display = "none";
});

let hearts = document.querySelectorAll(".icon .fa-heart, .icon2 .fa-heart");
let bigHeart = document.querySelector(".heartt span");

let counter = 0;

function counts() {
    counter++;
    bigHeart.innerHTML = counter;
}

hearts.forEach((item) => {
    item.addEventListener("click", function () {
        counter++;
        bigHeart.innerHTML = counter;
    });
});

function searchProduct(searching){
    let card = "";
    list.forEach((item, index) => {
        if(item.title.includes(searching.trim())){
            card += `
            <div class="cards">
            <div class="image2">
                <span>sale</span>
                <img src="${item.image_url}" alt="">
                <div class="icons2">
                    <div class="icon2" onclick="counts()"><i class="scale fa-regular fa-heart"></i></div>
                    <div class="icon2"><i class="scale fa-regular fa-eye"></i></div>
                    <div class="icon2"><i class="rotate fa-solid fa-rotate"></i></div>
                </div>
                <button class="addToCart" onclick="addToCart(${index})">
                    add to cart
                </button>
            </div>
            <div class="card-body2">
                <h4>${item.title}</h4>
                <h5>${item.publisher}</h5>
                <h5>$${item.social_rank}</h5>
                <button class="quick" onclick="openInfo(${index})">
                    Quick View
                </button>
            </div>
            </div>
            `
        };
    });
    row.innerHTML = card;
};