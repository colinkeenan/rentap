//loading up sessionStorage with
//   rentapRHEADERJSON (array of rentap headers)
//   rentapsJSON       (array of rentap applications as arrays)
//   rentapmode        (new, edit, newedit) 

self.on("message", function(RHEADERrentaps) {
   window.sessionStorage.setItem("rentapRHEADERJSON", JSON.stringify(RHEADERrentaps[0]));
   window.sessionStorage.setItem("rentapsJSON", JSON.stringify(RHEADERrentaps[1]));
   window.sessionStorage.setItem("rentapdicardsJSON", JSON.stringify(RHEADERrentaps[2]));
   window.sessionStorage.setItem("rentapmode","new"); // either just started rentap or clicked "new" link
});
