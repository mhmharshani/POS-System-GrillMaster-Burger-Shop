console.log("JS Loaded - Order page");

let order_array;

console.log(order_array);

let order_table = document.getElementById("table_data_div");

function init_load_table() {

    console.log("in init load table");

    const is_exist = localStorage.getItem("order_array");
    console.log("isExist:" + is_exist);
    if (is_exist != null) {
        order_array = JSON.parse(is_exist);
        console.log(order_array);
        if (order_array.length != 0) {
            for (let i = 0; i < order_array.length; i++) {
                let order = order_array[i];
                if (order.is_active) {
                    order_table.innerHTML += `<div class="table_data" id=${order.id}>
                            <div class="input_data_div">
                                <label for="Order ID" class="txt_id" style="flex-basis: 20%;">${order.id}</label>
                                <label for="Customer ID" class="txt_cust_id" style="flex-basis: 20%;">${order.cust_id}</label>
                                <label for="Cart ID" class="txt_cart_id" style="flex-basis: 20%;">${order.cart_id}</label>
                                <label for="Total" class="txt_total" style="flex-basis: 20%;">${order.total}</label>
                                <label for="Status" class="txt_status" style="flex-basis: 20%;">${order.status}</label>
                            </div>
                            <div class="input_button_div">
                                <button class="btn"><img src="assests/img/icon_edit.png" alt="" width="25px" id="img_edit"></button>
                                <button class="btn"><img src="assests/img/icon_delete.png" alt="" width="25px" id="img_delete"></button>
                            </div>
                        </div>`;
                }

            }
        }

    }

}

init_load_table();

