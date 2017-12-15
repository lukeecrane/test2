const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');

app.use((req, res, next) => {

    var now= new Date().toString();
    var log=`${now}:${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log',log+ '\n', (err)=>
    {
        console.log('Unable to append to server.log.') 
    });
    next();
});
/** 
app.use((req, res, next) => {
    res.render('maintenance.hbs');
})
*/
app.use(express.static(__dirname+'/public'))

//HBS helpers
hbs.registerHelper('getCurrentYear',() => { return new Date().getFullYear()});
hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase();
})

///Route handler
app.get('/',(request,response) => {
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        message: 'Welcome to my website'
    });  //Views is the default directory
});

app.get('/about',(req,res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });  //Views is the default directory
})

app.get('/bad',(req,res) => {
    res.send({
        errorMessage: 'An error has occured'
    })
});

app.get('/projects', (req,res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    })

})
console.log('Running on port '+port);
app.listen(port);