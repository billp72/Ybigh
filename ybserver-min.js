const{connection:connection,mysql:mysql}=require("./modules/dbconnection-min.js"),express=require("express"),bodyParser=require("body-parser"),session=require("client-sessions"),device=require("express-device"),app=express();let results=[{name:"Introduction",link:""},{name:"Sign up",link:"n-signup"},{name:"Dashboard",link:"n-dashboard"},{name:"How to use",link:"n-howtouse"},{name:"Stage 1",link:"n-stage1"},{name:"Stage 2",link:"n-stage2"},{name:"Stage 3",link:"n-stage3"}];connection.connect(),app.use(session({cookieName:"session",secret:"respqgepor30343DDmkivwkjndd-[]{}P022$",duration:432e5})),app.use("/",express.static(__dirname+"/public")),setInterval(function(){connection.query("SELECT 1")},5e3),app.set("port",process.env.PORT||5e3),app.use(bodyParser.urlencoded({extended:!1})),app.use(bodyParser.json()),app.use(device.capture({parseUserAgent:!0})),device.enableDeviceHelpers(app),device.enableViewRouting(app),app.set("view engine","ejs"),app.use("/",function(e,n,a){if(n.header("Node-server",0),"/n-signup"===e.url||"POST"!==e.method||e.session.user)return e.session.user||"GET"!==e.method?a():void n.render("pages/index",{data:results});n.render("pages/index",{data:results})}),app.get("/",function(e,n,a){n.render("pages/introduction",{data:results})}),app.get("/:name",function(e,n,a){let r=e.session.user?e.session.user:"not",t="SELECT * FROM auth WHERE id_user="+mysql.escape(r);connection.query(t,function(a,r,t){if(a)throw a;"n-signup"==e.params.name&&n.render("pages/index",{data:results}),r.length>0&&("n-howtouse"==e.params.name?n.render("pages/how_to_use",{data:results}):"n-stage1"==e.params.name?n.render("pages/stage_1",{data:results}):"n-stage2"==e.params.name?n.render("pages/stage_2",{data:results}):e.params.name)})}),app.get("/s*/data",function(e,n,a){n.send({data:["Food","Oblivion","Travel","Penis","Lie","Need","Finger","Educate","Negotiate","Wind","Urine","Scar","Spleen","Forest","Float","Threat","Close","Fig","Wander","Youth","Deep","Pierce","Eyebrow","Attach","Freedom","Behind","Eye","Swim","Wake","Hen","Wait","Dismantle","Rooster","Render","Prey","Lion, awesome","Angel","Orange","Seashore","Claw","Stiff","Marriage","Impregnate","Tree","Nemesis","Dally","Granddaughter","Stupid","Vagina","Leader","Belch","Foolishness","Understanding","Earth","Disdain","Manliness","Forbidden","Seal","Hand","Progeny","Foundation","Man","Date","Destroy","Cough","Ally","Plant","Complete","Seat","Partner","Bed","Glue","Stranger","Sexuality","Tear","Sex","Desert","Crow","Health","Haunch","Prepare","Snow","Idiocy","Youthfulness","Knee","Mouth","Dove","Fear","Swarm","Fabricate","Balance","Occupy","Womb","Wife","Horse","Cut","Storm","Grape","Color","Awl","Star","Write","Eat","Ankle","Sun","Carry","Explain","Rich","Intimate","Eagle","Thresh","Vitality","Darkness","Stubborn","Disease","Zip up","Wine","Hair","Ride","Stand","Below","Face","Domestic","Tooth","Trespass","Mirror","Condemn","Swear","Feces","Struggle","Forever","Benefactor","Share","Heat","Fruit","Insect","Light","Salt","Son","Head","Flee","Witness","Adorn","Grow","Slaughter","Father","Study","Interpretation","Broil","Heart","Warm","Sale","Burn","Sleep","Humility","Child","Dye","Mother-in-law","Leg","Sing","Wagon","Lion, young","Field","Furrow","Sight","Desolate","See","Olive","Clothing","Teacher","Chest","Water","Private life","Roof","Woman","Acquire","Territory","Trek","Reflection","Legislation","Dice","Cliff","Pregnant","Clothes","Ancestors","Saddle","Harvest","Bake","Dress","Ephemeral","Heaven","Grind","Old","Join","Grapes","Sister-in-law","Kidney","Clan","Cheek","Separate","Beast","Husband","Knead","Bedeck","Manufacture","Lemon","Repair","Understand","Lung","Battle","Contract","Breast","Importance","Alter","Tribe","Sling","Mash","Soil","Beard","Gut","Hold","Sleet","Receive","Take","Breathe","Smile","Barren","Wisdom","Read","Plow","Cold","Sew","Fortune","Divide","Spy","Belly","Smell","Joint","Leaf","Testify","Wolf","Pistachio","Sister","Tongue","Aid","Sanity","Wealth","Peek","Bird","Wealthy","Rain","Borrower","Permanence","Shoulder","Owner","Haze","Incest","Foot","Lightning","Thirst","Cook","Desecrate","Brow","Insanity","Guilt","Delay","Sit","Own","Stream","Run","Singe","Bag","Thunder","Nose","Wonder","Burden","Beautify","Bread","Chop","Pinion","Human","War","Cohort","Prince","Winnow","Fog","Remove","Nation","Fish","Discard","Stone","Ancient","Enemy","Square","Vomit","Year","Raider","Almond","Hurry","Love","Digestion","Lender","Touch","Wing","Month","Vibrant","Bone","Laugh","Permanent","Uproot","Ear","Knot","Above","Immutable","Tell","Animal","Snake","Lion","Shade","Press","Night","Degrade","Father-in-law","Bear","Pummel","Intend","Vulnerable","Immaturity","Worm","Empty","Eyelash","Girlishness","Decrepitude","Ephemerality","Word","Load","Pay","Uncle","Flesh","Adjudicate","Elucidate","Teeth","Room","Wave","Theft","Stake","Nail","Cross","Justice","Weasel","Branch","Slave","Garden","Recline","Hear","Lowliness","Odor","Fight","River","Dismember","Day","Tiger","Flower","Friend","Lay","Indict","Crag","Menstruation","Donkey","Liberty","Trust","Commitment","Judge","Inviolable","Lift","Surround","Manhood","Kill","Harbor","Age","Death","Fire","Grandchild","Surfeit","Wild","Satiation","Palace","Fly","Stalk","Mother","Vine","Scepter","Hunger","Crown","Bruise","Poverty","Lens","Suborn","Blood","Bargain","Vision","Cart","Thigh","Life","Feel","School","Famine","Young","Language","Family","Aunt","Free","Gather","Scrape","Score","Kindle","Dog","Femininity","Congress","Ship","Joy","Aged","Knife","Scale","Rest","Consistent","Breath","Transport","Toe","Scab","Planet","Grandson","Liver","Stare","Buy","Seed","Determined work","Pillar","Lips","Myself","Position","Adversary","Brother","Open","Neck","Barter","Reap","Muscle","Music","Work","Daughter","Spoils","Train","House","Semen","Speak","Gash","Dew","Argue","Suck","Purchase","Walk","Extent","Shepherd","Give","Displace","Hawk","G","World","Oppressor","Week","Army","Perimeter","Circle","King","Tattoo","Surface"]})}),app.post("/n-signup",function(e,n,a){if(results.push({name:"",link:""}),e.body.email){let a="SELECT * FROM auth WHERE email_user = ?";connection.query(a,mysql.escape(e.body.email),function(a,r,t){if(a)results[results.length-1].msg=a,n.render("pages/index",{data:results});else if(r.length>0)e.session.user?(results[results.length-1].msg="You are already logged in",n.render("pages/index",{data:results})):(e.session.user=mysql.escape(r[0].id_user),results[results.length-1].msg="New session created",n.render("pages/index",{data:results}));else{let a={email_user:mysql.escape(e.body.email)},r="INSERT INTO auth SET ?";connection.query(r,a,function(a,r){if(a)throw a;e.session.user=r.insertId,results[results.length-1].msg='Email sent. Please proceed to "How to use"',n.render("pages/index",{data:results})})}})}else results[results.length-1].msg="Please add your email",n.render("pages/index",{data:results})}),app.post("/symbol",function(e,n,a){n.set({"Content-Type":"text/plain"}),n.send("submitted")}),app.listen(app.get("port"),function(){console.log("Node app is running on port",app.get("port"))});