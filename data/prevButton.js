var butt = document.createElement("button");    //define button element
var btext = document.createTextNode("Prev");  //define the text
butt.appendChild(btext);                        //attach text to the button
if(window.sessionStorage.getItem("rentapCSVi") === null) {
  window.sessionStorage.setItem("rentapCSVi","0");
}
var CSVi = window.sessionStorage.getItem("rentapCSVi")

butt.addEventListener("click",                  //handle onclick event
   function(){   
      self.postMessage(CSVi);
      self.on("message", function(RENTAP) {
         window.sessionStorage.setItem('rentapJSON', JSON.stringify(RENTAP[1]));
         window.sessionStorage.setItem('rentapCSVi',RENTAP[0]);
         window.sessionStorage.setItem('rentapmode','edit');
      }); 
   },
false);

document.getElementById("prevbutton").appendChild(butt); //put the button on the page
