Genetic.Float = function (min, max, bitsOfPrecision) {
   if (!(this instanceof Genetic.Float)) {
      return new Genetic.Float(min, max, bitsOfPrecision);
   }
   this.bitsOfPrecision = bitsOfPrecision || 20;
   this.floatMax = Math.max(min, max);
   this.floatMin = Math.min(min, max);
   this.floatRange = Math.abs(max - min);

   Genetic.Integer.call(this, 0, Math.pow(2, this.bitsOfPrecision) - 1);

}
Genetic.Float.prototype = Object.create(Genetic.Integer.prototype);
Genetic.Float.prototype.constructor = Genetic.Float;
Genetic.Float.prototype.getValue = function () {
   return this.value * (this.floatRange / this.range) + this.floatMin;
}