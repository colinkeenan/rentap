var butt = document.createElement("button");             //define button element
var btext = document.createTextNode("Discard");          //define the text
butt.appendChild(btext);                                 //attach text to the button

var mode = window.sessionStorage.getItem("rentapmode");
var row = window.sessionStorage.getItem("rentaprow");

butt.addEventListener("click", 
   function() {
      // this discard function only moves the id (index) from kept to trash, it doesn't do anything to the actual rentap
      // row above is only updated on window.reload, so have to update row again to be sure correct row is discarded
      row = window.sessionStorage.getItem("rentaprow");
      var kept = JSON.parse(window.sessionStorage.getItem("rentapkeptJSON"));
      var trash = JSON.parse(window.sessionStorage.getItem("rentaptrashJSON"));
      var id = Number(kept[row]);
      trash.push(id);
      trash.sort(function(a,b){return a-b});
      kept.splice(row,1);
      var i=0;
      if (row<kept.length) i=row;
      else if (row>0) i=row-1;
      window.sessionStorage.setItem("rentaprow",i);
      window.sessionStorage.setItem("rentapkeptJSON",JSON.stringify(kept));
      window.sessionStorage.setItem("rentaptrashJSON",JSON.stringify(trash));
      self.postMessage(trash);
   },
false);

if((mode === "edit" || mode === "edited") && row != 0) {
   document.getElementById("discardbutton").appendChild(butt); //only allow "discarding" if it's previously saved, not discarded, and not the last rentap
}
