console.log("Harry")

 ///let boxes = document.getElementsByClassName("box")
 //console.log(boxes)

 //boxes[2].style.backgroundColor = "red"

// document.getElementById("redbox").style.backgroundColor = "red"

document.querySelector(".box").style.backgroundColor = "green";
//console.log(document.querySelectorAll(".box"))

//document.querySelectorAll(".box").forEach(e =>{
  //  e.style.backgroundColor = "green";
//}) 



//e = document.getElementsByTagName("div")
//HTMLCollection(8) [div.container, div.box, div.box, div.box, div#redbox.box, div.box, div.box, div.box, redbox: div#redbox.box]
//e[4].matches("redbox")
//false
//e[4].matches("#redbox")
//true
//e[3].matches("#redbox")
//false
//e[3].closest("#redbox")
//null
//e[3].matches(".container")
//false
//e[3].closest(".container")
//<div class=​"container">​…​</div>​<div class=​"box" style=​"background-color:​ green;​">​Bhupendra Jogi 1 ​</div>​<div class=​"box" style=​"background-color:​ green;​">​Bhupendra Jogi 1.5 ​</div>​<div class=​"box" style=​"background-color:​ green;​">​Bhupendra Jogi 2​</div>​<div id=​"redbox" class=​"box" style=​"background-color:​ green;​">​Bhupendra Jogi 2.5​</div>​<div class=​"box" style=​"background-color:​ green;​">​Bhupendra Jogi 3​</div>​<div class=​"box" style=​"background-color:​ green;​">​Bhupendra Jogi 4​</div>​<div class=​"box" style=​"background-color:​ green;​">​Bhupendra Jogi 5​</div>​</div>​
//e[3].closest("html")
//<html lang=​"en">​<head>​…​</head>​<body>​…​</body>​</html>​
//document.querySelector(".container").contains(e[2])
//true
//document.querySelector(".container").contains(document.querySelector("body"))
//false
//document.querySelector("body").contains(document.querySelector(".container"))
//true
