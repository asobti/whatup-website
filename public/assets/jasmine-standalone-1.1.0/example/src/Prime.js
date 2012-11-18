isPrime= function (num) {
	if(num < 1) {
		return false;
	}
	if(num == 1) {
		return false;
	}

	for(var i = 2; i < Math.round(Math.sqrt(num)); i++) {
		if(num % i == 0) {
			return false;
		}
	}
	
	return true;
}

