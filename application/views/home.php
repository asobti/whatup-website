
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>WhatUp</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Le styles -->
    <link href="assets/css/bootstrap.css" rel="stylesheet">
    <style type="text/css">
      body {
        padding-top: 60px;
        padding-bottom: 40px;
      }
    </style>
    <link href="assets/css/bootstrap-responsive.css" rel="stylesheet">

    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <!-- Le fav and touch icons -->
    <link rel="shortcut icon" href="assets/ico/favicon.ico">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="assets/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="assets/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="assets/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="assets/ico/apple-touch-icon-57-precomposed.png">
  </head>

  <body>

    <div class="navbar navbar-inverse navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>
          <a class="brand" href="#">WhatUp</a>
          <div class="nav-collapse collapse">
		<button class="btn btn-primary pull-right">New Post</button>
          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>



<script type="text/template" id="tpl-post">
	<div style="margin-top: 50px;"> 
		<div class="row-fluid" style="border-bottom: 1px solid black">
			<div class="span6">
				<%= topic %>
			</div>	
			<div class="span6" style="text-align:right">
				<%= created_at %>
			</div>	
		</div>
		<div class="row-fluid">
			<div class="span12" style="margin-top: 5px; line-height: 26px;">
			<%= body %>
			</div>	
		</div>

		<div class="row-fluid" style="vertical-align: middle">
			<div class="span3">
				<img src="http://placehold.it/50x50" style="margin-right: 5px;" class="pull-left" />
				<div style="padding-top: 15px">
				@<%= user_id %>
				</div>
			</div>	 
			<div class="span3 pull-right">
				<div class="pull-right" style="padding-top: 15px">
				<%= tags %>
				</div>
			</div>	
		</div>
	</div>
</script>

    <div class="container" style="margin-top: 70px;">

      <!-- Example row of columns -->
      <div class="row">
        <div class="span2">
          <h3>Subscriptions</h3>
        </div>
        <div class="span5">
	<form class="navbar-search offset2">
	  <input type="text" class="search-query" placeholder="Search">
	</form>
       </div>
        <div class="span2 pull-right" style="text-align:right">
	  <h3>Recent</h3>
        </div>
      </div>

   <div class="posts">

   </div>


      <hr>

      <footer>
        <p>&copy; Project WhatUp 2012</p>
      </footer>

    </div> <!-- /container -->

    <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="assets/js/jquery.js"></script>
    <script src="assets/js/bootstrap-transition.js"></script>
    <script src="assets/js/bootstrap-alert.js"></script>
    <script src="assets/js/bootstrap-modal.js"></script>
    <script src="assets/js/bootstrap-dropdown.js"></script>
    <script src="assets/js/bootstrap-scrollspy.js"></script>
    <script src="assets/js/bootstrap-tab.js"></script>
    <script src="assets/js/bootstrap-tooltip.js"></script>
    <script src="assets/js/bootstrap-popover.js"></script>
    <script src="assets/js/bootstrap-button.js"></script>
    <script src="assets/js/bootstrap-collapse.js"></script>
    <script src="assets/js/bootstrap-carousel.js"></script>
    <script src="assets/js/bootstrap-typeahead.js"></script>

<script type="text/javascript" src="http://code.jquery.com/jquery-1.8.2.js"></script>
<script type="text/javascript" src="http://code.jquery.com/ui/1.9.0/jquery-ui.js"></script>
<script type="text/javascript" src="assets/js/json2.js"></script>
<script type="text/javascript" src="assets/js/underscore.js"></script>
<script type="text/javascript" src="assets/js/backbone.js"></script>
<script type="text/javascript" src="assets/js/models/post.js"></script>
<script type="text/javascript" src="assets/js/views/post.js"></script>
<script type="text/javascript" src="assets/js/routes/app.js"></script>

  </body>
</html>

