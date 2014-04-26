var butt = document.createElement("button");             //define button element
var btext = document.createTextNode("Del");              //define the text
butt.appendChild(btext);                                 //attach text to the button

var mode = window.sessionStorage.getItem("mode");
var row = window.sessionStorage.getItem("rentaprow");

function getID() {
   var kept = JSON.parse(window.sessionStorage.getItem("rentapkeptJSON"));
   var trash = JSON.parse(window.sessionStorage.getItem("rentaptrashJSON"));
   // row and mode above are only updated on window.reload, so have to update here too
   mode = window.sessionStorage.getItem("mode");
   row = window.sessionStorage.getItem("rentaprow")
   if(mode === 'edit' && 0<=row && row<kept.length)
      return Number(kept[row]);
   else if(mode === 'discarded' && 0<=row && row<trash.length) 
      return Number(trash[row]);
   else
      return -1;
}

butt.addEventListener("click", 
   function() {                                          //handle onclick event
   // won't be changing trash at all because want to keep index of deleted rentaps
      var id = getID(); //row gets updated in getID()
      if (id != -1) {
         rentaps[id] = null;
         if (row<trash.length - 1) {
            row++;
         } else if (row>0) {
            row--;
         } else {
            row = window.sessionStorage.getItem('rentaptemprow');
            if (row == null) row = 0;
            window.sessionStorage.setItem("mode","edit");
         }
         window.sessionStorage.setItem("rentaprow",row);
         window.sessionStorage.setItem("rentaptrashJSON",JSON.stringify(trash));
         self.postMessage(row);
      }
   },
false);

if(mode === "discarded" && row != 0)
   document.getElementById("delrentapbutton").appendChild(butt); //put the Del button on the page only if viewing a discarded rentap
