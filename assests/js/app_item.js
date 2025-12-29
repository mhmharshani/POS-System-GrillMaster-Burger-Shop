console.log("JS Loaded - Item page");

let item_array;

console.log(item_array);

let item_table = document.getElementById("table_data_div");
let btn_add_item = document.getElementById("button_add_item");
let dialog_box = document.getElementById("dialog_box_item");
let btn_save = document.getElementById("save_button");
let btn_cancel = document.getElementById("cancel_button");

function init_load_table() {

    console.log("in init load table");

    const is_exist = localStorage.getItem("item_array");

    if (is_exist != null) {
        item_array = JSON.parse(is_exist);
        console.log(item_array);
    }
    else {
        get_item_data();
    }

    if (item_array.length != 0) {
        for (let i = 0; i < item_array.length; i++) {
            let item = item_array[i];
            console.log(item.name);

            if (item.is_active) {
                item_table.innerHTML += `<div class="table_data" id=${item.id}>
                        <div class="input_data_div">
                            <label for="Item ID"  class="txt_id" style="flex-basis: 10%;">${item.id}</label>
                            <label for="Item Name" class="txt_name" style="flex-basis: 25%;">${item.name}</label>
                            <label for="Category" class="txt_category" style="flex-basis: 15%;">${item.category}</label>
                            <label for="Size" class="txt_size" style="flex-basis: 15%;">${item.portion[0]}</label>
                            <label for="Price" class="txt_price" style="flex-basis: 15%;">${item.price[0]}</label>
                            <label for="Discount" class="txt_discount" style="flex-basis: 10%;">${item.discount[0]}</label>
                            <label for="Stock" class="txt_stock" style="flex-basis: 10%;">${item.stock[0]}</label>
                        </div>
                        <div class="input_button_div">
                            <button class="btn id="button_edit""><img id="img_edit" src="assests/img/icon_edit.png" alt="" width="25px"></button>
                            <button class="btn" id="button_delete"><img src="assests/img/icon_delete.png" alt="" width="25px"></button>
                        </div>
                    </div>`;
            }
        }
    }
}

init_load_table();

async function get_item_data() {

    await fetch("../assests/resources/data.json")
        .then(res => res.json())
        .then(data => {

            console.log(data);
            console.log(data.items[1]);

            let size = data.items.length;

            for (let i = 0; i < size; i++) {
                item_array[i] = data.items[i];
            }
            localStorage.setItem("item_array", data);
        })

}

btn_add_item.addEventListener("click", e => {
    console.log("clicked add item");
    console.log(dialog_box);
    
    dialog_box.showModal();
});

function generate_item_id() {
    if (item_array.length == 0) {
        return "B1001";
    }
    else {
        let item_id = item_array[item_array.length - 1].id;
        let num = Number(item_id.substring(1, 5));

        return "B" + String(num + 1);
    }
}

btn_save.addEventListener('click', (event) => {

    const name = document.getElementById('dtxt_name').value;
    const category = document.getElementById('dtxt_category').value;
    const size = document.getElementById('dtxt_size').value;
    const price = document.getElementById('dtxt_price').value;
    const discount = document.getElementById('dtxt_discount').value;
    const stock = document.getElementById('dtxt_stock').value;
    

    if (search_item_by_name(name)) {
        alert("Item is already exists! If you want, try update item.");

    }
    else {
        const id = generate_item_id();
        let item = {
            "id": id,
            "name": name,
            "category": category,
            "portion": [size],
            "price": [price],
            "discount": [discount],
            "stock": [stock],
            "is_active": true
        }

        item_array.push(item);

        localStorage.removeItem("item_array");
        localStorage.setItem("item_array", JSON.stringify(item_array));

        item_table.innerHTML += `<div class="table_data" id=${id}>
                            <div class="input_data_div">
                                <label for="Item ID"  class="txt_id" style="flex-basis: 10%;">${id}</label>
                            <label for="Item Name" class="txt_name" style="flex-basis: 25%;">${name}</label>
                            <label for="Category" class="txt_category" style="flex-basis: 15%;">${category}</label>
                            <label for="Size" class="txt_size" style="flex-basis: 15%;">${size}</label>
                            <label for="Price" class="txt_price" style="flex-basis: 15%;">${price}</label>
                            <label for="Discount" class="txt_discount" style="flex-basis: 10%;">${discount}</label>
                            <label for="Stock" class="txt_stock" style="flex-basis: 10%;">${stock}</label>
                            </div>
                            <div class="input_button_div">
                                <button class="btn" id="button_edit"><img id="img_edit" src="assests/img/icon_edit.png" alt="" width="25px"></button>
                                <button class="btn" id="button_delete"><img src="assests/img/icon_delete.png" alt="" width="25px"></button>
                            </div>
                        </div>`;
    }

    dialog_box.close();

});

btn_cancel.addEventListener("click", e => {
    dialog_box.close();
})

function search_item_by_name(name) {
    item_array.forEach(item => {
        if (item.name === name) {
            console.log("true")
            return true;
        }
    })
    console.log("false");

    return false;
}

//--------------Delete and edit feature --------------------------
let table_data_container = document.getElementById("table_data_div");

