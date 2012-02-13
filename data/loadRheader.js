var i = window.sessionStorage.getItem("RHEADERi");
if (i === null) {i=0; window.sessionStorage.setItem("RHEADERi",0);}
self.postMessage(i);
self.on("message", function(rheader) {
   window.sessionStorage.setItem('mode','new');
   window.sessionStorage.setItem("csv",'"","","","","","","","","","","","","","","","","","",""' + ",\"" + rheader[0] + "\",\"" +rheader[1] + "\",\"" + rheader[2] + "\"");
   window.sessionStorage.setItem("headername",rheader[3]);
});
