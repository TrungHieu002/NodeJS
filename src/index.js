const express = require('express')
const path = require('path')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const middleware = require('./app/Middlewares/SortMiddlewares')
const app = express()
const port = 3000
const route = require('./routes')
const db = require('./config/db')
// connect to db 
db.connect();
app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, 'public')));    
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(middleware)
app.use(methodOverride('_method'))

//Template engine
app.engine(
    'hbs',
    engine({
      extname: 'hbs',
      helpers: {
        sum: (a,b) => a + b,
        sortable: (field,sort) =>{
          const sortType = field == sort.column ? sort.type : 'default';
          const icons ={
            default:'oi oi-elevator',
            desc:'oi oi-sort-descending',
            asc: 'oi oi-sort-ascending',
          }
          const types ={
            default:'desc',
            desc:'asc',
            asc: 'desc',
          }
          const icon = icons[sortType]
          const type = types[sortType]
          return `<a href="?_sort&column=${field}&type=${type}"><span class="${icon}"></span></a>`
        }
    }
    })
    
  );
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

// Route init
route(app);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})