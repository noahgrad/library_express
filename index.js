    const path = require('path');
    const express = require('express')
    const app = express()
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))

    const port = 3000;
    const mysql = require('mysql'); 
    //Create connection
    const dbConn = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'books',
      port: 3310
    });
    
    //connect to database
    dbConn.connect((err) =>{
      if(err) throw err;
      console.log('Mysql Connected...');
    });

    app.set('views', path.join(__dirname, 'views/books'));
    app.set('view engine', 'ejs');

    
    app.get('/', function(req, res, next) {
          
      dbConn.query('SELECT * FROM books ORDER BY id desc',function(err,rows){
          if(err) {
              // render to views/books/index.ejs
              res.render('index',{data:''});   
          } else {
              // render to views/books/index.ejs
              res.render('index',{data:rows});
          }
      });
    });

    app.get('/add', function(req, res, next) {    
      // render to add.ejs
      res.render('add', {
          name: '',
          author: ''        
      })
    })

    app.post('/add',  function(req, res, next){
      // add a new book  
      let name = req.body.name;
      let author = req.body.author;

      var form_data = {
        name: name,
        author: author
      }
          
      // insert query
      dbConn.query('INSERT INTO books SET ?', form_data, function(err, result) {
        if (err) {
          console.error("Couldn't add book: "+err)
          // render to add.ejs
          res.render('add', {
            name: form_data.name,
            author: form_data.author                    
          })
        } else {  
          console.log ('Book '+name +'was added to DB successfully')          
          res.redirect('/');
        }
      })
    })

    // display edit book page
app.get('/edit/(:id)', function(req, res, next) {

  let id = req.params.id;
 
  dbConn.query('SELECT * FROM books WHERE id = ' + id, function(err, rows, fields) {
      if(err) throw err
       
      // if book not found
      if (rows.length <= 0) {
          console.error('Book not found with id = ' + id)
          res.redirect('/')
      }
      // if book found
      else {
          // render to edit.ejs
          res.render('edit', {
              title: 'Edit Book', 
              id: rows[0].id,
              name: rows[0].name,
              author: rows[0].author
          })
      }
  })
})

// update book data
app.post('/update/:id', function(req, res, next) {

  let id = req.params.id;
  let name = req.body.name;
  let author = req.body.author;

  var form_data = {
    name: name,
    author: author
  }
// update query
  dbConn.query('UPDATE books SET ? WHERE id = ' + id, form_data, function(err, result) {
    //if(err) throw err
    if (err) {
        // set flash message
        console.error(err)
        // render to edit.ejs
        res.render('edit', {
            id: req.params.id,
            name: form_data.name,
            author: form_data.author
        })
    } else {
        console.log('Book successfully updated');
        res.redirect('/');
    }
  })
})

// delete book
app.get('/delete/(:id)', function(req, res, next) {

  let id = req.params.id;
   
  dbConn.query('DELETE FROM books WHERE id = ' + id, function(err, result) {
      //if(err) throw err
      if (err) {
          // set flash message
          console.error(err)
          // redirect to books page
          res.redirect('/')
      } else {
          // set flash message
          console.log('Book successfully deleted! ID = ' + id)
          // redirect to books page
          res.redirect('/')
      }
  })
})

  
app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
})
