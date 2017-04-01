var az;
var bb;
var p1;
var p2;
var p3;
var p4;

if (az > bb || az < bb) {
  diff = bb - az;
  p1 = az + (diff*0.25);
  p2 = az + (diff*0.5);
  p3 = az + (diff*0.75);
  p4 = az;
}
