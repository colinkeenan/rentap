var butt = document.createElement("button");             //define button element
var btext = document.createTextNode("Del");              //define the text
butt.appendChild(btext);                                 //attach text to the button

var mode = window.sessionStorage.getItem("mode");
var row = window.sessionStorage.getItem("rentaprow");

function getID() {
   var trash = JSON.parse(window.sessionStorage.getItem("rentaptrashJSON"));
   // row and mode above are only updated on window.reload, so have to update here too
   mode = window.sessionStorage.getItem("mode");
   row = window.sessionStorage.getItem("rentaprow")
   if(mode === 'discarded' && 0<row && row<trash.length) // since the del button isn't visible unless this is true, should always pass
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
         var newrow = row; //can't modify row because need to send it to worker when done
         if (trash.length > 1 && newrow !=0) { //should be no way for newrow to be 0, but checking anyway
            window.sessionStorage.setItem("rentapprevrow",row);
            if (newrow<trash.length - 1) newrow++;
            else newrow = 1;  
         } else { //nothing left in trash so go back to kept rows
            window.sessionStorage.setItem("rentapprevrow",-1);
            newrow = window.sessionStorage.getItem('rentaptemprow');
            if (newrow == null) newrow = 0;
            window.sessionStorage.setItem("mode","edit");
         }
         window.sessionStorage.setItem("rentaprow",newrow);
         window.sessionStorage.setItem("rentaptrashJSON",JSON.stringify(trash));
         if (trash.length > 1 && row !=0)
            self.postMessage(row); //sending original row to worker to delete from simpleStorage
      }
   },
false);

if(mode === "discarded" && row != 0)
   document.getElementById("delrentapbutton").appendChild(butt); //put the Del button on the page only if viewing a discarded rentap
