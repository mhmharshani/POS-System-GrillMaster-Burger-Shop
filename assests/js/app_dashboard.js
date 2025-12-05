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
    
    // console.log(localStorage.getItem("item_array"));
    
}

get_item_data();

let card_container = document.getElementById("item_card_container");

function find_name_list(category){
    let temp_name_array=[];
    item_array.forEach(e =>{
        let count=0;
        if(e.category===category){
            for(let i=0;i<temp_name_array.length;i++){
                if(temp_name_array[i]==e.name){
                    count++;
                    break;
                }
            }
            if(count==0){
                temp_name_array.push(e.name);
            }
        }
    })

    return temp_name_array;
}

function load_cards(category){

    card_container.innerHTML="";
    let temp_name_array = find_name_list(category);

    temp_name_array.forEach(name =>{           
        for(let i=0;i<item_array.length;i++){
            if(item_array[i].name===name){
                
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

                                        <h6 class="card-title">${item_array[i].name}</h6>
                                       
                                        <select id="size_dd" name="size" style="background-color: #FEFEFE; margin-bottom: 20px; font-size: 14px; border: none; padding: 8px; border-radius: 10px; font-family: Inter; color: #383F53;">
                                            <option value=${item_array[i].size} selected >${item_array[i].size}</option>
                                            
                                        </select>

                                        <div style="display: flex; justify-content: space-around;">
                                            <p class="card-text fw-bold"><small
                                                class="text-body-secondary">Rs. <span id="price_tag" >${item_array[i].price}</span></small></p>
                                            <div class="quantity-control">  
                                                <input type="number" id="quantity" value="0" min="0" max="10" step="1">    
                                            </div>
                                        </div>
                                        <div class="stock_label">
                                            <label for="" style="font-size: 12px;">In Stock -<span id="stock_tag">${item_array[i].stock}</span></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                break;
            }
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

let button_cart = document.getElementById("button_add_cart");

card_container.addEventListener("click", function(event){

    const clicked_cart = event.target.closest("#button_add_cart");

    if(clicked_cart!=null){
        let clicked_card = clicked_cart.offsetParent;

        console.log(clicked_cart.offsetParent);
        const title = clicked_card.querySelector(".card-title").innerText;
        console.log(title);

        const size = clicked_card.querySelector("#size_dd").value;
        console.log(size);

        let qty = clicked_card.querySelector("#quantity").value;
        if(qty==="0"){
            qty="1";
            clicked_card.querySelector("#quantity").value = qty;
        }
        console.log(qty);

        // const stockInit = clicked_card.querySelector("#stock_tag").innerText;
        // let stock = ""+(Number(stock)-Number(qty));
        // console.log(stock);
        // clicked_card.querySelector("#stock_tag").innerText = stock;

        const price = clicked_card.querySelector("#price_tag").innerText;
        console.log(price);

        //---------------------------------------------------------------

        let cart_item = document.getElementById("cart_item");
        cart_item.innerHTML +=`<li class="list-group-item d-flex justify-content-between align-items-start margin-bottom: 0px; margin-right:5px; margin-left:0px">
                            <div class="ms-2 me-auto mb-0">
                                <div class="fw-bold" id="title">${title}</div>
                                <p style="margin-bottom: 5px;" id="size">${size}</p>
                                <div style="display: flex; justify-content: start;">
                                    <p>Rs.<span id="unit_price">${price}</span></p>
                                    <div class="quantity-control">  
                                        <input type="number" id="quantity" value=${qty} min="0" max="10" step="1">    
                                    </div>
                                    <p style="margin-left: 0%; font-weight: bold;"> <br> Rs.<span id="total">${price*qty}</span></p>
                                </div>
                            </div>
                            
                        </li>`;

        // <span class="badge rounded-pill" style="background-color:#383F53;">NEW</span>

        let cart_data ={
            "name": title,
            "size": size,
            "price": price,
            "quantity": qty 
        }

    }

    
})






// const title = clicked_card.querySelector(".card-body p").innerText;
    // console.log(title);
    

    // if(localStorage.getItem("recipe_url")!==null){
    //     localStorage.removeItem("recipe_url");
    //     url_stored = `https://www.themealdb.com/api/json/v1/1/search.php?s=${title}`;
    //     localStorage.setItem("recipe_url", url_stored);
    //     console.log("in card set local storage"+localStorage.getItem("recipe_url"));
        
    // }

    // window.location.href = "recipes.html";

//     const clicked_size_dd = event.target.closest("#size_dd");
//     clicked_size_dd.innerHTML ="";

//     if(clicked_size_dd!=null){
//         let clicked_card = clicked_size_dd.offsetParent;

//         const name = clicked_card.querySelector(".card-title").innerText;
//         console.log(name);
        
//         item_array.forEach(e =>{

//             if(name === e.name){
//                 clicked_size_dd.innerHTML += `<option value=${e.size} selected >${e.size}</option>`;
//             }

//         })


//         // clicked_size_dd.innerHTML = 
//     }

//     console.log(clicked_size_dd);

//-----------------------------------------------

// document.addEventListener('DOMContentLoaded', (event) => {
//         const carOptions = [
//             { value: 'audi', text: 'Audi' },
//             { value: 'bmw', text: 'BMW' }
//         ];
//         const selectElement = document.getElementById('car-select');

//         let optionsHtml = '<option value="">--Please choose an option--</option>';
//         carOptions.forEach(car => {
//             optionsHtml += `<option value="${car.value}">${car.text}</option>`;
//         });

//         selectElement.innerHTML = optionsHtml;
//     });



