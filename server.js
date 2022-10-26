var express =  require('express');
var app = express();
app.use(express.static('assets'))

const port= process.env.PORT || 3000;
app.listen(port,);


app.set('view engine', 'ejs');

var fs = require("firebase-admin");
let serviceAccount;
if (process.env.GOOGLE_CREDENTIALS != null){
    serviceAccount = JSON.parse(process.env.GOOGLE_CREDENTIALS)
}
else{
    serviceAccount = require("./louisestudearrings-firebase-adminsdk-zd508-0787bcc355.json")
}
fs.initializeApp({
    credential: fs.credential.cert(serviceAccount)
});

//instance of firestore in GENERAL
const db = fs.firestore();

//instance of the 'items' collection
const itemsCol = db.collection('items');


app.get('/', async function (req,res) {
    //gets the collection lang jd
    const itemz = await itemsCol.get();
    // const photo = await itemsCol.where('photoUrl', '==', true).get();

    itemz.forEach(doc =>{
            console.log(doc.id, '=>', doc.data());
    
    });
   
    let data = {
        url: req.url,
        itemData: itemz.docs,
    }
    // console.log(data.itemData[3]);
    res.render("home.ejs", data);
})



