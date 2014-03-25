//loading up sessionStorage with
//   rentapRHEADERJSON (array of rentap headers)
//   rentapRHEADERi    (index of last header used)
//   rentaps           (array of rentap applications as arrays)
//   rentapmode        (new, edit, newedit) 
//   rentaprow         (current row being displayed)

self.on("message", function(RHEADERrentaps) {
   window.sessionStorage.setItem("rentapRHEADERJSON", JSON.stringify(RHEADERrentaps[0]));
   // leaving rentapRHEADERi untouched because can't track this in simple storage
   window.sessionStorage.setItem("rentaps", JSON.stringify(RHEADERrentaps[1]));
   window.sessionStorage.setItem("rentapmode", "new"); //"new" because it only runs when first starting and when clicking the new link
   // leaving rentaprow untouched because can't track it in simple storage
});
