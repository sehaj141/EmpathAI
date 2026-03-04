console.log("Hello world")

DOMmodel.body.firstElementChild 
DOMmodel.body.firstElementChild.childNodes 
DOMmodel.body.firstElementChild.children

//document.body
//<body>​<div class=​"container">​…​</div>​<table>​…​</table>​<script src=​"dom_model.js">​</script>​</body>​
//document.body.childNodes[1]
//<div class=​"container">​…​</div>​
//document.body.childNodes
//NodeList(7) [text, div.container, text, table, text, script, text]
//document.body.childNodes[1].children
//HTMLCollection(5) [div.box, div.box, div.box, div.box, div.box]
//let cont = document.body.childNodes[1]
//undefined
//cont
//<div class=​"container">​…​</div>​
//cont//
//<div class=​"container">​…​</div>​
//cont.firstChild
//#text
//cont.firstElementChild
//<div class=​"box">​Box1​</div>​
//cont.lastElementChild
//<div class=​"box">​Box5​</div>​
//cont.lastElementChild.style.color = 'red'
//'red'
//cont.lastElementChild.style.backgroundColor = 'pink'
//'pink'
//document.body.firstElementChild.children
//HTMLCollection(5) [div.box, div.box, div.box, div.box, div.box]
//document.body.firstElementChild.children[1]
//<div class=​"box">​Box2​</div>​
//document.body.firstElementChild.children[1].nextElementSibling
//<div class=​"box">​Box3​</div>​
//document.body.children[1]
//<table>​…​</table>​
//document.body.children[1].rows
//HTMLCollection(2) [tr, tr]
//