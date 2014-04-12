var butt = document.createElement("button");             //define button element
var btext = document.createTextNode("Discard");          //define the text
butt.appendChild(btext);                                 //attach text to the button

var rentapmode = window.sessionStorage.getItem("rentapmode");
var rentaps=JSON.parse(window.sessionStorage.getItem("rentapsJSON"));
var row = window.sessionStorage.getItem("rentaprow");

butt.addEventListener("click", 
   function() {
      // row above is only updated on window.reload, so have to update row again to be sure correct row is discarded
      row = window.sessionStorage.getItem("rentaprow");
      var rentapByID = JSON.parse(window.sessionStorage.getItem('rentapByIDJSON'));
      var discards=JSON.parse(window.sessionStorage.getItem("rentapdiscardsJSON"));
      var rentapID = Number(rentaps[row][22]);
      discards.push(rentaps[row]);
      rentaps.splice(row,1);
      rentapByID[rentapID] = [true,discards.length-1]; //true that it's discarded, and it's on row discards.length-1
      //also need to update the row of all rentaps that were after the one being discarded since they will be one row lower
      for (var nrow=rentaps.length-1; nrow>=row; nrow--) 
         rentapByID[Number(rentaps[nrow][22])] = [false,nrow];
      var i=0;
      if (row<rentaps.length) i=row;
      else if (row>0) i=row-1;
      window.sessionStorage.setItem("rentaprow",i);
      window.sessionStorage.setItem("rentapByIDJSON",JSON.stringify(rentapByID));
      window.sessionStorage.setItem("rentapsJSON",JSON.stringify(rentaps));
      window.sessionStorage.setItem("rentapdiscardsJSON",JSON.stringify(discards));
      self.postMessage(row,rentapID);
   },
false);

if(rentapmode === "edit" && row != 0) {
   document.getElementById("discardbutton").appendChild(butt); //only allow "discarding" if it's previously saved, not discarded, and not the last rentap
}
