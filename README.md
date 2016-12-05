# info2180-project3

## CheapoMail

Cheapo Mail provides a simple messaging system that only sends mail to other Cheapo users. Users get a login name and password and can see a list of all other Cheapo users.
This obviously isn't very scalable but CheapoMail doesn't need to be as there will always be only a handful of users.
You should create the following database tables with the following fields:
* User
  * id
  * firstname
  * lastname
  * username
  * password
* Message
  * id
  * recipient_ids
  * user_id
  * subject
  * body
  * date_sent
* Message_read
  * id
  * message_id
  * reader_id
  * date

## Features

### Adding a user
To simplify things for this assignment users can only be added by an administrator, there is no feature for new users to self-sign up. An administrator logs in and completes the new user form. Use regular expressions to ensure that passwords have at least one number and one letter, and one capital letter and are at least 8 characters long. The password **MUST** be hashed before being stored in the database. Also ensure the other fields are validated and that user inputs are escaped and sanitized. 

### User login
A user goes to the login page and logs in. The system keeps track of the user using PHP sessions. Once logged in they are presented with the home screen which shows them recent messages which they can read and allows them to compose new messages.

### Home screen
The home screen allows a logged in user to see their 10 most recent messages and also a link to compose a new message. 

### Compose and send a message
The compose message screen includes a "subject", "recipients", and "body". Once a message is completed the logged in user can click the send button to make the message go to all recipients. 

To send a message to multiple recipients, delimit the usernames with a semicolon (;) without spaces between the names

### Receive and read a message
Each recipient of the message is alerted on their home screen of new messages. Each message is shown based on the subject and sender. Messages that have not been read are bold. When a message is opened it is immediately "flagged" as being read and is no longer bold in the home screen.

### No Page Refreshes
All new pages should load without browser refresh, in other words you will need to implement an AJAX based approach to loading new content into the browser.

