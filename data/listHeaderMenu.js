var sel = document.createElement("select");   
var opt0 = document.createElement("option");
opt0.text = "Choose Header";
sel.add(opt0, null);      
self.on("message", function(RHEADER) {
   var i = 1;
   while (i < RHEADER.length) {
      var opti = document.createElement("option");
      var rheader = RHEADER[i]
      opti.text = rheader[3];
      if (opti.text === "") opti.text = i;
      sel.add(opti, null);
      i++;
   };
   window.sessionStorage.setItem("headername","");
});

document.getElementById("listheadermenu").appendChild(sel); //put the dropdown menu list on the page
