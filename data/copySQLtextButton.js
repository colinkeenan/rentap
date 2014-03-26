var butt = document.createElement("button");       //define button element
var btext = document.createTextNode("Copy SQL");   //define the text
butt.appendChild(btext);                           //attach text to the button

butt.addEventListener("click",                     //handle onclick event
   function(){
      var SQL = document.getElementById('SQL').value
      window.sessionStorage.setItem("rentapSQL",SQL);
      self.postMessage(SQL);
   },
false);

document.getElementById("copySQLtextButton").appendChild(butt); //put the button on the page
