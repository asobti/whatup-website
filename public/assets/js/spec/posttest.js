describe ('Post model', function() {
it ('should set url when id is set to 1 to http://projectwhatup.us:5000/api/posts/1', function() {
var post =new Post({
id: 1
});
expect(post.url()).toEqual('http://projectwhatup.us:5000/api/posts/1' );

})
});

describe ('Post model', function() {
it ('should set url  to http://projectwhatup.us:5000/api/posts when i.d is not set', function() {
var post =new Post({
});
expect(post.url()).toEqual('http://projectwhatup.us:5000/api/posts' );

})
});

describe('Post model', function (){
it("should not post when there is no Topic", function() {
var post =new Post({id : 1});
  var eventSpy = sinon.spy();
  post.bind("error", eventSpy);
  post.save({"topic": ""});
  expect(eventSpy.calledOnce).toBeTruthy();
  expect(eventSpy.calledWith(
    post, 
    "You must enter a topic and a body"
  )).toBeTruthy();
});
});

describe('Post model', function (){
it("should not post when there is no Body", function() {
var post =new Post({id : 1});
  var eventSpy = sinon.spy();
  post.bind("error", eventSpy);
  post.save({"Body": ""});
  expect(eventSpy.calledOnce).toBeTruthy();
  expect(eventSpy.calledWith(
    post,
    "You must enter a topic and a body"
  )).toBeTruthy();
});
});

describe('Post model', function (){
it("should not post when there is no Topic and Body", function() {
var post =new Post({id : 1});
  var eventSpy = sinon.spy();
  post.bind("error", eventSpy);
  post.save({"Body": ""});
  post.save({"Topic": ""});
  expect(eventSpy.calledTwice).toBeTruthy();
});
});



