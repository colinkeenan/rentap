var menuitem = require("menuitems").Menuitem({
  id: "rentap",
  menuid: "menu_ToolsPopup",
  label: "Rental Application",
  onCommand: function() {
    tabs.open(data.url("rentapfirst.html"));
  },
  insertbefore: "menu_pageInfo"
});
var self = require("self");
var data = self.data;
var tabs = require("tabs");
var clipboard = require("clipboard");
var ss = require("simple-storage");
var prefs = require("simple-prefs").prefs;
var recovery = require('./recovery');

if (!prefs.storageRecovered) { //this recovers data stored while using SDK 1.4.2 and is only run one time
   for (var key in recovery.storage) //recovery.storage contains data stored while using SDK 1.4.2
      ss.storage[key]=recovery.storage[key]; //in order for ss.storage to access it, the key needs to be the same
   prefs.storageRecovered = true;
}

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
'\nfor # months/years","Company or Person that evicted you in Month/Year from Address, City, ST  Zip","Offense, County, State, Date, and parole officer name and phone# if currently on parole","mo/dy/year","","","","","Instructions by Example"'];
}
if(typeof(ss.storage.RHEADER) === 'undefined') {
  ss.storage.RHEADER = [["enter rental address","enter city, state, zip","enter title","enter header name"]];
}

var csv = ss.storage.csv;
var RHEADER = ss.storage.RHEADER;

RHEADER[0][3] = "enter header name"; //in case RHEADER had been initialized before headers had names stored at index 3

/*!
 * UCSV v1.0.2
 * Provided under MIT License.
 *
 * Copyright 2010, Peter Johnson
 * http://www.uselesscode.org/javascript/csv/
 */

/* jsLint stuff */
/*global */
/*members apply, arrayToCsv, charAt, csvToArray, length, prototype, push, 
    replace, substring, test, toString, trim
*/

"use strict";
/**
 * Namespace for CSV functions
 * @namespace
 */
