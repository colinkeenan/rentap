self.on("message", function(rheader) {
   window.sessionStorage.setItem('mode','new');
   window.sessionStorage.setItem("csv",'"","","","","","","","","","","","","","","","","","",""' + ",\"" + rheader[0] + "\",\"" +rheader[1] + "\",\"" + rheader[2] + "\"");
});
