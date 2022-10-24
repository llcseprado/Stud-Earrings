var express =  require('express');
var app = express();
app.use(express.static('assets'))

const port= process.env.PORT || 3000;
app.listen(port,);


app.set('view engine', 'ejs');

app.get('/',(req,res) =>{
    console.log('Here')
    res.render("home.ejs")
})