var CSV = (function () {

	var rxIsInt = /^\d+$/,
	rxIsFloat = /^\d*\.\d+$|^\d+\.\d*$/,
	rxNeedsQuoting = /^\s|\s$|,|"/,
	trim = (function () {
		// Fx 3.1 has a native trim function, it's about 10x faster, use it if it exists
		if (String.prototype.trim) {
			return function (s) {
				return s.trim();
			};
		} else {
			return function (s) {
				return s.replace(/^\s*/, '').replace(/\s*$/, '');
			};
		}
	}());
 
	function isNumber(o) {
		return Object.prototype.toString.apply(o) === '[object Number]';
	}

	function isString(o) {
		return Object.prototype.toString.apply(o) === '[object String]';
	}

	function chomp(s) {
		if (s.charAt(s.length - 1) !== "\n") {
			// Does not end with \n, just return string
			return s;
		} else {
			// Remove the \n
			return s.substring(0, s.length - 1);
		}
	}

 /**
	* Converts an array into a Comma Separated Values list.
	* Each item in the array should be an array that represents one line in the CSV.
	* Nulls are interpreted as empty fields.
	*
	* @param {String} a The array to convert
	*
	* @returns A CSV representation of the provided array.
	* @type string
	* @public
	* @static
	* @example
	* var csvArray = [
	* ['Leno, Jay', 10],
	* ['Conan "Conando" O\'Brien', '11:35' ],
	* ['Fallon, Jimmy', '12:35' ]
	* ];
	* CSV.arrayToCsv(csvArray);
	* // Outputs a string containing:
	* // "Leno, Jay",10
	* // "Conan ""Conando"" O'Brien",11:35
	* // "Fallon, Jimmy",12:35
	*/
	function arrayToCsv(a) {
		var cur,
		out = '',
		row,
		i,
		j;

		for (i = 0; i < a.length; i += 1) {
			row = a[i];
			for (j = 0; j < row.length; j += 1) {
				cur = row[j];

				if (isString(cur)) {
					// Escape any " with double " ("")
					cur = cur.replace(/"/g, '""');

					// If the field starts or ends with whitespace, contains " or , or is a string representing a number
					if (rxNeedsQuoting.test(cur) || rxIsInt.test(cur) || rxIsFloat.test(cur)) {
						cur = '"' + cur + '"';
					// quote empty strings
					} else if (cur === "") {
						cur = '""';
					}
				} else if (isNumber(cur)) {
					cur = cur.toString(10);
				} else if (cur === null) {
					cur = '';
				} else {
					cur = cur.toString();
				}

				out += j < row.length - 1 ? cur + ',' : cur;
			}
			// End record
			out += "\n";
		}

		return out;
	}

	/**
	 * Converts a Comma Separated Values string into an array of arrays.
	 * Each line in the CSV becomes an array.
	 * Empty fields are converted to nulls and non-quoted numbers are converted to integers or floats.
	 *
	 * @return The CSV parsed as an array
	 * @type Array
	 * 
	 * @param {String} s The string to convert
	 * @param {Boolean} [trm=false] If set to True leading and trailing whitespace is stripped off of each non-quoted field as it is imported
	 * @public
	 * @static
	 * @example
	 * var csv = '"Leno, Jay",10' + "\n" +
	 * '"Conan ""Conando"" O\'Brien",11:35' + "\n" +
	 * '"Fallon, Jimmy",12:35' + "\n";
	 *
	 * var array = CSV.csvToArray(csv);
	 * 
	 * // array is now
	 * // [
	 * // ['Leno, Jay', 10],
	 * // ['Conan "Conando" O\'Brien', '11:35' ],
	 * // ['Fallon, Jimmy', '12:35' ]
	 * // ];
	 */
	function csvToArray(s, trm) {
		// Get rid of any trailing \n
		s = chomp(s);

		var cur = '', // The character we are currently processing.
		inQuote = false,
		fieldQuoted = false,
		field = '', // Buffer for building up the current field
		row = [],
		out = [],
		i,
		processField;

		processField = function (field) {
			if (fieldQuoted !== true) {
				// If field is empty set to null
				if (field === '') {
					field = null;
				// If the field was not quoted and we are trimming fields, trim it
				} else if (trm === true) {
					field = trim(field);
				}

				// Convert unquoted numbers to their appropriate types
				if (rxIsInt.test(field)) {
					field = parseInt(field, 10);
				} else if (rxIsFloat.test(field)) {
					field = parseFloat(field, 10);
				}
			}
			return field;
		};

		for (i = 0; i < s.length; i += 1) {
			cur = s.charAt(i);

			// If we are at a EOF or EOR
			if (inQuote === false && (cur === ',' || cur === "\n")) {
				field = processField(field);
				// Add the current field to the current row
				row.push(field);
				// If this is EOR append row to output and flush row
				if (cur === "\n") {
					out.push(row);
					row = [];
				}
				// Flush the field buffer
				field = '';
				fieldQuoted = false;
			} else {
				// If it's not a ", add it to the field buffer
				if (cur !== '"') {
					field += cur;
				} else {
					if (!inQuote) {
						// We are not in a quote, start a quote
						inQuote = true;
						fieldQuoted = true;
					} else {
						// Next char is ", this is an escaped "
						if (s.charAt(i + 1) === '"') {
							field += '"';
							// Skip the next char
							i += 1;
						} else {
							// It's not escaping, so end quote
							inQuote = false;
						}
					}
				}
			}
		}

		// Add the last field
		field = processField(field);
		row.push(field);
		out.push(row);

		return out;
	}

	return {
		arrayToCsv: arrayToCsv,
		csvToArray: csvToArray
	};
}());

var searchButton = require("page-mod");
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

var saveButton = require("page-mod");
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

var saveEditButton = require("page-mod");
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

var listSearchMenu = require("page-mod");
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

var prevButton = require("page-mod");
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

var nextButton = require("page-mod");
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

var jumpButton = require("page-mod");
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



