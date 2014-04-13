var butt = document.createElement("button");             //define button element
var btext = document.createTextNode("Restore");          //define the text
butt.appendChild(btext);                                 //attach text to the button

var rentapmode = window.sessionStorage.getItem("rentapmode");
var row = window.sessionStorage.getItem("rentaprow");

butt.addEventListener("click", 
   function() {                                          //handle onclick event
      // row above is only updated on window.reload, so have to update row again to be sure correct row is deleted
      var row = window.sessionStorage.getItem("rentaprow")
      var rentapByID = JSON.parse(window.sessionStorage.getItem('rentapByIDJSON'));
      var rentaps=JSON.parse(window.sessionStorage.getItem("rentapsJSON"));
      var discards=JSON.parse(window.sessionStorage.getItem("rentapdiscardsJSON"));
      var id = Number(discards[row][22]);
      var newrow = 1;
      var inTrash = true;
      for (i=id-1; inTrash && i>0; i--) {
         inTrash = rentapByID[i][0]; // rentapByID[i] is [inTrash,row of rentap with ID i]
         if (!inTrash) 
            newrow = rentapByID[i][1] + 1; //will insert after rentap with largest ID that's less than id
      }
      rentaps.splice(newrow,0,discards[row]); 
      discards.splice(row,1);
      rentapByID[id] = [false,newrow]; // false that it's discarded. it's now on newrow of rentaps
      // need to update all the rows of rentaps after the inserted one at newrow in rentaps and after deleted one at row in discards
      for (var nrow=discards.length-1; nrow>=row; nrow--) 
         rentapByID[Number(discards[nrow][22])] = [true,nrow];
      for (var nrow=rentaps.length-1; nrow>=newrow; nrow--) 
         rentapByID[Number(rentaps[nrow][22])] = [false,nrow];
      window.sessionStorage.setItem("rentaprow",newrow);
      window.sessionStorage.setItem("rentapsJSON",JSON.stringify(rentaps));
      window.sessionStorage.setItem("rentapByIDJSON",JSON.stringify(rentapByID));
      window.sessionStorage.setItem("rentapdiscardsJSON",JSON.stringify(discards));
      window.sessionStorage.setItem("rentapmode","edit");
      document.getElementById('mode').value="edit";
      self.postMessage([row,newrow,id]);
   },
false);

if(rentapmode === "discarded" && row != 0)
   document.getElementById("restorebutton").appendChild(butt); //put the Restore button on the page only if viewing a discarded rentap
