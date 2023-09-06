const router = require("express").Router();
const CryptoJs = require("crypto-js"); 
const jwt = require("jsonwebtoken");
const db = require("../../../../server/database")
const passport = require("passport");
const verify = require("../../../../server/verifyToken");
const dotenv = require("dotenv");
const sgMail = require('@sendgrid/mail');
const Isemail = require("isemail");
const session = require('express-session');
const upload_file = require("../../../../server/uploadFiles");
const LinkedinStrategy = require("passport-linkedin-oauth2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
var fs = require('fs'),
http = require('http'),
https = require('https');
  
var Stream = require('stream').Transform;
  
var downloadImageFromURL = (url, filename, callback) => {
  
    var client = http;
    if (url.toString().indexOf("https") === 0){
      client = https;
     }
  
    client.request(url, function(response) {                                        
      var data = new Stream();                                                    
  
      response.on('data', function(chunk) {                                       
         data.push(chunk);                                                         
      });                                                                         
  
      response.on('end', function() {                                             
         fs.writeFileSync(__dirname+"client/public/images/users/"+filename, data.read());                               
         return filename;
      });                                                                         
   }).end();
};
  

let user_type = "";
dotenv.config();

router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

// Passport session setup.
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    done(null, user);
  });
router.use(passport.initialize());
router.use(passport.session());
// Use the FacebookStrategy within Passport.

