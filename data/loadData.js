//loading up sessionStorage with
//   rentapRHEADERJSON (array of rentap headers)
//   rentapRHEADERi    (index of last header used)
//   rentaps           (array of rentap applications as arrays)
//   rentaprow         (index of last application displayed)
//   rentapmode        (new, edit, newedit)

self.on("message", function(RHEADERcsv) {
   window.sessionStorage.setItem("rentapRHEADERJSON", JSON.stringify(RHEADERcsv[0]));
   window.sessionStorage.setItem("rentapRHEADERi", RHEADERcsv[1]);
   window.sessionStorage.setItem("rentaps", JSON.stringify(RHEADERcsv[2]));
   window.sessionStorage.setItem("rentaprow", RHEADERcsv[3]);
   window.sessionStorage.setItem("rentapmode", RHEADERcsv[4]);
});
