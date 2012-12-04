describe ("PostView", function() {
	beforeEach(function() {
		view=new PostView();
	});

	describe ("Instantiation", function() {
		it('should create a list element', function() {
			expect(view).toBeDefined();
		});
	});
});
