describe ("App Routes", function() {
	it("fires the index route with a blank hash", function() {
	 	this.router=new AppRouter;
                this.routeSpy=sinon.spy();
		this.router.bind("route : posts", this.routeSpy);
		this.router.navigate("", true);
		
		expect(this.routeSpy).toHaveBeenCalledOnce();
		
	});
});
	
