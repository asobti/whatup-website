<script id="tpl-new-post-form" type="text/template">
<div id="post_add">	
	<div class="row">		
		<input type="text" id="post_title" placeholder="Post Title" value="<%= topic %>" />
		<textarea id="post_content" class="field span12" placeholder="Insert your content here"><%= body %></textarea>
		<input type="text" id="post_tags" placeholder="Tags" value="<% _.each(tags, function(tag) { }) %>" />
	</div>
	<div class="row new-post-footer">
		<div class="pull-left">
			<select id="new-post-user">
				<option value="-1">Loading...</option>
			</select>
		</div>   
		<div class="pull-left new-post-attachment">
			<div class="btn-group dropup">
				<a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
					<i class="icon-folder-open"></i>
					Add attachments
					<span class="caret"></span>
				</a>
				<ul class="dropdown-menu">
					<li>						
						<a href="#"> 
							<i class="icon-hdd"></i>
							Upload from computer
						</a>
					</li>
					<li>						
						<a href="#"> 
							<i class="icon-globe"></i>
							Upload from URL
						</a>
					</li>
				</ul>
			</div>
		</div>   
		<div class="pull-right">			
			<div class="button_containter pull-right new-post-buttons">
				<button class="btn btn-primary" id="post_add_submit" >Submit</button>	
				<button class="btn btn-primary" id="post_add_cancel" >Cancel</button>	
			</div>			
		</div>
	</div>
</div>
</script>