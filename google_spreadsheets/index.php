<?php

// As of 2/28/12, this works!
 
// Zend library include path
set_include_path(get_include_path() . PATH_SEPARATOR . "$_SERVER[DOCUMENT_ROOT]/ZendGdata-1.11.11/library");
 
include_once("farinspace/Google_Spreadsheet.php");
 
$u = "charlesh88@gmail.com";
$p = "h3l1um3!";
 
$ss = new Google_Spreadsheet($u,$p);
$ss->useSpreadsheet("Data capture test");
 
// if not setting worksheet, "Sheet1" is assumed
// $ss->useWorksheet("worksheetName");
 
$row = array
(
    "name" => "John Doe"
    , "email" => "john@example.com"
    , "comments" => "Hello world"
);
 
if ($ss->addRow($row)) echo "Form data successfully stored using Google Spreadsheet";
else echo "Error, unable to store spreadsheet data";
 
?>