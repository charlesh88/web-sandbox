<?php
$ver = "1.2.3";
function renderSizeSpecimens()
{
  $o = '<div class="container">'; //rand(2)
  $t = array();
  array_push($t, "Don't be too proud of this technological terror you've constructed.");
  array_push($t, "The ability to destroy a planet is insignificant next to the power of the Force.");
  array_push($t, "I find your lack of faith disturbing");
  $size;
  $ti;
  for ($i = 0.5; $i <= 3; $i += 0.25)
  {
    $size =  $i . 'em';
    $ti = rand(0,2);
    $o .= '<p class="specimen" style="font-size: ' . $size .';">' . $t[$ti] . ' <em>(' . $size . ")</em></p>\r\n";
    $o .= '<p class="specimen" style="text-transform: uppercase; font-size: ' . $size .';">' . $t[$ti] . ' <em>(' . $size . ")</em></p>\r\n";
  }
  $o .= "</div>\r\n";
  return $o;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Font Test</title>
	<meta content="width=device-width, initial-scale=1.0" name="viewport">
	<meta name="viewport" content="initial-scale = 1.0,maximum-scale = 1.0, user-scalable=yes" />
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Virtual Fan Network" />
	<meta property="og:title" content="Web Font Testbed" />
	<meta property="og:description" content="Page designed to test web fonts" />
	<script src="../static/js/modernizr.touch.js" ></script>
	<script src="../static/js/modernizr-2.6.2.min.js" ></script>
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Montserrat:400" />
	<link rel="stylesheet" type="text/css" href="static/css/styles.css?v=<?php echo $ver; ?>" />
</head>
<body>
  <div id="iframe-wrapper">
    <iframe frameborder="0" src="http://www.boingboing.net"></iframe>
  </div>
  <!--object data="child.php" type="text/html" id="holder-child"></object-->
</body>
</html>