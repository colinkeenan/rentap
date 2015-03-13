# Introduction #

This series of pages was developed as a way to test new versions of rentap, but can also be used as a tutorial.

To keep it quick for testing, new rental applications are entered quickly just by copying and pasting a few lines of text. Text to be copied and pasted will be in single quotes, for example 'copy this', but you shouldn't copy the single quotes.

Due to the unnaturally short applications being entered, it will be hard to remember to click **New** before entering another application, so bold text will be used to represent clicking that **New** link throughout. In real use, however, you will be looking for the New link every time to avoid having to replace all the information from the previous application; so, this problem of forgetting to click New that occurs during testing won't be such a problem during actual use.

First, open rentap (Rental Application): you'll find it in the Firefox Tools menu just before Page Info after Web Developer. Enter some headers as in TestsForHeaders.
(If you don't see Rental Application in the Tools menu, click on Add-ons in the Tools menu and check for updates and install updates. If you still don't see Rental Application in the Tools Menu, remove Rental Application and re-install it. If all else fails, you can still run Rental Application by creating a blank file named rentapstart.html -doesn't matter where you put it- and double-click.)

In what follows, we'll be using the Full Name field to keep track of what we are about to do/did to see that it shows up in the expected spot in the _Choose Name_ list.


# The Tests #

**Basic use**

  1. click **New** (can be skipped if haven't previously entered or navigated to any applications since opening rentap)
  1. enter '1st' into Full Name
  1. enter some other stuff at random in other fields like marital status 'Single' or 'Married' or 'Separated' and perhaps some application dates like '2/16/2012' or '2/17/2012' or '2/18/2012' to easily distinguish the applications.
  1. choose an appropriate header or use whatever is already displayed
  1. click _Save New_

repeat using '2nd' and '3rd' as Full Name and different information in the other fields. Don't forget to click **New** after _Save New_ each time you are entering a new application.

Verify all 3 names are listed in the _Choose Name_ drop-down list. Try going to each from the _Choose Name_ list to verify they were actually saved.

Try jumping to any one of them by typing in either 1, 2, or 3 for the row and clicking Jump.

Try cycling through them forwards and backwards using Prev and Next buttons. If you go past the beginning or end, you'll see the row 0 application which is an Instructions page meant to be printed out and handed to an applicant as a guide to how to fill out a blank application.

**Printing**
  1. As with any web page, print with either ctrl-p or File->Print...
  1. Set the scale to 100%
  1. in the Page Setup tab set the Paper Orientation to Landscape
  1. set the headers and footers all to blank in the Options tab. Headers and footers print information about the page you are printing beyond what you see on the screen, and aren't useful in this situation.

Try printing the instructions page at row 0. Also try clicking New and printing a blank application. To get the desired results, print in landscape mode at 100% with headers and footers turned off.

Verify the printed application fits on 1 page and looks the same as it did on the screen other than not having anything from the right side of the screen where all the buttons are.

**Editing**
  1. click _Choose Name_, then click 2nd
  1. change Full Name to 'Choose 2nd, Save Edit'
  1. click _Save Edit_

Verify the 2nd entry in _Choose Name_ has changed to 'Choose 2nd, Save Edit'. Try going to another application and back to verify edit was actually saved.

  1. Choose another header than whatever is currently displayed.
  1. Click _Save Edit_

Go to another application and back to verify the new header was saved on this application.

**Create New application starting from existing one**

  1. in _Choose Name_, choose 1st
  1. change Full Name to 'Choose 1st, Save New, Save New'
  1. click _Save New_, read warning, verify it makes sense, and click OK
  1. click _Save New again_, you should not see the warning again.

Verify there's a new entry at the end of the _Choose Name_ list that says 'Choose 1st, Save New, Save New' and that none of the other entries have changed in any way. There should now be 4 entries, not counting row 0. Try going through the various applications to be sure all has been saved. This new application in the 4th position should look the same as the 1st other than the Full Name.

**Replace existing application with a New, unrelated one**

  1. in _Choose Name_, choose 3rd
  1. click **New** (the application should be empty now, but the header will be the same)
  1. into Full Name, enter 'Choose 3rd, New, Save Edit, Save Edit'. Make sure you had clicked **New** before entering the new Full Name - the application should be empty now except the full name. If it's not, click **New** now and enter the full name again.
  1. click _Save Edit_, read warning, verify it makes sense, and click OK.
  1. click _Save Edit_ again, you should not see the warning again.

Verify there's the same number of entries as before (4), but that the 3rd one has been changed to 'Choose 3rd, New, Save Edit, Save Edit'

Go to another application and back to verify the application was saved, and that it's empty except for Full Name because this new application replaced the old 3rd one.

**Accidentally click the wrong Save button then correct mistake**

  1. choose 1st entry
  1. change Full Name to 'Choose 1st, Save New, Save Edit'
  1. click Save New, read warning, verify it makes sense, and click OK
  1. click Save Edit, you should not see any warning.

Verify 'Choose 1st, Save New, Save Edit' shows up in the 1st position. Go to another application and back to verify it was actually saved.

  1. choose 2nd  entry
  1. click **New** and MAKE SURE YOU CLICKED **New**
  1. into the empty Full Name field, enter 'Choose 2nd, New, Save Edit, Save New'
  1. click Save Edit, read warning, verify it makes sense, and click OK.
  1. click Save New, you should not see any warning.

Verify 'Choose 2nd, New, Save Edit, Save New' is in the last (5th) position. Go to another application and back to verify it was saved, and that it is empty other than the Full Name field because this is a new application and that's all you entered.

MoreTests