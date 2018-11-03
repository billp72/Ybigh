/*
Ybigh simple server 1
*/
const { connection, mysql } = require("../modules/dbconnection-min.js");
const express    = require('express');
const bodyParser = require('body-parser');
const session    = require('client-sessions');
const device     = require('express-device');
const app        = express();
//const router     = express.Router();

let nav = [
    {
        name:"Introduction",
        link:""
    },
    {
        name:"Sign up",
        link:"n-signup"
    },
    {
        name:"Dashboard",
        link:"n-dashboard"
    },
    {
        name:"How to use",
        link:"n-howtouse"
    },
    {
        name:"Stage 1",
        link:"n-stage1"
    },
    {
        name:"Stage 2",
        link:"n-stage2"
    },
    {
        name:"Stage 3",
        link:"n-stage3"
    }
    
]

function dbconnect(){
    connection1 = mysql.createConnection(connection);
    connection1.connect(function(err){
      if(err){
        console.log(err);
        dbconnect();
      }else{
        console.log("database connected");
      }
    });
}
dbconnect();

app.use(session({
  cookieName: 'session',
  secret: 'respqgepor30343DDmkivwkjndd-[]{}P022$',
  duration: 24 * 30 * 60 * 1000,
  /*activeDuration: 5 * 60 * 1000,*/
}));

app.use('/', express.static(__dirname + '/../public')); // ← adjust

setInterval(function () {
    connection1.query('SELECT 1');
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

    res.header('Node-server' , 0 );

    if(req.url !== '/n-signup' && req.method === 'POST' && !req.session.user){

       res.status(200).send(false);

        return;
    }
    
    if(!req.session.user && req.method === 'GET'){

        res.render(__dirname + '/../views/pages/index', {data: nav});

        return;

    }else{
       return next();
    }
  //console.log('Time:', Date.now())
  
})


// index page 
app.get('/', function(req, res, next){
   res.render(__dirname +'/../views/pages/introduction', {data: nav});  
})


