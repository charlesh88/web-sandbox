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

$email = $_POST['email'];
$campaign = (isset($_POST['campaign']))? $_POST['campaign']:"";
$extradata = (isset($_POST['extradata']))? $_POST['extradata']:"";
$dateadded = getdate();
$strDate = $dateadded["mon"]."/".$dateadded["mday"]."/".$dateadded["year"]." ".$dateadded["hours"].":".$dateadded["minutes"].":".$dateadded["seconds"];
$ip = gethostbyname($_SERVER['REMOTE_ADDR']);

if (strlen($email) > 0)
{
	$row = array
	(
		"email" => $email
		, "campaign" => $campaign
		, "extra data" => $extradata
		, "date added" => $strDate
		, "ip address" => $ip
	);
	 
	if ($ss->addRow($row)) echo "Form data successfully stored using Google Spreadsheet";
	else echo "Error, unable to store spreadsheet data";
}
 
?>