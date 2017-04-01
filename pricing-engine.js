var az;
var bb;
var p1;
var p2;
var p3;
var p4;

var lowest_price;
var high_price;

if(az < bb){
    lowest_price = az;
    high_price = bb;
}else{
    lowest_price = bb;
    high_price = az;
}

var diff = high_price - lowest_price;
p1 = lowest_price + (diff*0.25);
p2 = lowest_price + (diff*0.5);
p3 = lowest_price + (diff*0.75);
p4 = high_price;
