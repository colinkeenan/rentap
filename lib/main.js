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

var csv = ss.storage.csv;
var RHEADER = ss.storage.RHEADER;

RHEADER[0][3] = "enter header name"; //in case RHEADER had been initialized before headers had names stored at index 3

var CSV = require('./ucsv-1.1.0'); //UCSV v1.1.0 Provided under MIT License. Copyright 2010-2012, Peter Johnson http://www.uselesscode.org/javascript/csv/

var searchButton = require("sdk/page-mod");
searchButton.PageMod({
   include: [data.url("rentap.html*"),data.url("rentaphdr.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("searchButton.js"),
   onAttach: function onAttach(worker) {
      worker.on('message', function(findname) {                //gets "findname" from searchButton.js
         if (findname === "showAllNames") {
            tabs.activeTab.url = data.url("rentapfirst.html");
         } else {
            if (RegExp("\^\"").test(findname)) var regexp = RegExp("\^"+findname + "\|\^" + findname.slice(1), "i");
            else var regexp = RegExp(findname, "ig");
            var i = 1; //don't search on row 0 which is the instructions page
            var found = [[[]]];
            while (i < csv.length) {   //look for all csv data matching "findname" stored in simple-storage
               regexp.lastIndex = 0;  //if don't reset lastIndex, it will test this string starting from the position the pattern was found in the previous string
               if (regexp.test(csv[i])) found.push([i,CSV.csvToArray(csv[i])[0]]); 
               i++;
            }   
            worker.postMessage(found);       //sends matching data to the content script searchButton.js which stores it in sessionStorage as a JSON string
            tabs.activeTab.url = data.url("rentap.html");         //by refreshing the page, the csv data stored in sessionStorage gets displayed on the form
         }
      });
   }
});

var saveButton = require("sdk/page-mod");
saveButton.PageMod({
   include: [data.url("rentap.html*"),data.url("rentaphdr.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("saveButton.js"),      //RENTAP comes from saveButton.js which also stores it in sessionStorage
   onAttach: function onAttach(worker) {           //RENTAP[0] is the data to be saved, if any, and RENTAP[1] is the mode
      worker.on('message', function(RENTAP) {
         if(RENTAP[1]==='new' || RENTAP[1]==='newedit') csv.push(CSV.arrayToCsv(RENTAP[0]));
         var row=csv.length-1
         worker.postMessage(row);   //send saveButton.js the index of the newly saved csv data for sessionStorage
         tabs.activeTab.url = data.url("rentap.html");
      });
   }
});

var saveEditButton = require("sdk/page-mod");
saveEditButton.PageMod({
   include: [data.url("rentap.html*"),data.url("rentaphdr.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("saveEditButton.js"),
   onAttach: function onAttach(worker) {
      worker.on('message', function(RENTAP) { //RENTAP comes from saveEditButton.js
         if (RENTAP[2]==='edit' || RENTAP[2]==='newedit') { // and contains the index (RENTAP[0]), data (RENTAP[1]) to be saved, and mode (RENTAP[2]).
            csv[RENTAP[0]] = CSV.arrayToCsv(RENTAP[1]); 
            tabs.activeTab.url = data.url("rentap.html");
         }
      });
   }
});

var generateCsvButton = require("sdk/page-mod");
generateCsvButton.PageMod({
   include: [data.url("rentap.html*"),data.url("rentaphdr.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("generateCsvButton.js"),
   onAttach: function onAttach(worker) {           
      worker.on('message', function(rentap) {          //rentap comes from generateCsvButton.js and is the data to be converted to CSV
         worker.postMessage(CSV.arrayToCsv(rentap));   //send CSV to generateCsvButton.js to be saved in sessionStorage
         tabs.activeTab.url = data.url("rentap.html"); //and displayed in CSV box on refresh
      });
   }
});

var editHeaderButton = require("sdk/page-mod");
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

var saveHeaderButton = require("sdk/page-mod");
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

var listHeaderMenu = require("sdk/page-mod");
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

var delRheaderButton = require("sdk/page-mod");
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


var copyCSVButton = require("sdk/page-mod");
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

var copySQLButton = require("sdk/page-mod");
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

var listSearchMenu = require("sdk/page-mod");
listSearchMenu.PageMod({
   include: [data.url("rentap.html*"),data.url("rentaphdr.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("listSearchMenu.js"),
   onAttach: function onAttach(worker) {
      var rentap = [[]]
      var i = 1
      while(i<csv.length) {
         rentap.push(CSV.csvToArray(csv[i])[0])
         i++;
      }
      worker.postMessage(rentap);
      worker.on('message',function(message) {
         if(message==='click') worker.postMessage(rentap);
         else tabs.activeTab.url = data.url("rentap.html");
      });
   }
});

var prevButton = require("sdk/page-mod");
prevButton.PageMod({
   include: [data.url("rentap.html*"),data.url("rentaphdr.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("prevButton.js"),
   onAttach: function onAttach(worker) {
      worker.on('message', function(i) {                //"i" is the row of the current csv data displayed on the form
         if (i>0) i--; else i=csv.length-1;
         var RENTAP = [i,CSV.csvToArray(csv[i])]
         worker.postMessage(RENTAP); //sends data to prevButton.js which converts to JSON string and stores in sessionStorage
         tabs.activeTab.url = data.url("rentap.html");  //by refreshing the page, the data stored in sessionStorage gets displayed on the form
      });
   }
});

var nextButton = require("sdk/page-mod");
nextButton.PageMod({
   include: [data.url("rentap.html*"),data.url("rentaphdr.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("nextButton.js"),
   onAttach: function onAttach(worker) {
      worker.on('message', function(i) {                //"i" is the index of the current csv data displayed on the form
         if (i<csv.length-1) i++; else i=0;
         var RENTAP = [i,CSV.csvToArray(csv[i])]
         worker.postMessage(RENTAP);  //sends data to nextButton.js which converts to JSON string and stores in sessionStorage
         tabs.activeTab.url = data.url("rentap.html");  //by refreshing the page, the data stored in sessionStorage gets displayed on the form
      });
   }
});

var jumpButton = require("sdk/page-mod");
jumpButton.PageMod({
   include: [data.url("rentap.html*"),data.url("rentaphdr.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("jumpButton.js"),
   onAttach: function onAttach(worker) {
      worker.on('message', function(i) {                //"i" is the index of the csv to jump to
         if (i<=csv.length-1 && i>=0) 
            worker.postMessage(CSV.csvToArray(csv[i]));  //sends data to jumpButton.js which converts to JSON string and stores in sessionStorage
            else worker.postMessage("error");
         tabs.activeTab.url = data.url("rentap.html");  //by refreshing the page, the data stored in sessionStorage gets displayed on the form
      });
   }
});

var importCsvButton = require("sdk/page-mod");
importCsvButton.PageMod({
   include: [data.url("rentap.html*"),data.url("rentaphdr.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("importCsvButton.js"),
   onAttach: function onAttach(worker) {
      worker.on('message', function(rentapcsv) {        //rentapcsv is the information to be converted to array for display on the application
         worker.postMessage(CSV.csvToArray(rentapcsv)); //sends data to importCsvButton.js which converts to JSON string and stores in sessionStorage
         tabs.activeTab.url = data.url("rentap.html");  //by refreshing the page, the data stored in sessionStorage gets displayed on the form
      });
   }
});

var loadRheader = require("sdk/page-mod");
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



