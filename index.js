var easyBtn = document.getElementById("easy");
var difficultBtn = document.getElementById("difficult");
var box = document.getElementById("box");
var flagBox = document.getElementById("flagBox");
var minesNum;
var mineOver;
var block;
var mineMap = [];
var alertBox = document.getElementById("alertBox");
var alertImg = document.getElementById("alertImg");
var closeBtn = document.getElementById("close");
var score = document.getElementById("score");
var startGameBool = true;
var num = document.getElementsByClassName("num");
var all;

bindEvent();
function bindEvent() {
  easyBtn.onclick = function () {
    if (startGameBool) {
      box.style.display = "block";
      flagBox.style.display = "block";
      easyBtn.style.display = "none";
      difficultBtn.style.display = "none";
      init("easy");
      startGameBool = false;
    }
  };
  difficultBtn.onclick = function () {
    if (startGameBool) {
      box.style.display = "block";
      flagBox.style.display = "block";
      easyBtn.style.display = "none";
      difficultBtn.style.display = "none";
      init("difficult");
      startGameBool = false;
    }
  };
  box.oncontextmenu = function () {
    return false;
  };
  box.onmousedown = function (e) {
    var event = e.target;
    if (e.which == 1) {
      leftClick(event);
    } else if (e.which == 3) {
      rightClick(event);
    }
  };
  closeBtn.onclick = function () {
    alertBox.style.display = "none";
    flagBox.style.display = "none";
    box.style.display = "none";
    easyBtn.style.display = "block";
    difficultBtn.style.display = "block";
    box.innerHTML = "";
    startGameBool = true;
  };
}

function init(mode) {
  var boxNum;
  if (mode === "easy") {
    minesNum = 10;
    boxNum = 10;
    box.style.width = "500px";
  } else {
    minesNum = 25;
    boxNum = 25;
    box.style.width = "1250px";
  }
  all = boxNum * 10;
  mineOver = minesNum;
  score.innerHTML = mineOver;
  mineMap = [];
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < boxNum; j++) {
      var con = document.createElement("div");
      con.classList.add("block");
      con.setAttribute("id", i + "-" + j);
      box.appendChild(con);
      mineMap.push({ mine: 0 });
    }
  }
  block = document.getElementsByClassName("block");
  while (minesNum) {
    var mineIndex = Math.floor(Math.random() * boxNum * 10);
    if (mineMap[mineIndex].mine === 0) {
      block[mineIndex].classList.add("isLei");
      mineMap[mineIndex].mine = 1;
      minesNum--;
    } 
  }
}

function leftClick(dom) {
  if (dom.classList.contains("flag")) {
    return;
  }
  var isLei = document.getElementsByClassName("isLei");
  if (dom && dom.classList.contains("isLei")) {
    // console.log('game over');
    for (var i = 0; i < isLei.length; i++) {
      isLei[i].classList.add("show");
    }
    setTimeout(function () {
      alertBox.style.display = "block";
      alertImg.style.backgroundImage = 'url("./img/shibai.jpg")';
    }, 800);
  } else {
    var n = 0;
    var posArr = dom && dom.getAttribute("id").split("-");
    var posX = posArr && +posArr[0];
    var posY = posArr && +posArr[1];
    dom && dom.classList.add("num");
    if(num.length == 90){
      setTimeout(function () {
        alertBox.style.display = "block";
        alertImg.style.backgroundImage = 'url("./img/shengli.jpg")';
        alertBox.oncontextmenu = function () {
          return false;
        }
      }, 800)
    }
    for (var i = posX - 1; i <= posX + 1; i++) {
      for (var j = posY - 1; j <= posY + 1; j++) {
        var aroundBox = document.getElementById(i + "-" + j);
        if (aroundBox && aroundBox.classList.contains("isLei")) {
          n++;
        }
      }
    }
    dom && (dom.innerHTML = n);
    
    if (dom.innerHTML == 0) {
      dom.innerHTML = "";
    }
    if (n == 0) {
      for (var i = posX - 1; i <= posX + 1; i++) {
        for (var j = posY - 1; j <= posY + 1; j++) {
          var nearBox = document.getElementById(i + "-" + j);
          if (nearBox && nearBox.length != 0) {
            if (!nearBox.classList.contains("check")) {
              nearBox.classList.add("check");
              leftClick(nearBox);
            }
          }
        }
      }
    }
    
  }
}

function rightClick(dom) {
  if (dom.classList.contains("num")) {
    return;
  }
  dom.classList.toggle("flag");
  if (dom.classList.contains("isLei") && dom.classList.contains("flag")) {
    mineOver--;
  }
  if (dom.classList.contains("isLei") && !dom.classList.contains("flag")) {
    mineOver++;
  }
  score.innerHTML = mineOver;
  if (mineOver == 0) {
    setTimeout(function () {
      alertBox.style.display = "block";
      alertImg.style.backgroundImage = 'url("./img/shengli.jpg")';
      alertBox.oncontextmenu = function () {
        return false;
      }
    }, 800)
  }
}