let dialog_box_delete = document.getElementById("dialog_box_delete");
let btn_yes = document.getElementById("yes_button");

let dialog_box_edit = document.getElementById("dialog_box_edit_item");
let btn_update = document.getElementById("update_button");
let btn_cancel_edit = document.getElementById("cancel_button_edit");

let dxt_name_edit = document.getElementById('dtxt_name_edit');
let dxt_category_edit = document.getElementById('dtxt_category_edit');
let dxt_size_edit = document.getElementById('dtxt_size_edit');
let dxt_price_edit = document.getElementById('dtxt_price_edit');
let dxt_discount_edit = document.getElementById('dtxt_discount_edit');
let dxt_stock_edit = document.getElementById('dtxt_stock_edit');  

table_data_container.addEventListener("click", function (event) {

    //------------------------Delete-----------------------------------

    const clicked_delete = event.target.closest("#button_delete");  

    if(clicked_delete!=null){
        let clicked_row = clicked_delete.parentElement.parentElement;
        console.log(clicked_row.id);
        item_array.forEach(item =>{
            if(item.id===clicked_row.id){
                console.log("true1");
                dialog_box_delete.showModal();
                
                btn_yes.addEventListener("click",(event) =>{
                    item.is_active = false;
                    localStorage.removeItem("item_array");
                    localStorage.setItem("item_array",JSON.stringify(item_array));

                    window.location.reload(); 
                })

            }
        });

        console.log(item_array);

    }

    //--------------------Edit--------------------------------------------
   
    const clicked_edit_img = event.target.closest("#img_edit");
    console.log("clicked_edit - "+clicked_edit_img);
    

    if (clicked_edit_img != null) {
        let clicked_edit = clicked_edit_img.parentElement;
        let clicked_row = clicked_edit.parentElement.parentElement;
        console.log("id - " + clicked_row.id);
        
        item_array.forEach(item =>{
            if(item.id===clicked_row.id){

                console.log("Original item - "+item);

                dialog_box_edit.showModal();
                
                dxt_name_edit.value = item.name;
                dxt_category_edit.value = item.category;
                dxt_size_edit.value = item.portion[0];
                dxt_price_edit.value = item.price[0];
                dxt_discount_edit.value = item.discount[0];
                dxt_stock_edit.value = item.stock[0];   
                
                btn_update.addEventListener('click', (event) => {

                    console.log("clicked update");
                    
                    if(item!=null){
                        item.name = dxt_name_edit.value;
                        item.category = dxt_category_edit.value;
                        item.portion[0] = dxt_size_edit.value;
                        item.price[0] = dxt_price_edit.value;
                        item.discount[0] = dxt_discount_edit.value;
                        item.stock[0] = dxt_stock_edit.value;

                        console.log("Updated item - "+item.stock);
                    }

                    dialog_box_edit.close();
                    localStorage.removeItem("item_array");
                    localStorage.setItem("item_array",JSON.stringify(item_array));

                    window.location.reload(); 
                });

                btn_cancel_edit.addEventListener('click', (event)=>{
                    dialog_box_edit.close();
                });
            }
        });
    }
    
});


// -----------------------Search items --------------------------------------------

let btn_search = document.getElementById("button-addon2");
let input_search = document.getElementById("txt_search");

btn_search.addEventListener("click", e =>{
    console.log(input_search);
    
    let txt = input_search.value.toLowerCase();

    let is_item_exist = false;

    for(const item of item_array){
        
        if((txt===item.id.toLowerCase())||(txt===item.name.toLowerCase())){
            is_item_exist = true;
            if (item.is_active) {
                item_table.innerHTML = `<div class="table_data" id=${item.id}>
                        <div class="input_data_div">
                            <label for="Item ID"  class="txt_id" style="flex-basis: 10%;">${item.id}</label>
                            <label for="Item Name" class="txt_name" style="flex-basis: 25%;">${item.name}</label>
                            <label for="Category" class="txt_category" style="flex-basis: 15%;">${item.category}</label>
                            <label for="Size" class="txt_size" style="flex-basis: 15%;">${item.portion[0]}</label>
                            <label for="Price" class="txt_price" style="flex-basis: 15%;">${item.price[0]}</label>
                            <label for="Discount" class="txt_discount" style="flex-basis: 10%;">${item.discount[0]}</label>
                            <label for="Stock" class="txt_stock" style="flex-basis: 10%;">${item.stock[0]}</label>
                        </div>
                        <div class="input_button_div">
                            <button class="btn id="button_edit""><img id="img_edit" src="assests/img/icon_edit.png" alt="" width="25px"></button>
                            <button class="btn" id="button_delete"><img src="assests/img/icon_delete.png" alt="" width="25px"></button>
                        </div>
                    </div>`;
            }
            else{
                alert("item is no longer in active state");
            }
            break;
        }        
    }

    if(!is_item_exist){
        alert("No such item in the stock");
    }
});

let btn_refresh = document.getElementById("button_refresh");

btn_refresh.addEventListener("click", e =>{

    item_table.innerHTML = "";
    input_search.value = "";
    init_load_table();

});

