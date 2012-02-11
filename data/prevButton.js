var butt = document.createElement("button");    //define button element
var btext = document.createTextNode("Prev");  //define the text
butt.appendChild(btext);                        //attach text to the button
if(window.sessionStorage.getItem("CSVi") === null) {
  window.sessionStorage.setItem("CSVi","0");
}
var CSVi = window.sessionStorage.getItem("CSVi")

butt.addEventListener("click",                  //handle onclick event
   function(){   
      self.postMessage(CSVi);
      self.on("message", function(CSV) {
         window.sessionStorage.setItem('csv', CSV[1]);
         window.sessionStorage.setItem('CSVi',CSV[0]);
         window.sessionStorage.setItem('mode','edit');
      }); 
   },
false);

document.getElementById("prevbutton").appendChild(butt); //put the button on the page
