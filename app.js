function signup(){
    const Http = new XMLHttpRequest();
    var url = "https://mongodb-signup.herokuapp.com/signup"
    Http.open("POST", url);
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send(JSON.stringify({
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        phone: document.getElementById('phone').value,
        gender: document.getElementById('gender').value,
    }));

    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4) 
            var res = JSON.parse(Http.responseText);
            if (res.status === 200) {
                alert(res.message)
                location.href = "./login.html"
            }
            else{
                alert(Http.responseText)
            }

        }
        return false  
    }

function login(){
    const Http = new XMLHttpRequest();
    var url = "https://mongodb-signup.herokuapp.com/login"
    Http.open("POST", url);
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send(JSON.stringify({
        lemail: document.getElementById('lemail').value,
        lpassword: document.getElementById('lpassword').value,
    }));

    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4) {
            
            alert(Http.responseText)
        }
    }
return false  
}
