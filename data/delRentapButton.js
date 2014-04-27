var butt = document.createElement("button");             //define button element
var btext = document.createTextNode("Del");              //define the text
butt.appendChild(btext);                                 //attach text to the button

var mode = window.sessionStorage.getItem("rentapmode");
var row = window.sessionStorage.getItem("rentaprow");

function getID() {
   var trash = JSON.parse(window.sessionStorage.getItem("rentaptrashJSON"));
   // row and mode above are only updated on window.reload, so have to update here too
   mode = window.sessionStorage.getItem("rentapmode");
   row = window.sessionStorage.getItem("rentaprow")
   if(mode === 'discarded' && 0<row && row<trash.length) //since the del button isn't visible unless this is true, should always pass
      return Number(trash[row]);
   else
      return -1;                                         //should never actually return -1
}

butt.addEventListener("click", 
   function() {                                                                //handle onclick event
      var id = getID(); //row gets updated in getID()
      var trash = JSON.parse(window.sessionStorage.getItem("rentaptrashJSON"));
      if (id != -1) {                                                          //don't expect id to ever be -1
         rentaps[id] = null; //not splicing because want to preserve id's
         trash.splice(row,1);//but don't need to track it in trash
         if (trash.length > 1) {
            window.sessionStorage.setItem("rentapprevrow",row);
            if (row<trash.length - 1) row++;
            else row = 1;  
         } else { //nothing left in trash so go back to kept rows
            window.sessionStorage.setItem("rentapprevrow",-1);
            row = window.sessionStorage.getItem('rentaptemprow');
            if (row == null) row = 0;
            window.sessionStorage.setItem("rentapmode","edit");
         }
         window.sessionStorage.setItem("rentaprow",row);
         window.sessionStorage.setItem("rentaptrashJSON",JSON.stringify(trash));
         self.postMessage(id);
      }
   },
false);

if(mode === "discarded" && row != 0)
   document.getElementById("delrentapbutton").appendChild(butt); //put the Del button on the page only if viewing a discarded rentap
