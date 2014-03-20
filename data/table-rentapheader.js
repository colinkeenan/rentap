document.write('\
      <table id=rentapheader>\
         <tr>\
            <td>\
               <img src="icon.png" width="40" height="32" /img>\
            </td>\
            <td>\
               <input type="text" id="rentaladdress" value="enter rental address"/>\
               <input type="text" id="rentalcitystzip" value="enter city, state, zip"/>\
            </td>\
            <td id=tdrtitle>\
               <input type="text" id="rtitle" value="enter title"/>\
            </td>\
            <td>\
               <label for="authdate" class="smalllabelinput">Applied</label>\
               <input type="text" id="authdate" value="" />\
               <div style="font: 12px/14px sans-serif; display:inline-block; position: relative; top: -10px;">\
               Row:</div> <input type="text" id="rowprint" value="" />\
            </td>\
            <td>\
               <label for="guestdate" class="smalllabelinput">Guest</label>\
               <textarea id="guestdate" cols="8" rows="2"></textarea>\
            </td>\
            <td>\
               <label for="rentdate" class="smalllabelinput">Rented</label>\
               <textarea id="rentdate" cols="8" rows="2"></textarea>\
            </td>\
            <td id="headercontrols">\
               <input type="text" id="headername" class="inline"/>\
               <div id="saverheaderbutton" class="inline" title="Save New Header"></div>\
               <div id="editheaderbutton" class="inline" title="Save Edited Header"></div>\
               <div id="delrheaderbutton" class="inline" title="Delete Header"></div>\
               <div id="listheadermenu" class="inline"></div>\
            </td>\
         </tr>\
      </table>\
');
