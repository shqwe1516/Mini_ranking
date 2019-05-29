var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '6155',
  database : 'crawling',
  
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mini_Ranking' });
});

router.get('/melon', function(req, res, next) {
  res.render('naver', { title: 'melon' });
});
router.get('/genie', function(req, res, next) {
  res.render('naver', { title: 'genie' });
});

router.get('/naver', function(req, res, next) {
  connection.query(`
    SELECT  
        *
    FROM
        ranking   
    LIMIT 
        0,20`,
      function(error,results){
        if(error){
          console.log(`error : ${error.message}`);
        }else{
          res.render('ranking',{
          rank : results,
          title :'Naver Rankig'
          });
        };   
      });
});
router.get('/daum', function(req, res, next) {
  connection.query(`
    SELECT  
        *
    FROM
        daum   
    LIMIT 
        0,20`,
      function(error,results){
        if(error){
          console.log(`error : ${error.message}`);
        }else{
          res.render('ranking',{
          rank : results,
          title :'Daum Rankig'
          });
        };   
      });
});
module.exports = router;
