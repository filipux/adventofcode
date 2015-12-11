Genetic.Chromosome = function (length) {
   this.fitness = null;
   this.length = length;
   this.data = null;
   this.randomize();
   this.genes = null;
}
Genetic.Chromosome.prototype.randomize = function () {
   this.data = new String();
   for (var i = 0; i < this.length; i++) {
      this.data += Math.random() > 0.5 ? "1" : "0";
   }
}
Genetic.Chromosome.prototype.getBinaryString = function () {
   var result = new String();
   for (var i = 0; i < this.genes.length; i++) {
      result = result + this.genes[i].data.toBinary();
   }
   return result;
}