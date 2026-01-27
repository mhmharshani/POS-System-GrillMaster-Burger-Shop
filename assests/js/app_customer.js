console.log("JS Loaded - Customer page");

let cust_array;

console.log(cust_array);

let btn_add_customer = document.getElementById("button_add_customer");
let dialog_box = document.getElementById("dialog_box_customer");
let customer_table = document.getElementById("table_data_div");
let btn_save = document.getElementById("save_button");
let btn_cancel = document.getElementById("cancel_button");

function init_load_table() {

    console.log("in init load table");

    let is_exist = localStorage.getItem("cust_array");
    console.log("isExist:" + is_exist);

    if (is_exist != null) {
        cust_array = JSON.parse(is_exist);
        console.log(cust_array);

        if (cust_array.length != 0) {
            for (let i = 0; i < cust_array.length; i++) {
                let customer = cust_array[i];
                if (customer.is_active) {
                    customer_table.innerHTML += `<div class="table_data" id=${customer.id}>
                            <div class="input_data_div">
                                <input type="text" id="txt_id" style="flex-basis: 33%;" value=${customer.id} readonly >
                                <input type="text" id="txt_name" style="flex-basis: 33%;" value=${customer.name} readonly >
                                <input type="text" id="txt_phone" style="flex-basis: 33%;" value=${customer.phone_number} readonly>
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

btn_add_customer.addEventListener("click", e => {
    console.log("clicked add customer");
    dialog_box.showModal();
});

// dialog_box.addEventListener('close', () => {
//     console.log('Dialog closed.');
// });

function generate_cust_id() {
    if (cust_array.length == 0) {
        return "C0001";
    }
    else {
        let cust_id = cust_array[cust_array.length - 1].id;
        let num = Number(cust_id.substring(1, 5));

        return "C" + String(num + 1).padStart(4, '0');
    }
}

btn_save.addEventListener('click', (event) => {

    const name = document.getElementById('dtxt_name').value;
    const phone_no = document.getElementById('dtxt_phone').value;
    const id = generate_cust_id();

    let customer = {
        "id": id,
        "name": name,
        "phone_number": phone_no,
        "is_active": true
    }

    cust_array.push(customer);

    localStorage.removeItem("cust_array");
    localStorage.setItem("cust_array", JSON.stringify(cust_array));

    customer_table.innerHTML += `<div class="table_data" id=${id}>
                        <div class="input_data_div">
                            <input type="text" id="txt_id" style="flex-basis: 33%;" value=${id} readonly >
                            <input type="text" id="txt_name" style="flex-basis: 33%;" value=${name} readonly >
                            <input type="text" id="txt_phone" style="flex-basis: 33%;" value=${phone_no} readonly>
                        </div>
                        <div class="input_button_div">
                            <button class="btn"><img src="assests/img/icon_edit.png" alt="" width="25px" id="img_edit"></button>
                            <button class="btn"><img src="assests/img/icon_delete.png" alt="" width="25px" id="img_delete"></button>
                        </div>
                    </div>`;

    dialog_box.close();

});

btn_cancel.addEventListener("click", e => {
    dialog_box.close();
})



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

// ----------------------------

//--------------Delete and edit feature --------------------------
let table_data_container = document.getElementById("table_data_div");

let dialog_box_delete = document.getElementById("dialog_box_delete");
let btn_yes = document.getElementById("yes_button");

let dialog_box_edit = document.getElementById("dialog_box_edit_customer");
let btn_update = document.getElementById("update_button");
let btn_cancel_edit = document.getElementById("cancel_button_edit");

let dxt_name_edit = document.getElementById('dtxt_name_edit');
let dxt_phone_edit = document.getElementById('dtxt_phone_edit');

table_data_container.addEventListener("click", function (event) {

    //------------------------Delete-----------------------------------

    const clicked_delete_img = event.target.closest("#img_delete");
    console.log(clicked_delete_img);


    if (clicked_delete_img != null) {
        let clicked_delete = clicked_delete_img.parentElement;
        let clicked_row = clicked_delete.parentElement.parentElement;
        console.log("id - " + clicked_row.id);

        cust_array.forEach(customer => {
            if (customer.id === clicked_row.id) {
                console.log("true1");
                dialog_box_delete.showModal();

                btn_yes.addEventListener("click", (event) => {
                    customer.is_active = false;
                    localStorage.removeItem("cust_array");
                    localStorage.setItem("cust_array", JSON.stringify(cust_array));

                    window.location.reload();
                })

            }
        });

        console.log(cust_array);

    }

    //--------------------Edit--------------------------------------------

    const clicked_edit_img = event.target.closest("#img_edit");
    console.log("clicked_edit - " + clicked_edit_img);


    if (clicked_edit_img != null) {
        let clicked_edit = clicked_edit_img.parentElement;
        let clicked_row = clicked_edit.parentElement.parentElement;
        console.log("id - " + clicked_row.id);

        cust_array.forEach(customer => {
            if (customer.id === clicked_row.id) {

                console.log("Original customer - " + customer);

                dialog_box_edit.showModal();

                dxt_name_edit.value = customer.name;
                dxt_phone_edit.value = customer.phone_number;

                btn_update.addEventListener('click', (event) => {

                    console.log("clicked update");

                    if (customer != null) {
                        customer.name = dxt_name_edit.value;
                        customer.phone_number = dxt_phone_edit.value;

                        console.log("Updated customer - " + customer.phone_number);
                    }

                    dialog_box_edit.close();
                    localStorage.removeItem("cust_array");
                    localStorage.setItem("cust_array", JSON.stringify(cust_array));

                    window.location.reload();
                });

                btn_cancel_edit.addEventListener('click', (event) => {
                    dialog_box_edit.close();
                });
            }
        });
    }

});

// -----------------------Search customer --------------------------------------------

let btn_search = document.getElementById("button-addon2");
let input_search = document.getElementById("txt_search");

btn_search.addEventListener("click", e => {
    console.log(input_search);

    let txt = input_search.value.toLowerCase();

    let is_customer_exist = false;

    for (const customer of cust_array) {

        if ((txt === customer.id.toLowerCase()) || (txt === customer.name.toLowerCase()) || (txt === customer.phone_number)) {
            is_customer_exist = true;
            if (customer.is_active) {
                customer_table.innerHTML = `<div class="table_data" id=${customer.id}>
                            <div class="input_data_div">
                                <input type="text" id="txt_id" style="flex-basis: 33%;" value=${customer.id} readonly >
                                <input type="text" id="txt_name" style="flex-basis: 33%;" value=${customer.name} readonly >
                                <input type="text" id="txt_phone" style="flex-basis: 33%;" value=${customer.phone_number} readonly>
                            </div>
                            <div class="input_button_div">
                                <button class="btn"><img src="assests/img/icon_edit.png" alt="" width="25px" id="img_edit"></button>
                                <button class="btn"><img src="assests/img/icon_delete.png" alt="" width="25px" id="img_delete"></button>
                            </div>
                        </div>`;
            }
            else {
                alert("customer is no longer in active state");
            }
            break;
        }
    }

    if (!is_customer_exist) {
        alert("No such registered customer");
    }
});

//--------------------------------------------------------------------------

//-----------------------Refresh--------------------------------------------

let btn_refresh = document.getElementById("button_refresh");

btn_refresh.addEventListener("click", e => {

    customer_table.innerHTML = "";
    input_search.value = "";
    init_load_table();

});

//---------------------------------------------------------------------------


