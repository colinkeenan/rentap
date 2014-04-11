var butt = document.createElement("button");             //define button element
var btext = document.createTextNode("Del");              //define the text
butt.appendChild(btext);                                 //attach text to the button

var rentapmode = window.sessionStorage.getItem("rentapmode");
var row = window.sessionStorage.getItem("rentaprow");

butt.addEventListener("click", 
   function() {                                          //handle onclick event
      var discards=JSON.parse(window.sessionStorage.getItem("rentapdiscardsJSON"));
      discards.splice(row,1);
      var i=0;
      if (row<discards.length) {
         i=row;
      } else if (row>0) {
         i=row-1;
      } else {
         var i = window.sessionStorage.getItem('rentaptemprow');
         if (i == null) i = 0;
         window.sessionStorage.setItem("rentapmode","edit");
      }
      window.sessionStorage.setItem("rentaprow",i);
      window.sessionStorage.setItem("rentapdiscardsJSON",JSON.stringify(discards));
      self.postMessage(row);
   },
false);

if(rentapmode === "discarded" && row != 0)
   document.getElementById("delrentapbutton").appendChild(butt); //put the Del button on the page only if viewing a discarded rentap
