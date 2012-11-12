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
	<p>Version 1.0.4</p>
      </footer>

    </div> <!-- /container -->