app.get('/:name', function(req, res, next) {
  //console.log(req.params);

  let id = !!req.session.user ? req.session.user : 'not';

  let sql = 'SELECT * FROM auth WHERE id_user='+mysql.escape(id);

  connection.query(sql, function (error, result, fields) {
       if (error) throw error;

       if(req.params.name == 'n-signup'){

            res.render(__dirname +'/../views/pages/index', {data: nav});
  
        }
     
	   if(result.length > 0){//check for nav

            if(req.params.name == 'n-howtouse'){

                res.render(__dirname +'/../views/pages/how_to_use', {data: nav});

            }else if(req.params.name == 'n-stage1'){

                res.render(__dirname +'/../views/pages/stage_1', {data: nav});

            }else if(req.params.name == 'n-stage2'){

                res.render(__dirname +'/../views/pages/stage_2', {data: nav});

            }else if(req.params.name == 'n-stage3'){

                //stage 3

            }

    	}    
    		
	  

	});


  //connection.end();
});
app.get('/s*/data', function(req, res, next) {

res.send({
    data:[
"Food",
"Oblivion",
"Travel",
"Penis",
"Lie",
"Need",
"Finger",
"Educate",
"Negotiate",
"Wind",
"Urine",
"Scar",
"Spleen",
"Forest",
"Float",
"Threat",
"Close",
"Fig",
"Wander",
"Youth",
"Deep",
"Pierce",
"Eyebrow",
"Attach",
"Freedom",
"Behind",
"Eye",
"Swim",
"Wake",
"Hen",
"Wait",
"Dismantle",
"Rooster",
"Render",
"Prey",
"Lion, awesome", 
"Angel",
"Orange",
"Seashore",
"Claw",
"Stiff",
"Marriage",
"Impregnate",
"Tree",
"Nemesis",
"Dally",
"Granddaughter",
"Stupid",
"Vagina",
"Leader",
"Belch",
"Foolishness",
"Understanding",
"Earth",
"Disdain",
"Manliness",
"Forbidden",
"Seal",
"Hand",
"Progeny",
"Foundation",
"Man",
"Date",
"Destroy",
"Cough",
"Ally",
"Plant",
"Complete",
"Seat",
"Partner",
"Bed",
"Glue",
"Stranger",
"Sexuality",
"Tear",
"Sex",
"Desert",
"Crow",
"Health",
"Haunch",
"Prepare",
"Snow",
"Idiocy",
"Youthfulness",
"Knee",
"Mouth",
"Dove",
"Fear",
"Swarm",
"Fabricate",
"Balance",
"Occupy",
"Womb",
"Wife",
"Horse",
"Cut",
"Storm",
"Grape",
"Color",
"Awl",
"Star",
"Write",
"Eat",
"Ankle",
"Sun",
"Carry",
"Explain",
"Rich",
"Intimate",
"Eagle",
"Thresh",
"Vitality",
"Darkness",
"Stubborn",
"Disease",
"Zip up",
"Wine",
"Hair",
"Ride",
"Stand",
"Below",
"Face",
"Domestic",
"Tooth",
"Trespass",
"Mirror",
"Condemn",
"Swear",
"Feces",
"Struggle",
"Forever",
"Benefactor",
"Share",
"Heat",
"Fruit",
"Insect",
"Light",
"Salt",
"Son",
"Head",
"Flee",
"Witness",
"Adorn",
"Grow",
"Slaughter",
"Father",
"Study",
"Interpretation",
"Broil",
"Heart",
"Warm",
"Sale",
"Burn",
"Sleep",
"Humility",
"Child",
"Dye",
"Mother-in-law",
"Leg",
"Sing",
"Wagon",
"Lion, young",
"Field",
"Furrow",
"Sight",
"Desolate",
"See",
"Olive",
"Clothing",
"Teacher",
"Chest",
"Water",
"Private life",
"Roof",
"Woman",
"Acquire",
"Territory",
"Trek",
"Reflection",
"Legislation",
"Dice",
"Cliff",
"Pregnant",
"Clothes",
"Ancestors",
"Saddle",
"Harvest",
"Bake",
"Dress",
"Ephemeral",
"Heaven",
"Grind",
"Old",
"Join",
"Grapes",
"Sister-in-law",
"Kidney",
"Clan",
"Cheek",
"Separate",
"Beast",
"Husband",
"Knead",
"Bedeck",
"Manufacture",
"Lemon",
"Repair",
"Understand",
"Lung",
"Battle",
"Contract",
"Breast",
"Importance",
"Alter",
"Tribe",
"Sling",
"Mash",
"Soil",
"Beard",
"Gut",
"Hold",
"Sleet",
"Receive",
"Take",
"Breathe",
"Smile",
"Barren",
"Wisdom",
"Read",
"Plow",
"Cold",
"Sew",
"Fortune",
"Divide",
"Spy",
"Belly",
"Smell",
"Joint",
"Leaf",
"Testify",
"Wolf",
"Pistachio",
"Sister",
"Tongue",
"Aid",
"Sanity",
"Wealth",
"Peek",
"Bird",
"Wealthy",
"Rain",
"Borrower",
"Permanence",
"Shoulder",
"Owner",
"Haze",
"Incest",
"Foot",
"Lightning",
"Thirst",
"Cook",
"Desecrate",
"Brow",
"Insanity",
"Guilt",
"Delay",
"Sit",
"Own",
"Stream",
"Run",
"Singe",
"Bag",
"Thunder",
"Nose",
"Wonder",
"Burden",
"Beautify",
"Bread",
"Chop",
"Pinion",
"Human",
"War",
"Cohort",
"Prince",
"Winnow",
"Fog",
"Remove",
"Nation",
"Fish",
"Discard",
"Stone",
"Ancient",
"Enemy",
"Square",
"Vomit",
"Year",
"Raider",
"Almond",
"Hurry",
"Love",
"Digestion",
"Lender",
"Touch",
"Wing",
"Month",
"Vibrant",
"Bone",
"Laugh",
"Permanent",
"Uproot",
"Ear",
"Knot",
"Above",
"Immutable",
"Tell",
"Animal",
"Snake",
"Lion",
"Shade",
"Press",
"Night",
"Degrade",
"Father-in-law",
"Bear",
"Pummel",
"Intend",
"Vulnerable",
"Immaturity",
"Worm",
"Empty",
"Eyelash",
"Girlishness",
"Decrepitude",
"Ephemerality",
"Word",
"Load",
"Pay",
"Uncle",
"Flesh",
"Adjudicate",
"Elucidate",
"Teeth",
"Room",
"Wave",
"Theft",
"Stake",
"Nail",
"Cross",
"Justice",
"Weasel",
"Branch",
"Slave",
"Garden",
"Recline",
"Hear",
"Lowliness",
"Odor",
"Fight",
"River",
"Dismember",
"Day",
"Tiger",
"Flower",
"Friend",
"Lay",
"Indict",
"Crag",
"Menstruation",
"Donkey",
"Liberty",
"Trust",
"Commitment",
"Judge",
"Inviolable",
"Lift",
"Surround",
"Manhood",
"Kill",
"Harbor",
"Age",
"Death",
"Fire",
"Grandchild",
"Surfeit",
"Wild",
"Satiation",
"Palace",
"Fly",
"Stalk",
"Mother",
"Vine",
"Scepter",
"Hunger",
"Crown",
"Bruise",
"Poverty",
"Lens",
"Suborn",
"Blood",
"Bargain",
"Vision",
"Cart",
"Thigh",
"Life",
"Feel",
"School",
"Famine",
"Young",
"Language",
"Family",
"Aunt",
"Free",
"Gather",
"Scrape",
"Score",
"Kindle",
"Dog",
"Femininity",
"Congress",
"Ship",
"Joy",
"Aged",
"Knife",
"Scale",
"Rest",
"Consistent",
"Breath",
"Transport",
"Toe",
"Scab",
"Planet",
"Grandson",
"Liver",
"Stare",
"Buy",
"Seed",
"Determined work",
"Pillar",
"Lips",
"Myself",
"Position",
"Adversary",
"Brother",
"Open",
"Neck",
"Barter",
"Reap",
"Muscle",
"Music",
"Work",
"Daughter",
"Spoils",
"Train",
"House",
"Semen",
"Speak",
"Gash",
"Dew",
"Argue",
"Suck",
"Purchase",
"Walk",
"Extent",
"Shepherd",
"Give",
"Displace",
"Hawk",
"G",
"World",
"Oppressor",
"Week",
"Army",
"Perimeter",
"Circle",
"King",
"Tattoo",
"Surface"

    ]
});

});

