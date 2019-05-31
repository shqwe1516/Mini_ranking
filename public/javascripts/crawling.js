var request = require('request'),
cheerio = require('cheerio');
var url = "http://www.naver.com";
var url2 = "https://www.daum.net/?t__nil_top=refresh";
var url3="https://www.melon.com"
var url4="https://www.genie.co.kr"
var fs = require('fs');
var mysql = require('mysql');
var ejs = require('ejs');
/*
    CREATE TABLE table_name(
    name char(100) not null,
     num int PRIMARY KEY AUTO_INCREMENT not null);
*/

//mysql 정보
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '6155',
    database : 'crawling',
    
  });

//콘솔용 시간
var date = new Date();
date =`${date.getHours()}:${date.getMinutes()}`;

console.log('Start crawling.js');
//mysql 연결
connection.connect();
//크롤링 종료시간 (필요시)
if(date=="5:38"){
    clearInterval(playloop);
    console.log('Crawling Stop')
    
}else{
    //시간 간격으로 이벤트 실행
    var playloop= setInterval(function(){

    console.log('Crawlinag start');
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
                    post[i]=(`[${[i]}위]_    ${data_split}`);
                    i++;
                });
            };
            //테이블에 입력
            for(var j = 1; j<21; j++){
                connection.query('INSERT INTO ranking (name) values(?)',
                    [post[j]])
            };
            console.log(post,`#####Naver 크롤링 저장 완료${[date]}######`);
        }else{
            console.log(err);
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
                    postdaum[i]=(`[${[i]/2}위]_    ${data_split}`);
                    i++
                });
            };
            for(var j = 1; j<11; j++){
                connection.query('INSERT INTO daum (name) values(?)',
                    [postdaum[j*2]])
            };
            console.log(postdaum,`#####Daum크롤링 저장 완료${[date]}######`);
        }else{
            console.log(err);
        }   
    });

    //melon 크롤링
    connection.query('DELETE FROM melon');
    console.log('melon테이블 초기화');

    request(url3, function (err, res, html) {
        if (!err) {
            var $ = cheerio.load(html);
            var postmelon =new Array();
            var postmelon2 =new Array();
            //음악 이름
            for(var i =1; i <11; i++ ){
                $("p.song").each(function(){
                    var data = $(this);
                    var data_txt =data.text();
                    var data_split = data_txt.replace(/\t/g,"");
                    data_split = data_split.replace(/\n/g,"");
                    data_split = data_split.split(",");
                    postmelon[i]=(`[${[i]}위]_    ${data_split}`);
                    i++
                    
                });
            };
            //가수 이름
            for(var k=1; k<11; k++){
                $("span.checkEllipsisRealtimeChart").each(function(){
                    var data1 = $(this);
                    var data_txt1 =data1.text();
                    console.log(data_txt1)
                    postmelon2[k]=`> ${data_txt1}`;
                    k++;
                });
            };
            
            for(var j = 1; j<11; j++){
                connection.query('INSERT INTO melon (name,user) values(?,?)',
                [postmelon[j],postmelon2[j]])

            };
            console.log(postmelon);
            console.log(postmelon2,`#####melon 크롤링 저장 완료${[date]}######`);
        }else{
            console.log(err);
        };
    });
    //genie 크롤링
    request(url4, function (err, res, html) {
        if (!err) {
            var $ = cheerio.load(html);
            var postgenie =new Array();
            for(var i =1; i <11; i++ ){
                $("td.info").each(function(){
                    var data = $(this);
                    var data_txt =data.text();
                    var data_split = data_txt.replace(/\t/g,"");
                    data_split = data_split.replace(/\n/g,"");
                    data_split = data_txt.split(",");
                    postgenie[i]=(`[${[i]}위]_    ${data_split}`);
                    i++;
                    
                });
            };
            for(var j = 1; j<11; j++){
                connection.query('INSERT INTO genie (name) values(?)',
                    [postgenie[j]])
            };
            console.log(postgenie,`#####Genie 크롤링 저장 완료${[date]}######`);
        }else{
            console.log(err);
        };
    });

//1분 기준 재실행
    },60*1000)
};
