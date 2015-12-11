Genetic.Boolean = function () {
   if (!(this instanceof Genetic.Boolean)) {
      return new Genetic.Boolean();
   }
   this.value = null;
   this.binaryDigits = 1;
}
Genetic.Boolean.prototype = Object.create(Genetic.BaseGene.prototype);
Genetic.Boolean.prototype.constructor = Genetic.Boolean;


Genetic.Boolean.prototype.fromBinary = function (binaryString) {
   this.value = binaryString === "0" ? false : true;
}

Genetic.Boolean.prototype.toBinary = function () {
   return this.value === false ? "0" : "1";
}
Genetic.Boolean.prototype.getValue = function () {
   return this.value;
}