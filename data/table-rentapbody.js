document.write('\
      <table id=rentapbody>\
         <tr>\
         <td>\
            <ul>\
               <li class="section_header">\
                  <strong>Personal Information</strong>\
               </li>\
               <li>\
                  <label for="fullname" class="personalinfo">Full Name</label>\
                  <input type="text" id="fullname" value="" />\
               </li>\
               <li>\
                  <label for="ssnumber" class="personalinfo">Social Security Number</label>\
                  <input type="text" id="ssnumber" value="" />\
               </li>\
               <li>\
                  <label for="birthdate" class="personalinfo"">Birth Date</label>\
                  <input type="text" id="birthdate" value="" />\
               </li>\
               <li>\
                  <label for="maritalstatus" class="personalinfo">Marital Status</label>\
                  <input type="text" id="maritalstatus" value="" />\
               </li>\
               <li>\
                  <label for="email" class="personalinfo">Email</label>\
                  <input type="text" id="email" value="" />\
               </li>\
               <li>\
                  <label for="stateid" class="personalinfo">State ID#</label>\
                  <input type="text" id="stateid" value="" />\
               </li>\
               <li>\
                  <label for="phone1" class="personalinfo">Phone 1</label>\
                  <input type="text" id="phone1" value="" />\
               </li>\
               <li>\
                  <label for="phone2" class="personalinfo">Phone 2</label>\
                  <input type="text" id="phone2" value="" />\
               </li>\
               <li>\
                  <label for="currentaddress" id="currentaddresslabel"><strong>Current Address, City, State, Zip, Dates, Rent, Landlord name and phone number </strong></label>...\
                  <textarea id="currentaddress" cols="31" rows="5" ></textarea>\
               </li>\
               <li>\
                  <label for="previousaddresses"><strong>Prior Addresses, Cities, States, Zips, Dates, Rents, Landlords </strong></label>...\
                  <textarea id="previousaddresses" cols="31" rows="11"></textarea>\
               </li>\
            </ul>\
         </td>\
         <td>\
            <ul >\
               <li>\
                  <label for="occupants"><strong>Proposed Occupants: self+age, other+age </strong></label>...\
                  <textarea id="occupants" cols="31" rows="5"></textarea>\
               </li>\
               <li>\
                  <label for="pets"><strong>Proposed Pets</strong></label>\
                  <textarea id="pets" cols="31" rows="4"></textarea>\
               </li>\
               <li>\
                  <label for="income"><strong>Income &amp Food Stamps</strong></label>\
                  <textarea id="income" cols="31" rows="8"></textarea>\
               </li>\
               <li>\
                  <label for="employment"><strong>Employment: address, job, dates, hours, supervisor name and phone number</strong></label>...\
                  <textarea id="employment" cols="31" rows="9"></textarea>\
               </li>\
            </ul>\
         </td>\
         <td>\
            <ul>\
               <li>\
                  <label for="evictions"><strong>Evictions Past 10 Years</strong></label>\
                  <textarea id="evictions" cols="31" rows="6"></textarea>\
               </li> \
               <li>\
                  <label for="felonies"><strong>Felonies/Drug Convictions</strong></label>\
                  <textarea id="felonies" cols="31" rows="6"></textarea>\
               </li>\
               <li>\
                  <label style="position: relative; top: 7px;"><strong>Applicant Authorization</strong></label>\
                  <div style="position: relative; top: 7px;">\
                     Applicant authorizes the landlord to\
                     contact past and present landlords,\
                     employers, and any other sources deemed \
                     necessary. All information is true, \
                     accurate, and complete to the best of \
                     applicant\'s knowledge. \
                     ANY PERSON IS AUTHORIZED TO RELEASE INFORMATION \
                     ABOUT THE UNDERSIGNED\
                  </div>\
                  <div style="position: relative; top: 36px;">\
                     Sign __________________ Date ________\
                  </div>\
                  <div style="position: relative; top: 70px;">\
                     Print ______________________________ \
                  </div>    \
               </li>\
            </ul>\
         </td>\
         <td id="controls">\
            <ul>\
               <li>\
                  <div id="savebutton" class="inline"></div>\
                  <div id="saveeditbutton" class="inline" style="padding-left:20px"></div>\
                  <a href="rentapfirst.html" style="font: 12px/14px sans-serif; padding-left:20px">New</a>\
               </li>\
               <li>\
                  <a href="http://rentap.comyr.com/rentap-translate.html" style="font: 12px/14px sans-serif; text-align:center">\
                     Print a Blank Application and Instructions by Example in another language.</a>\
               </li>\
               <li>\
                  <div style="padding:14px" />\
               </li>\
               <li>\
                  <div id="prevbutton" class="inline"></div>\
                  <input id="prevbutton" type="button" class="inlinebutton" onClick="javascript:prevButton();" value="Prev"/>\
                  <label for="rownumber" style="max-width:30px; min-width: 2px;">row</label>\
                  <input type="text" id="rownumber" class="inline" style="max-width: 30px;" title="Jump to row 0 to find printable instructions for applicants." value=""/>\
                  <input id="jumpbutton" type="button" class="inlinebutton" onClick="javascript:jumpButton();" value="Jump"/>\
                  <input id="nextbutton" type="button" class="inlinebutton" onClick="javascript:nextButton();" value="Next"/>\
                  <input type="text" id="findname" title="Hint: Use &quot; to search names only. For example, &quot;d, for names starting with D." value="" />\
                  <div id="searchbutton" class="inline" title="Click while empty to clear previous search and list all names."></div>\
                  <div id="listsearchmenu" class="inline"></div>\
               </li>\
               <li>\
                  <div style="padding:8px" />\
               </li>\
               <li>\
                  <strong>Printing</strong> Either ctrl-p or File->Print... Scale 89% or experiment. Set <em>Page Setup,\
                  Paper Orientation</em> to <strong>Landscape</strong>. Set <em>Options, headers and footers</em> to <strong>blank</strong> and don\'t ignore scaling.\
               </li>\
               <li>\
                  <div style="padding:8px" />\
               </li>\
               <li>\
                  <input id="generateCsvButton" type="button" class="inlinewidebutton" onClick="javascript:setCSVInsertText();" value="Generate CSV"/>\
                  <input id="importCsvButton" type="button" class="inlinewidebutton" onClick="javascript:importCSV();" value="Import CSV"/>\
                  <textarea id="csv" cols="24" rows="6"></textarea>\
                  <div id="copyCSVdataButton" class="inline"></div>\
                  <input id="clearCSVbutton" type="button" class="inlinewidebutton" onClick="javascript:clearCSV();" value="Clear CSV"/>\
               </li>\
               <li>\
                  <div style="padding:14px" />\
               </li>\
               <li>\
                  <input id="SQLbutton" type="button" class="button" class="inlinebutton" onClick="javascript:setSqlInsertText();" value="Generate SQL"/>\
                  <div id="copySQLtextButton" class="inline"></div>\
                  <textarea id="sqlinsert" cols="24" rows="6"></textarea>\
               </li>\
            </ul>\
         </td>\
      </tr>\
      </table>\
');

var searchSel = document.createElement("select");
var chooseName = document.createElement("option");
chooseName.text = "Choose Name";
searchSel.add(chooseName, null);
document.getElementById("listsearchmenu").appendChild(searchSel); //put the dropdown menu list on the page
