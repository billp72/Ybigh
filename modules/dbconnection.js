const mysql  = require('mysql');



/*
  host     : 'equalmatchch.db.5035656.hostedresource.com', 
  user     : 'equalmatchch',
  password : 'Eqmatch@ch72',
  database : 'equalmatchch'
*/
var connection = mysql.createConnection({
  host     : 'Ybighdb.db.5035656.3c5.hostedresource.net', 
  user     : 'Ybighdb',
  password : 'Ybigh@1data',
  database : 'Ybighdb'
});

module.exports = {
	connection,
	mysql

}