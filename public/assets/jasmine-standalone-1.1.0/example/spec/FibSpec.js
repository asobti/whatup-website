describe("fib", function() {  
  
  it("should validate that the fib of 2 is 1",function(){  
    var result = fib(2);  
    expect(result).toBe(1);  
  });  
  
    it("should validate that the fib of 0 is 0",function(){
    var result = fib(0);    
    expect(result).toBe(0);   
  });

  it("should validate that the fib of -1 is 0",function(){
    var result = fib(-1);    
    expect(result).toBe(0);   
  });

  it("should validate that the fib of 3 is 2",function(){
    var result = fib(3);    
    expect(result).toBe(2);   
  });

  it("should validate that the fib of 4 is 3",function(){
console.log("Logfile");
    var result = fib(4);    
    expect(result).toBe(3);   
  });

  it("should validate that the fib of 5 is 5",function(){
    var result = fib(5);    
    expect(result).toBe(5);   
  });


  
});
