Genetic.Integer = function (min, max) {
   if (!(this instanceof Genetic.Integer)) {
      return new Genetic.Integer(min, max);
   }
   this.max = Math.max(min, max);
   this.min = Math.min(min, max);
   this.range = Math.abs(max - min);
   this.binaryDigits = Math.floor(Math.log(this.range) / Math.log(2)) + 1;
   this.value = null;

}
Genetic.Integer.prototype = Object.create(Genetic.BaseGene.prototype);
Genetic.Integer.prototype.constructor = Genetic.Integer;


Genetic.Integer.prototype.fromBinary = function (binaryString) {
   var rawValue = parseInt(binaryString, 2);
   var unnormalizedValue = rawValue + this.min;
   var clampedValue = Math.max(unnormalizedValue, this.min);
   clampedValue = Math.min(clampedValue, this.max);
   this.value = clampedValue;
}

Genetic.Integer.prototype.toBinary = function () {
   var clampedValue = Math.max(this.value, this.min);
   clampedValue = Math.min(clampedValue, this.max);
   var normalizedValue = clampedValue - this.min;

   var binaryString = (normalizedValue >>> 0).toString(2);
   while (binaryString.length < this.binaryDigits) {
      binaryString = '0' + binaryString;
   }
   return binaryString;
}
Genetic.Integer.prototype.getValue = function () {
   return this.value;
}