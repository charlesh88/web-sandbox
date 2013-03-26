<?php
$ver = "2.4.0";
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Media Query Testbed</title>
	<meta content="width=device-width, initial-scale=1.0" name="viewport">
	<meta name="VFNCard-Version" content="3.5.2.2b" />
	<meta name="viewport" content="initial-scale = 1.0,maximum-scale = 1.0, user-scalable=yes" />
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Virtual Fan Network" /
	<meta property="og:url" content="http://vfncard.local/?q=ar08" />
	<meta property="og:title" content="Media Query Testbed" />
	<meta property="og:description" content="Page designed to test media queries" />
	<link rel="stylesheet" type="text/css" href="css/styles.css?v=<?php echo $ver; ?>" />
</head>
<body>
  <div id="report">
    <h1>Media Query Testbed v<?php echo $ver; ?></h1>
    
    <div id="report-device">
      <h2>Device</h2>
      <span id="s0"></span>
    </div>
    
    <div id="display-strategy">
      <h2>Display Strategy</h2>
      <span id="s0"></span>
      <span id="s1"></span>
      <span id="s2"></span>
      <span id="s3"></span>
    </div>
    
    <div id="report-ppi">
      <h2>Device Resolution</h2>
      <span id="reported-dwh" class="no-hide"></span>
      <span id="no-match">Resolution and/or DPR not matched</span>
      <span id="ppiLo">Max res: 96dpi; Max-DPR: 1</span>
      <span id="ppiMd">Min-max res: 97 - 191dpi; Min-max DPR: 1.1 - 1.9</span>
      <span id="ppiHi">Min res: 192dpi; Min-DPR: 2</span>
    </div>

    <div id="report-orientation">
      <h2>Orientation</h2>
      <span id="s1"></span>
    </div>
  </div>
  <div id="vfc"></div>
  <script>
    var r = document.getElementById("reported-dwh");
    r.innerHTML = 'Device Screen: ' + window.screen.width + ' x ' + window.screen.height;
  </script>
</body>
</html>