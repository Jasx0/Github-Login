var express = require('express');
var cors = require('cors');
const fetch = (...args) =>
import('node-fetch').then(({default: fetch}) => fetch(...args));
var bodyParser =require('body-parser');

const CLIENT_ID ="2ec89014d13b316f450d"


const CLIENT_SECRET = "f62058f3fa3ed11bbb867ce234e3e0a86e7972e8";


var app = express();


app.use(cors());
app.use(bodyParser.json());

        app.get('/getAccessToken',async function(req,res){
          console.log(req.query.code )  ;

            const params = "?client_id=" + CLIENT_ID + "&client_secret="   + CLIENT_SECRET + "&code"  +req.query

          await fetch("https//github.com/login/oauth/access_token"  +params,{
            method:"POST",
            headers:{
                "Accept":"application\json"
            }
          }).then((response) =>{
            return response.json();
          }).then((data) =>{
            console.log(data);
            res.json(data);
          } )  
        });

        app.get('/getUserData', async function(req, res) {
            req.get("Authorization");
            await fetch ("https://api.github.com/user",{
                method: "GET",
                headers:{
                    "Authorization" : req.get("Authorization")

                }
            }).then ((response) =>{
                return response.json();

            }).then((data) => {
                console.log(data);
                res.json(data)
            


            });
        })




app.listen(4000, function(){
    console.log("CORS server running on port 4000");
});