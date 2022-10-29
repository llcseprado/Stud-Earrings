var express =  require('express');
var app = express();
// var bodyParser = require('body-parser')
app.use(express.static('assets'))

const port= process.env.PORT || 3000;
app.listen(port,);


app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

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
var sales = db.itemsCol;


// let i = 1;
// const timestamp = new Date();

// const assign_s ={
//     num: i++,
//     timestamp: timestamp,
//     quantity: "hi"
// };

app.get('/', async function (req,res) {
    //gets the collection lang jd
    const itemz = await itemsCol.get();
    // const photo = await itemsCol.where('photoUrl', '==', true).get();
    
    //display sa console tanan sulod sa db 
    // itemz.forEach(doc =>{
    //     console.log(doc.id, '=>', doc.data());
    // });
   
    let data = {
        url: req.url,
        itemData: itemz.docs,
    }
    // console.log(data.itemData[0]);
    res.render("home.ejs", data);
});


app.get('/item/:itemid', async function (req, res) {
    try {
        // console.log(req.params.itemid);

    } catch (e) {
    }
    const item_id = req.params.itemid;
    const item_ref = itemsCol.doc(item_id);
    const doc = await item_ref.get();
    // if (!doc.exists) {
    //     // console.log('No such document!');
    // } else {
    //     // console.log('Document data:', doc.data());
    // }

    // document.getElementById("add_quant").onclick = doFunction;
    
    let i = 1;
    const timestamp = new Date();
    // const assign_s ={
//     num: i++,
//     timestamp: timestamp,
//     quantity: "hi"
// };

    let data = {
        url: req.url,
        itemData: doc.data()
        // num: i++,
        // timestamp: timestamp,
        // quantity: "hi"
    }
    res.render('item.ejs', data);
});

app.post('/item/:itemid', (req,res) => {
    console.log(req.body.quantity);
});

