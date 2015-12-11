Genetic.Enum = function (arrayOfThings) {
   if (!(this instanceof Genetic.Enum)) {
      return new Genetic.Enum(arrayOfThings);
   }
   this.arrayOfThings = arrayOfThings;
   Genetic.Integer.call(this, 0, arrayOfThings.length - 1);

}
Genetic.Enum.prototype = Object.create(Genetic.Integer.prototype);
Genetic.Enum.prototype.constructor = Genetic.Enum;
Genetic.Enum.prototype.getValue = function () {
   return this.arrayOfThings[this.value];
}