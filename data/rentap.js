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


function setSqlInsertText() {
   var fullname = "\'" + document.getElementById('fullname').value.replace(/\'/g,"\'\'") + "\'"
   var ssnumber = "\'" + document.getElementById('ssnumber').value.replace(/\'/g,"\'\'") + "\'"
   var birthdate = "\'" + document.getElementById('birthdate').value.replace(/\'/g,"\'\'") + "\'"
   var maritalstatus = "\'" + document.getElementById('maritalstatus').value.replace(/\'/g,"\'\'") + "\'"
   var email = "\'" + document.getElementById('email').value.replace(/\'/g,"\'\'") + "\'"
   var stateid = "\'" + document.getElementById('stateid').value.replace(/\'/g,"\'\'") + "\'"
   var phone1 = "\'" + document.getElementById('phone1').value.replace(/\'/g,"\'\'") + "\'"
   var phone2 = "\'" + document.getElementById('phone2').value.replace(/\'/g,"\'\'") + "\'"
   var currentaddress = "\'" + document.getElementById('currentaddress').value.replace(/\'/g,"\'\'") + "\'"
   var previousaddresses = "\'" + document.getElementById('previousaddresses').value.replace(/\'/g,"\'\'") + "\'"
   var occupants = "\'" + document.getElementById('occupants').value.replace(/\'/g,"\'\'") + "\'"
   var pets = "\'" + document.getElementById('pets').value.replace(/\'/g,"\'\'") + "\'"
   var income = "\'" + document.getElementById('income').value.replace(/\'/g,"\'\'") + "\'"
   var employment = "\'" + document.getElementById('employment').value.replace(/\'/g,"\'\'") + "\'"
   var evictions = "\'" + document.getElementById('evictions').value.replace(/\'/g,"\'\'") + "\'"
   var felonies = "\'" + document.getElementById('felonies').value.replace(/\'/g,"\'\'") + "\'"
   var authdate = "\'" + document.getElementById('authdate').value.replace(/\'/g,"\'\'") + "\'"
   var guestdate = "\'" + document.getElementById('guestdate').value.replace(/\'/g,"\'\'") + "\'"
   var rentdate = "\'" + document.getElementById('rentdate').value.replace(/\'/g,"\'\'") + "\'"
   var rentaladdress = "\'" + document.getElementById('rentaladdress').value + "\'"
   var rentalcitystzip = "\'" + document.getElementById('rentalcitystzip').value + "\'"
   var rtitle = "\'" + document.getElementById('rtitle').value + "\'"
   
   document.getElementById('sqlinsert').value =
   
   "INSERT OR REPLACE INTO rentap VALUES(" + 
   fullname + ", " + ssnumber + ", " + birthdate + ", " + maritalstatus + ", " + email + ", " + stateid + ", " +  phone1 + ", " + phone2 + ", " + currentaddress + ", " + previousaddresses + ", " + occupants + ", " + pets + ", " + income + ", " + employment + ", " + evictions + ", " + felonies + ", " + authdate + ", " + guestdate + ", " + rentdate + ", " + rentaladdress + "," + rentalcitystzip + "," + rtitle + ")";
}

function setRheader() {
   var rentaladdress = window.sessionStorage.getItem("rentaprentaladdress")
   var rentalcitystzip = window.sessionStorage.getItem("rentaprentalcitystzip")
   var rtitle = window.sessionStorage.getItem("rentaprtitle")
   var headername = window.sessionStorage.getItem("rentapheadername")
   if (rentaladdress) document.getElementById('rentaladdress').value = rentaladdress;
   if (rentalcitystzip) document.getElementById('rentalcitystzip').value = rentalcitystzip;
   if (rtitle) document.getElementById('rtitle').value = rtitle;
   if (headername) document.getElementById('headername').value = headername;
}

function setCSVdata() {
   var arr = [
      [document.getElementById('fullname').value,
      document.getElementById('ssnumber').value,
      document.getElementById('birthdate').value,
      document.getElementById('maritalstatus').value,
      document.getElementById('email').value,
      document.getElementById('stateid').value,
      document.getElementById('phone1').value,
      document.getElementById('phone2').value,
      document.getElementById('currentaddress').value,
      document.getElementById('previousaddresses').value,
      document.getElementById('occupants').value,
      document.getElementById('pets').value,
      document.getElementById('income').value,
      document.getElementById('employment').value,
      document.getElementById('evictions').value,
      document.getElementById('felonies').value,
      document.getElementById('authdate').value,
      document.getElementById('guestdate').value.replace(/\n/g," "), //newlines in the date boxes aren't handled correctly by UCSV v1.0.2
      document.getElementById('rentdate').value.replace(/\n/g," "),
      document.getElementById('rentaladdress').value,
      document.getElementById('rentalcitystzip').value,
      document.getElementById('rtitle').value]
   ]
   
   document.getElementById('csv').value = CSV.arrayToCsv(arr); //CSV.arrayToCsv comes from UCSV v1.0.2
}

function importCSV() {
   var csv = document.getElementById('csv').value;
   if(window.sessionStorage.getItem("rentapCSVi") === null) {
      window.sessionStorage.setItem("rentapCSVi","0");
   }
   var row = window.sessionStorage.getItem("rentapCSVi");
   var csvfield = CSV.csvToArray(csv)[0]; //CSV.csvToArray comes from UCSV v1.0.2
   
   if(typeof(csvfield[0]) === 'undefined') var fullname = "";
      else var fullname = csvfield[0];
   if(typeof(csvfield[1]) === 'undefined') var ssnumber = "";
      else var ssnumber = csvfield[1];
   if(typeof(csvfield[2]) === 'undefined') var birthdate = "";
      else var birthdate = csvfield[2];
   if(typeof(csvfield[3]) === 'undefined') var maritalstatus = "";
      else var maritalstatus = csvfield[3];
   if(typeof(csvfield[4]) === 'undefined') var email = "";
      else var email = csvfield[4];
   if(typeof(csvfield[5]) === 'undefined') var stateid = "";
      else var stateid = csvfield[5];
   if(typeof(csvfield[6]) === 'undefined') var phone1 = "";
      else var phone1 = csvfield[6];
   if(typeof(csvfield[7]) === 'undefined') var phone2 = "";
      else var phone2 = csvfield[7];
   if(typeof(csvfield[8]) === 'undefined') var currentaddress = "";
      else var currentaddress = csvfield[8];
   if(typeof(csvfield[9]) === 'undefined') var previousaddresses = "";
      else var previousaddresses = csvfield[9];
   if(typeof(csvfield[10]) === 'undefined') var occupants = "";
      else var occupants = csvfield[10];
   if(typeof(csvfield[11]) === 'undefined') var pets = "";
      else var pets = csvfield[11];
   if(typeof(csvfield[12]) === 'undefined') var income = "";
      else var income = csvfield[12];
   if(typeof(csvfield[13]) === 'undefined') var employment = "";
      else var employment = csvfield[13];
   if(typeof(csvfield[14]) === 'undefined') var evictions = "";
      else var evictions = csvfield[14];
   if(typeof(csvfield[15]) === 'undefined') var felonies = "";
      else var felonies = csvfield[15];
   if(typeof(csvfield[16]) === 'undefined') var authdate = "";
      else var authdate = csvfield[16];
   if(typeof(csvfield[17]) === 'undefined') var guestdate = "";
      else var guestdate = csvfield[17];
   if(typeof(csvfield[18]) === 'undefined') var rentdate = "";
      else var rentdate = csvfield[18];
   if(typeof(csvfield[19]) === 'undefined') var rentaladdress="enter rental address";
      else var rentaladdress = csvfield[19];
   if(typeof(csvfield[20]) === 'undefined') var rentalcitystzip="enter city, state, zip";
      else var rentalcitystzip = csvfield[20];
   if(typeof(csvfield[21]) === 'undefined') var rtitle="enter title";
      else var rtitle = csvfield[21];

   document.getElementById('rownumber').value = row;
   document.getElementById('fullname').value = fullname;
   document.getElementById('ssnumber').value = ssnumber;
   document.getElementById('birthdate').value = birthdate;
   document.getElementById('maritalstatus').value = maritalstatus;
   document.getElementById('email').value = email;
   document.getElementById('stateid').value = stateid;
   document.getElementById('phone1').value = phone1;
   document.getElementById('phone2').value = phone2;
   document.getElementById('currentaddress').value = currentaddress;
   document.getElementById('previousaddresses').value = previousaddresses;
   document.getElementById('occupants').value = occupants;
   document.getElementById('pets').value = pets;
   document.getElementById('income').value = income;
   document.getElementById('employment').value = employment;
   document.getElementById('evictions').value = evictions;
   document.getElementById('felonies').value = felonies;
   document.getElementById('authdate').value = authdate;
   document.getElementById('guestdate').value = guestdate;
   document.getElementById('rentdate').value = rentdate;
   document.getElementById('rentaladdress').value = rentaladdress;
   document.getElementById('rentalcitystzip').value = rentalcitystzip;
   document.getElementById('rtitle').value = rtitle;
   document.getElementById('csv').value="";
   document.getElementById('rowprint').value=row;
   document.getElementById('headername').value="";
}

function importJSON() {
   var rentapJSON = window.sessionStorage.getItem("rentapJSON");
   var rentap = JSON.parse(rentapJSON);
   var rentapfield = rentap[0];
   var row = window.sessionStorage.getItem("rentapCSVi");
   
   document.getElementById('rownumber').value = row;
   document.getElementById('fullname').value = rentapfield[0];
   document.getElementById('ssnumber').value = rentapfield[1];
   document.getElementById('birthdate').value = rentapfield[2];
   document.getElementById('maritalstatus').value = rentapfield[3];
   document.getElementById('email').value = rentapfield[4];
   document.getElementById('stateid').value = rentapfield[5];
   document.getElementById('phone1').value = rentapfield[6];
   document.getElementById('phone2').value = rentapfield[7];
   document.getElementById('currentaddress').value = rentapfield[8];
   document.getElementById('previousaddresses').value = rentapfield[9];
   document.getElementById('occupants').value = rentapfield[10];
   document.getElementById('pets').value = rentapfield[11];
   document.getElementById('income').value = rentapfield[12];
   document.getElementById('employment').value = rentapfield[13];
   document.getElementById('evictions').value = rentapfield[14];
   document.getElementById('felonies').value = rentapfield[15];
   document.getElementById('authdate').value = rentapfield[16];
   document.getElementById('guestdate').value = rentapfield[17];
   document.getElementById('rentdate').value = rentapfield[18];
   document.getElementById('rentaladdress').value = rentapfield[19];
   document.getElementById('rentalcitystzip').value = rentapfield[20];
   document.getElementById('rtitle').value = rentapfield[21];
   document.getElementById('rowprint').value=row;
   document.getElementById('headername').value="";
}


