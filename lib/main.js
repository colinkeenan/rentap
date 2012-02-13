var self = require("self");
var tabs = require("tabs");
var clipboard = require("clipboard");
var ss = require("simple-storage");
var data = self.data;
if(typeof(ss.storage.csv) === 'undefined') {
  ss.storage.csv = [];
}
if(typeof(ss.storage.RHEADER) === 'undefined') {
  ss.storage.RHEADER = [["enter rental address","enter city, state, zip","enter title","enter header name"]];
}
var csv = ss.storage.csv;
var RHEADER = ss.storage.RHEADER;
ss.storage.RHEADER[0][3] = "enter header name"; //in case RHEADER had been initialized before headers had names stored at index 3

var searchButton = require("page-mod");
searchButton.PageMod({
   include: [data.url("rentap.html*"),data.url("rentaphdr.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("searchButton.js"),
   onAttach: function onAttach(worker) {
      worker.on('message', function(findname) {                //gets "findname" from searchButton.js
         var regexp = RegExp("\^\""+findname)
         var i = 0
         while (i < csv.length && !regexp.test(csv[i])) i++;   //look for the csv data matching "findname" that's stored in simple-storage cache
         var CSV = [i,csv[i]]
         if (i < csv.length) worker.postMessage(CSV);       //sends matching csv data to the content script searchButton.js which stores it in sessionStorage
         tabs.activeTab.url = data.url("rentap.html");         //by refreshing the page, the csv data stored in sessionStorage gets displayed on the form
      });
   }
});

var saveButton = require("page-mod");
saveButton.PageMod({
   include: [data.url("rentap.html*"),data.url("rentaphdr.html*"),data.url("rentapnew.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("saveButton.js"),      //CSV comes from saveButton.js which also stores it in sessionStorage
   onAttach: function onAttach(worker) {           //CSV[0] is the data to be saved, if any, and CSV[1] is the mode
      worker.on('message', function(CSV) {
         if(CSV[1]==='new') csv.push(CSV[0]);       //store csv data in an array called csv that's stored in a simple-storage cache.
         var row=csv.length-1
         worker.postMessage(row);   //send saveButton.js the index of the newly saved csv data for sessionStorage
         tabs.activeTab.url = data.url("rentap.html");
      });
   }
});

var saveEditButton = require("page-mod");
saveEditButton.PageMod({
   include: [data.url("rentap.html*"),data.url("rentaphdr.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("saveEditButton.js"),
   onAttach: function onAttach(worker) {
      worker.on('message', function(CSV) { //CSV comes from saveEditButton.js
         if (CSV[2]==='edit') csv[CSV[0]] = CSV[1]; // and contains the index (CSV[0]), data (CSV[1]) to be saved, and mode (CSV[2]).
         tabs.activeTab.url = data.url("rentap.html");
      });
   }
});

var editHeaderButton = require("page-mod");
editHeaderButton.PageMod({
   include: [data.url("rentap.html*"),data.url("rentaphdr.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("editHeaderButton.js"),
   onAttach: function onAttach(worker) {
      worker.on('message', function(iR) { //iR comes from editHeaderButton.js
         RHEADER[iR[0]] = [iR[1],iR[2],iR[3],iR[4]] // and contains the index (iR[0]), and data to be saved.
         tabs.activeTab.url = data.url("rentaphdr.html");
      });
   }
});

var saveHeaderButton = require("page-mod");
saveHeaderButton.PageMod({
   include: [data.url("rentap.html*"),data.url("rentaphdr.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("saveHeaderButton.js"),
   onAttach: function onAttach(worker) {
      worker.on('message', function(rheader) { //rheader comes from saveHeaderButton.js
         RHEADER.push(rheader);
         var HEADERi=RHEADER.length-1
         worker.postMessage(HEADERi);
         tabs.activeTab.url = data.url("rentaphdr.html");
      });
   }
});

var listHeaderMenu = require("page-mod");
listHeaderMenu.PageMod({
   include: [data.url("rentap.html*"),data.url("rentaphdr.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("listHeaderMenu.js"),
   onAttach: function onAttach(worker) {
      worker.postMessage(RHEADER);
      worker.on('message',function(message) {
         if(message==='click') worker.postMessage(RHEADER);
         else tabs.activeTab.url = data.url("rentaphdr.html");
      });
   }
});

var delRheaderButton = require("page-mod");
delRheaderButton.PageMod({
   include: [data.url("rentap.html*"),data.url("rentaphdr.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("delHeaderButton.js"),
   onAttach: function onAttach(worker) {
      worker.on('message', function(RHEADERi) {
         RHEADER.splice(RHEADERi,1);
         var i=0;
         if (RHEADERi<RHEADER.length) i=RHEADERi;
         else if (RHEADERi>0) i=RHEADERi-1;
         var rheader = RHEADER[i]
         iR = [i,rheader[0],rheader[1],rheader[2],rheader[3]]
         worker.postMessage(iR);
         tabs.activeTab.url = data.url("rentaphdr.html");
      });
   }
});


var copyCSVButton = require("page-mod");
copyCSVButton.PageMod({
  include: [data.url("rentap.html*"),data.url("rentaphdr.html*")],
  contentScriptWhen: 'end',
  contentScriptFile: data.url("copyCSVtextButton.js"),
  onAttach: function onAttach(worker) {
    worker.on('message', function(csvtocopy) {
      clipboard.set(csvtocopy);
    });
  }
});

var copySQLButton = require("page-mod");
copySQLButton.PageMod({
  include: [data.url("rentap.html*"),data.url("rentaphdr.html*")],
  contentScriptWhen: 'end',
  contentScriptFile: data.url("copySQLtextButton.js"),
  onAttach: function onAttach(worker) {
    worker.on('message', function(sqltocopy) {
      clipboard.set(sqltocopy);
    });
  }
});

var prevButton = require("page-mod");
prevButton.PageMod({
   include: [data.url("rentap.html*"),data.url("rentaphdr.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("prevButton.js"),
   onAttach: function onAttach(worker) {
      worker.on('message', function(i) {                //"i" is the row of the current csv data displayed on the form
         if (i>0) i--; else i=csv.length-1;
         var CSV = [i,csv[i]]
         worker.postMessage(CSV);
         tabs.activeTab.url = data.url("rentap.html");  //by refreshing the page, the csv data stored in sessionStorage gets displayed on the form
      });
   }
});

var nextButton = require("page-mod");
nextButton.PageMod({
   include: [data.url("rentap.html*"),data.url("rentaphdr.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("nextButton.js"),
   onAttach: function onAttach(worker) {
      worker.on('message', function(i) {                //"i" is the index of the current csv data displayed on the form
         if (i<csv.length-1) i++; else i=0;
         var CSV = [i,csv[i]]
         worker.postMessage(CSV);
         tabs.activeTab.url = data.url("rentap.html");  //by refreshing the page, the csv data stored in sessionStorage gets displayed on the form
      });
   }
});

var jumpButton = require("page-mod");
jumpButton.PageMod({
   include: [data.url("rentap.html*"),data.url("rentaphdr.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("jumpButton.js"),
   onAttach: function onAttach(worker) {
      worker.on('message', function(i) {                //"i" is the index of the csv to jump to
         if (i<=csv.length-1 && i>=0) worker.postMessage(csv[i]);
         else worker.postMessage("error");
         tabs.activeTab.url = data.url("rentap.html");  //by refreshing the page, the csv data stored in sessionStorage gets displayed on the form
      });
   }
});

var loadRheader = require("page-mod");
loadRheader.PageMod({
   include: [data.url("rentapfirst.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("loadRheader.js"),
   onAttach: function onAttach(worker) {
      worker.on('message', function(i) {
         worker.postMessage(RHEADER[i]);
         tabs.activeTab.url = data.url("rentaphdr.html");
      });
   }
});

var startRentap = require("page-mod");
startRentap.PageMod({
   include: ["file://*"],
   contentScriptWhen: 'ready',
   contentScript: '',
   onAttach: function() {
      var regexp = RegExp("rentapstart\.html\$")
      if (regexp.test(tabs.activeTab.url))
         tabs.activeTab.url = data.url("rentapfirst.html");
   }
});



