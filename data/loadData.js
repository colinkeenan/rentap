//loading up sessionStorage with
//   rentapRHEADERJSON (array of rentap headers)
//   rentapsJSON       (array of rentaps as arrays including trash, kept rentaps, and deleted rentaps as null)
//   rentaptrashJSON   (array of indices to discarded rentaps - the id or row in rentaps that was discarded)
//   rentapmode        (new, edit, newedit) 
//   rentapprevrow     (index of application that was visible just before this one, or -1 if not known)

self.on("message", function(simpleStorage) {
   window.sessionStorage.setItem("rentapRHEADERJSON", JSON.stringify(simpleStorage[0]));
   window.sessionStorage.setItem("rentapsJSON", JSON.stringify(simpleStorage[1]));
   window.sessionStorage.setItem("rentaptrashJSON", JSON.stringify(simpleStorage[2]));
   window.sessionStorage.setItem("rentapmode","new"); // either just started rentap or clicked "new" link
   var prevrow = window.sessionStorage.getItem('rentapprevrow');
   if (prevrow == null)
      window.sessionStorage.setItem('rentapprevrow',-1);
});
