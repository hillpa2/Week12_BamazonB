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
    console.log("CONNECTED AS ID #" + connection.threadId);
    console.log("-----------------------------");
    console.log("INVENTORY:")
});

//
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
	gosplan();
});

function gosplan (){
var gosplan = inquirer.prompt([
        {
            type: "input",
            message: "ID of choice: ",
            name: "alpha"
        },
        {
            type: "input",
            name: "beta",
            message: "Amount of Items: "
        },
    ]).then(function(newVal){
        tempID=parseInt(newVal.alpha);
        IDamount=parseInt(newVal.beta);

		connection.query("SELECT * FROM Bamazon.products WHERE item_id = ?", [tempID], function(err,res){
			if (IDamount>res[0].stock_quantity) {
				console.log("INSUFFICIENT RESOURCES");
				connection.end();
			}
			else {
				newAmount=res[0].stock_quantity-IDamount;
				//console.log(newAmount);
				connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [newAmount, tempID], function(err,res){
					if(err) throw err;
				});
				costB=IDamount*res[0].price
				console.log("Total Cost: $"+costB)
			}
		});
    })
};