<?php
$theme = '1';
if (isset($_GET['t']))
{
  $theme = $_GET['t'];
}


?>

<!DOCTYPE html>
<head>

<link href="static/css/screen.css" rel="stylesheet" />
</head>
<body class="layout-<?php echo $theme; ?>">

  <div id="content-wrapper">
    <h1 class="headline headline-1">Go to the <span style="color: #ef1e25">Super Bowl</span> in 2014 and meet your favorite athletes.</h1>
    <h1 class="headline headline-2">The way you follow sports is about to change.</h1>
    <h1 class="headline headline-3">Everything you ever wanted to know from your favorite athletes.</h1>
    <div class="cta cta-1">Join now for a chance to win</div>
    <div class="cta cta-2">Join the revolution</div>
    <div class="cta cta-3">Get in the game</div>
  
    <form action="{{ request.route_url('app.user_acquisition.submit') }}" method="post">
      <!-- Need to add class to this input in root.jinja2 -->
      <div id="field-button-wrapper">
        <input type="email" class="input field email" name="email" value="email address" autofocus />
        <br />
        <button class="input button" type="submit">
          <span class="button-text button-text-1">Enter Now</span>
          <span class="button-text button-text-2">Sign Up Now</span>
          <span class="button-text button-text-3">Join Now</span>
        </button>
      </div>
    </form>
  
  </div>
<img id="logo-sqor" src="static/images/user-acquisition-sqor-logo.png" />
</body>

</html>