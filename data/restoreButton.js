var butt = document.createElement("button");             //define button element
var btext = document.createTextNode("Restore");          //define the text
butt.appendChild(btext);                                 //attach text to the button

var mode = window.sessionStorage.getItem("rentapmode");
var row = window.sessionStorage.getItem("rentaprow");

butt.addEventListener("click", 
   function() {                                          //handle onclick event
      // this restore function only moves the id (index) from trash to kept, it doesn't do anything to the actual rentap
      // row above is only updated on window.reload, so have to update row again to be sure correct row is restored
      row = window.sessionStorage.getItem("rentaprow");
      var kept = JSON.parse(window.sessionStorage.getItem("rentapkeptJSON"));
      var trash = JSON.parse(window.sessionStorage.getItem("rentaptrashJSON"));
      var id = Number(trash[row]);
      kept.push(id);
      kept.sort(function(a,b){return a-b});
      trash.splice(row,1);
      var newrow = kept.indexOf(id);
      window.sessionStorage.setItem("rentaprow",newrow);
      window.sessionStorage.setItem("rentapkeptJSON",JSON.stringify(kept));
      window.sessionStorage.setItem("rentaptrashJSON",JSON.stringify(trash));
      window.sessionStorage.setItem("rentapmode","edit");
      document.getElementById('mode').value="edit";
      self.postMessage(trash);
   },
false);

if(mode === "discarded" && row != 0)
   document.getElementById("restorebutton").appendChild(butt); //put the Restore button on the page only if viewing a discarded rentap
