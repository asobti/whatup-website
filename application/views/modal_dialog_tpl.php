<script type="text/template" id="tpl-post-working">
	<div id="working-dialog" class="modal hide fade">
		<div class="modal-header">			
			<h4><%= header %></h4>
		</div>
		<div class="modal-body">
			<img src='assets/img/loaders/<%= image %>' />
			<p><strong><%= body %></strong></p>
		</div>		
	</div>
</script>

<script type="text/template" id="tpl-post-delete-alert">
	<div class="alert alert-block alert-error hide post-delete-alert">
		<button type="button" class="close" data-dismiss="alert">&times;</button>
		<h4 class="alert-heading">
			<%= header %>
		</h4>
		<p>
			<strong> <%= body %> </strong>
		</p>
		<p class="alert-buttons">
		  <a class="btn btn-danger post-delete-confirm" href="#">Delete</a>
		</p>
	</div>
</script>