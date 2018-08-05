/*
Ybigh simple server
*/
const mysql      = require('mysql');
const express    = require('express');
const bodyParser = require('body-parser');
const session    = require('client-sessions');
const device     = require('express-device');
const app        = express();
//const router     = express.Router();

let results = [
    {
        name:"Introduction",
        link:""
    },
    {
        name:"Sign up",
        link:"Signup"
    },
    {
        name:"How to use",
        link:"Howtouse"
    },
    {
        name:"Stage 1",
        link:"Stage1"
    },
    {
        name:"Stage 2",
        link:"Stage2"
    },
    {
        name:"Stage 3",
        link:"Stage3"
    }
    
]
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
 
connection.connect();

app.use(session({
  cookieName: 'session',
  secret: 'respqgepor30343DDmkivwkjndd-[]{}P022$',
  duration: 24 * 30 * 60 * 1000,
  /*activeDuration: 5 * 60 * 1000,*/
}));

app.use('/', express.static(__dirname + '/public')); // ← adjust

setInterval(function () {
    connection.query('SELECT 1');
}, 5000);

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(device.capture({ parseUserAgent: true }));

device.enableDeviceHelpers(app);
device.enableViewRouting(app);

//var Book = mongoose.model('Book', bookSchema);

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use('/', function (req, res, next) {
    //console.log(req.session.user, req.method);
    if(!req.session.user && req.method === 'GET'){

        res.render('pages/index', {data: results});

        return;

    }else{
       return next();
    }
  //console.log('Time:', Date.now())
  
})


// index page 
app.get('/', function(req, res, next){
   res.render('pages/introduction', {data: results});  
})


app.get('/:name', function(req, res, next) {
  //console.log(req.params);

  let id = !!req.session.user ? req.session.user : 'not';

  let sql = 'SELECT * FROM auth WHERE id_user='+mysql.escape(id);

  connection.query(sql, function (error, result, fields) {
       if (error) throw error;

       if(req.params.name == 'Signup'){

            res.render('pages/index', {data: results});
  
        }
     
	   if(result.length > 0){//check for results

            if(req.params.name == 'Howtouse'){

                res.render('pages/how_to_use', {data: results});

            }else if(req.params.name == 'Stage1'){

                res.render('pages/stage_1', {data: results});

            }else if(req.params.name == 'Stage2'){

                res.render('pages/stage_2', {data: results});

            }else if(req.params.name == 'Stage3'){

                //stage 3

            }

    	}    
    		
	  

	});


  //connection.end();
});
/*app.get('/data:id', function(req, res, next) {
    //req.query
});*/

app.post('/Signup', function(req, res, next) {
    //req.query
    results.push({
        name:'',
        link:''
    });
  
    if(req.body.email){

        let sql = 'SELECT * FROM auth WHERE email_user = ?';
   
        connection.query(sql, mysql.escape(req.body.email), function (error, result_user, fields){

         if(!error){
          
            if(result_user.length > 0){
                
                if(!!req.session.user){
                    results[results.length-1].msg = 'You are already logged in';
                    res.render('pages/index', {data: results});
                }else{
                    req.session.user = mysql.escape(result_user[0].id);
                    results[results.length-1].msg = 'New session created';
                    res.render('pages/index', {data: results});
                }
                
            }else{
                let user = {'email_user': mysql.escape(req.body.email)}
                let sql_insert = "INSERT INTO auth SET ?";

                connection.query(sql_insert, user, function (err, row){
                    if (err) throw err;
               
                    req.session.user = row.insertId;

                    results[results.length-1].msg = 'Email sent. Please proceed to "How to use"';

                    res.render('pages/index', {data: results});
                })
            }
          }else{
            results[results.length-1].msg = error;
            res.render('pages/index', {data: results});
          }
        });
    }else{

      results[results.length-1].msg = 'Please add your email';

      res.render('pages/index', {data: results});
    }

    
});

app.post('/symbol', function(req, res, next){
  console.log(req.body);
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

