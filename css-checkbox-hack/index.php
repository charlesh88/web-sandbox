<?php
$theme = '1';
if (isset($_GET['t']))
{
  $theme = $_GET['t'];
}


?>

<!DOCTYPE html>
<head>

<link href="static/css/app-zone.css" rel="stylesheet" />
</head>
<body class="app-common">
    <div class="forms-wrapper">
    <form>
    <div class="fields-wrapper">
      <div id="share-sqor" class="form-row">
        <input type="checkbox" class="input switch slider" name="cbox-sqor" id="cbox-sqor" value="on" disabled="disabled" checked />
        <label for="cbox-sqor" class="switch slider on-off disabled">share on sqor<span></span></label>
      </div>
      <div id="share-facebook" class="form-row">
        <input type="checkbox" class="input switch slider no-hide" name="cbox-facebook" id="cbox-facebook" value="{{ facebook_sharing_identifier }}" />
        <label for="cbox-facebook" class="switch slider on-off">facebook<span></span></label>
      </div>
      <div id="share-twitter" class="form-row">
        <input type="checkbox" class="input switch slider no-hide" name="cbox-twitter" id="cbox-twitter" value="{{ twitter_sharing_identifier }}" />
        <label for="cbox-twitter" class="switch slider on-off">twitter<span></span></label>
      </div>
    </div>
    <div class="form-row buttons">
      <a class="share-btn lg btn round embossed gradient-face">Share</a>
    </div>
    <div class="form-row links">
      <a class="cancel">Cancel</a>
    </div>
  </form>
  </div>

</body>

</html>