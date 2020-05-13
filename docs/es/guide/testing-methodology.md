# Testing methodology

This section of the magma guide discusses the most common methodology used to
detect whether access to websites is being blocked in a specific region or
country.

## Blocking of websites

To determine whether websites are being blocked, researchers and Internet
freedom activists prepare “test-lists” (machine-readable CSV files that include
URLs). Test-lists are not randomly compiled website URLs. Rather, they are a
compilation of websites tailored to a specific country’s social/political
context. Often these websites are selected because of their likelihood of being
censored or blocked in a given region/country.

Once prepared, these test-lists are then run through software to conduct network
measurements. The software “tests” whether access to these websites is being
restricted or blocked, and if so, how it is occurring. Important data such as
network errors, DNS settings, DNS entries, HTTP codes, and HTTP headers may be
collected to assist in determining the specific blocking method that is being
used. Further information about this type of testing methodology can be found
here: [ONI Methodology, Tools, and Data FAQ](https://opennet.net/oni-faq).

Some of the most commonly used test-lists can be found on
[Citizen Lab](https://github.com/citizenlab).

### Citizen Lab test-lists

Citizen Lab's URL testing lists are a compilation of test-lists divided by
country code. These local lists are designed specifically for each country by
regional experts. Their content represents a wide range of categories at the
local and regional levels, and is often in local languages. In countries where
Internet censorship has been reported, these lists also include many of the
websites that have allegedly been blocked. In addition to these local lists, a
global list also exists made up of a wide range of internationally relevant and
popular websites, including sites with content that is perceived to be
provocative or objectionable. Most of the websites on the global list are in
English. Go to
[Citizen Lab test-lists repository](https://github.com/citizenlab/test-lists)
for a descriptive tree view list of the various available test-lists.

```
.
├── README.md                               Information about the test-lists repository
├── lists                                   The test-lists directory one file per country code
│   ├── <cc>.csv                            Country Code (cc) specific test-list files
│   ├── global.csv                          Global test-list specific file
│   ├── 00-LEGEND-category_codes.csv        Old category codes legend of the test-lists
│   ├── 00-LEGEND-country_codes.csv         Country codes legend of the test-lists
│   ├── 00-LEGEND-new_category_codes.csv    Current category codes legend of the test-lists
├── output                                  Directory used by scripts
└── scripts                                 Various scripts and tools
```

#### Updating an existing test-list for a given country

In general, to learn more about the test-list methodology and how to contribute
URLs for testing, see the excellent guide:
[OONI - The test list methodology](https://ooni.torproject.org/get-involved/contribute-test-lists/).
The website provides a fairly extensive overview of the various methodologies
and processes.

To add URL(s) to a specific country's test-list, follow this step-by-step
process:

1. Find the country code for the country whose test-list you are interested in
   updating.

Note that all test-lists are located in the following
[directory](https://github.com/citizenlab/test-lists/tree/master/lists). Every
country code CSV file corresponds to a specific country's existing test-list.
Review the country code legend
[file](https://github.com/citizenlab/test-lists/blob/master/lists/00-LEGEND-country_codes.csv)
if you are not sure which country code corresponds with your country of
interest.

2. Once you have located your country's test-list, download it by clicking the
   `Raw` button.

3. Open the file downloaded (filename `XX.csv`) with your favorite spreadsheet
   tool (for instance
   [LibreOffice Calc](https://www.libreoffice.org/discover/calc/) and use as
   separator options `Separated by Comma`).

4. You should now be able to see the test-list for your selected country. Make
   new additions at the end of the spreadsheet file by adding entries to the
   required fields below. Please make sure to verify the URLs you are submitting
   have not already been listed (to do this, use the Find option or the keyboard
   shortcut `Ctrl + F`). Every new entry should contain the following six fields
   (note only the first four are required):

- `url`: (Required) the URL you would like to submit to the test-list.
- `category_code`: (Required) the category of content the URL entry should fall
  under.
  ([see all category codes](https://github.com/citizenlab/test-lists/blob/master/lists/00-LEGEND-new_category_codes.csv))
- `category_description`: (Required) the description of the selected category.
  ([see all category descriptions](https://github.com/citizenlab/test-lists/blob/master/lists/00-LEGEND-new_category_codes.csv))
- `date_added`: (Required) the date you submitted each entry (usually today).
- `source`: (Optional) the source of the entry (this can be a name or
  anonymous).
- `notes`: (Optional) any additional comments you would like to use to describe
  the entry.

5. Once you have implemented your changes, save the file with the same file name
   as CSV file format (`.csv`). Note: your changes have not yet been submitted.

6. Open the same test-list URL as in step 2 above, and click on the edit this
   file button (then pencil button). You will be required to log in to submit
   changes. You may use your pre-existing credentials, create a new GitHub user
   account, or use the multi-user account `test-list-user` with password
   `usertosubmittestlists`.

7. Remove all visible lines and drag-drop your file to the `Edit file` section.
   You should only be able to see the contents of your file. Verify your changes
   by checking the `Preview changes` tab.

8. View your proposed changes and add a short description of your work in
   `Propose file change`. When you are ready, press the `Propose file change`
   button to submit your change.

9. Congratulations! You have just submitted a pull request with your proposed
   changes to the test-lists repository. Now simply hold tight until your pull
   request gets reviewed and implemented.

##### Open and save CSV files

When preparing and adding to these test-lists, it will also be important for you
to know how to open and save CSV files. Note that you can open (import) CSV
files of test-lists with a spreadsheet application such as LibreOffice. Detailed
documentation on how to open and save CSV files in LibreOffice can be found in:
[LibreOffice Help - Opening and Saving Text CSV Files](https://help.libreoffice.org/6.3/en-US/text/scalc/guide/csv_files.html)

#### Further resources

- [Guideline for Test Lists Researchers by Netalitica](http://netalitica.com/download-guideline/)
  - This document will introduce you to the test lists and provide instructions
    on how to update them with fresh URLs, clean the lists from problematic
    entries, improve their balance and offer tips for conducting the research
    safely.
    - [Presentation slides](http://netalitica.com/test-lists-for-measuring-internet-censorship-netalitica/)
    - [Sample CSV Spreadsheet for Updating Test Lists](http://netalitica.com/sample-csv-spreadsheet-for-updating-test-lists/)
