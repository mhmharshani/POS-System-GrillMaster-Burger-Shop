console.log("JS Loaded - Item page");

let item_array;

console.log(item_array);

let btn_add_item = document.getElementById("button_add_item");
let dialog_box = document.getElementById("dialog_box_item");
let item_table = document.getElementById("table_data_div");
let btn_save = document.getElementById("save_button");
let btn_cancel = document.getElementById("cancel_button");

function init_load_table(){

    console.log("in init load table");
    
    const is_exist = localStorage.getItem("item_array");
    
    if(is_exist!=null){
        item_array = JSON.parse(is_exist);
        console.log(item_array);
    }
    else{
        get_item_data();
    }

    if(item_array.length!=0){
        for(let i=0;i<item_array.length;i++){
            let item = item_array[i];
            
            item_table.innerHTML += `<div class="table_data">
                        <div class="input_data_div">
                            <input type="text" id="txt_id" size="13%"  value=${item.id} readonly >
                            <input type="text" id="txt_name" size="13%" value=${item.name} readonly >
                            <input type="text" id="txt_category" size="13%" value=${item.category} readonly>
                            <input type="text" id="txt_size" size="13%" value=${item.portion[0]} readonly>
                            <input type="text" id="txt_price" size="13%" value=${item.price[0]} readonly >
                            <input type="text" id="txt_discount" size="13%" value=${item.discount[0]} readonly>
                            <input type="text" id="txt_stock" size="13%" value=${item.stock[0]} readonly>
                        </div>
                        <div class="input_button_div">
                            <button class="btn"><img src="assests/img/icon_edit.png" alt="" width="25px"></button>
                            <button class="btn"><img src="assests/img/icon_delete.png" alt="" width="25px"></button>
                        </div>
                    </div>`;
        }
    }
}

init_load_table();

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
        localStorage.setItem("item_array",data);
    })
   
}

btn_add_item.addEventListener("click", e => {
    console.log("clicked add item");
    dialog_box.showModal();
});

// dialog_box.addEventListener('close', () => {
//     console.log('Dialog closed.');
// });

function generate_item_id(){
    if(item_array.length==0){
        return "B1001";
    }
    else{
        let item_id = item_array[item_array.length-1].id;
        let num= Number(item_id.substring(1,5));      
        
        return "B"+String(num+1);
    }
}

btn_save.addEventListener('click', (event) => {
   
    const name = document.getElementById('dtxt_name').value;
    const category = document.getElementById('dtxt_category').value;
    const size = document.getElementById('dtxt_size').value;
    const price = document.getElementById('dtxt_price').value;
    const discount = document.getElementById('dtxt_discount').value;
    const stock = document.getElementById('dtxt_stock').value;
    const id = generate_item_id();

    if(search_item(name)){
        alert("Item is already exists! If you want, try update item.");
    }
    else{
        let item = {
            "id" : id,
            "name" : name,
            "category" : category,
            "portion" : [size],
            "price" : [price],
            "discount" : [discount],
            "stock" : [stock]
        }

        item_array.push(item);

        localStorage.removeItem("item_array");
        localStorage.setItem("item_array",JSON.stringify(item_array));

        item_table.innerHTML += `<div class="table_data">
                            <div class="input_data_div">
                                <input type="text" id="txt_id" size="13%"  value=${id} readonly >
                                <input type="text" id="txt_name" size="13%" value=${name} readonly >
                                <input type="text" id="txt_category" size="13%" value=${category} readonly>
                                <input type="text" id="txt_size" size="13%" value=${size} readonly>
                                <input type="text" id="txt_price" size="13%" value=${price} readonly >
                                <input type="text" id="txt_discount" size="13%" value=${discount} readonly>
                                <input type="text" id="txt_stock" size="13%" value=${stock} readonly>
                            </div>
                            <div class="input_button_div">
                                <button class="btn"><img src="assests/img/icon_edit.png" alt="" width="25px"></button>
                                <button class="btn"><img src="assests/img/icon_delete.png" alt="" width="25px"></button>
                            </div>
                        </div>`;
    }

    dialog_box.close();   
    
});

btn_cancel.addEventListener("click", e => {
    dialog_box.close();
})

function search_item(name){
    item_array.forEach(item =>{
        if(item.name===name){
           console.log("true") 
           return true;
        }
    })
    console.log("false");
    
    return false;
}