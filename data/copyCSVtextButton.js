var butt = document.createElement("button");       //define button element
var btext = document.createTextNode("Copy CSV");   //define the text
butt.appendChild(btext);                           //attach text to the button

butt.addEventListener("click",                     //handle onclick event
   function(){   
      self.postMessage(document.getElementById('csv').value);
   },
false);

document.getElementById("copyCSVdataButton").appendChild(butt); //put the button on the page
