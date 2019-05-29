var request = require('request'),
cheerio = require('cheerio');
var url = "http://www.naver.com";
var url2 = "https://www.daum.net/?t__nil_top=refresh";
var fs = require('fs');
var mysql = require('mysql');
var ejs = require('ejs');
/*
    mysql> CREATE TABLE melon(
    -> name char(40) not null,
    -> num int PRIMARY KEY AUTO_INCREMENT not null);
*/

//mysql 정보
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '6155',
    database : 'crawling',
    
  });

//콘솔용 시간
var date = new Date()
date =`${date.getHours()}:${date.getMinutes()}`;

//mysql 연결
connection.connect();

console.log('crawlinag start');

//시간 간격으로 이벤트 실행
var playloop= setInterval(function(){

    //네이버 크롤링
    connection.query('DELETE FROM ranking');
    console.log('Naver테이블 초기화');

    request(url, function (err, res, html) {
        if (!err) {
            var $ = cheerio.load(html);
            var post =new Array();
            for(var i =1; i <21; i++ ){
                $(".ah_roll_area .ah_k").each(function(){
                    var data = $(this);
                    var data_txt =data.text();
                    var data_split = data_txt.split(",");
                    post[i]=([i]+"위 _    "+ data_split);
                    i++;
                });
            };
            for(var j = 1; j<21; j++){
                connection.query('INSERT INTO ranking (name) values(?)',
                    [post[j]])
            };
            console.log(post,`#####Naver 크롤링 저장 완료${[date]}######`);
        };
    });

    //다음 크롤링
    connection.query('DELETE FROM daum');
    console.log('daum테이블 초기화');

    request(url2, function (err, res, html) {
        if (!err) {
            var $ = cheerio.load(html);
            var postdaum =new Array();
            for(var i =1; i <11; i++ ){
                $("span.txt_issue").each(function(){
                    var data = $(this);
                    var data_txt =data.text();
                    var data_split = data_txt.split(",");
                    postdaum[i]=([i]/2+"위 _    "+ data_split);
                    i++
                });
            };
            for(var j = 1; j<11; j++){
                connection.query('INSERT INTO daum (name) values(?)',
                    [postdaum[j*2]])
            };
            if(date=="4:33"){
                clearInterval(playloop);
            };
            console.log(postdaum,`#####Daum크롤링 저장 완료${[date]}######`);
        };    
    });
//1분 기준 재실행
},60*1000);