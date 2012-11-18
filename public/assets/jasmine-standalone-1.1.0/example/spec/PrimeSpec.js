describe("isPrime", function() {  
  
  it("should validate that 4 is not prime",function(){  
console.log("Logfile");  
    var result = isPrime(4);  
    expect(result).toBe(false);  
  });  
  
    it("should validate that 5 is prime",function(){
console.log("Logfile");
    var result = isPrime(5);    
    expect(result).toBe(true);   
  });

  it("should validate that -10 is not prime",function(){
console.log("Logfile");
    var result = isPrime(-10);    
    expect(result).toBe(false);   
  });

  it("should validate that 0 is not Prime",function(){
console.log("Logfile");
    var result = isPrime(0);    
    expect(result).toBe(false);   
  });

  it("should validate that 1 is not prime",function(){
console.log("Logfile");
    var result = isPrime(1);   
    expect(result).toBe(false);   
  });

  it("should validate that 2 is prime",function(){
    var result = isPrime(2);   
    expect(result).toBe(true);   
  });


  
});