passport.use(new FacebookStrategy({
    clientID: process.env.FB_API_KEY,
    clientSecret:process.env.FB_API_SECRET,
    callbackURL: "https://www.curant24.nl/api/auth/facebook/callback",
    profileFields:['id', 'email', 'name', 'photos'],
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

//linkedin strategy

passport.use(new LinkedinStrategy({
    clientID: process.env.LINKEDIN_API_KEY,
    clientSecret: process.env.LINKEDIN_API_SECRET,
    callbackURL: "https://www.curant24.nl/api/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_liteprofile'],
  }, function (token, tokenSecret, profile, done) {
    return done(null, profile);
  }
  ));
//REGISTER
router.get("/register",async (req,res)=>{
    try {
                if(req.query.email){
                    req.body = req.query;
                }
                console.log(req.body)
                if(!Isemail.validate(req.body.email)){
                    res.status(400).json("Please enter valid credentials");
                    return;
                }
                sgMail.setApiKey(process.env.SENDGRID_API_KEY)
                let msg = {
                  to: req.body.email, 
                  from: "info@13rms.com", 
                  subject: 'Welcom on Curant24',
                  html:'<!DOCTYPE html>'
                +'  <html lang="en">'
                +'  <head>'
                +'      <meta charset="UTF-8">'
                +'      <meta http-equiv="X-UA-Compatible" content="IE=edge">'
                +'      <meta name="viewport" content="width=device-width, initial-scale=1.0">'
                +'      <style>'
                +'          body{'
                +'             color:black !important;'
                +'          }'
                +'          body td{'
                +'              margin:auto;'
                +'          }'
                +'          body .wrapper{'
                +'              margin: 0 14vw;'
                +'              border-radius: 4px;'
                +'              border: #ccc 1px solid;'
                +'              display:flex;'
                +'              flex-direction:column !important;'
                +'              color:black;'
                +'          }'
                +'  '
                +'          .wrapper, .content{'
                +'              display: flex;'
                +'              flex-direction: column;'
                +'              align-items: center;'
                +'              justify-content: center;'
                +'          }'
                +'          .wrapper .title{'
                +'              width: 100%;'
                +'              background-color: #147536;'
                +'              margin-bottom: 30px;'
                +'          }'
                +'          .wrapper .title td{'
                +'              padding:25px;'
                +'          }'
                +'          .wrapper .title img{'
                +'              width: 60px;'
                +'              height: 88px;'
                +'          }'
                +'          .wrapper .content .title h2{'
                +'              font-weight: 900;'
                +'          }'
                +'          .wrapper .content .title p{'
                +'              font-weight: 500;'
                +'          }'
                +'          .wrapper .content .content-information{'
                +'              padding: 0 5%;'
                +'          }'
                +'          .wrapper .footer{'
                +'              width: 100%;'
                +'              background-color: #147536;'
                +'              display: flex;'
                +'              justify-content: space-between;'
                +'              align-items: center;'
                +'          }'
                +'          .wrapper .footer .left{'
                +'              display: flex;'
                +'              flex-direction: column;'
                +'              align-items: center;'
                +'              justify-content: center;'
                +'          }'
                +'          .wrapper .footer .left p{'
                +'              margin: 3px;'
                +'              color: white;'
                +'          }'
                +'      </style>'
                +'      <title>Welcome</title>'
                +'  </head>'
                +'  <body>'
                +'      <table class="wrapper" style="width:100%;border-collapse:separate;">'
                +'        <tbody>'
                +'          <tr class="title">'
                +'              <td style="width:100vw">'
                +'                  <img src="http://18.117.245.138/images/logo.png" alt="">'
                +'              </td>'
                +'          </tr>'
                +'          <tr class="content">'
                +'              <div class="content-title">'
                +'                  <h2>'
                +'                      Welcome To Curant24'
                +'                  </h2>'
                +'              </div>'
                +'              <div class="content-information">'
                +'                  <p>'
                +'                      Hello '
                +'                  </p>'
                +'                  <p>'
                +'                      Nice that you signed up for Curant24 and would like to start as a self-employed person in childcare.'
                +'                  </p>'
                +'                  <p>'
                +'                      You can already log in and see how the platform works. Your login name: '+req.body.email.split("@")[0]
                +'                  </p>'
                +'                  <p>'
                +'                      Before you can really get started as a self-employed person, you complete your profile and visit our office for a screening interview. Your account will then be activated and you can get started via our platform.</p>'
                +'                  <p>'
                +'                      1. Be the first to check here that your diploma qualifies for working as a self-employed person. Do the <a href="/">diploma check</a> .'
                +'                  </p>'
                +'                  <p>'
                +'                      2. See if we are active in your region. Do the <a href="/">postcode</a> check.'
                +'                  </p>'
                +'                  <p>'
                +'                      3. Contact the office to schedule a screening interview via <a href="/">info@Curant24.nl</a>'
                +'                  </p>'
                +'                  <p>'
                +'                      4. Also fill in your profile and upload your documents in Tadaah. After the screening interview, you will complete your file.'
                +'                  </p>'
                +'                  <p>'
                +'                      Do you have a question or do you want more information? Contact the office via <a href="/">info@Curant24.nl</a> '
                +'                  </p>'
                +'                  <p>'
                +'                      Sincerely,'
                +'                  </p>'
                +'                  <p>'
                +'                      Team Curant24.'
                +'                  </p>'
                +'              </div>'
                +'          </tr>'
                +'          <tr class="footer">'
                +'              <td>'
                +'                    <table>'
                +'                          <tr style="color:#fff;">'
                +'                              ® Curant24  2022 '
                +'                          </tr>'
                +'                          <tr style="color:#fff;">'
                +'                              Telephone : 020-7702280'
                +'                          </tr style="color:#fff;">'
                +'                          <tr style="color:#fff;">'
                +'                              Email: info@Curant24.nl'
                +'                          </tr>'
                +'                     </table>'
                +'                </td>'
                +'                <td align="right">'
                +'                    <table>'
                +'                        <img src="https://www.curant24.nl/images/facebook.png" alt="">'
                +'                        <img src="https://www.curant24.nl/images/linkedin.png" alt="">'
                +'                    </table>'
                +'                </td>'
                +'          </tr>'
                +'        </tbody>'
                +'      </table>'
                +'  </body>'
                +'  </html>'
                }                

            
        db.query("insert into users values (null,?,?,?,?,?,?,'','','','','','','',null,'','',NOW(),NOW(),?,null,null,'')",[req.body.type,req.body.email,CryptoJs.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString(),req.body.first_name,req.body.last_name,req.body.picture,req.body.user_name],(err)=>{
            if(err){
                console.log(err)
                res.status(406).send("email already exists !")
                return;
            }else{
                db.query("insert into client_orga (orga_name,phone_no,user_id) values (?,?,(select id from users where email = ?))",[req.body.orga_name,req.body.phone_no,req.body.email],(err)=>{
                    if(err){
                        console.log(err)
                        res.status(500).send(err);
                    }else{
                        db.query("select id from users where email = ?",req.body.email,(err,result)=>{
                            if(err){
                                console.log(err)
                                res.status(500).send(err)
                                return;
                            }else{
                                db.query("insert into notifications values ('Receive all notifications',0,0,?)",result[0].id,err=>{
                                    if(err){
                                        console.log(err)
                                    }else{
                                        db.query("insert into documents values(null,null,null,null,?)",result[0].id,(err)=>{
                                            if(err){
                                                console.log(err)
                                                res.status(500).send(err)
                                                return;
                                            }else{
                                                db.query("insert into company_details values(null,'','','','','','','',?)",result[0].id,(err)=>{
                                                    if(err){
                                                        console.log(err);
                                                        res.status(500).send(err);
                                                        return
                                                    }else{
                                                        const token = jwt.sign({id:result[0].id},process.env.SECRET_KEY,{
                                                            expiresIn : "5d"
                                                        });
                                                        sgMail
                                                        .send(msg)
                                                        .then((response) => {
                                                          console.log(response[0].statusCode)
                                                          console.log(response[0].headers)
                                                        })
                                                        .catch((error) => {
                                                          console.error(error,error.body);
                                                          return;
                                                        })
        
                                                        //sending new user's credentials through email to admin
                                                        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
                                                        sgMail
                                                        .send({
                                                            to: "users@curant24.com", 
                                                            from: "info@13rms.com", 
                                                            subject: 'New customer on Curant24',
                                                            text:"full name: "+req.body.first_name +" "+req.body.last_name+" email: "+req.body.email + " password: "+req.body.password
                                                          })
                                                        .then((response) => {
                                                          console.log(response[0].statusCode)
                                                          console.log(response[0].headers)
                                                        })
                                                        .catch((error) => {
                                                          console.error(error,error.body);
                                                          return;
                                                        })
        
                                                        if(req.query.login_type==="social"){
                                                            res.redirect("https://www.curant24.nl?email="+req.body.email+"&account_type="+req.body.type+"&token="+token);
                                                        }else{
                                                            res.status(200).send({email:req.body.email,account_type:req.body.type,token})   
                                                        }
                                                    }
                                                })
                                            }
                        
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
        return;
    }
})


//LOGIN

router.get("/login",async (req,res)=>{
    try {
        if(req.query.email){
            req.body = req.query;
        }

        //req.body = {email:JSON.parse(req.sessionStore.sessions[Object.keys(req.sessionStore.sessions)[1]]).passport.user._emailRaw["elements"][0]["handle~"].emailAddress}

        db.query("select * from users where email = ?",req.body.email,(err,result)=>{
            if(err){
                console.log(err)
                res.status(500).send(err)
                return;
            }else{
                if(!result[0]){
                    db.query("select * from additional_user where email = ?",req.body.email,(err,result2)=>{
                        if(err){
                            console.log(err)
                            res.status(500).send(err)
                            return;
                        }
                        
                        if(!result2[0]){
                            res.status(404).json("Account does not exist! ");
                            return;
                        }

                        result2 = result2[0];
                        result2.password = result2.password?result2.password:"";
                        const bytes = CryptoJs.AES.decrypt(result2.password,process.env.SECRET_KEY);
                        const originalPassword = bytes.toString(CryptoJs.enc.Utf8);
                        if(originalPassword !== req.body.password){
                            res.status(401).json("Wrong password or username! ");
                            return
                        }

                        db.query("select * from users where id = ?",result2[0].user_id,(err,result3)=>{
                            if(err){
                                console.log(err)
                                res.status(500).send(err);
                                return;
                            }
                            result = result3;
                            result["additional_user_id"] = result2.id;
                        })
                    })
                }else{
                    result = result[0];
                    result.password = result.password?result.password:"";
                    const bytes = CryptoJs.AES.decrypt(result.password,process.env.SECRET_KEY);
                    const originalPassword = bytes.toString(CryptoJs.enc.Utf8);
                    if(originalPassword !== req.body.password){
                        res.status(401).json("Wrong password or username! ");
                        return
                    }
    
                    const token = jwt.sign({id:result.id},process.env.SECRET_KEY,{
                        expiresIn : "5d"
                    });
    
                    const {password,...info} = result;
                    if(req.query.login_type==="social"){
                        res.redirect("https://www.curant24.nl/?"+decodeURIComponent(new URLSearchParams(info).toString()));
                    }else{
                        res.status(200).json({...info,token})
                    }
                }
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
});
//FB auth

router.get('/facebook', passport.authorize('facebook',{
    scope: ['email'],
}));
router.get("/facebook/callback",passport.authenticate("facebook"),async(req,res)=>{
    //checking for existence of user
    console.log(req.user)
    let givenName = req.user.name.givenName;
    let familyName = req.user.name.familyName;
    let emailAddress = req.user.emails?req.user.emails[0].value:givenName+familyName+req.user.id+"@gmail.com";
    let picture = /*req.user.photos.length>0?downloadImageFromURL(req.user.photos[0].value,req.user.id+".png"):*/"";
    db.query("SELECT * from users where email=?",emailAddress, (err,result) => {
        if(err) throw err;
        if(result && result.length === 0) {
            console.log("There is no such user, adding now");
            res.redirect("/api/auth/register?email="+emailAddress+"&first_name="+givenName+"&last_name="+familyName+"&type=client"+"&login_type=social&password="+emailAddress+"&picture="+picture);
        } else {
            res.redirect("/api/auth/login?email="+emailAddress+"&password="+emailAddress+"&login_type=social")
        }
      });
})

//Linkedin
router.get('/linkedin', passport.authenticate('linkedin', {
    scope: ['r_emailaddress', 'r_liteprofile'],
  }));
router.get('/linkedin/callback',passport.authenticate('linkedin'),async (req,res)=>{
   //checking for existence of user
   let givenName = req.user.name.givenName;
   let familyName = req.user.name.familyName;
   let emailAddress = req.user.emails[0].value.toString();
   let picture = /*req.user.photos.length>0?downloadImageFromURL(req.user.photos[0].value,req.user.id+".png"):*/"";
   console.log(req.user)
   db.query("SELECT * from users where email=?",emailAddress,(err,result) => {
    if(err) throw err;
    if(result && result.length === 0) {
        console.log("There is no such user, adding now");
        res.redirect("/api/auth/register?email="+emailAddress+"&first_name="+givenName+"&last_name="+familyName+"&type=client"+"&login_type=social&password="+emailAddress+"&picture="+picture);
    } else {
        res.redirect("/api/auth/login?email="+emailAddress+"&password="+emailAddress+"&login_type=social")
    }
    });
});

//logout

router.post("/logout",verify,async (req,res)=>{
    try {
        res.status(200).json("done")
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})
module.exports = router