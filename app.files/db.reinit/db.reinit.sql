SET FOREIGN_KEY_CHECKS=0;
use tanikae1_meds;
drop table if exists appuser;
create table if not exists appuser (
	id tinyint unsigned NOT NULL AUTO_INCREMENT,
	name varchar(256),
	username varchar (50),
	password varchar (50),
	defaultroute varchar(20),
	showproducthelpdialog char(1),
	CONSTRAINT unique_username UNIQUE (username),
	primary key(id)
);
drop table if exists category;
create table if not exists category (
	id tinyint unsigned NOT NULL AUTO_INCREMENT,
	name varchar (50),
	description text,
	primary key(id)
);
/*
The ailment of a product
One-to-one relation with the product entity
*/
drop table if exists ailment;
create table if not exists ailment(
	id tinyint unsigned NOT NULL AUTO_INCREMENT,
	name varchar (50),
	description text,
	primary key(id)
);
/*
The constituents of a product
*/
drop table if exists constituent;
create table if not exists constituent
(
	id tinyint unsigned NOT NULL AUTO_INCREMENT,
	name varchar (50),
	primary key(id)
);

drop table if exists productconstituent;
create table if not exists productconstituent
(
	id tinyint unsigned NOT NULL AUTO_INCREMENT,
	productid int unsigned NOT NULL,
	constituentid tinyint unsigned NOT NULL,
	FOREIGN KEY (`productid`) REFERENCES `product` (`id`),
	FOREIGN KEY (`constituentid`) REFERENCES `constituent` (`id`),
	name varchar (50),
	primary key(id)
);

/*
The sub-constituents of a product
*/
drop table if exists subconstituent;
create table if not exists subconstituent
(
	id tinyint unsigned NOT NULL AUTO_INCREMENT,
	name varchar (50),
	primary key(id)
);


drop table if exists productsubconstituent;
create table if not exists productsubconstituent
(
	id tinyint unsigned NOT NULL AUTO_INCREMENT,
	productid int unsigned NOT NULL,
	subconstituentid tinyint unsigned NOT NULL,
	FOREIGN KEY (`productid`) REFERENCES `product` (`id`),
	FOREIGN KEY (`subconstituentid`) REFERENCES `subconstituent` (`id`),
	name varchar (50),
	primary key(id)
);

/*
The type of a product
One-to-one relation with the product entity
*/
drop table if exists producttype;
create table if not exists producttype
(
	id tinyint unsigned NOT NULL AUTO_INCREMENT,
	name varchar (50),
	description text,
	primary key(id)
);
/*
The manufacturer of a product
One-to-one relation with the product entity
*/
drop table if exists manufacturer;
create table if not exists manufacturer
(
	id tinyint unsigned NOT NULL AUTO_INCREMENT,
	name varchar (50),
	address varchar(256),
	email varchar(256),
	primary key(id)
);
/*
The drug-type of a product (OTC, Prescribed)
One-to-one relation with the product entity
*/
drop table if exists drugtype;
create table if not exists drugtype
(
	id tinyint unsigned NOT NULL AUTO_INCREMENT,
	name varchar (50),
	description text,
	primary key(id)
);
drop table if exists product;
create table if not exists product
(
	id int unsigned NOT NULL AUTO_INCREMENT,
	name varchar (50),
	description varchar(256),
	keyword varchar(50),
	manufacturerid tinyint unsigned NOT NULL,
	typeid tinyint unsigned NOT NULL,
	ailmentid tinyint unsigned NOT NULL,
	categoryid tinyint unsigned NOT NULL,
	drugtypeid tinyint unsigned NOT NULL,
	constituentids varchar(100) NOT NULL,
	subconstituentids varchar(100) NOT NULL,
	FOREIGN KEY (`drugtypeid`) REFERENCES `drugtype` (`id`),
	FOREIGN KEY (`categoryid`) REFERENCES `category` (`id`),
	FOREIGN KEY (`ailmentid`) REFERENCES `ailment` (`id`),
	FOREIGN KEY (`typeid`) REFERENCES `producttype` (`id`),	
	FOREIGN KEY (`manufacturerid`) REFERENCES `manufacturer` (`id`),
	primary key(id)
);

insert into appuser (name, username, password, defaultroute, showproducthelpdialog) values('Monika Agarwal', 'monikaa75@gmail.com', 'admin', 'product', 1);
insert into category (name) values ('Dietary supplements'),('Baby care'),('Women care'),('Drug');
insert into ailment (name) values ('Antibiotic'),('Antiviral');
insert into producttype (name) values ('Tablet'),('Capsule'),('Syrup');
insert into manufacturer (name,address,email) values ('GlaxoSmithKline','Address of GlaxoSmithKline','GlaxoSmithKline@email.com'),('Indchemie','Address of Indchemie','Indchemie@email.com'),('Novamed','Address of Novamed','Novamed@email.com');
insert into drugtype (name) values ('OTC'),('Prescribed');
insert into constituent (name) values ('Amoxicillin 500mg'),('Amoxicillin 400mg'),('Clavunic Acid 125mg'),('Clavunic Acid 57.8mg');
insert into subconstituent (name) values ('Lactobacillus');
insert into product (name, description, manufacturerid, typeid, ailmentid, categoryid, drugtypeid) values('p1', 'p1 description', 1, 1, 1, 1, 1);
insert into productconstituent (productid, constituentid) values(1, 1), (1, 2), (1, 3);  
insert into productsubconstituent (productid, subconstituentid) values(1, 3), (1, 4), (1, 4);  
SET FOREIGN_KEY_CHECKS=1;

