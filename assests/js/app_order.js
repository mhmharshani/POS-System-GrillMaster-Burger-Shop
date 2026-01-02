console.log("JS Loaded - Order page");

let order_array;

console.log(order_array);

let order_table = document.getElementById("order_table");

function init_load_table(){

    console.log("in init load table");
    
    const is_exist = localStorage.getItem("order_array");
    console.log("isExist:"+is_exist);
    if(is_exist!=null){
        order_array = JSON.parse(is_exist);
        console.log(order_array);
        if(order_array.length!=0){
            for(let i=0;i<order_array.length;i++){
                let order = order_array[i];
                order_table.innerHTML += `<div class="table_data">
                        <div class="input_data_div">
                            <input type="text" id="txt_id" value=${order.id} readonly>
                            <input type="text" id="txt_cust_id" value=${order.cust_id} readonly>
                            <input type="text" id="txt_cart_id" value=${order.cart_id} readonly>
                            <input type="text" id="txt_total" value=${order.total} readonly>
                            <input type="text" id="txt_status" value=${order.status} readonly>

                        </div>
                        <div class="input_button_div">
                            <button class="btn"><img src="assests/img/icon_edit.png" alt="" width="25px"></button>
                            <button class="btn"><img src="assests/img/icon_delete.png" alt="" width="25px"></button>
                        </div>
                    </div>`;

            }
        }

    }

}

init_load_table();

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