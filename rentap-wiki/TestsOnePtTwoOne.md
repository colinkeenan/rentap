# Introduction #

This wiki page should be used to accomplish any of the following tasks:
  1. Test if Rental Application (rentap 1.21 or later) is working correctly
  1. Walk through rentap's features to discover if they are useful to you
  1. Learn how to use rentap

To keep it quick for testing, new rental applications are entered quickly just by copying and pasting a few lines of text. Text to be copied and pasted will be in single quotes, for example 'copy this', but you shouldn't copy the single quotes.

Due to the unnaturally short applications being entered, it will be hard to remember to click **New** before entering another application, so bold text will be used to represent clicking that **New** link throughout. In real use, however, you will be looking for the New link every time to avoid having to replace all the information from the previous application; so, this problem of forgetting to click New that occurs during testing won't be a problem during actual use.

First, open rentap (Rental Application): you'll find the button in the toolbar at the top of the browser window. (If you don't see the button, make sure you have version 1.21 or later installed and are running Firfox 29 or later. If all else fails, you can still run Rental Application by creating a blank file named rentapstart.html -doesn't matter where you put it- and double-click, or right-click and run with firefox if that's not your default browser. If that brings up a blank page in Firefox 29 or later, then rentap failed the first test - it crashed on startup. Please let me know about it.)

In what follows, we'll be using the Full Name field to keep track of what we are about to do/did to see that it shows up in the expected spot in the _Choose Name_ list.

# The Tests #

**Headers**

Enter some headers as in TestsForHeaders.

After entering some headers, enter some applications and don't forget to click **New** just before entering each new application.

**_New/Save_**

