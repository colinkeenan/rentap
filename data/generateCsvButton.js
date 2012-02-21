var butt = document.createElement("button");             //define button element
var btext = document.createTextNode("Generate CSV");     //define the text
butt.appendChild(btext);                                 //attach text to the button

butt.addEventListener("click", 
   function() {                                          //handle onclick event
         
      var rentap = [
         [document.getElementById('fullname').value,  //0
         document.getElementById('ssnumber').value,   //1
         document.getElementById('birthdate').value,  //2
         document.getElementById('maritalstatus').value, //3
         document.getElementById('email').value,      //4
         document.getElementById('stateid').value,    //5
         document.getElementById('phone1').value,     //6
         document.getElementById('phone2').value,     //7
         document.getElementById('currentaddress').value,   //8
         document.getElementById('previousaddresses').value,   //9
         document.getElementById('occupants').value,  //10
         document.getElementById('pets').value,       //11
         document.getElementById('income').value,     //12
         document.getElementById('employment').value, //13
         document.getElementById('evictions').value,  //14
         document.getElementById('felonies').value,   //15
         document.getElementById('authdate').value,   //16
         document.getElementById('guestdate').value, //17 
         document.getElementById('rentdate').value,  //18
         document.getElementById('rentaladdress').value, //19
         document.getElementById('rentalcitystzip').value,  //20
         document.getElementById('rtitle').value]     //21
      ]
   
      window.sessionStorage.setItem("rentapJSON", JSON.stringify(rentap));  //store the data in sessionStorage to be displayed on the form when refreshed
     
      self.postMessage(rentap);  //send data to worker to convert it to CSV

      self.on("message", function(rentapCSV) {   // gets CSV back from worker
            window.sessionStorage.setItem('rentapCSV',rentapCSV); //worker will refresh the page and rentapCSV will be displayed in the appropriate box
      });
   },
false);
document.getElementById("generateCsvButton").appendChild(butt); //put the button on the page

