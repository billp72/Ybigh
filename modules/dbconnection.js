const mysql  = require('mysql');
//const mariadb = require('mariadb');


/*
  host     : 'equalmatchch.db.5035656.hostedresource.com', 
  user     : 'equalmatchch',
  password : 'Eqmatch@ch72',
  database : 'equalmatchch'
*/
var connection = mysql.createConnection({
  host     : 'ybighdb1.db.14043432.351.hostedresource.net', 
  user     : 'ybighdb1',
  password : 'ybigh@1Person',
  database : 'ybighdb1'
});

module.exports = {
	connection,
	mysql

}