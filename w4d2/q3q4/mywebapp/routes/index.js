const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const router = express.Router();

app.use(bodyParser.urlencoded());
app.use(session({secret: "mysupersecretsessionkeyvalues"}));
app.use(cookieParser());

let productsList = 
[
{id: 1, name: "Android Phone", price: 750, desc: "Galaxy S22"},
{id: 2, name: "iPhone", price: 950, desc: "iPhone 12"},
{id: 3, name: "watch", price: 950, desc: "iWatch"},
{id: 4, name: "watch", price: 950, desc: "Galaxy Watch 5"},
{id: 5, name: 'laptop', price: 1200, desc: "Macbook"}
];

// let cartsList = 
// [
// {id: 1, name: "Android Phone", price: 750, desc: "Galaxy S22", units: 3},
// {id: 2, name: "iPhone", price: 950, desc: "iPhone 12", units: 2},
// {id: 3, name: 'laptop', price: 1200, desc: "Macbook", units: 5}
// ];


/* GET home page. */
router.get('/', function(req, res, next) {
  //req.session.cart = [];
  res.render('product.ejs', {products: productsList});
});


router.post('/addtocart', function(req, res, next) {

  if(!req.session.cart){
     req.session.cart = [];
  }

  const prodId = req.body.prodId;
  console.log('body: ', req.body);
  //let params = JSON.parse(req.body);
  //console.log(params);
  const product = productsList.filter(x => x.id == prodId)[0];

  console.log('add product: ', product);

  req.session.cart.push(product);

  res.send({count: req.session.cart.length});
  //res.redirect('/shoppingcart');
  //res.render('product.ejs', {products: productsList});
  //res.send('Product added to cart id: ' + req.body.prodId);
});

router.get('/shoppingcart', function(req, res, next) {
  if(!req.session.cart){
    req.session.cart = [];
  }
  console.log('shoping cart items: ', req.session.cart);
  res.render('shoppingcart.ejs', {products: req.session.cart});
});

module.exports = router;
