Genetic.Array = function (gene, multiplier) {
   if (!(this instanceof Genetic.Array)) {
      return new Genetic.Array(gene, multiplier);
   }


}
Genetic.Array.prototype = Object.create(Genetic.BaseGene.prototype);
Genetic.Array.prototype.constructor = Genetic.Array;
Genetic.Array.prototype.getValue = function () {

}