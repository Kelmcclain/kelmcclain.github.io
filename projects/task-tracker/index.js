

//Register Function
document.querySelector('.register').addEventListener('click', ()=>{
    register()
})
function register() {
    //Get all input fields
    const full_name = document.getElementById('full_name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email & Password Are Required')
        return
        //End Code
    }
    if (validate_field(full_name) == false) {
        alert('Name is requred')
        return
    }

    auth.createUserWithEmailAndPassword(email, password)
    .then(function(){
        
        const user = auth.currentUser

        //Add user to database
        const database_ref = database.ref()

        //Create user data
        const user_data = {
            email : email,
            full_name : full_name,
            last_login : Date.now()
        }

        database_ref.child('users/' + user.uid).set(user_data)


        alert('User Created')

    }).catch(function(error){

    })

}

function validate_email(input_email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(input_email);
}


function validate_password(password) {
    if (password < 6) {
        return false
    } else {
        return true
    }
}

function validate_field(field) {
    if (field == null) {
        return false
    }
    if (field.length <= 0) {
        return false
    } else {
        return true
    }
}