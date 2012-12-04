//Simple tests to ensure models are named correctly and available

describe('Post model', function() {
	describe('when instantiated', function() {
    
		it('should exhibit attributes', function() {
      		var myPost = new Post({
        		id: 1, 
      		});
      		expect(myPost.get('id')).toEqual(1);
    		});
    
 	});
  
});


describe('Posts model', function() {
	describe('when instantiated', function() {
    
    		it('should exhibit attributes', function() {
      		var myPosts= new Posts();
      		expect(myPosts.get('id')).toEqual(undefined);
    		});
    
  	});
  
});

describe('PaginationModel model', function() {
	describe('when instantiated', function() {
    
    		it('should exhibit attributes', function() {
      		var Page = new PaginationModel({
        	id: 1
      		});
      		expect(Page.get('id')).toEqual(1);
    		});

  });

});

