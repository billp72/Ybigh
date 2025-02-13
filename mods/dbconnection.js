const mysql  = require('mysql');
//const mariadb = require('mariadb');


/*
  host     : 'equalmatchch.db.5035656.hostedresource.com', 
  user     : 'equalmatchch',
  password : 'Eqmatch@ch72',
  database : 'equalmatchch'
  ybigh@1Person
  ybighdb1.db.14043432.351.hostedresource.net
  
  testDB@10
*/
var connection = mysql.createConnection({
  host     : 'localhost', 
  user     : 'root',
  password : 'testDB@10',
  database : 'ybighdb1',
  port: 3306
});

module.exports = {
	connection,
	mysql

}