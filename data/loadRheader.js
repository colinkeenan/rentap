var i = window.sessionStorage.getItem("rentapRHEADERi");
if (i === null) {i=0; window.sessionStorage.setItem("rentapRHEADERi",0);}
self.postMessage(i);
self.on("message", function(rheader) {
   var rentap = [
      ["",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "", 
      "",
      rheader[0],
      rheader[1],
      rheader[2]]
   ]
   
   window.sessionStorage.setItem("rentapJSON", JSON.stringify(rentap));  //store the data in sessionStorage to be displayed on the form when refreshed
   window.sessionStorage.setItem('rentapmode','new');
   window.sessionStorage.setItem("rentapheadername",rheader[3]);
});
