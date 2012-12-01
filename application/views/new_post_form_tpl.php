<script id="tpl-new-post-form" type="text/template">
<div id="post_add">
	<div class="row">
		<div class="span12">
			<h3>Post</h3>
		</div>
	</div>

	<div class="row">		
		<input type="text" id="post_title" placeholder="Post Title" />
		<textarea id="post_content" class="field span12" placeholder="Insert your content here"></textarea>		
	</div>
	<div class="row new-post-footer">
		<div class="pull-left">
			<select id="new-post-user">
				<option value="-1">Loading...</option>
			</select>
		</div>   
		<div class="pull-right">
			<div class="span8">
				<div class="button_containter pull-right new-post-buttons">
					<button class="btn btn-primary" id="post_add_submit" >Submit</button>	
					<button class="btn btn-primary" id="post_add_cancel" >Cancel</button>	
				</div>			
			</div>
		</div>
	</div>
</div>
</script>