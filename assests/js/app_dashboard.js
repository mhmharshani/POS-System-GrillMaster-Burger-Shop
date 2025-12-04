console.log("JS Loaded - Dashboard");

let item_array = [];
let order_array = [];
let cart_array = [];
let customer_array = [];

async function get_item_data(){

    await fetch("../assests/resources/data.json")
    .then(res => res.json())
    .then(data => {
                
        console.log(data);
        console.log(data.items[1]);

        let size = data.items.length;

        for(let i=0;i<size;i++){
            item_array[i]=data.items[i];
        } 
        localStorage.setItem("item_array",JSON.stringify(item_array));
    })

    load_cards("Burger");
    
    console.log(localStorage.getItem("item_array"));
    
}

get_item_data();

let card_container = document.getElementById("item_card_container");

function load_cards(category){
    card_container.innerHTML="";
    console.log("Hiiii");
    console.log(item_array.length);
    item_array.forEach(e =>{
        console.log("Hiiii");
    
        if(e.category===category){

            card_container.innerHTML += `<div class="col">
                        <div class="card h-80" style="max-width: 540px;" id="item_card">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src="assests/img/Burger_item.jpg"
                                        class="img-fluid rounded-start" alt="..." id="item_image">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body pt-1 pe-1 pb-1 ps-3">
                                        <div style="display: flex; justify-content: end;">
                                            <button class="btn" id="button_add_cart"><img
                                                    src="assests/img/icon_add_cart.png" alt=""></button>
                                        </div>

                                        <h6 class="card-title">${e.name}</h6>
                                       
                                        <select id="size_dd" name="size" style="background-color: #FEFEFE; margin-bottom: 20px; font-size: 14px; border: none; padding: 8px; border-radius: 10px; font-family: Inter; color: #383F53;">
                                            <option value="Small" selected >Small</option>
                                            <option value="Medium" >Medium</option>
                                            <option value="Large">Large</option>
                                        </select>

                                        <p class="card-text fw-bold"><small
                                                class="text-body-secondary">Rs. ${e.price}</small></p>

                                        <div class="stock_label">
                                            <label for="" style="font-size: 12px;">In Stock - ${e.stock}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
        }
                
    })
}


let btn_burger = document.getElementById("button_burger");
let btn_submarine = document.getElementById("button_submarine");
let btn_pasta = document.getElementById("button_pasta");
let btn_chicken = document.getElementById("button_chicken");
let btn_fries = document.getElementById("button_fries");
let btn_beverage = document.getElementById("button_beverage");

btn_burger.addEventListener("click", e =>{
    load_cards("Burger");
});

btn_submarine.addEventListener("click", e =>{
    load_cards("Submarine");
});

btn_pasta.addEventListener("click", e =>{
    load_cards("Pasta");
});

btn_chicken.addEventListener("click", e =>{
    load_cards("Chicken");
});

btn_fries.addEventListener("click", e =>{
    load_cards("Fries");
});

btn_beverage.addEventListener("click", e =>{
    load_cards("Beverages");
});



