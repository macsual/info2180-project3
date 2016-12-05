$(document).ready(function() {
	var unreadCount = null;
	
	function setbuttonclick(button, conversation) {
		var conversationn = parseInt(conversation);
		
		button.on("click", function(event) {
			readmessage(parseInt(conversationn));
			
			$.ajax({
				url: "cgi-bin/conversation.php",
				type:"post",
				dataType:"json",
				data:"conversation="+conversation,
				success:function(result) {
					//Fetched every message in the conversation
					var messages = result;
					var sender;
					var subject = messages[0]['subject'];
					var count = 0;
					console.log(messages);
					while (true) {
						if(count == messages.length){
							break
						}
						sender = messages[0 + parseInt(count)]['sender'];
						if(sender !== $("span.username").text()) {
							break;
						}
						count++;
					}
					var title = "From: "+ sender + "<br/>Subject: " + subject;
					showDialog(title, messages);
				}
			});
		});
	};
	
	function replySend() {
	 	var subject = "" + $("#subject-id").html();
		var recipient = "" + $("#recipient-id").html();
		var sender = "" + $("#sender-id").html();
		var message = "" + $("#reply-body").val();
		var conversation = "" + $("#conversation-id").html();
		var postdata = "recipient=" + recipient + "&subject=" + subject + "&body=" + message + "&conversation=" + conversation + "&sender=" + sender;
		
		$.ajax({
		  type: "POST",
		  url: "cgi-bin/sendreply.php",
		  data: postdata,
		  success: function(result) {
		  	if (result == "true") {
		  		try {document.querySelector('dialog').close();} catch(DOMException){}
		  		showToast("Message sent");
		  		$("#messages").click();
		  	}
		  	else
		  		showToast("Message not sent. Try again later");
		  }
		});
		
	 }
	 
	function escapeHtml(str) {
	    var div = document.createElement('div');
	    div.appendChild(document.createTextNode(str));
	    return div.innerHTML;
	}
	
	function messages(event) {
		event.preventDefault();
		$.ajax({
			url: "cgi-bin/messages.php",
			dataType: "json",
			success: function(result) {
		    	var content = $("#main-content");
		    	content.empty();
		    	
		    	if (result != "") {
		    		
		    		// console.log(result);
		    		
		    		var ul = $("<ul></ul>").attr({
		    			"style": "width: 100%;",
		    			"class":  "mdl-list"
		    		});
		    		
		    		content.append(ul);
		    		
		    		// Process messages
		    		
		    		var databadge = 0;
		    		
		    		for (var i = (result.length - 1); i >= 0; i--) {
		    			var unread = false;
		    			var message = result[i];
		    			
		    			//Check if message is read
		    			if (message['read'] == 0) {
		    				databadge += 1;
		    				unread = true;
		    			}
		    			
		    			var id = parseInt(message['id']);
		    			var body = "" + message['body'];
		    			var subject = "" + message['subject'];
		    			var sender = "" + message['sender'];
		    			var senderId = "" + message['user_id'];
		    			var userId = "" + message['recipient_ids'];
		    			var date = "Date: " + message['date_sent'];
		    			var conversation = parseInt(message['conversation']);
		    			
		    			var icon = $("<i></i>").attr({
		    				"class": "material-icons mdl-list__item-avatar"
		    			}).html("person");
		    			
		    			var span2 = $("<span></span>").html(sender).attr({"id":"sender-"+ id});
		    			
		    			var span3 = $("<span></span>")
		    			.attr({
		    				"class": "mdl-list__item-sub-title",
		    				"id":"body-"+ id
		    			}).html(body);
		    			
		    			if (unread){
		    				span2.attr({"style":"font-weight:bold;"});
		    				span3.attr({"style":"font-weight:bold;"});
		    			}
		    			
		    			var span1 = $("<span></span>")
		    			.attr({
		    				"class": "mdl-list__item-primary-content"
		    			})
		    			.append(icon)
		    			.append(span2)
		    			.append(span3);
		    			
		    			var span4 = $("<span></span>")
		    			.attr({
		    				"class": "mdl-list__item-secondary-content"
		    			});
		    			
		    			var button = $("<button></button>")
		    			.attr({
		    				"class": "mdl-button mdl-list__item mdl-list__item--two-line",
		    				"style": "width: 100%; text-align: left; text-transform: lowercase;",
		    				"id": ""+ id,
		    				"date": ""+ date,
		    				"recipient": senderId,
		    				"sender": userId,
		    				"sender-name": sender,
		    				"subject": subject
		    			})
		    			.append(span1)
		    			.append(span4);
		    			
		    			var conversations = $('[name="' + conversation + '"]');
		    			if (conversations.length > 0) {
		    				button.attr("hidden", true);
		    			}
		    			
		    			button.attr({"name":"" + conversation});
		    			
		    			setbuttonclick(button, conversation);
		    			
		    			ul.append(button);
		    		}
		    		
		    		if (databadge > 0)
		    			$("#unread").attr({"data-badge":"" + databadge});
		    	} else {
		    		//No messages
		    		var card = $("<div></div>").attr({
		    			"style": "width: 100%; height: 100%; text-align: center;",
		    			"id": "no-messages",
		    			"class": "mdl-card"
		    		});
		    		var div = $("<div></div>");
		    		var img = $("<img></img>");
		    		img.attr({
		    			"src": "images/user.png",
		    			"style": "width: 200px; margin: auto;"
		    		});
		    		// componentHandler.upgradeElement(img);
		    		div.append(img);
		    		
		    		var h1 = $("<h1></h1>").html("No Messages");
		    		var br = $("<br/>");
		    		var h3 = $("<h3></h3>").html("Click ");
		    		var button = $("<button></button>").attr({
		    			"id": "compose-button",
		    			"class":"mdl-button mdl-js-button"
		    		}).html("Compose");
		    		h3.append(button);
		    		var html = h3.html();
		    		h3.html(html + "to get chatting");
		    		
		    		card.append(div);
		    		card.append(h1);
		    		card.append(br);
		    		card.append(h3);
		    		
		    		// componentHandler.upgradeElement(card);
		    		content.append(card);
		    		
		    		
		    		var hidden = $("#no-messages");
		    		hidden.attr("hidden", false);
		    		
		    		var composeButton = $("#compose-button");
		    		composeButton.on("click", function(event) {
		    		    $("#compose").click();
		    		});
		    	}
		    	
		    }
    	});
	}

	function compose(event) {
		event.preventDefault();
		$.ajax({
			url: "html/compose.html",
			async: true,
			success: function(result){
		    	var content = $("#main-content");
		    	content.empty();
		    	
		    	var hdiv1 = $("<div></div>")
		    	.attr({
		    		"class":"mdl-cell mdl-cell--1-col",
		    		"id":"hdiv1"
		    	});
		    	
		    	var hdiv2 = $("<div></div>")
		    	.attr({
		    		"class":"mdl-cell mdl-cell--10-col",
		    		"style":"width: 100%; height: 100%;",
		    		"id":"hdiv2"
		    	})
		    	.html(result);
		    	
		    	var hdiv3 = $("<div></div>")
		    	.attr({
		    		"class":"mdl-cell mdl-cell--1-col",
		    		"id":"hdiv3"
		    	});
		    	
		        content.append(hdiv1);
		        content.append(hdiv2);
		        content.append(hdiv3);

		        $("#send").on("click", send);
		    }
    	});
	};

	function send(event) {
		var recipient = $("#recipient").val();
		var subject = $("#subject").val();
		var body = $("#body").val();
		var postdata = "recipient=" + recipient + "&subject=" + subject + "&body=" + body;
		
		$.ajax({
		  type: "POST",
		  url: "cgi-bin/sendmessage.php",
		  data: postdata,
		  success: function(result) {
		  	if(result == "true"){
		  		showToast("Message sent");
		  		$("#messages").click();
		  	}
		  	else
		  		showToast("Message not sent. Try again later");
		  }
		});
	}
	
	function showToast(text) {
		var snackbarContainer = $("#toast")[0];
		var data = {message: text};
		snackbarContainer.MaterialSnackbar.showSnackbar(data);
	}
	
	function logout(event) {
		$.ajax({
			url: "cgi-bin/logout.php",
			success: function(result) {
				$("#container").empty();
				// var reload = $("<script></script>")
				// .attr({
				// 	"src": "js/script.js"
				// });
				// $("body").append(reload);
				init();
			}
		});
	}
	
	function readmessage(id){
		$.ajax({
			url: "cgi-bin/readmessage.php",
			type:"post",
			data:"id="+id,
			success:function(result) {
			}
		});
	}
	
	function retrieve(toast) {
		var value;
		$.ajax({
			url: "cgi-bin/userdata.php",
			dataType: "xml",
			success: function(result) {
				var username = result.getElementsByTagName('username')[0].childNodes[0].nodeValue;
				var unread = result.getElementsByTagName('unread')[0].childNodes[0].nodeValue;
				var id = result.getElementsByTagName('userid')[0].childNodes[0].nodeValue;
				var admin = result.getElementsByTagName('admin')[0].childNodes[0].nodeValue;
				var spantag = $(".username");
				var userId = $("#sender-id").html(id);
				spantag[0].innerHTML = username;
				try {
				   spantag[1].innerHTML = username;
				}
				catch (e) {
					//Do nothing
				}
				
				if (unreadCount == null)
					unreadCount = unread;
				
				if(unread>0){
					$("#unread").attr({"data-badge":""+unread});
					if(toast && unread > unreadCount){
						showToast("New message received");
						unreadCount = unread;
					} else {
						unreadCount = unread;
					}
				}
				else
					$("#unread").removeAttr("data-badge");
					
					
				var el = document.getElementById("addusers");
				if(admin === "1"  && el === null){
					var a= $('<a></a>').
					attr({
						"class":"mdl-navigation__link",
						"id":"addusers",
						"href":""
					});
					
					var i = $('<i></i>').
					attr({
						"class":"mdl-color-text--blue-grey-400 material-icons",
						"role":"presentation"
					}).html("account_box");
					
					a.append(i)
					.append("Add Users");
					$("#navdrawer").append(a);
					$("#addusers").on("click", addUser);
				}
			}
		});
		return value;
	}
	
	function showDialog(title, messages){
        var div = $("#dialog-conversation");
        div.empty();
        var h4 = $("<h4></h4>")
    	.attr({
    		"class": "mdl-dialog__title"
    	}).html(title);
    	div.append(h4).append($("<br/>"));
        for(var i=0; i<messages.length; i++){
        	var date = "" + messages[i]["date_sent"];
        	if(messages[i]['sender'] !== $("span.username").text()){
        		var content = "<strong>" + messages[i]['sender'] + ":</strong> " + messages[i]["body"];
        	} else {
        		var content = "" + "<strong>You:</strong> " + messages[i]["body"];
        	}
        	
        	var span = $("<span></span>")
        	.attr({
        		"class": "mdl-dialog__content"
        	}).html(date).append($("<br/>")).append($("<br/>"));
        	
        	var div2 = $("<span></span>")
        	.attr({
        		"class": "mdl-dialog__content",
        		"style": "color: black;"
        	}).html(content).append($("<br/>"));
        	
        	var p = $("<p></p>")
        	.attr({
        		"style": "color: black;"
        	}).html(content);
        	
        	// div2.append(p);
        	div.append(div2);
        	div.append(span);
        }
        
        $("#reply-body").val('');
        
		var dialog = document.querySelector('dialog');
		
	    if (! dialog.showModal) {
	      dialogPolyfill.registerDialog(dialog);
	    }
	    
	    dialog.querySelector('#dialog-close-button').addEventListener('click', function() {
	      try{ dialog.close();} catch(DOMException){}
	      $("#messages").click();
	    });
	    
	    dialog.showModal();
	}
	
	function addUser(event) {
		event.preventDefault();
		$.ajax({
			url: "html/adduser.html",
			async: true,
			success: function(result){
		    	var content = $("#main-content");
		    	content.empty();
		    	
		    	var hdiv1 = $("<div></div>")
		    	.attr({
		    		"class":"mdl-cell mdl-cell--1-col",
		    		"id":"hdiv1"
		    	});
		    	
		    	var hdiv2 = $("<div></div>")
		    	.attr({
		    		"class":"mdl-cell mdl-cell--10-col",
		    		"style":"width: 100%; height: 100%;",
		    		"id":"hdiv2"
		    	})
		    	.html(result);
		    	
		    	var hdiv3 = $("<div></div>")
		    	.attr({
		    		"class":"mdl-cell mdl-cell--1-col",
		    		"id":"hdiv3"
		    	});
		        content.append(hdiv1);
		        content.append(hdiv2);
		        content.append(hdiv3);
		        
		        $("#adduser-btn").on("click", function(event) {
		            event.preventDefault();
		            //Get data
		            
		            var fname = $("#add-first-name").val();
		            var lname = $("#add-last-name").val();
		            var uname = $("#add-username").val();
		            var pword = $("#add-password").val();
		            var pwordc = $("#add-passwordconfirm").val();
		            
		            //Escape user input
		            fname = escapeHtml(fname);
		            lname = escapeHtml(lname);
		            uname = escapeHtml(uname);
		            pword = escapeHtml(pword);
		            pwordc = escapeHtml(pwordc);
		            
		            if(pword !== pwordc){
		            	showToast("Passwords do not match");
		            	return;
		            }
		            
		            if(fname === "" || lname === "" || uname === ""){
		            	showToast("All fields required");
		            	return;
		            }
		            
		            var postdata = "firstname="+fname+"&lastname="+lname+"&username="+uname+"&password="+pword;
		            
		            $.ajax({
						url: "cgi-bin/adduser.php",
						type:"post",
						data: postdata,
						success:function(result) {
							if(result === "true")
								showToast("User added!");
							else
								showToast(result);
						}			
					});
		        });
		    }
    	});
	}
	
	//Retrieve the user's name and unread message count
	retrieve(false);
	
	//Event listeners
	$("#messages").on("click", messages);
	$("#compose").on("click", compose);
	$("#logout").on("click", logout);
	$("#reply-send").on("click", replySend);
	var newmessage = new EventSource("cgi-bin/alert.php");
	
	newmessage.onopen = function(event) {	// For firefox
		//Update unread message count
		newmessage.onmessage = function(event){
			retrieve(true);
		};
	};
});
