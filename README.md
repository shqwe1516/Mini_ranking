
# ***Mini_ranking***
> 모든 랭킹을 한자리에!!.   
크롤링을 통해 얻은 사이트들의 랭킹을
버튼 클릭시 팝업창을 이용해 출력!

## 컨셉
메인창에서 각 사이트 버튼을 클릭시 팝업창을 통해 그 사이트의 주요랭킹 표시

 ### [메인 화면]
![main1](https://user-images.githubusercontent.com/49370287/58750161-c2065a80-84c9-11e9-8889-784868d5ae15.png)
![main2](https://user-images.githubusercontent.com/49370287/58750169-dc403880-84c9-11e9-94f8-67e9b1e0eb52.png)
 ### [팝업  화면]
![mini1](https://user-images.githubusercontent.com/49370287/58750181-0134ab80-84ca-11e9-9bc0-a172263ca529.png)
![mini2](https://user-images.githubusercontent.com/49370287/58750188-1e697a00-84ca-11e9-8347-e36a8fc5744d.png)

## 사용 예제

### *crawling.js

##### // 네이버 크롤링 (나머지는 생략)
 ```
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
```

### *main.js(public)
 
##### //팝업창 클릭 이벤트
```
function naverwindow(){
    var url="/naver";
    window.open(url,"","width=375,height=600,left=600,resizable=no");
}
```

### * ranking.js(public)

##### //타이틀 값마다 배경색 지정
```
switch(title.innerHTML){
  case 'Naver Ranking' :
    color1.style.backgroundColor="#54BD54";
    break;
  case 'Daum Ranking':
    color1.style.backgroundColor="#3cb4ff";
    break;
  case 'Melon Ranking':
    color1.style.backgroundColor="#54BD54";
    break;
  case 'Genie Ranking':
    color1.style.backgroundColor="#3cb4ff";
    break;
}
```
##### //새로운 정보가져오기 위한 페이지 새로고침 이벤트
```
function refresh_timer(){
    setTimeout(function(){
        location.reload();
    },60*1000);

console.log("시간별 새로고침");
```
##### //날짜가져오기
```
var date= new Date();
    date=date.getFullYear()+'년 '+((date.getMonth()*1)+1)+'월 '+date.getDate()+'일 '+date.getHours()+'시 '+date.getMinutes()+'분 ';
var result = document.getElementById("time");
    result.innerHTML=date +"기준";

  };
```
### *index.js

##### //메인 페이지
```
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mini_Ranking' });
});
```


##### //네이버순위 팝업창 출력(나머지 생략)
```
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
```

## 업데이트 내역
* 6.1.1  
   * 멜론,지니 실시간 순위 크롤링 구현  
   * 디테일 작업   
* 5.30.1  
   * Css 작업 중
* 5.30.1  
   * 네이버,다음 실시간 순위 크롤링 구현
   * 버튼 클릭시 각각의 순위 팝업창 출력
* 5.29.1
   * 첫  컨셉 모델링 시작

## 정보

홍성현 - shh6155@naver.com

[https://github.com/shh6155](https://github.com/shh6155)
