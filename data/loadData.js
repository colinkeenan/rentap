//loading up sessionStorage with
//   rentapRHEADERJSON (array of rentap headers)
//   rentapRHEADERi    (index of last header used)
//   rentapcsvJSON     (array of rentap applications as csv)
//   rentaprow         (index of last application displayed)
//   rentapmode        (new, edit, newedit)

self.on("message", function(RHEADERcsv) {
   window.sessionStorage.setItem("rentapRHEADERJSON", JSON.stringify(RHEADERcsv[0]));
   window.sessionStorage.setItem("rentapRHEADERi", RHEADERcsv[1]);
   window.sessionStorage.setItem("rentapcsvJSON", JSON.stringify(RHEADERcsv[2]));
   window.sessionStorage.setItem("rentaprow", RHEADERcsv[3]);
   window.sessionStorage.setItem("rentapmode", RHEADERcsv[4]);
   window.alert("rentapcsvJSON: " + window.sessionStorage.getItem("rentapcsvJSON"));
   window.alert("rentapRHEADERJSON: " + window.sessionStorage.getItem("rentapRHEADERJSON"));
});
