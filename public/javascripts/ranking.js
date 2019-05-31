
var title = document.getElementById('title');
console.log(title.innerHTML);
var color1=document.getElementById('bodycolor');

//타이틀 값마다 배경색 지정
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
//새로운 정보가져오기 위한 페이지 새로고침
function refresh_timer(){
    setTimeout(function(){
        location.reload();
    },60*1000);

console.log("시간별 새로고침");
//날짜가져오기
var date= new Date();
    date=date.getFullYear()+'년 '+((date.getMonth()*1)+1)+'월 '+date.getDate()+'일 '+date.getHours()+'시 '+date.getMinutes()+'분 ';
var result = document.getElementById("time");
    result.innerHTML=date +"기준";

  };
