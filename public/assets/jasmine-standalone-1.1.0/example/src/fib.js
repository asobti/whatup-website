fib = function (num)
{
var l = [1, 1];
for(int i = 0; i < num-2; i++)
{
var next = l[0] + l[1];
l.push(next);
l.shift();
}
return l[1];
}


