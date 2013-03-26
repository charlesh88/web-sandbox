<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Untitled Document</title>
</head>

<body>

<?php
$xml = simplexml_load_file("http://www.amplify-social.com/units_v2/config/persons/brett-favre.xml");

echo $xml->getName() . "<br />";

foreach($xml->children() as $child)
{
	echo $child->getName() . ": " . $child . "<br />";
}
echo "<hr>";

$xmlScreens = $xml->xpath("person/screens");

foreach($xmlScreens->children() as $child)
{
	echo $child->getName() . ": " . $child . "<br />";
}
?>

</body>
</html>