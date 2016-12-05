// (function(window, document, undefined) {
    "use strict";
    
    function init() {
        var container = document.getElementById("container");
        var form;

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                $("#container").empty();

                var response = this.responseText;
                var hdiv = document.createElement("div");
                hdiv.innerHTML = this.responseText;
                var buttonscript = document.createElement("script");
                buttonscript.setAttribute("type", "text/javascript");
                buttonscript.setAttribute("src", "js/buttons.js");
                hdiv.appendChild(buttonscript);
                componentHandler.upgradeElement(hdiv);
                container.appendChild(hdiv);
                
                form = document.getElementById("login-form");
                if (form)
                    form.addEventListener("submit", login, false);
                    
                // window.history.replaceState(null, "", "/");
            }
        };
    
        xhr.open("GET", "cgi-bin/landing.php", true);
        xhr.send();
    }
    
    function showToast(text) {
        var snackbarContainer = $("#toast")[0];
        var data = {message: text};
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
    }
    
    function login(e) {
        e.preventDefault();

        var xhr = new XMLHttpRequest();
        
        var container = document.getElementById('container');
        
        var username, password;
        
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if(this.responseText === "true"){
                    $.ajax({
                        url: "html/home.html",
                        success:function(result) {
                            $("#container").empty();
                            var hdiv = document.createElement("div");
                            hdiv.innerHTML = result;
                            var buttonscript = document.createElement("script");
                            buttonscript.setAttribute("type", "text/javascript");
                            buttonscript.setAttribute("src", "js/buttons.js");
                            hdiv.appendChild(buttonscript);
                            componentHandler.upgradeElement(hdiv);
                            container.appendChild(hdiv);
                        }
                    });
                } else {
                    showToast("Incorrect credentials");
                }
            }
        };
        
        username = document.getElementById('username').value;
        password = document.getElementById('password').value;
        
        xhr.open("POST", "cgi-bin/login.php", true);
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
// })(window, document);