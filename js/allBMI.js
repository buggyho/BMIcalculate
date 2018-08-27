//公用變數宣告
var BMI = 0;
var judge = '';

//建立DOM節點
var btnArea = document.querySelector('.btn');
var resultBtn = document.querySelector('.resultBtn');
var list = document.querySelector('.list');
var clearHistory = document.querySelector('#clearHistory');
var data = JSON.parse(localStorage.getItem('BMIdata')) || [];

//建立監聽
resultBtn.addEventListener('click', action, false);
clearHistory.addEventListener('click', deleteList, false);

//先載入歷史紀錄內容
updateList(data);

//btn總控制
function action() {
    //取得輸入值
    var t = document.querySelector('#tall').value;
    var w = document.querySelector('#weight').value;
    //檢查是否為非數字
    var check_t = Number(t);
    var check_w = Number(w);
    if (isNaN(check_t) || isNaN(check_w)) {
        alert('請填入數字');
        return;
    }
    //檢查input是否為空值與負值
    if (t == '' || w == '' || t <= 0 || w <= 0) {
        alert('請填入身高與體重，數值不可為0');
        return;
    }
    //執行方法
    calculate(t, w);
    changeBtn();
    addData(t, w);
    updateList(data);
}

//計算BMI
function calculate(t, w) {
    //計算BMI
    var BMIbefore = w / Math.pow(t / 100, 2);
    BMI = BMIbefore.toFixed(2); //取小數點後第2位
    //判定BMI指標
    if (BMI >= 40) {
        judge = '重度肥胖';
    } else if (BMI >= 35) {
        judge = '中度肥胖';
    } else if (BMI >= 30) {
        judge = '輕度肥胖';
    } else if (BMI >= 25) {
        judge = '過重';
    } else if (BMI >= 18.5) {
        judge = '理想';
    } else {
        judge = '過輕';
    }
}

//取得今天日期
function today() {
    var today = new Date();
    var time = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
    return time;
}

//建立JSON&存入localStorage
function addData(t, w) {
    var totalResult = {
        tall: t,
        weight: w,
        BMI: BMI,
        judge: judge,
        time: today()
    }
    data.push(totalResult);
    localStorage.setItem('BMIdata', JSON.stringify(data));
}

//更新歷史紀錄內容
function updateList(data) {
    //更新list內容
    var str = '';
    var len = data.length;
    for (let i = (len - 1); i >= 0; i--) {
        str += '<div class="boxColor"></div><li><table><tr><td>' + data[i].judge + '</td><td><span>BMI </span>' + data[i].BMI + '</td><td><span>weight </span>' + data[i].weight + 'kg</td><td><span>height </span>' + data[i].tall + 'cm</td><td><span>' + data[i].time + '</span></td></tr></table></li>';
    }
    list.innerHTML = str;
    //變更列表顏色
    var updateNum = len - 1;
    for (let colorNum = 0; colorNum < len; colorNum++) {
        changeColor(colorNum, data[updateNum].judge);
        updateNum--;
    }

}

//變更歷史紀錄列表顏色
function changeColor(colorNum, judge) {
    //建立DOM
    var boxColor = document.querySelectorAll('.boxColor');
    //判定顏色
    switch (judge) {
        case '過輕':
            boxColor[colorNum].setAttribute('id', 'lev1');
            break;
        case '理想':
            boxColor[colorNum].setAttribute('id', 'lev2');
            break;
        case '過重':
            boxColor[colorNum].setAttribute('id', 'lev3');
            break;
        case '輕度肥胖':
            boxColor[colorNum].setAttribute('id', 'lev4');
            break;
        case '中度肥胖':
            boxColor[colorNum].setAttribute('id', 'lev5');
            break;
        case '重度肥胖':
            boxColor[colorNum].setAttribute('id', 'lev6');
            break;
    }

}

//變更btn樣式
function changeBtn() {
    //更新htnArea內容
    var str = '<p class="newBtn">' + BMI + '</p><p class="BMI">BMI</p><p class="judge">' + judge + '</p><a href="#" id="refreshBtn"></a>'
    btnArea.innerHTML = str;
    //建立DOM
    var newBtn = document.querySelector('.newBtn');
    var refreshBtn = document.querySelector('#refreshBtn');
    //判定色調
    switch (judge) {
        case '過輕':
            btnArea.setAttribute('style', 'color:#31BAF9');
            newBtn.setAttribute('style','border: 6px solid #31BAF9');
            refreshBtn.setAttribute('style', 'background-color: #31BAF9');
            break;
        case '理想':
            btnArea.setAttribute('style', 'color:#86D73F');
            newBtn.setAttribute('style','border: 6px solid #86D73F');
            refreshBtn.setAttribute('style', 'background-color: #86D73F');
            break;
        case '過重':
            btnArea.setAttribute('style', 'color:#FF982D');
            newBtn.setAttribute('style','border: 6px solid #FF982D');
            refreshBtn.setAttribute('style', 'background-color: #FF982D');
            break;
        case '輕度肥胖':
            btnArea.setAttribute('style', 'color:#FF6C03');
            newBtn.setAttribute('style','border: 6px solid #FF6C03');
            refreshBtn.setAttribute('style', 'background-color: #FF6C03');
            break;
        case '中度肥胖':
            btnArea.setAttribute('style', 'color:#FF6C03');
            newBtn.setAttribute('style','border: 6px solid #FF6C03');
            refreshBtn.setAttribute('style', 'background-color: #FF6C03');
            break;
        case '重度肥胖':
            btnArea.setAttribute('style', 'color:#FF1200');
            newBtn.setAttribute('style','border: 6px solid #FF1200');
            refreshBtn.setAttribute('style', 'background-color: #FF1200');
            break;
    }
    //設定重新整理功能
    document.getElementById('refreshBtn').onclick = function (e) {
        e.preventDefault();
        window.location.reload();
    }
}

//清除localStorage資料
function deleteList() {
    localStorage.removeItem('BMIdata');
    data = [];
    updateList(data);  
}