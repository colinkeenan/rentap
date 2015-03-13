# Tests for Headers #

**Testing the _+_ button to add 3 quick headers:**
  1. Highlight 'enter rental address'
  1. enter 'a'
  1. tab to highlight next field
  1. enter 'a'
  1. tab twice to highlight next field
  1. enter 'a'
  1. highlight 'enter header name'
  1. enter 'a'
  1. click _+_ button

do the same entering 'b' and 'c' everywhere

Verify all 3 headers are listed in the _Choose Header_ drop-down menu and that choosing any of them displays the correct header information.

**Testing the _~_ button to edit a header:**
  1. Choose Header 'b'
  1. make changes to the header and enter 'b edited' in the header name box.
  1. click _~_ button

Go through the headers and verify the changes to the 2nd header were saved.

**Testing the _-_ button to delete a header:**
  1. Choose Header 'a'
  1. click _-_ button

Verify there are only headers 'b edited' and 'c' now.

**Testing the _->0_ button to set a default header:**
  1. Choose Header 'b'
  1. click _->0_ button
  1. restart Firefox
  1. start rentap (click icon in toolbar at top of Firefox)
  1. verify Header 'b' is displayed

continue with <a href='http://code.google.com/p/rentap/wiki/TestsOnePtTwoOne'>Tests OnePtTwoOne</a>