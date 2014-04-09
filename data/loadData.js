//loading up sessionStorage with
//   rentapRHEADERJSON (array of rentap headers)
//   rentapsJSON       (array of rentap applications as arrays)
//   rentapmode        (new, edit, newedit) 
//   rentapprevrow     (index of application that was visible just before this one, or -1 if not known)

self.on("message", function(RHEADERrentaps) {
   window.sessionStorage.setItem("rentapRHEADERJSON", JSON.stringify(RHEADERrentaps[0]));
   window.sessionStorage.setItem("rentapsJSON", JSON.stringify(RHEADERrentaps[1]));
   window.sessionStorage.setItem("rentapdiscardsJSON", JSON.stringify(RHEADERrentaps[2]));
   window.sessionStorage.setItem("rentapmode","new"); // either just started rentap or clicked "new" link
   var prevrow = window.sessionStorage.getItem('rentapprevrow');
   if (prevrow == null)
      window.sessionStorage.setItem('rentapprevrow',-1);
});
