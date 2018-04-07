**Import CSV**

  1. copy the CSV data at <a href='http://code.google.com/p/rentap/wiki/CSVforTest'>CSVforTest</a> and click back on your browser to get back to these instructions.
  1. click **New**
  1. paste into the CSV box
  1. click _Import CSV_
  1. click _Save New_

Look through the application and verify everything seems to be in the right place. Verify Mark Test shows up in the last position of _Choose Name_.

**Generate CSV and Copy CSV**

  1. copy something else to clear the CSV data off your clipboard
  1. click Generate CSV
  1. click Copy CSV
  1. click **New**
  1. paste the CSV back into the CSV box
  1. click Import CSV and verify this new application is looking like the previous one generated from this CSV data
  1. make some changes so we'll have another application in the database to test _Search_ on
  1. change Full Name to 'Master Tester'
  1. change Marital Status to 'Married'
  1. delete the contents of Guested and Rented
  1. that should be enough to distinguish this application from the previous one, so click _Save New_

Before moving on to _Search_, verify _Choose Name_ has the following 7 entries:
```
Choose 1st, Save New, Save Edit
Choose 2nd, Save Edit
Choose 3rd, New, Save Edit, Save Edit
Choose 1st, Save New, Save New
Choose 2nd, New, Save Edit, Save New
Mark Test
Master Tester
```
If it doesn't, either you weren't following all the testing steps to get to this point or the version of rentap you are using didn't pass all the tests.

**Search**

  1. enter 'Single' into the search box
  1. click _Search_

Verify that the applicant now displayed is Single and that all the single applicants are listed in _Choose Name_

**Searching on the first letter of the first name**

  1. enter '"m' into the search box (copy the double quote but not the single quotes, _"m_)
  1. click _Search_

Verify that the first letter of the full name of the applicant now displayed starts with the letter 'M'. Verify all the 'M' named applicants are listed in _Choose Name_

**Display all applicants in _Choose Name_**

  1. click _Search_ while the search box is empty, or click **New**

Verify all the applications show up in _Choose Name_

**Finding all the previous tenants**

  1. enter 'prevTen' into the search box
  1. click _Search_

The original CSV data tenant, Mark Test, had the text 'prevTen' entered into the Rented field. Verify that application is displayed and is the only one listed in _Choose Name_.

(I like entering 'prevTen' into the Rented field for all previous tenants, but you are free to enter whatever works for you; for example, you could enter 'done-renting' and it doesn't have to be in the Rented field. The search checks all fields and so will find all applications with the text 'done-renting' no matter where you entered it.)

**Connecting Applicants**

Let's pretend Mark Test and Master Tester had both applied together, each filling out an application and listing both of them as Proposed Occupants

  1. on the Mark Test application, change Proposed Occupants to
```
                 Mark Test, 45
                 Master Tester, 45
                 link6
```
  1. do the same on the Master Tester application
  1. enter 'link6' into the search box
  1. click _Search_

Verify the Mark and Master applications are the only ones found in _Choose Name_.

(I chose to connect them by entering 'link6' on both applications. I chose the number 6 because that's the row number of the first application that I wanted connected. By consistently connecting applications this way, since the row numbers are unique, I am guaranteed to never re-use a link# on applications that are not supposed to be connected.)