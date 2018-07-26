/*
example usage. 

Below shows how one might parse XML, save it to a noSQL DB
and render the results.
*/
const mysql      = require('mysql');
const express    = require('express');
const bodyParser = require('body-parser');
const session    = require('client-sessions');
const app        = express();
//const router     = express.Router();

//var MongoClient = require('mongodb').MongoClient;
//var mongoose = require('mongoose');
//var assert = require('assert');
//var url = 'mongodb://127.0.0.1/Books';
//var xml = "<root>Item one</root>";
//mongoose.connect(url);
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

var connection = mysql.createConnection({
  host     : 'equalmatchch.db.5035656.hostedresource.com', 
  user     : 'equalmatchch',
  password : 'Eqmatch@ch72',
  database : 'equalmatchch'
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

/*var Schema = mongoose.Schema;

var bookSchema = new Schema({
    author: String
    title: String,
    genre: String,
    price: String,
    publish_date: String,
    description: String
});*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

  let sql = 'SELECT email FROM users WHERE email='+mysql.escape(id);

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

        let sql = 'SELECT email FROM users WHERE email = ?';
   
        connection.query(sql, mysql.escape(req.body.email), function (error, result_user, fields){

         if(!error){
         
            if(result_user.length > 0){

                if(!!req.session.user){
                    results[results.length-1].msg = 'That email already exists';
                    res.render('pages/index', {data: results});
                }else{
                    req.session.user = mysql.escape(req.body.email);
                    results[results.length-1].msg = 'New session created';
                    res.render('pages/index', {data: results});
                }
                
            }else{
                let user = {'email': mysql.escape(req.body.email)}
                let sql_insert = "INSERT INTO users SET ?";

                connection.query(sql_insert, user, function (err, db){
                    if (err) throw err;

                    req.session.user = mysql.escape(req.body.email);

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


app.listen(3000, function() { console.log('listening'); });

//var book = new Book({author: result[0]});
        //book.save(function(err, author){});

            /*Book.collection.insertMany(result.catalog.book, function(err,r) {
                assert.equal(null, err);
                assert.equal(12, r.insertedCount);

                db.close();
          })*/
