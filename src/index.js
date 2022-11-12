const express = require('express')
const path = require('path')
const morgan = require('morgan')
const { engine } = require('express-handlebars');
const app = express()
const port = 3000
app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, 'public')));    
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Template engine
app.engine(
    'hbs',
    engine({
      extname: 'hbs',
    })
  );
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.get('/trang-chu', (req, res) => {
    res.render('home');
})
app.get('/news', (req, res) => {
    res.render('new');
})
app.get('/search', (req, res) => {
    res.render('search');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})