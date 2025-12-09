console.log("JS Loaded - Dashboard");

let item_array=[];
let order_array=[];
let cart_array=[];
let customer_array=[];

let txt_order_id = document.getElementById("txt_order_id");

function set_order_details(){
    
    let temp_order_array = JSON.parse(localStorage.getItem("order_array"));   
    txt_order_id.innerText = generate_order_id(temp_order_array);
}

set_order_details();

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

}

get_item_data();

let card_container = document.getElementById("item_card_container");

//----------Find item names for one category-----------------
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
                        <div class="card h-100" style="max-width: 540px;" id=${"item-card-"+item_array[i].id}>
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src=${item_array[i].item_thumb}
                                        class="img-fluid rounded-start" alt="..." id="item_image">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body pt-1 pe-1 pb-1 ps-3">
                                        <div style="display: flex; justify-content: end;">
                                            <button class="btn" id="button_add_cart"><img
                                                    src="assests/img/icon_add_cart.png" alt=""></button>
                                        </div>

                                        <h6 class="card-title">${item_array[i].name}</h6>
                                       
                                        <select id=${item_array[i].id} name="size" class="size_dd" style="background-color: #FEFEFE; margin-bottom: 20px; font-size: 14px; border: none; padding: 8px; border-radius: 10px; font-family: Inter; color: #383F53;">
                                            <option value="0" selected >${item_array[i].portion[0]}</option>
                                            
                                        </select>

                                        <div style="display: flex; justify-content: space-around;">
                                            <p class="card-text fw-bold"><small
                                                class="text-body-secondary">Rs. <span id="price_tag" >${item_array[i].price[0]}</span></small></p>
                                            <div class="quantity-control">  
                                                <input type="number" id="quantity" value="0" min="0" max="10" step="1">    
                                            </div>
                                        </div>
                                        <div class="stock_label">
                                            <label for="" style="font-size: 12px;">In Stock -<span id="stock_tag">${item_array[i].stock[0]}</span></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                

                let size_dd = document.getElementById(item_array[i].id);
                for(let j=1;j<item_array[i].portion.length;j++){
                    size_dd.innerHTML += `<option value="${j}">${item_array[i].portion[j]}</option>`;
                }
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

//------------------------ok----------------------------------

//--------------------Set order id------------------

let cart_list_item_array=[];
let cart_total=0;

