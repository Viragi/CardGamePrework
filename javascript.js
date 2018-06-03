
//make a grid of 8 ,and a div for score

const height = 2;
const width = 4;
const imageSourceArray = ['animal1.jpeg', 'animal2.jpeg', 'animal3.jpg', 'animal4.jpg', 'animal5.jpg',
  'animal6.jpg', 'animal1.jpeg', 'animal2.jpeg', 'animal3.jpg', 'animal4.jpg',
  'animal5.jpg', 'animal6.jpg'];
var defaultImage = "flower.jpeg";
var Score = 0;
var Click = 0;

// Logic from Shuffling Array
function shufflearray(arr) {
  var temp;
  for (let i = 0; i < arr.length; i++) {
    var ran = Math.floor(Math.random() * arr.length);
    temp = arr[i];
    arr[i] = arr[ran];
    arr[ran] = temp;
  }
  return arr;
}

//logic 
var Fcard = null;
var disabledCouter = 0;
var event1;
function playgame(event) {
  event.target.disabled = true;
  var Scard = null;
  var scoreBoard = document.getElementById("score");
  Score++;
  scoreBoard.innerText = "Your Score Is -" + Score;
  event.target.style.backgroundImage = "url('images/" + imageSourceArray[event.target.id.slice(6)] + "')";
  Click++;
  if (Click == 1) {
    Fcard = event.target.style.backgroundImage;
    event1 = event.target;
  }
  else if (Click == 2) {
    Scard = event.target.style.backgroundImage;
    var event2 = event.target;
    if (Fcard != Scard) {
      setTimeout(function () {
        event1.disabled = false;
        event2.disabled = false;
        event2.style.backgroundImage = "url('images/" + defaultImage + "')";
        event1.style.backgroundImage = "url('images/" + defaultImage + "')";
      }, 500);
    }
    else {
      event1.disabled = true;
      event.target.disabled = true;
      disabledCouter++;

      if (disabledCouter == imageSourceArray.length / 2) {
        setTimeout(function () {
          alert("You Won!! Your Score Is:" + Score + ". Press Start to play again.");
          document.getElementById("startbtn").disabled = false;
        }, 1000);
      }
    }
    Click = 0;
  }
}
//Logic on Clearing game on start button
function clearGame() {
  var all = document.getElementById("gridId").children;
  if (all.length > 0) {
    while (all.length != 0) {
      document.getElementById("gridId").removeChild(all[0]);
    }
  }
  var ch = document.getElementById("score");
  ch.innerText = "Your Score Is -";
  Score = 0;
  disabledCouter = 0;
}

//logic on wen you click start button
function startGame(event) {
  clearGame();
  shufflearray(imageSourceArray);
  console.log(shufflearray(imageSourceArray));
  var gamegrid = document.getElementsByClassName("grid")[0];
  for (let i = 0; i < imageSourceArray.length; i++) {
    var divs = document.createElement("div");
    var textdiv = document.createElement("button");
    textdiv.setAttribute("id", "imgBtn" + i);
    textdiv.classList.add("imageHolder");
    gamegrid.appendChild(divs);
    divs.appendChild(textdiv);
    divs.setAttribute("id", "divId" + i);
    divs.classList.add("imagecointainer");
    textdiv.style.backgroundImage = "url('images/" + defaultImage + "')";
    textdiv.addEventListener("click", playgame);
  }
  document.getElementById("startbtn").disabled = true;
}
//button
var btn1 = document.getElementById("startbtn");
btn1.addEventListener("click", startGame);
