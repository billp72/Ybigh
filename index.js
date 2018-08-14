/*
Ybigh simple server
*/
const { connection, mysql } = require("./modules/dbconnection");
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
        name:"Dashboard",
        link:"dashboard"
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
app.get('/S*/data', function(req, res, next) {

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
                    req.session.user = mysql.escape(result_user[0].id_user);
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
  //console.log(req.body);
  res.set({'Content-Type': 'text/plain'});
  res.send('submitted');
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

