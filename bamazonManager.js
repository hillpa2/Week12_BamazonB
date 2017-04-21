var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port:"3306",
    user: "root",
    password:"INSERT PASSWORD HERE",
    database: "Bamazon" 
})

connection.connect(function(err){
    if (err) throw err;
});

inquirer.prompt([
	{
    	type: "list",
    	message: "Manager Options: ",
    	choices: ["View_Products_for_Sale", "View_Low_Inventory", "Add_to_Inventory", "Add_New_Product"],
    	name: "Upper"
	},
]).then(function(newVal) {
	if (newVal.Upper==="View_Products_for_Sale") {
		connection.query("SELECT * FROM Bamazon.products", function(err,res){
			if(err) throw err;
			//console.log(res);
			for(x=0; x<res.length; x++){
				console.log("Item ID: "+res[x].item_id);
				console.log("Product Name: "+res[x].product_name);
				console.log("Department Name: "+res[x].department_name);
				console.log("Price: $"+res[x].price);
				console.log("Stock quantity: "+res[x].stock_quantity);
				console.log("-----------------------------");
			}
		});
	} 
	else if (newVal.Upper==="View_Low_Inventory") {
		connection.query("SELECT * FROM Bamazon.products", function(err,res){
			if(err) throw err;
			//console.log(res);
			for(x=0; x<res.length; x++){
				if (res[x].stock_quantity<5) {
					console.log("Item ID: "+res[x].item_id);
					console.log("Product Name: "+res[x].product_name);
					console.log("Department Name: "+res[x].department_name);
					console.log("Price: $"+res[x].price);
					console.log("Stock quantity: "+res[x].stock_quantity);
					console.log("-----------------------------");
				}
			}
		});
	}
	else if (newVal.Upper==="Add_to_Inventory") {
		inquirer.prompt([
        	{
            	type: "input",
            	message: "ID of choice: ",
            	name: "alpha"
        	},
        	{
            	type: "input",
            	name: "beta",
            	message: "Amount of Items to Add: "
        	},
    	]).then(function(newVal){
    		tempID=parseInt(newVal.alpha);
        	IDamount=parseInt(newVal.beta);
        	connection.query("SELECT * FROM Bamazon.products WHERE item_id = ?", [tempID], function(err,res){
			
				newAmount=res[0].stock_quantity+IDamount;
				//console.log(newAmount);
				connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [newAmount, tempID], function(err,res){
					if(err) throw err;
				});
			});
		});
    }
	else if (newVal.Upper==="Add_New_Product") {
		inquirer.prompt([
        	{
            	type: "input",
            	message: "Product Name: ",
            	name: "product_name"
        	},
        	{
            	type: "input",
            	message: "Department Name: ",
            	name: "department_name"
        	},
        	        	{
            	type: "input",
            	message: "Price: ",
            	name: "price"
        	},
        	        	{
            	type: "input",
            	message: "Stock Quantity: ",
            	name: "stock_quantity"
        	},
        ]).then(function(newVal){
        	connection.query("INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES (?,?,?,?)", [newVal.product_name, newVal.department_name, newVal.price, newVal.stock_quantity], function(err,res){
        		if(err) throw err;
        	});
        });
	}
	else {
		console.log("There was a problem sorry")
	}

});