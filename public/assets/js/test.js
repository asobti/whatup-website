function isPrime(num)
{
	if(num < 1)
	{
		return false;
	}
	if(num == 1)
	{
		return false;
	}

	for(var i = 2; i < Math.round(Math.sqrt(num)); i++)
	{
		if(num % i == 0)
		{
			return false;
		}
	}
	return true;
}

function fib(num)
{
	var l = [1, 1];
	if(num < 0)
	{
		return 0;
	}
	for(int i = 0; i < num-2; i++)
	{
		var next = l[0] + l[1];
		l.push(next);
		l.shift();
	}
	return l[1];
}


//set up tests which validate the following at a minumum
//isPrime(4) == false;
//isPrime(5) == true;
//isPrime(-10) == false;
//isPrime(0) == false;
//isPrime(1) == false;
//isPrime(2) == true;


//fib(2) == 1
//fib(0) == 0
//fib(-1) == 0
//fib(3) == 2
//fib(4) == 3
//fib(5) == 5



//one of the tests fail.  We'll know the testing framework works if you find it :)
