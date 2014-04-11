var butt = document.createElement("button");     //define button element
var btext = document.createTextNode("->0");      //define the text
butt.appendChild(btext);                         //attach text to the button

butt.addEventListener("click", 
   function() {                                          //handle onclick event
      
      var rentap = [
         document.getElementById('fullname').value,  //0
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
         document.getElementById('rtitle').value     //21
      ]
   
      var address = document.getElementById('rentaladdress').value;
      var citystatezip = document.getElementById('rentalcitystzip').value;
      var title = document.getElementById('rtitle').value;
      var headername = document.getElementById('headername').value;
      var rheader = [address,citystatezip,title,headername]
      var RHEADER = JSON.parse(window.sessionStorage.getItem("rentapRHEADERJSON"));
      RHEADER[0] = rheader;
      window.sessionStorage.setItem("rentapRHEADERJSON",JSON.stringify(RHEADER));
      window.sessionStorage.setItem("rentapRHEADERi", 0); 
      self.postMessage(rheader); //send header to worker to be saved in simple-storage
   },
false);
document.getElementById("defaultheaderbutton").appendChild(butt); //put the button on the page