_Always verify the mode shown above the title is 'new' when entering a new application_

  1. click **New** (can be skipped if haven't previously entered or navigated to any applications since opening rentap)
  1. Verify rentap is in _new_ mode by noticing the word _new_ in a grayed out field above the title (this field won't be printed)
  1. enter '1st' into Full Name
  1. enter some other stuff at random in other fields like marital status 'Single' or 'Married' or 'Separated' and perhaps some application dates like '2/16/2012' or '2/17/2012' or '2/18/2012' to easily distinguish the applications.
  1. choose an appropriate header or use whatever is already displayed
  1. click _Save_
  1. having saved the application and not moved onto another new one yet, the mode should be 'edit', so verify it is 'edit'

repeat using '2nd' and '3rd', _clicking **New** first_. Don't forget to click **New** after _Save_ each time you are entering a new application.

**_Choose Name_**
  1. Verify all 3 names are listed in the _Choose Name_ drop-down list. (If only the 3rd is in the list, you probably forgot to click **New** before entering each application.)
  1. But, if you can get to all 3 by other types of navigation, and still some are missing from the _Choose Name_ list, then this version of rentap failed the test.
  1. If they're in there, try going to each from the _Choose Name_ list to verify they were actually saved.

**Note that if you used _Search_ for some reason even though not being tested yet, not all the applications will show up in _Choose Name_. To get them back, clear the search box and click _Search_ or press _Enter_.**

**_Go_**
  1. Try jumping to any one of them by typing in either 1, 2, or 3 for the row or id and clicking _Go_. (If you get an error that applications at id or row greater than 1 don't exist, you probably forgot to click **New** before entering each application.)
  1. But, if all the applications are listed in _Choose Name_ or by other types of navigation and you can't jump to row/id 2 or 3, then this version of rentap failed the test.
  1. Also test jumping by pressing Enter after putting in a new row or id.
  1. Try jumping to row or id 0. If you jump to id or row 0 you'll see an Instructions page meant to be printed out and handed to an applicant as a guide to how to fill out a blank application. Verify the instructions page cannot be discarded (there should not be a Discard button visible on the page).

**_Go_ Error**
  1. Try jumping to a row/id that doesn't exist or enter something other than a number - you should see an alert popup window explaining the error.
  1. Verify the explanation makes sense (i.e. verify the error is about the row or id you were looking for and not about something else, like the current row/id)
  1. Dismiss the error, and verify you don't see any more popups and are still on the same application as before.
  1. Also test for an uncommon but valid jump: jump to the same row or id currently on, and verify nothing happens.

**_Prev/Next_** Try cycling through them forwards and backwards using _Prev_ and _Next_ buttons.

**Printing**
  1. Print with either ctrl-p or Main-Menu (hamburger menu)->Print...
  1. Set the Paper Orientation to Landscape
  1. Set the scale to 100%, Shrink To Fit, or experiment to get it on 1 page
  1. Set the headers and footers all to blank or whatever you want in the Options tab.

Try printing the instructions page at row 0. _**Note that the text-area box sizes can be adjusted before printing by dragging the bottom right corner of the box.**_ So, if the instruction page doesn't show everything, try adjusting the text area boxes. Also try clicking New and printing a blank application.

Verify the printed application fits on 1 page and looks the same as it did on the screen other than not having anything from the right side of the screen where all the buttons are.

**Printing without borders**
Just click _Toggle Borders_ to remove borders from text boxes and inputs, both on the screen and when printed. Click again to put them back. _**Removing borders can also give a little extra room to get all the text on the page when combined with adjusting the text-area box sizes.**_

**Editing**
  1. click _Choose Name_, then click 2nd
  1. change Full Name to 'Saved Edit 2nd'
  1. click _Save_

Verify the 2nd entry in _Choose Name_ has changed to 'Saved Edit 2nd'. Try going to another application and back to verify edit was actually saved.

  1. Choose another header than whatever is currently displayed.
  1. Click _Save_

Go to another application and back to verify the new header was saved on this application.

**_Import CSV_**

  1. copy the CSV data at <a href='http://code.google.com/p/rentap/wiki/CSVforTest'>CSVforTest</a> and click back on your browser to get back to these instructions.
  1. click **New**
  1. paste into the CSV box
  1. click _Import CSV_
  1. click _Save_

Look through the application and verify everything seems to be in the right place. Verify Mark Test shows up in the last position of _Choose Name_.

**_Generate CSV_ and _Copy CSV_**

  1. copy something else to clear the CSV data off your system clipboard
  1. click Generate CSV
  1. click Copy CSV
  1. click **New**
  1. paste the CSV back into the CSV box
  1. click Import CSV and verify this new application is looking like the previous one generated from this CSV data
  1. make some changes so we'll have another application in the database to test _Search_ on
  1. change Full Name to 'Master Tester'
  1. change Marital Status to 'Married'
  1. delete the contents of Guest and Rented
  1. that should be enough to distinguish this application from the previous one, so click _Save_

Before moving on to _Search_, verify _Choose Name_ has the following 5 entries:
```
1st
Saved Edit 2nd
3rd
Mark Test
Master Tester
```
If it doesn't, either you weren't following all the testing steps to get to this point or the version of rentap you are using didn't pass all the tests.

**_Search_**

  1. enter 'Single' into the search box
  1. click _Search_ (also verify it works by pressing Enter instead)

Verify that the applicant now displayed is Single and that all the single applicants are listed in _Choose Name_

**Searching on the first letter of the first name**

  1. enter '"m' into the search box (copy the double quote but not the single quotes, _"m_)
  1. click _Search_ (also verify it works by pressing Enter instead)

Verify that the first letter of the full name of the applicant now displayed starts with the letter 'M'. Verify all the 'M' named applicants are listed in _Choose Name_

**Display all applicants in _Choose Name_**

  1. click _Search_ (or press Enter in the search box) while the search box is empty, or click **New**

Verify all the applications show up in _Choose Name_

**Finding all the previous tenants**

  1. enter 'prevTen' into the search box
  1. click _Search_ (or press Enter)

The original CSV data tenant, Mark Test, had the text 'prevTen' entered into the Rented field. Verify that application is displayed and is the only one listed in _Choose Name_.

(I like entering 'prevTen' into the Rented field for all previous tenants, but you are free to enter whatever works for you; for example, you could enter 'done-renting' and it doesn't have to be in the Rented field. The search checks all fields and so will find all applications with the text 'done-renting' no matter where you entered it.)

**Connecting Applicants**

Let's pretend Mark Test and Master Tester had both applied together, each filling out an application and listing both of them as Proposed Occupants

  1. on the Mark Test application, change Proposed Occupants to
```
                 Mark Test, 45
                 Master Tester, 45
                 link4
```
  1. Click _Save_
  1. do the same on the Master Tester application
  1. enter 'link4' into the search box
  1. click _Search_

Verify the Mark and Master applications are the only ones found in _Choose Name_.

(I chose to connect them by entering 'link4' on both applications. I chose the number 6 because that's the row number of the first application that I wanted connected. By consistently connecting applications this way, since the row numbers are unique, I am guaranteed to never re-use a link# on applications that are not supposed to be connected.)

**Duplicate an Application**

  1. Choose 1st from _Choose Name_ (If only the link4 applications are listed, empty the search input and press Enter or click _Search_)
  1. Click _Generate CSV_
  1. Click _Copy CSV_
  1. Click **New**
  1. paste the copied CSV back into the CSV text area
  1. Click _Import CSV_
  1. change Full Name to 'Copy of 1st'
  1. Click _Save_

Verify there's a new entry at the end of the _Choose Name_ list that says 'Copy of 1st' and that none of the other entries have changed in any way. There should now be 6 entries (not counting row 0). Try going through the various applications to be sure all has been saved. This new application in the 6th position should look the same as the 1st other than the Full Name.

**Replace existing application with a New, unrelated one**

  1. click **New**
  1. into Full Name, enter 'Replaced 3rd'. (**Don't click Save**) Make sure you had clicked **New** before entering the new Full Name - the application should be empty now except the full name. If it's not, click **New** now and enter the full name again.
  1. click _Generate CSV_
  1. click _Copy CSV_
  1. in _Choose Name_, choose 3rd
  1. click OK to dismiss verify-dialogue
  1. paste copied CSV into the CSV text area
  1. click _Import CSV_
  1. click _Save_

Verify there's the same number of entries as before (6), but that the 3rd one has been changed to 'Replaced 3rd'

Go to another application and back to verify the application was saved, and that it's empty except for Full Name because this new application replaced the old 3rd one.

**Accidentally try to navigate away from a page without saving changes**

  1. choose 1st entry
  1. change Full Name to 'Edited 1st'
  1. click _Next_, read question, click _Cancel_
  1. Verify your changes are still there
  1. click _Save_

Verify 'Edited 1st' shows up in the 1st position. Go to another application and back to verify it was actually saved.

_Important_: Although rentap will verify you really wanted to leave the unsaved page when you click one of the navigation buttons or **New** on the page, **rentap currently does not check for unsaved edits when you close the tab or enter a new URL.**

**Intentionally navigate away from a page, discarding changes**

  1. choose 2nd entry
  1. change Full Name to 'don't really want to edit 2nd'
  1. click _Next_, read question, click _OK_
  1. Verify it went to the next application
  1. click _Prev_
  1. Verify your edits were not saved

**_Discard_**

Discard all the sparsely filled applications.

Somebody never finished their application or it's worthless? Click _Discard_. It's just like dragging a file to a trash can icon - it's still there, but out of the way.

  1. Navigate through all the applications using _Next_ or whatever you prefer
  1. On each sparse application, click _Discard_ (notice after the first discard, the _Trash_ button appears)
  1. Verify only those 2 fully filled in applications are left, and that although on different rows, they still have the same id's as before.

**_Trash_**

Just like the familiar trash icon used in most computer file browsers, clicking _Trash_ takes you to all the discarded applications.

  1. Cycle through them and notice all the discarded applications are there.

How you can tell you're viewing items in the Trash:
  1. Notice the mode shown above the Title says "discarded" instead of "edit" or "new"
  1. Notice you cannot edit applications that are in the trash - they are grayed out
  1. Notice that instead of a Trash button, there's a Back button

**_Back_**
  1. Verify this button takes you back to the application you were viewing before clicking _Trash_ (sometimes it will not be able to return to that page - then it will show the instructions page)

**_Restore_**
  1. Click _Trash_ again
  1. Verify you are viewing a discarded application
  1. Verify navigation (other than jumping to a random id or clicking buttons designed to take you out of trash) stays in the Trash
  1. click _Restore_
  1. Verify you're out of Trash: the mode is back to "edit" and you can edit the application
  1. Verify navigation (other than jumping by id) stays in editable applications
  1. Verify the application was restored to the correct order according to id; so that, the application before it has a lower id and the application after it has a higher id

**_Del_**
There's no reason to keep the Trash cluttered with sparse or worthless applications that will never be approved, so why not delete them?

  1. If not already in the Trash, click _Trash_
  1. take notice of the current id
  1. Click _Del_
  1. Answer the question OK you do want to do this
  1. Check all the navigation and verify that id is not included anymore
  1. Jump to that id and verify you are told it was deleted from Trash
  1. (In version 1.22 or later, if you deleted the highest numbered ID, instead of being told it was deleted from Trash, you will be told there is no application with that ID because the ID is made available again for the next New application.)
  1. Click _Back_ to get out of Trash
  1. Jump to that id again and verify again that it was deleted from Trash

_Del_ is permanent, you cannot get the information back. Repeat the above, but answer Cancel when it asks if you really want to do this. Verify it was not deleted.

**CSV and SQL**

Originally, I planned to store the applications in an SQLite database named rentap.sqlite which could be placed wherever you wanted and accessed from any SQLite capable application, such as SQLite Manager available as an add-on to Firefox. I haven't figured out how to interact directly with SQLite databases from my add-on yet. However, I've included some boxes and buttons to help in storing applications in a file called rentap.sqlite. I recommend installing the SQLite Manager add-on and setting it to open in a tab instead of a separate window.

  1. Firefox 29 uses the 3-horizontal-line "hamburger menu" similar to what Google Chrome uses. Click the hamburger menu (upper right corner of the Firefox window).
  1. Click Add-ons (looks like a jigsaw-puzzle piece)
  1. Search for SQLite Manager in the Search all add-ons input box
  1. Install and restart Firefox (SQLite Manager add-on doesn't use the new Firefox SDK probably because the new SDK doesn't offer enough features yet, and so won't install until Firefox is restarted)
  1. This add-on can't be found on any menu in Firefox 29
  1. Put SQLite Manager onto the toolbar by right-clicking the toolbar and choosing Customize, and then drag the SQLite Manager icon onto the toolbar
  1. You can set it to open from a tab in SQLite Manager preferences, which can be found from hamburger menu->Add-ons

With SQLite Manager open in one tab, and rentap open in the next tab, you can easily move information between the two.

Create rentap.sqlite with a single table named rentap:
  1. Open SQLite Manager in Firefox
  1. Click the icon that looks like a blank page (3rd icon from the left) to create a new database and name it rentap
  1. Click Execute SQL tab of SQLite Manager
  1. Copy and paste the following SQL statement into Execute SQL tab of SQLite Manager:
```
CREATE TABLE rentap (fullname text primary key, ssnumber text, birthdate text, maritalstatus text, email text, stateid text, phone1 text, phone2 text, currentaddress text, previousaddresses text, occupants text, pets text, income text, employment text, evictions text, felonies text, authdate text, guestdate text,rentdate text,rentaladdress text,rentalcitystzip text,rtitle text)
```
  1. Click Run SQL

With rentap.sqlite created and open in SQLite Manager, you can add applications to it by clicking Generate SQL and Copy SQL in rentap, then pasting that into Execute SQL tab of SQLite Manger.

  1. Open SQLite Manager in one tab of Firefox and Rentap in the next tab
  1. Navigate to the first application in Rentap
  1. Click _Generate SQL_
  1. Click _Copy SQL_
  1. Paste into the Execute SQL tab of SQLite Manager
  1. Click Run SQL

To get CSV data from SQLite Manager:

  1. Click on the Execute SQL tab
  1. Enter something like:
```
SELECT * FROM rentap where fullname like 'Tester%' 
```
  1. Click Run SQL.
  1. Keep modifying your SQL until you have just one row as a result
  1. Click Actions->View CSV (the Actions button is next to Run SQL)
  1. Copy the line of CSV
  1. Goto Rentap tab in Firefox
  1. Click **New**
  1. Paste into Rentap's CSV text area
  1. Click Import CSV
  1. Click _Save_
  1. Compare this new copy of Tester with the original and verify they are the same

Version 1.22 features:

**Navigating History with Firefox's Go-Back & Rentap's Go-Forward buttons**

Previous to version 1.22, clicking the web browser's go-back button always took you out of rentap or possibly to the new application page. Now the web browser's go-back button does what you would expect in some situations, but not all. It will only take you through the history of applications that were navigated to by Next/Prev, Go, Search, or Choose Name. It will not go through newly entered applications that weren't navigated to by the previously mentioned buttons. Nor will it take you back properly out of Trash - better to use the Back button in Trash for that.

  1. Navigate through some applications using all the following buttons: Next/Prev, Go, Search, and Choose Name.
  1. Click the Firefox's go-back button located just left of the URL.
  1. Keep clicking and observe it going back through the history of applications you had navigated to.
  1. Notice, however, that the go-forward button never gets displayed. I don't know why that is

Since I can't get the forward history to work from the browser, I've added a go-forward button just under Firefox's go-back button.

  1. After using Firefox's go-back button a few times above, click the new go-forward button shown as an arrow facing right in a rectangle.
  1. Keep clicking go-forward and notice it moving forward through all the applications you had gone back through, finally stopping on the original application.

**Deleting the last ID**

New with version 1.22, it's now possible to completely delete an application, including it's ID, but only if it was the highest numbered ID used so far. Automatically, when deleting the application with the highest numbered ID, the ID itself gets deleted. This is allowed because it doesn't change any other ID's.

  1. Click **New**
  1. Click _Save_ (or enter some info first if you want)
  1. Click _Discard_
  1. Click _Trash_
  1. Navigate to the highest ID which is the one you just discarded
  1. Click _Del_
  1. Enter the ID of the one you just deleted into the id box next to Go and press _Enter_
  1. Verify it says there is no application with that ID, rather than telling you that ID had been deleted from Trash. This means this ID is now available for the next New application.

**Bug in 1.21**

Although version 1.21 passed all the tests above, it still had an obvious bug that most users would eventually come across. If the first thing you did after starting Rentap was to use _Choose Name_ to navigate to a saved application, the next navigation you tried would ask if you really wanted to leave the page with unsaved changes, even though you didn't edit the application. This bug is fixed in version 1.22, but here is another test that should be done on all future versions:

  1. Having already saved some applications, restart Firefox
  1. Start Rentap
  1. Click _??????_ twice
  1. Verify that nothing surprising occurs

Repeat the above steps using all the navigation buttons: Prev/Next, Go, Search, and Choose Name.