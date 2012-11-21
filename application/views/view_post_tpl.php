<script type="text/template" id="tpl-post">	
	<div style="margin-top: 50px;"> 
		<div class="row-fluid" style="border-bottom: 1px solid black">
			<div class="span6">
				<%= topic %>
			</div>	
			<div class="span6" style="text-align:right">
				<span class="timeago" title=<%= created_at %>>
					<%= created_at %>
				</span>
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
				
				</div>
			</div>	
		</div>
	</div>
</script>


