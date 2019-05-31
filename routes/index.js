var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '6155',
  database : 'crawling',
  
});
//메인 페이지
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mini_Ranking' });
});



//네이버순위 팝업창출력
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
          title :'Naver Ranking'
          });
        };   
      });
});

//다음순위 팝업창 출력
router.get('/daum', function(req, res, next) {
  connection.query(`
    SELECT  
        *
    FROM
        daum   
    LIMIT 
        0,10`,
      function(error,results){
        if(error){
          console.log(`error : ${error.message}`);
        }else{
          res.render('ranking',{
          rank : results,
          title :'Daum Ranking'
          });
        };   
      });
});

//멜론순위 팝업창 출력
router.get('/melon', function(req, res, next) {
  connection.query(`
    SELECT  
        *
    FROM
        melon   
    LIMIT 
        0,10`,
      function(error,results){
        if(error){
          console.log(`error : ${error.message}`);
        }else{
          res.render('ranking',{
          rank : results,
          title :'Melon Ranking'
          });
        };   
      });
});

//지니순위 팝업창 출력
router.get('/genie', function(req, res, next) {
  connection.query(`
    SELECT  
        *
    FROM
        genie   
    LIMIT 
        0,10`,
      function(error,results){
        if(error){
          console.log(`error : ${error.message}`);
        }else{
          res.render('ranking',{
          rank : results,
          title :'Genie Ranking'
          });
        };   
      });
});


module.exports = router;
