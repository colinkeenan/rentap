//loading up sessionStorage with
//   rentapRHEADERJSON (array of rentap headers)
//   rentapsJSON       (array of rentap applications as arrays)
//   rentapsdiscardsJSON (array of discards as arrays)
//   rentapmode        (new, edit, newedit) 
//   rentapprevrow     (index of application that was visible just before this one, or -1 if not known)
//   rentapByID        (rentapsByID[ID] is [isTrash,row] where isTrash is true/false and row is index of rentap in rentaps or discards)
//   rentapIDset       (set of unique ID's already used)

self.on("message", function(simpleStorage) {
   window.sessionStorage.setItem("rentapRHEADERJSON", JSON.stringify(simpleStorage[0]));
   window.sessionStorage.setItem("rentapsJSON", JSON.stringify(simpleStorage[1]));
   window.sessionStorage.setItem("rentapdiscardsJSON", JSON.stringify(simpleStorage[2]));
   window.sessionStorage.setItem("rentapByIDJSON", JSON.stringify(simpleStorage[3]));
   window.sessionStorage.setItem("rentapIDsetJSON", JSON.stringify(simpleStorage[4]));
   window.sessionStorage.setItem("rentapmode","new"); // either just started rentap or clicked "new" link
   var prevrow = window.sessionStorage.getItem('rentapprevrow');
   if (prevrow == null)
      window.sessionStorage.setItem('rentapprevrow',-1);
});
