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
	mobilenumber varchar(20),
	addressone varchar(100),
	addresstwo varchar(100),
	cityname varchar(30),
	pincode varchar(10),
	statename varchar(30),
	locationlatitude float(10, 6),
	locationlongitude float(10, 6),
	-- Possible values: admin, vendor
	userclassname char(10),
	-- Boolean 1: True; 0: False
	canaddproduct char(1),
	candeleteproduct char(1),
	canmanageuser char(1),
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

drop table if exists vendorproductprice;
create table if not exists vendorproductprice (
	id int unsigned NOT NULL AUTO_INCREMENT,
	vendorid tinyint unsigned NOT NULL,
	productid int unsigned NOT NULL,
	price decimal(10,2) NOT NULL,
	FOREIGN KEY (`productid`) REFERENCES `product` (`id`),
	FOREIGN KEY (`productid`) REFERENCES `product` (`id`),
	primary key(id)
);

insert into appuser (name, username, password, defaultroute, showproducthelpdialog, userclassname) values('Monika Agarwal', 'monikaa75@gmail.com', 'admin', 'vendor', 1, 'admin');
insert into category (name) values ('Dietary supplements'),('Baby care'),('Women care'),('Drug');
insert into ailment (name) values ('Antibiotic'),('Antiviral');
insert into producttype (name) values ('Tablet'),('Capsule'),('Syrup');
insert into manufacturer (name,address,email) values ('GlaxoSmithKline','Address of GlaxoSmithKline','GlaxoSmithKline@email.com'),('Indchemie','Address of Indchemie','Indchemie@email.com'),('Novamed','Address of Novamed','Novamed@email.com');
insert into drugtype (name) values ('OTC'),('Prescribed');
insert into constituent (name) values ('Amoxicillin 500mg'),('Amoxicillin 400mg'),('Clavunic Acid 125mg'),('Clavunic Acid 57.8mg');
insert into subconstituent (name) values ('Lactobacillus');
-- To insert product records, run the XLS Macro
SET FOREIGN_KEY_CHECKS=1;

