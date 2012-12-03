describe('tests for Posts', function() {
	
	it('should have a url property to define the url structure for all models', function() {
	var posts = new Posts();
	expect(posts.url).toBe('http://projectwhatup.us:5000/api/posts?q={"order_by":[{"field":"created_at","direction":"desc"}]}');
});

	it('should return the initial length of the Posts list to be 0', function() {
	var posts = new Posts();
	expect(posts.length).toBe(0);
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
    expect(this.posts.get(5).get("id")).toEqual(5);
});
});
