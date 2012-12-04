describe('tests for Posts', function() {
	it('should have a url property to define the url structure for all models, should return this as http://projectwhatup.us:5000/api/posts?q={"order_by":[{"field":"created_at","direction":"desc"}]}', function() {
	var posts = new Posts();
	expect(posts.url).toBe('http://projectwhatup.us:5000/api/posts?q={"order_by":[{"field":"created_at","direction":"desc"}]}');
});
	it('should return the initial length of the Posts list to be 0', function() {
	var posts = new Posts();
	expect(posts.length).toBe(0);
	});

	it('should return the Posts models as Post', function() {
	var posts= new Posts();
	expect(posts.model).toBe(Post);
	});

	it('should return the Pagination model set by Pagination Model function', function() {
	var posts= new Posts();
	var Pag= new PaginationModel();
	posts.setPaginationModel(Pag);

	expect(posts.paginationModel).toBe(Pag);
	});
	
	it('should Leave Pagination undefined if not explicitly set', function() {
	var posts= new Posts();
	expect(posts.paginationModel).toBeUndefined();
	});

	it ('should log fail silenty if Pagination model is not set', function() {
	var posts=new Posts();
	expect(posts.beginWatch()).toBeUndefined();
	});
	
	it('should not fail if PaginationModel is set when BeginWatch() is called', function() {
	var posts=new Posts();
	var Pag= new PaginationModel();
	Pag.set({"currentpage": 1});
	posts.setPaginationModel(Pag);
	expect(posts.beginWatch).toBeDefined();
	});

 	it('should not fail if PaginationModel is set when BeginWatch() is called', function() {
        var posts=new Posts();
        var Pag= new PaginationModel();
        Pag.set({"currentpage": 1});
        posts.setPaginationModel(Pag);
        expect(posts.beginWatch).toBeDefined();
        });
	

});

describe("when instantiated with model literal", function() {
  	beforeEach(function() {
    	postStub = sinon.stub(window, "Post");
    	model = new Backbone.Model({
      	id: 5
    	});
    	postStub.returns(model);
    	posts = new Posts();
    	posts.model = Post; // reset model relationship to use stub
    	posts.add({
      	id: 5, 
    	});
  	});
    
  	afterEach(function() {
    		postStub.restore();
  	});

  	it("should add a model", function() {
    	expect(posts.length).toEqual(1);
 	});
    
  	it("should find a model by id", function() {
    	expect(posts.get(5).get("id")).toEqual(5);
	}); 
	

});

