console.log("Js Loaded - Login page!");

let user_array = [];

let btn_signup = document.getElementById("button_signup");
let btn_login = document.getElementById("button_login");

let input_username = document.getElementById("input_username");
let input_email = document.getElementById("input_email");
let input_password = document.getElementById("input_password");

btn_signup.addEventListener("click", e=>{

    console.log("clicked signup");

    let username = input_username.value;
    let email = input_email.value;
    let password = input_password.value;

    console.log(username);
    console.log(email);
    console.log(password);

    if((username!=="")&&(email!=="")&&(password!=="")){
        if(localStorage.getItem("user_array")!=null){
            user_array = JSON.parse(localStorage.getItem("user_array"));   
            localStorage.removeItem("user_array");
            console.log(user_array);
        }

        let user ={
            "user_name": username,
            "email": email,
            "password": password
        }

        let isExist = false;
        user_array.forEach(user => {
            if(user.email===email){
                isExist = true;
            }
        });

        if(isExist){
            alert("You have already registered. Try Login.")
        }
        else{
            user_array.push(user);
            localStorage.setItem("user_array",JSON.stringify(user_array));
            alert("Successfully Signed Up ! Login for Dashboard");
            window.location.href = 'index.html';
        }  
    }
    else{
        alert("Fill all the input fields");
    }

    
})


btn_login.addEventListener("click", e=>{
    console.log("clicked login");

    let username = input_username.value;
    let email = input_email.value;
    let password = input_password.value;


    if(localStorage.getItem("user_array")!=null){
        user_array = JSON.parse(localStorage.getItem("user_array"));   
    }
    
    let isExist = false;
    let current_user;
    console.log(user_array);
    
    user_array.forEach(user => {
        if(user.email===email){
            isExist = true;
            current_user = user;
        }
    });

    if(isExist){

        if((current_user.password===password)&&(current_user.user_name===username)){
            localStorage.removeItem("current_user");
            localStorage.setItem("current_user",JSON.stringify(current_user));
            window.location.href = 'dashboard.html';
        }
        else{
            alert("Incorrect password or username");
            input_username.value = "";
            input_password.value = "";
        }
    }
    else{
        alert("You have not signed up yet. Please sign up first to proceed.")
    }

})