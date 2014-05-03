//loading up sessionStorage with
//   rentapRHEADERJSON (array of rentap headers)
//   rentapsJSON       (array of rentaps as arrays including trash, kept rentaps, and deleted rentaps as null)
//   rentaptrashJSON   (array of indices to discarded rentaps - the id or row in rentaps that was discarded)
//   rentapmode        (new, edit, newedit) 
//   rentapprevrow     (index of application that was visible just before this one, or -1 if not known)

self.on("message", function(simpleStorage) {
   var rentaps = simpleStorage[1];
   var trash = simpleStorage[2];
   window.sessionStorage.setItem("rentapRHEADERJSON", JSON.stringify(simpleStorage[0]));
   window.sessionStorage.setItem("rentapsJSON", JSON.stringify(rentaps));
   window.sessionStorage.setItem("rentaptrashJSON", JSON.stringify(trash));
   window.sessionStorage.setItem("rentapmode","new"); // either just started rentap or clicked "new" link
   var kept = [0];
   var id = 0, l = rentaps.length;
   while (++id<l)
      if (typeof(rentaps[id][1])!='undefined' && trash.indexOf(id)===-1)
         kept.push(id);
   window.sessionStorage.setItem("rentapkeptJSON",JSON.stringify(kept))
   var prevrow = window.sessionStorage.getItem('rentapprevrow');
   if (prevrow == null)
      window.sessionStorage.setItem('rentapprevrow',-1);
});
