(function(window, document, undefined) {
    "use strict";
    
    function init() {
        var container = document.getElementById("container");
        var form;

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                container.innerHTML = this.responseText;
                
                form = document.getElementById("login-form");
                if (form)
                    form.addEventListener("submit", login, false);
                    
                window.history.replaceState(null, "", "/");
            }
        };
    
        xhr.open("GET", "https://info2180-project3-macsual.c9users.io/cgi-bin/landing.php", true);
        xhr.send();
    }
    
    function login(e) {
        e.preventDefault();

        var xhr = new XMLHttpRequest();
        
        var container = document.getElementById('container');
        
        var username, password;
        
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                container.innerHTML = this.responseText;
            }
        };
        
        username = document.getElementById('username').value;
        password = document.getElementById('password').value;
        
        xhr.open("POST", "https://info2180-project3-macsual.c9users.io/cgi-bin/login.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("username=" + username + "&password=" + password);
        
        return true;
    }
    
    function logout() {
        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function() {
            
        };
        
        xhr.open();
        xhr.send();
    }

    window.addEventListener("load", init, false);
})(window, document);
