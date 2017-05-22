SET FOREIGN_KEY_CHECKS=0;
/*
The category of a product
One-to-one relation with the product entity
*/
create table if not exists category
(
	id tinyint unsigned NOT NULL AUTO_INCREMENT,
	name varchar (50),
	primary key(id)
);
/*
The ailment of a product
One-to-one relation with the product entity
*/
create table if not exists ailment
(
	id tinyint unsigned NOT NULL AUTO_INCREMENT,
	name varchar (50),
	primary key(id)
);
/*
The constituents of a product
One-to-many relation with the product entity
*/
create table if not exists constituent
(
	id tinyint unsigned NOT NULL AUTO_INCREMENT,
	name varchar (50),
	productid int unsigned NOT NULL,
	FOREIGN KEY (`productid`) REFERENCES `product` (`id`),
	primary key(id)
);
/*
The sub-constituents of a product
One-to-many relation with the product entity
*/create table if not exists subconstituent
(
	id tinyint unsigned NOT NULL AUTO_INCREMENT,
	name varchar (50),
	productid int unsigned NOT NULL,
	FOREIGN KEY (`productid`) REFERENCES `product` (`id`),
	primary key(id)
);
/*
The type of a product
One-to-one relation with the product entity
*/
create table if not exists producttype
(
	id tinyint unsigned NOT NULL AUTO_INCREMENT,
	name varchar (50),
	FOREIGN KEY (`productid`) REFERENCES `product` (`id`),
	primary key(id)
);
/*
The manufacturer of a product
One-to-one relation with the product entity
*/
create table if not exists manufacturer
(
	id tinyint unsigned NOT NULL AUTO_INCREMENT,
	name varchar (50),
	address varchar(256),
	email varchar(256),
	FOREIGN KEY (`productid`) REFERENCES `product` (`id`),
	primary key(id)
);
/*
The drug-type of a product (OTC, Prescribed)
One-to-one relation with the product entity
*/
create table if not exists drugtype
(
	id tinyint unsigned NOT NULL AUTO_INCREMENT,
	name varchar (50),
	FOREIGN KEY (`productid`) REFERENCES `product` (`id`),
	primary key(id)
);

create table if not exists product
(
	id int unsigned NOT NULL AUTO_INCREMENT,
	name varchar (50),
	description varchar(256),
	manufacturerid tinyint unsigned NOT NULL,
	typeid tinyint unsigned NOT NULL,
	ailmentid tinyint unsigned NOT NULL,
	categoryid tinyint unsigned NOT NULL,
	drugtypeid tinyint unsigned NOT NULL,	
	FOREIGN KEY (`drugtypeid`) REFERENCES `drugtype` (`id`),
	FOREIGN KEY (`categoryid`) REFERENCES `category` (`id`),
	FOREIGN KEY (`ailmentid`) REFERENCES `ailment` (`id`),
	FOREIGN KEY (`typeid`) REFERENCES `producttype` (`id`),	
	FOREIGN KEY (`manufacturerid`) REFERENCES `manufacturer` (`id`),
	primary key(id)
);

insert into category (name) values ('Dietary supplements'),('Baby care'),('Women care'),('Drug');
insert into ailment (name) values ('Antibiotic'),('Antiviral');
insert into producttype (name) values ('Tablet'),('Capsule'),('Syrup');
insert into manufacturer (name,address,email) values ('GlaxoSmithKline','Address of GlaxoSmithKline'),('Indchemie','Address of Indchemie'),('Novamed','Address of Novamed');
insert into drugtype (name) values ('OTC'),('Prescribed');
SET FOREIGN_KEY_CHECKS=1;

