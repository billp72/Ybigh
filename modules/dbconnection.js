const mysql  = require('mysql');



/*
  host     : 'equalmatchch.db.5035656.hostedresource.com', 
  user     : 'equalmatchch',
  password : 'Eqmatch@ch72',
  database : 'equalmatchch'
*/
var connection = mysql.createConnection({
  host     : 'ybighdb.db.14043432.d75.hostedresource.net', 
  user     : 'ybighdb',
  password : 'Goodbadybigh@1',
  database : 'ybighdb'
});

module.exports = {
	connection,
	mysql

}