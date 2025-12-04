console.log("JS Loaded - Customer page");

let cust_array;

console.log(cust_array);

let btn_add_customer = document.getElementById("button_add_customer");
let dialog_box = document.getElementById("dialog_box_customer");
let customer_table = document.getElementById("table_data_div");
let btn_save = document.getElementById("save_button");
let btn_cancel = document.getElementById("cancel_button");

function init_load_table(){

    console.log("in init load table");
    
    const is_exist = localStorage.getItem("cust_array");
    console.log("isExist:"+is_exist);
    if(is_exist!=null){
        cust_array = JSON.parse(is_exist);
        console.log(cust_array);
        
        if(cust_array.length!=0){
            for(let i=0;i<cust_array.length;i++){
                let customer = cust_array[i];
                customer_table.innerHTML += `<div class="table_data">
                        <div class="input_data_div">
                            <input type="text" id="txt_id" style="flex-basis: 33%;" value=${customer.id} readonly >
                            <input type="text" id="txt_name" style="flex-basis: 33%;" value=${customer.name} readonly >
                            <input type="text" id="txt_phone" style="flex-basis: 33%;" value=${customer.phone_number} readonly>
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

btn_add_customer.addEventListener("click", e => {
    console.log("clicked add customer");
    dialog_box.showModal();
});

// dialog_box.addEventListener('close', () => {
//     console.log('Dialog closed.');
// });

function generate_cust_id(){
    if(cust_array.length==0){
        return "C0001";
    }
    else{
        let cust_id = cust_array[cust_array.length-1].id;
        let num= Number(cust_id.substring(1,5));      
        
        return "C"+String(num+1).padStart(4,'0');
    }
}

btn_save.addEventListener('click', (event) => {
   
    const name = document.getElementById('dtxt_name').value;
    const phone_no = document.getElementById('dtxt_phone').value;
    const id = generate_cust_id();

    let customer = {
        "id" : id,
        "name" : name,
        "phone_number" : phone_no
    }

    cust_array.push(customer);

    localStorage.removeItem("cust_array");
    localStorage.setItem("cust_array",JSON.stringify(cust_array));

    customer_table.innerHTML += `<div class="table_data">
                        <div class="input_data_div">
                            <input type="text" id="txt_id" style="flex-basis: 33%;" value=${id} readonly >
                            <input type="text" id="txt_name" style="flex-basis: 33%;" value=${name} readonly >
                            <input type="text" id="txt_phone" style="flex-basis: 33%;" value=${phone_no} readonly>
                        </div>
                        <div class="input_button_div">
                            <button class="btn"><img src="assests/img/icon_edit.png" alt="" width="25px"></button>
                            <button class="btn"><img src="assests/img/icon_delete.png" alt="" width="25px"></button>
                        </div>
                    </div>`;

    dialog_box.close();
    
});

btn_cancel.addEventListener("click", e => {
    dialog_box.close();
})



// Set Current Date and Time
function update_date_time(){
    const now = new Date();
    document.getElementById("date_time").textContent = now
}

update_date_time();
setInterval(update_date_time,1000);

// ----------------------------


// const inputField = document.getElementById('myInput');

// // Make the input editable when it is clicked/focused
// inputField.addEventListener('click', function() {
//     // Remove the readonly attribute
//     this.removeAttribute('readonly'); 
// });

// // Make the input non-editable (readonly) when it loses focus (blurs)
// inputField.addEventListener('blur', function() {
//     // Add the readonly attribute back
//     this.setAttribute('readonly', 'readonly');
// });


