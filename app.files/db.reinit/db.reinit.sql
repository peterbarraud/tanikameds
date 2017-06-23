SET FOREIGN_KEY_CHECKS=0;
use tanikae1_meds;
drop table if exists appuser;
create table if not exists appuser (
	id tinyint unsigned NOT NULL AUTO_INCREMENT,
	name varchar(256),
	username varchar (50),
	email varchar(100),
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

-- price by vendor
drop table if exists vendorproductprice;
create table if not exists vendorproductprice (
	id int unsigned NOT NULL AUTO_INCREMENT,
	vendorid tinyint unsigned NOT NULL,
	productid int unsigned NOT NULL,
	price decimal(10,2) NOT NULL,
	FOREIGN KEY (`productid`) REFERENCES `product` (`id`),
	FOREIGN KEY (`vendorid`) REFERENCES `appuser` (`id`),
	primary key(id)
);

-- customer details (name, address, etc)
-- may be used when we have registered users and stuff
drop table if exists customer;
create table if not exists customer (
	id int unsigned NOT NULL AUTO_INCREMENT,
	name varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	mobile varchar(100) NOT NULL,
	address1 varchar(100) NOT NULL,
	address2 varchar(100) NOT NULL,
	address3 varchar(100) NOT NULL,
	primary key(id)
);

-- one line item for every customer order by vendor
-- if a customer has multiple orders from the same vendor, we'll have different line items
-- we can also accomodate a customer who has one order from multiple vendors - one line item for each:
--  because interally we will just take these as diffeent orders from the same customer. just to different vendors
drop table if exists customerorder;
create table if not exists customerorder (
	id int unsigned NOT NULL AUTO_INCREMENT,
	customerid int unsigned NOT NULL,
	vendorid tinyint unsigned NOT NULL,
	statusid tinyint unsigned NOT NULL,
	-- we are going to use a hard-wired check for TIMESTAMP fields
	-- to use timestamp fields, you're going to have to append the field name with a _ts (for timestamp)
	-- TODO: we need to have a check in our dbinit.bat for this
	-- fail the dbinit if a timestamp field does not have the _ts append
	-- now the reason we are doing this is when we do the datalayer insert / update. We don't want to touch these fields through code
	-- MySQL must manage time stamp updates the way it does
	orderdate_ts DATETIME NOT NULL,
	updatedate_ts DATETIME NOT NULL,
	FOREIGN KEY (`customerid`) REFERENCES `customer` (`id`),
	FOREIGN KEY (`vendorid`) REFERENCES `appuser` (`id`),
	FOREIGN KEY (`statusid`) REFERENCES `orderstatus` (`id`),
	primary key(id)
);

drop table if exists orderstatus;
create table if not exists orderstatus
(
	id tinyint unsigned NOT NULL AUTO_INCREMENT,
	name varchar (50),
	defaultstatus_bool char(1) DEFAULT NULL,
	description text,
	primary key(id)
);

-- one line item for every product that every customer bought for every vendor
drop table if exists customerproductorder;
create table if not exists customerproductorder (
	id int unsigned NOT NULL AUTO_INCREMENT,
	customerorderid int unsigned NOT NULL,
	productid int unsigned NOT NULL,
	quantity SMALLINT unsigned NOT NULL,
	FOREIGN KEY (`productid`) REFERENCES `product` (`id`),
	FOREIGN KEY (`customerorderid`) REFERENCES `customerorder` (`id`),
	primary key(id)
);

insert into appuser (name, username, email, password, defaultroute, userclassname, canaddproduct, candeleteproduct, canmanageuser) values ('Monika Aggarwal', 'monikaa75@gmail.com', 'monikaa75@gmail.com', 'admin', 'product', 'admin', 1, 1, 1);
-- To insert product records, run the XLS Macro
SET FOREIGN_KEY_CHECKS=1;
