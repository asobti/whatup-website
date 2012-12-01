<script type="text/template" id="tpl-post">		
	<div class="row-fluid topic">
		<a href="#/post/<%= id %>"><h4><%= topic %></h4></a>				
	</div>
	<div class="row-fluid">
		<div class="span12 well post-body">
			<%= body %>
		</div>	
	</div>

	<div class="row-fluid info-tags-row">
		<div class="span3 post-image-info-wrap">
			<img src="http://placehold.it/80&text=Avatar" class="post-user-image" />
			<div class="post-info-wrap">
				<p class="post-info post-user-name">
					<a href="#">@<%= author.alias %></a>
				</p>
				<p class="post-info post-user-time timeago" title="<%= created_at %>">
					<%= created_at %>
				</p>
			</div>
		</div>	 
		<div class="span3 post-tags-wrapper pull-right">			
			<!-- tags go here -->
			<% _.each(tags, function(tag) { %>				
				<a href="#" class="label label-info post-tag" data-title="<%= tag %>" rel="popover" data-placement="top" >
					<%= tag %>
				</a>
			<% }); %>			
		</div>	
	</div>	
</script>

<script type="text/template" id="tpl-pagination">	
	<div class="pagination btn-group"> 

	</div>
</script>


