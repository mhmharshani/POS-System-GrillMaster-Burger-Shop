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

    if (clicked_delete != null) {
        let clicked_row = clicked_delete.parentElement.parentElement;
        console.log(clicked_row.id);
        item_array.forEach(item => {
            if (item.id === clicked_row.id) {
                console.log("true1");
                dialog_box_delete.showModal();

                btn_yes.addEventListener("click", (event) => {
                    item.is_active = false;
                    localStorage.removeItem("item_array");
                    localStorage.setItem("item_array", JSON.stringify(item_array));

                    window.location.reload();
                })

            }
        });

        console.log(item_array);

    }

    //--------------------Edit--------------------------------------------

    const clicked_edit_img = event.target.closest("#img_edit");
    console.log("clicked_edit - " + clicked_edit_img);


    if (clicked_edit_img != null) {
        let clicked_edit = clicked_edit_img.parentElement;
        let clicked_row = clicked_edit.parentElement.parentElement;
        console.log("id - " + clicked_row.id);

        item_array.forEach(item => {
            if (item.id === clicked_row.id) {

                console.log("Original item - " + item);

                dialog_box_edit.showModal();

                dxt_name_edit.value = item.name;
                dxt_category_edit.value = item.category;
                dxt_size_edit.value = item.portion[0];
                dxt_price_edit.value = item.price[0];
                dxt_discount_edit.value = item.discount[0];
                dxt_stock_edit.value = item.stock[0];

                btn_update.addEventListener('click', (event) => {

                    console.log("clicked update");

                    if (item != null) {
                        item.name = dxt_name_edit.value;
                        item.category = dxt_category_edit.value;
                        item.portion[0] = dxt_size_edit.value;
                        item.price[0] = dxt_price_edit.value;
                        item.discount[0] = dxt_discount_edit.value;
                        item.stock[0] = dxt_stock_edit.value;

                        console.log("Updated item - " + item.stock);
                    }

                    dialog_box_edit.close();
                    localStorage.removeItem("item_array");
                    localStorage.setItem("item_array", JSON.stringify(item_array));

                    window.location.reload();
                });

                btn_cancel_edit.addEventListener('click', (event) => {
                    dialog_box_edit.close();
                });
            }
        });
    }

});


// -----------------------Search items --------------------------------------------

let btn_search = document.getElementById("button-addon2");
let input_search = document.getElementById("txt_search");

btn_search.addEventListener("click", e => {
    console.log(input_search);

    let txt = input_search.value.toLowerCase();

    let is_item_exist = false;

    for (const item of item_array) {

        if ((txt === item.id.toLowerCase()) || (txt === item.name.toLowerCase())) {
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
            else {
                alert("item is no longer in active state");
            }
            break;
        }
    }

    if (!is_item_exist) {
        alert("No such item in the stock");
    }
});

let btn_refresh = document.getElementById("button_refresh");

btn_refresh.addEventListener("click", e => {

    item_table.innerHTML = "";
    input_search.value = "";
    init_load_table();

});

let btn_filter = document.getElementById("button_filter");
let dialog_box_filter = document.getElementById("dialog_box_filter");
const dialog_box_filter_object = new bootstrap.Modal(dialog_box_filter);

btn_filter.addEventListener("click", e => {
    console.log("clicked filter");

    dialog_box_filter_object.show();
    console.log(category_div + price_div + stock_div);
    
    if(category_div!==null) category_div.style.display = 'none';
    if(price_div!==null) price_div.style.display = 'none';
    if(stock_div!==null) stock_div.style.display = 'none';
});

let checkedFilters;
let category_div = document.getElementById("category_div");
let price_div = document.getElementById("price_div");
let stock_div = document.getElementById("stock_div");

function filterItems() {
    const checkboxes = document.querySelectorAll('.filters input[type="checkbox"]');
    checkedFilters = [];

    console.log(checkboxes);
    

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkedFilters.push(checkbox.value);

            switch (checkbox.value) {
                case "Category":
                    category_div.style.display = 'block';
                    break;
                case "Price":
                    price_div.style.display = 'block';
                    break;
                case "Stock":
                    stock_div.style.display = 'block';
                    break;
            }
        }
        else {
            switch (checkbox.value) {
                case "Category":
                    category_div.style.display = 'none';
                    break;
                case "Price":
                    price_div.style.display = 'none';
                    break;
                case "Stock":
                    stock_div.style.display = 'none';
                    break;
            }
        }
    });
    console.log(checkedFilters);

}

let btn_close_filter = document.getElementById("button_close_filter");
let btn_apply_filter = document.getElementById("button_apply_filter");

btn_close_filter.addEventListener("click", e => {
    reset_filter_dialog_box();
    dialog_box_filter_object.hide();
});

btn_apply_filter.addEventListener("click", e => {
    // reset_filter_dialog_box();
    
    let conditions = [(item => (item.is_active))];

    checkedFilters.forEach(filter => {

        switch (filter) {
            case "Category":
                let category_dd_value = document.getElementById("category_dd").value;
                conditions.push(item => item.category === category_dd_value);
                break;
            case "Price":
                let price_min = document.getElementById("price_min").value;
                let price_max = document.getElementById("price_max").value;
                // conditions.push(item => (item.price[0]>=price_min)&&(item.price[0]<=price_max));
                conditions.push(item => Number(item.price[0]) >= Number(price_min));
                conditions.push(item => Number(item.price[0]) <= Number(price_max));
                break;
            case "Stock":
                let stock_min = document.getElementById("stock_min").value;
                let stock_max = document.getElementById("stock_max").value;
                conditions.push(item => (Number(item.stock[0]) >= Number(stock_min)) && (Number(item.stock[0]) <= Number(stock_max)));
                break;
            case "Discount":
                conditions.push(item => ((item.discount[0]==="-")||(item.discount[0]==="0")));
                break;
        }
    });

    const filtered_data = item_array.filter(item => {
        return conditions.every(conditionFunc => conditionFunc(item));
    });

    load_cards(filtered_data);
    
});

//----------Load Filtered data in the array to table-----------------

function load_cards(filtered_data_array) {

    item_table.innerHTML = "";

    if(filtered_data_array.length === 0){
        item_table.innerHTML += `<h6 style="text-align: center; margin-top: 50px;">No items match your search. Try different filters or refresh to show all items.</h6>`;
    }

    filtered_data_array.forEach(item => {
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

    });
}

function reset_filter_dialog_box(){
    document.querySelectorAll('.filters input[type="checkbox"]').forEach(checkbox => {
        if(checkbox.value === "Category"){
            document.getElementById("category_dd").value = "0";
        }
        checkbox.checked = false;
    });
}

// Set Current Date and Time
function update_date_time(){
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false 
    };
    document.getElementById("date_time").textContent = now.toLocaleString('en-US', options);
}

update_date_time();
setInterval(update_date_time,1000);

// ----------------------------

//-------------------Set Profile name------------------------------
let profile_name = document.getElementById("profile_name");
let current_user = JSON.parse(localStorage.getItem("current_user"));
profile_name.innerText = current_user.user_name;

//-----------------------------------------------------------------
