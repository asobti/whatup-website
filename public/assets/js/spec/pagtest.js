describe("Pagination Model", function(){
it("should return url as default http://projectwhatup.us:5000/api/posts", function() {
	var myPag=  new PaginationModel({
id : 1
});
	expect(myPag.url).toBe('http://projectwhatup.us:5000/api/posts'); 
});

it(" it should return {totalPages : 5, currentPage : 1}", function() {

	var myPag= new PaginationModel({});
expect(myPag.parse({total_pages: 5, page: 1})).toEqual({totalPages : 5, currentPage : 1});
});



it( "should return has Current Page is 1", function(){
var myPag= new PaginationModel({});
myPag.currentPage=1;
expect(myPag.currentPage).toBe(1);

});
});

describe("Pag Model", function() {
var myPag= new PaginationModel({

});

beforeEach(function() {

 myPag.set({"currentPage": 1});
myPag.set({"totalPages" : 5});
});

it( "should return has Next Page true", function(){

expect(myPag.hasNext()).toBeTruthy();
});

it( "should return has Prev Page false", function(){

expect(myPag.hasPrev()).toBeFalsy();
});

it( "should return Next Page 2", function(){

expect(myPag.nextPage()).toBe(2);
});

it ("should update the current Page to 2", function() {
myPag.changeCurrentPage(2);

expect(myPag.currentPage).toBe(2);
});

it("should return Previous page as 1", function(){
myPag.set({"currentPage": 2});
expect(myPag.prevPage()).toBe(1);
});
});








  