// Set Current Date and Time
function update_date_time() {
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
setInterval(update_date_time, 1000);

// ---------------Add Order-------------

let btn_add_order = document.getElementById("button_add_order");
let dialog_box_add = document.getElementById("dialog_box_add");

let btn_add_yes = document.getElementById("yes_add_button");
let btn_add_no = document.getElementById("no_add_button");

btn_add_order.addEventListener("click", e => {
    console.log("clicked add order");
    dialog_box_add.showModal();
});

btn_add_no.addEventListener("click", e => {
    dialog_box_add.close();
});

//-----------------------------------------

//--------------Delete and edit feature --------------------------
let table_data_container = document.getElementById("table_data_div");

let dialog_box_delete = document.getElementById("dialog_box_delete");
let btn_yes = document.getElementById("yes_delete_button");

let dialog_box_edit = document.getElementById("dialog_box_edit_order");
let btn_update = document.getElementById("update_button");
let btn_cancel_edit = document.getElementById("cancel_button_edit");

let dtxt_order_id_edit = document.getElementById('dtxt_id_edit');
let dtxt_status_edit = document.getElementById('dtxt_status_edit');


table_data_container.addEventListener("click", function (event) {

    //------------------------Delete-----------------------------------

    console.log(event.target);

    const clicked_delete_img = event.target.closest("#img_delete");
    console.log(clicked_delete_img);


    if (clicked_delete_img != null) {
        let clicked_delete = clicked_delete_img.parentElement;
        let clicked_row = clicked_delete.parentElement.parentElement;
        console.log("id - " + clicked_row.id);

        order_array.forEach(order => {
            if (order.id === clicked_row.id) {
                console.log("true1");
                dialog_box_delete.showModal();

                btn_yes.addEventListener("click", (event) => {
                    order.is_active = false;
                    localStorage.removeItem("order_array");
                    localStorage.setItem("order_array", JSON.stringify(order_array));

                    window.location.reload();
                })

            }
        });

        console.log(order_array);

    }

    //--------------------Edit--------------------------------------------

    const clicked_edit_img = event.target.closest("#img_edit");
    console.log("clicked_edit - " + clicked_edit_img);


    if (clicked_edit_img != null) {
        let clicked_edit = clicked_edit_img.parentElement;
        let clicked_row = clicked_edit.parentElement.parentElement;
        console.log("id - " + clicked_row.id);

        order_array.forEach(order => {
            if (order.id === clicked_row.id) {

                console.log("Original order - " + order);

                dialog_box_edit.showModal();

                dtxt_order_id_edit.value = order.id;
                dtxt_status_edit.value = order.status;
                dtxt_status_edit.focus();

                btn_update.addEventListener('click', (event) => {

                    console.log("clicked update");

                    if (order != null) {
                        order.status = dtxt_status_edit.value;

                        console.log("Updated order - " + order.status);
                    }

                    dialog_box_edit.close();
                    localStorage.removeItem("order_array");
                    localStorage.setItem("order_array", JSON.stringify(order_array));

                    window.location.reload();
                });

                btn_cancel_edit.addEventListener('click', (event) => {
                    dialog_box_edit.close();
                });
            }
        });
    }

});


//-----------------------Refresh--------------------------------------------

let btn_refresh = document.getElementById("button_refresh");

btn_refresh.addEventListener("click", e => {

    order_table.innerHTML = "";
    input_search.value = "";
    init_load_table();

});

//---------------------------------------------------------------------------

// -----------------------Search customer --------------------------------------------

let btn_search = document.getElementById("button-addon2");
let input_search = document.getElementById("txt_search");

btn_search.addEventListener("click", e => {
    console.log(input_search);

    let txt = input_search.value.toLowerCase();

    let is_order_exist = false;

    order_table.innerHTML = "";

    for (const order of order_array) {

        if ((txt === order.id.toLowerCase()) || (txt === order.cust_id.toLowerCase()) || (txt === order.status.toLowerCase())) {
            is_order_exist = true;
            if (order.is_active) {
                order_table.innerHTML += `<div class="table_data" id=${order.id}>
                            <div class="input_data_div">
                                <label for="Order ID" class="txt_id" style="flex-basis: 20%;">${order.id}</label>
                                <label for="Customer ID" class="txt_cust_id" style="flex-basis: 20%;">${order.cust_id}</label>
                                <label for="Cart ID" class="txt_cart_id" style="flex-basis: 20%;">${order.cart_id}</label>
                                <label for="Total" class="txt_total" style="flex-basis: 20%;">${order.total}</label>
                                <label for="Status" class="txt_status" style="flex-basis: 20%;">${order.status}</label>
                            </div>
                            <div class="input_button_div">
                                <button class="btn"><img src="assests/img/icon_edit.png" alt="" width="25px" id="img_edit"></button>
                                <button class="btn"><img src="assests/img/icon_delete.png" alt="" width="25px" id="img_delete"></button>
                            </div>
                        </div>`;
            }
            else {
                alert("order is no longer in active state");
            }
            // break;
        }
    }

    if (!is_order_exist) {

        order_table.innerHTML += `<h6 style="text-align: center; margin-top: 50px;">No orders match your search. Try different search text or refresh to show all orders.</h6>`;
    }
});

//--------------------------------------------------------------------------

//--------------------Filter------------------------------------------

let btn_filter = document.getElementById("button_filter");
let dialog_box_filter = document.getElementById("dialog_box_filter");
const dialog_box_filter_object = new bootstrap.Modal(dialog_box_filter);

btn_filter.addEventListener("click", e => {
    console.log("clicked filter");

    dialog_box_filter_object.show();
    
    if (status_div !== null) status_div.style.display = 'none';
    if (total_div !== null) total_div.style.display = 'none';
});

let checkedFilters;
let status_div = document.getElementById("status_div");
let total_div = document.getElementById("total_div");

function filterOrders() {
    const checkboxes = document.querySelectorAll('.filters input[type="checkbox"]');
    checkedFilters = [];

    console.log(checkboxes);


    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkedFilters.push(checkbox.value);

            switch (checkbox.value) {
                case "Status":
                    status_div.style.display = 'block';
                    break;
                case "Total":
                    total_div.style.display = 'block';
                    break;
            }
        }
        else {
            switch (checkbox.value) {
                case "Status":
                    status_div.style.display = 'none';
                    break;
                case "Total":
                    total_div.style.display = 'none';
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

    let conditions = [(order => (order.is_active))];

    checkedFilters.forEach(filter => {

        switch (filter) {
            case "Status":
                let status_dd_value = document.getElementById("status_dd").value;
                conditions.push(order => order.status === status_dd_value);
                break;
            case "Total":
                let total_min = document.getElementById("total_min").value;
                let total_max = document.getElementById("total_max").value;
                conditions.push(order => Number(order.total) >= Number(total_min));
                conditions.push(order => Number(order.total) <= Number(total_max));
                break;
            case "Deleted":
                conditions[0] = ((order => (!order.is_active)));
                break;
        }
    });

    const filtered_data = order_array.filter(order=> {
        return conditions.every(conditionFunc => conditionFunc(order));
    });

    load_cards(filtered_data);

});

//----------Load Filtered data in the array to table-----------------

function load_cards(filtered_data_array) {

    order_table.innerHTML = "";

    if (filtered_data_array.length === 0) {
        order_table.innerHTML += `<h6 style="text-align: center; margin-top: 50px;">No items match your search. Try different filters or refresh to show all items.</h6>`;
    }

    filtered_data_array.forEach(order => {
        order_table.innerHTML += `<div class="table_data" id=${order.id}>
                            <div class="input_data_div">
                                <label for="Order ID" class="txt_id" style="flex-basis: 20%;">${order.id}</label>
                                <label for="Customer ID" class="txt_cust_id" style="flex-basis: 20%;">${order.cust_id}</label>
                                <label for="Cart ID" class="txt_cart_id" style="flex-basis: 20%;">${order.cart_id}</label>
                                <label for="Total" class="txt_total" style="flex-basis: 20%;">${order.total}</label>
                                <label for="Status" class="txt_status" style="flex-basis: 20%;">${order.status}</label>
                            </div>
                            <div class="input_button_div">
                                <button class="btn"><img src="assests/img/icon_edit.png" alt="" width="25px" id="img_edit"></button>
                                <button class="btn"><img src="assests/img/icon_delete.png" alt="" width="25px" id="img_delete"></button>
                            </div>
                        </div>`;

    });
}

function reset_filter_dialog_box() {
    document.querySelectorAll('.filters input[type="checkbox"]').forEach(checkbox => {
        if (checkbox.value === "Status") {
            document.getElementById("status_dd").value = "0";
        }
        checkbox.checked = false;
    });
}