card_container.addEventListener("click", function(event){    
    
    const clicked_cart = event.target.closest("#button_add_cart");  

    if(clicked_cart!=null){
        let clicked_card = clicked_cart.offsetParent;

        console.log(clicked_cart.offsetParent);
        const title = clicked_card.querySelector(".card-title").innerText;
        console.log(title);

        const portion = clicked_card.querySelector(".size_dd").selectedOptions[0].innerText;
        console.log(portion);

        let qty = clicked_card.querySelector("#quantity").value;
        if(qty==="0"){
            qty="1";
            clicked_card.querySelector("#quantity").value = qty;
        }
        console.log(qty);

        const price = clicked_card.querySelector("#price_tag").innerText;
        console.log(price);

        const discount = clicked_card.querySelector("#price_tag").innerText;


        //---------------------------------------------------------------

        let cart_item = document.getElementById("cart_item");
        cart_item.innerHTML +=`<li class="list-group-item d-flex justify-content-between align-items-start margin-bottom: 0px; margin-right:5px; margin-left:0px">
                            <div class="ms-2 me-auto mb-0">
                                <div class="fw-bold" id="title">${title}</div>
                                <p style="margin-bottom: 5px;" id="size">${portion}</p>
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
        
        let cart_list_item ={
            "name": title,
            "size": portion,
            "price": price,
            "discount": discount,
            "quantity": qty 
        }

        cart_list_item_array.push(cart_list_item);
        let total = 0;
        
        let sub_total= document.getElementById("txt_sub_total");
        let disc = document.getElementById("txt_discount");
        let grand_total = document.getElementById("txt_grand_total");

        cart_list_item_array.forEach(item =>{
            total += (item.quantity*item.price);
        })
        sub_total.innerText = total;
        grand_total.innerText = total;

        cart_total = total;
    }

    
});

//---------------price and stock change as per Drop down change---------------------

card_container.addEventListener("change", function(event){

    let clicked_select = event.target;
    let drop_down_id = clicked_select.id;
    console.log(event.target);

    let clicked_card = clicked_select.offsetParent;
    

    item_array.forEach(item =>{
        if(item.id === drop_down_id){
            clicked_card.querySelector("#price_tag").innerText = item.price[event.target.value];
            clicked_card.querySelector("#stock_tag").innerText = item.stock[event.target.value];
        }
    })
    
    
})

console.log(order_array);


function generate_order_id(order_array){
    if(order_array.length==0){
        return "ODR0001";
    }
    else{
        let order_id = order_array[order_array.length-1].id;
        let num= Number(order_id.substring(3,7));          
        return "ODR"+String(num+1).padStart(4,'0');
    }
}

function generate_cart_id(){
    if(cart_array.length==0){
        return "CT0001";
    }
    else{
        let cart_id = cart_array[cart_array.length-1].id;
        let num= Number(cart_id.substring(2,6));          
        return "CT"+String(num+1).padStart(4,'0');
    }
}



let btn_place_order = document.getElementById("button_place_order");
let customer_id = "";

btn_place_order.addEventListener("click", e =>{

    console.log("clicked place order btn");

    //------------------------------------
    if(localStorage.getItem("order_array")!=null){
        order_array = JSON.parse(localStorage.getItem("order_array"));   
        localStorage.removeItem("order_array");
    }

    if(localStorage.getItem("cart_array")!=null){
        cart_array = JSON.parse(localStorage.getItem("cart_array"));   
        localStorage.removeItem("cart_array");
    }

    //--------------------------------------
    
    let cart_id = generate_cart_id();
    let cart ={
        "id" : cart_id,
        "cart_list_item" : cart_list_item_array,
        "total" : cart_total
    }
    cart_array.push(cart);

    console.log(cart_array)
    localStorage.setItem("cart_array",JSON.stringify(cart_array));

    let order_id = txt_order_id.innerText;

    let order ={
        "id" : order_id,
        "cust_id" : customer_id,
        "cart_id" : cart_array[cart_array.length-1].id,
        "total" : cart_array[cart_array.length-1].total,
        "status" : "New Order"
    }

    order_array.push(order);
    console.log(order_array);
    localStorage.setItem("order_array",JSON.stringify(order_array));

    alert("Order placed successfully. Have a nice meal!");
   
    load_order_queue();
})


let btn_find_customer = document.getElementById("button_find_customer");
let dialog_box = document.getElementById("dialog_box_find_customer");
let btn_search = document.getElementById("search_button");
let btn_cancel = document.getElementById("cancel_button");
let current_customer = document.getElementById("current_customer");

btn_find_customer.addEventListener("click", e =>{
    console.log("clicked search customer");
    dialog_box.showModal();
})

btn_search.addEventListener("click", e=>{
    let customer_data_array = JSON.parse(localStorage.getItem("cust_array"));
    let phone = document.getElementById("dtxt_phone").value;
    let isExist=false;
    customer_data_array.forEach(customer => {
        if(phone===customer.phone_number){
            current_customer.innerText=customer.name;
            customer_id = customer.id;
            isExist=true;
        }
    });

    if(!isExist){
        alert("No Customer registered on that phone number. Try add new customer.");
    }
});

function load_order_queue(){
    let order_data_array = JSON.parse(localStorage.getItem("order_array"));
    let order_queue_container = document.getElementById("order_queue_container");
    
    order_queue_container.innerHTML = "";

    let size = order_data_array.length;
        
    let i=1;
    
    while((i<5)&&(size>=i)){
        let order = order_data_array[size-i];
                
        let cust_name = search_customer_name(order.cust_id);
        order_queue_container.innerHTML += `<div class="col ">
                        <div class="card order_card" style="width: 14rem;">
                            <div class="card-body">
                                <div style="display: flex; justify-content: space-between;">
                                    <h6 class="card-title" style="font-weight: bold;">${cust_name}</h6>
                                    <h6>${order.id}</h6>
                                </div>
                                <h6 class="card-subtitle mb-2 text-body-secondary" style="font-size: 13px;">2 Items</h6>
                                <div class="order_status">
                                    <label for="">${order.status}</label>
                                </div>
                            </div>
                        </div>
                    </div>`;
        i++;
    
    }
}

load_order_queue();

function search_customer_name(cust_id){
    let name = "Walk-in customer";
    
    let customer_data_array = JSON.parse(localStorage.getItem("cust_array"));
    customer_data_array.forEach(customer => {
        if(cust_id===customer.id){                
            name = customer.name;
        }
    });
    return name;
}


 




























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



