CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products(
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255),
    price INTEGER(11) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY(item_id)
);

USE Bamazon;

SELECT*FROM products;

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Bread","Food",1,4);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Pair of Shoes","Clothing",4,7);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Pant","Clothing",4,2);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Shirt","Clothing",4,10);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Hat", "Clothing",4,1);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Chicken","Food",2,7);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Beef","Food",3,5);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Pork","Food",3,4);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Soap","Other",2,10);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Dilute Hydrochloric Acid (3 liters)","Other",1,1);
