var butt = document.createElement("button");       //define button element
var btext = document.createTextNode("Copy CSV");   //define the text
butt.appendChild(btext);                           //attach text to the button

butt.addEventListener("click",                     //handle onclick event
   function(){   
      var CSV = document.getElementById('csv').value
      window.sessionStorage.setItem("rentapCSV",CSV);
      self.postMessage(CSV);
   },
false);

document.getElementById("copyCSVdataButton").appendChild(butt); //put the button on the page
