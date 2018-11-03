const mysql  = require('mysql');



/*
  host     : 'equalmatchch.db.5035656.hostedresource.com', 
  user     : 'equalmatchch',
  password : 'Eqmatch@ch72',
  database : 'equalmatchch'
*/
var connection = mysql.createConnection({
  host     : 'ybighdbtest.db.14043432.e08.hostedresource.net', 
  user     : 'ybighdbtest',
  password : 'ybigh@1Test',
  database : 'ybighdbtest'
});

module.exports = {
	connection,
	mysql

}