var self = require("sdk/self");
var data = self.data;
var tabs = require("sdk/tabs");
var clipboard = require("sdk/clipboard");
var ss = require("sdk/simple-storage");
var prefs = require("sdk/simple-prefs").prefs;

if(typeof(ss.storage.csv) === 'undefined') { //initialize csv[0] to be an instruction page for renters to refer to when filling out an application
  ss.storage.csv = ['"My First M Last","###-##-####","mo/dy/year","Single/Divorced/Seperated/Married","emailname@emailprovider.com","driver\'s license/ID# and State","555-321-4321","555-123-1234","9080 Example Blvd, $200/mo' +
'\nCity, ST  Zip' +
'\nJun\'09 - present' +
'\nMr. Landlord 555-555-5555","7060 Example Ave, $525/mo' +
'\nCity, ST  Zip, Aug\'08 - Jun\'09' +
'\nMr. Landlord 555-444-4444' +
'\n' +
'\n5040 Example St, Free' +
'\nCity, ST  Zip, Jun\'08 - July\'08' +
'\nRelative/Shelter 555-333-3333' +
'\n' +
'\n3020 Example Rd, $175/wk' +
'\nCity, ST  Zip, -Dec\'07 - May\'08' +
'\nHotel 555-222-2222","My First M Last, age' +
'\nFirst M Last, age, friend/spouse/relative","name, age, type of animal & breed, size' +
'\n' +
'\nor N/A","$200/mo Food Stamps' +
'\n$175 every two weeks from job listed below","Company Name' +
'\nAddress' +
'\nCity, ST  Zip' +
'\n' +
'\nas' +
'\n' +
'\nPosition, # hours/wk, under' +
'\nMs. Supervisor 555-111-1111' +
'\nfor # months/years","Company or Person that evicted you in Month/Year from Address, City, ST  Zip","Offense, County, State, Date, D.O.C. ID, and, if currently on parole/probation, include P.O. name and phone number.","mo/dy/year","","","","","Instructions by Example"'];
}
if(typeof(ss.storage.RHEADER) === 'undefined') {
  ss.storage.RHEADER = [["enter rental address","enter city, state, zip","enter title","enter header name"]];
}
if(typeof(ss.storage.row) === 'undefined') {
  ss.storage.row = 0;
}
if(typeof(ss.storage.RHEADERi) === 'undefined') {
  ss.storage.RHEADERi = 0;
}
if(typeof(ss.storage.mode) === 'undefined') {
  ss.storage.mode = 'new';
}

var csv = ss.storage.csv;
var row = ss.storage.row;
var RHEADER = ss.storage.RHEADER;
var RHEADERi = ss.storage.RHEADERi;
var mode = ss.storage.mode;

var CSV = require('./ucsv-1.1.0'); //UCSV v1.1.0 Provided under MIT License. Copyright 2010-2012, Peter Johnson http://www.uselesscode.org/javascript/csv/

var saveButton = require("sdk/page-mod");
saveButton.PageMod({
   include: [data.url("rentap.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("saveButton.js"),      //rentap comes from saveButton.js which also stores it in sessionStorage
   onAttach: function onAttach(worker) {
      worker.on('message', function(rentap) {
         csv.push(CSV.arrayToCsv(rentap));
         row = csv.length-1;
      });
   }
});

var saveHeaderButton = require("sdk/page-mod");
saveHeaderButton.PageMod({
   include: [data.url("rentap.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("saveHeaderButton.js"),
   onAttach: function onAttach(worker) {
      worker.on('message', function(rheader) { //rheader comes from saveHeaderButton.js
         RHEADER.push(rheader);
         var HEADERi=RHEADER.length-1
      });
   }
});

var saveEditButton = require("sdk/page-mod");
saveEditButton.PageMod({
   include: [data.url("rentap.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("saveEditButton.js"),
   onAttach: function onAttach(worker) {
      worker.on('message', function(RENTAP) { 
         row = RENTAP[0];
         csv[row] = CSV.arrayToCsv(RENTAP[1]); 
      });
   }
});

// var saveRow = require("sdk/page-mod");
// saveRow.PageMod({
//    include: [data.url("rentap.html*")],
//    contentScriptWhen: 'end',
//    contentScriptFile: data.url("saveRow.js"),
//    onAttach: function onAttach(worker) {
//       worker.on('message', function(currentrow) {
//          row = currentrow;
//          console.log("*** row has been updated to : " + row + "***");
//       });
//    }
// });

var editHeaderButton = require("sdk/page-mod");
editHeaderButton.PageMod({
   include: [data.url("rentap.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("editHeaderButton.js"),
   onAttach: function onAttach(worker) {
      worker.on('message', function(iR) { //iR comes from editHeaderButton.js
         RHEADER[iR[0]] = [iR[1],iR[2],iR[3],iR[4]] // and contains the index (iR[0]), and data to be saved.
         tabs.activeTab.url = data.url("rentap.html");
      });
   }
});

var delRheaderButton = require("sdk/page-mod");
delRheaderButton.PageMod({
   include: [data.url("rentap.html*")],
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
         tabs.activeTab.url = data.url("rentap.html");
      });
   }
});

var copyCSVButton = require("sdk/page-mod");
copyCSVButton.PageMod({
  include: [data.url("rentap.html*")],
  contentScriptWhen: 'end',
  contentScriptFile: data.url("copyCSVtextButton.js"),
  onAttach: function onAttach(worker) {
    worker.on('message', function(csvtocopy) {
      clipboard.set(csvtocopy);
    });
  }
});

var copySQLButton = require("sdk/page-mod");
copySQLButton.PageMod({
  include: [data.url("rentap.html*")],
  contentScriptWhen: 'end',
  contentScriptFile: data.url("copySQLtextButton.js"),
  onAttach: function onAttach(worker) {
    worker.on('message', function(sqltocopy) {
      clipboard.set(sqltocopy);
    });
  }
});

var loadData = require("sdk/page-mod");
loadData.PageMod({
   include: [data.url("rentapfirst.html*")],
   contentScriptWhen: 'ready',
   contentScriptFile: data.url("loadData.js"),        //loadData.js puts the whole ss database into sessionStorage
   onAttach: function onAttach(worker) {
      var rentaps = [[]];
      for(var i=0; i<csv.length; i++) {
         rentaps[i] = CSV.csvToArray(csv[i])[0]
      }
      worker.postMessage([RHEADER,RHEADERi,rentaps,row,mode]);
      tabs.activeTab.url = data.url("rentap.html");
   }
});

var startRentap = require("sdk/page-mod");
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