app.post('/n-signup', function(req, res, next) {
    //req.query
    nav.push({
        name:'',
        link:''
    });
  
    if(req.body.email){

        let sql = 'SELECT * FROM auth WHERE email_user = ?';
   
        connection.query(sql, mysql.escape(req.body.email), function (error, result_user, fields){

         if(!error){
          
            if(result_user.length > 0){
                
                if(!!req.session.user){
                    nav[nav.length-1].msg = 'You are already logged in';
                    res.render(__dirname +'/../views/pages/index', {data: nav});
                }else{
                    req.session.user = mysql.escape(result_user[0].id_user);
                    nav[nav.length-1].msg = 'New session created';
                    res.render(__dirname +'/../views/pages/index', {data: nav});
                }
                
            }else{
                let user = {'email_user': mysql.escape(req.body.email)}
                let sql_insert = "INSERT INTO auth SET ?";

                connection.query(sql_insert, user, function (err, row){
                    if (err) throw err;
               
                    req.session.user = row.insertId;

                    nav[nav.length-1].msg = 'Email sent. Please proceed to "How to use"';

                    res.render(__dirname +'/../views/pages/index', {data: nav});
                })
            }
          }else{
            nav[nav.length-1].msg = error;
            res.render(__dirname +'/../views/pages/index', {data: nav});
          }
        });
    }else{

      nav[nav.length-1].msg = 'Please add your email';

      res.render(__dirname +'/../views/pages/index', {data: nav});
    }

    
});

app.post('/symbol', function(req, res, next){
  //console.log(req.body);
  res.set({'Content-Type': 'text/plain'});
  res.status(200).send(true);
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

