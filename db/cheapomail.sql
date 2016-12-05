DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS read_messages;
DROP TABLE IF EXISTS users;

create table users(
	id int(11) auto_increment NOT NULL,
	first_name varchar(30) NOT NULL,
	last_name varchar(30) NOT NULL,
	password varchar(60) NOT NULL,
	username varchar(30) NOT NULL,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL,
	type varchar(30) NOT NULL DEFAULT "Regular",
	PRIMARY KEY(id)
);

create table messages(
	id int(11) auto_increment NOT NULL,
	message_body LONGTEXT NOT NULL,
	subject varchar(50) NOT NULL,
	user_id int(11) NOT NULL,
	flag int(11) NOT NULL DEFAULT 0,
	recipent_id int(11) NOT NULL,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(user_id) references users(id) on delete cascade on update cascade,
	FOREIGN KEY(recipent_id) references users(id) on update cascade
); 


create table read_messages(
	id int(11) auto_increment NOT NULL,
	message_id int(11) NOT NULL,
	reader_id int(11) NOT NULL,
	created_at TIMESTAMP NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY(message_id) references messages(id) on update cascade,
	FOREIGN KEY (reader_id) references users(id) on delete cascade on update cascade
);