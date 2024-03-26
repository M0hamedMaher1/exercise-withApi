let tbody = document.getElementById("tbody");
let deleteAll = document.getElementById("deleteAll");

let product;
if(localStorage.getItem("kk") == null){
    product = [];
    checkBtn();
}else{
    product = JSON.parse(localStorage.getItem("kk"));
};

function displayItems(){
    let card = "";
    for(let i in product){
        card += `
        <tr>
        <td>${product[i].recipe_id}</td>
        <td>${product[i].title}</td>
        <td>${product[i].publisher}</td>
        <td>${product[i].social_rank}</td>
        <td><img src="${product[i].image_url}" alt="" class="img-fluid w-25"></td>
        <td>${product[i].count}</td>
        <td><button onclick="deleteElement(${i})" class="btn btn-danger">Remove</button></td>
        </tr>
        `
    };
    tbody.innerHTML = card;
};
displayItems();

function checkBtn(){
    if(product.length == 0){
        deleteAll.style.display = "none";
    }else{
        deleteAll.style.display = "inline-block";
    };
};

deleteAll.addEventListener("click", function(){
    product.splice(0);
    localStorage.clear();
    checkBtn();
    displayItems();
});

function deleteElement(index){
    product.splice(index, 1);
    localStorage.setItem("kk", JSON.stringify(product));
    checkBtn();
    displayItems();
};