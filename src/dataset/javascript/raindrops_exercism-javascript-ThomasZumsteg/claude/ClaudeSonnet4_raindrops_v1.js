var Raindrops = function() {};

Raindrops.prototype.convert = function(number) {
   var sounds = '';
   var hasSounds = false;
   
   if (number % 3 === 0) {
   	sounds += 'Pling';
   	hasSounds = true;
   }
   if (number % 5 === 0) {
   	sounds += 'Plang';
   	hasSounds = true;
   }
   if (number % 7 === 0) {
   	sounds += 'Plong';
   	hasSounds = true;
   }
   
   return hasSounds ? sounds : number.toString();
};

export default Raindrops;