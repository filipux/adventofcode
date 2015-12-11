function Genetic(genomeTemplate, objectiveFunction) {
   this.mutateProbability = 0.03;
   this.populationSize = 30;
   this.elitism = 1;
   this.generations = 100;
   this.isMinimizing = false;

   this.objectiveFunction = objectiveFunction;
   this.genes = [];
   this.genomeStructure = {};
   this.buildGenomeStructureAndGenes(this.genomeStructure, genomeTemplate);

   this.chromosomeLength = this.getChromosomeLength();

   this.population = [];

}

Genetic.prototype.setGenomeStructureData = function (chromosome) {

   var offset = 0;

   for (var i = 0; i < this.genes.length; i++) {
      var gene = this.genes[i];

      var cutBinaryString = chromosome.data.substring(offset, offset + gene.data.binaryDigits);
      gene.data.fromBinary(cutBinaryString);
      gene.parent[gene.name] = gene.data.getValue();
      offset += gene.data.binaryDigits;
   }

}
Genetic.prototype.minimize = function () {
   this.isMinimizing = true;
   return this.run();
}
Genetic.prototype.maximize = function () {
   this.isMinimizing = false;
   return this.run();
}

Genetic.prototype.run = function () {
   this.population = this.createRandomPopulation();
   this.measureFitness();
   this.currentGeneration = 0;


   for (var gen = 0; gen < this.generations; gen++) {
      this.nextGeneration();
      this.currentGeneration++;

      //var bestChromosome = this.getFittestChromosome();
      //this.setGenomeStructureData(bestChromosome);
      //console.log(this.genomeStructure, bestChromosome.objectiveValue);

   }
   this.setGenomeStructureData(this.getFittestChromosome())
   return this.genomeStructure;
}



Genetic.prototype.nextGeneration = function () {

   var newPopulation = [];

   for (var i = 0; i < this.elitism; i++) {
      newPopulation.push(this.getFittestChromosome());
   }


   while (newPopulation.length < this.populationSize) {
      var selectedParents = this.rouletteWheelSelection();

      // Multi point crossover
      var children = this.crossOver(selectedParents);
      children = this.crossOver(children);
      children = this.crossOver(children);

      this.mutate(children[0]);
      this.mutate(children[1]);

      newPopulation = newPopulation.concat(children);
   }
   if (newPopulation.length > this.populationSize) {
      newPopulation.splice(this.populationSize, this.populationSize);
   }
   this.population = newPopulation;
   this.measureFitness();
}

Genetic.prototype.getFittestChromosome = function () {
   return this.population.slice().sort(this.isFitnessBetter)[this.populationSize - 1];
}

Genetic.prototype.mutate = function (chromosome) {

   for (var i = 0; i < chromosome.length; i++) {
      if (Math.random() < this.mutateProbability) {
         var bit = chromosome.data[i];
         bit = bit === "0" ? "1" : "0";
         chromosome.data = chromosome.data.substr(0, i) + bit + chromosome.data.substr(i + 1);
      }
   }
}

Genetic.prototype.isFitnessBetter = function (a, b) {
   return a.fitness - b.fitness
}
Genetic.prototype.isObjectiveValueBetter = function (a, b) {
   if (this.isMinimizing) {
      return b.objectiveValue - a.objectiveValue;
   } else {
      return a.objectiveValue - b.objectiveValue;
   }
}

Genetic.prototype.rouletteWheelSelection = function () {
   var arr = this.population.slice().sort(this.isFitnessBetter);
   var fitnessSum = 0;
   for (var i = 0; i < arr.length; i++) {
      fitnessSum += arr[i].fitness;
   }

   var probabilitySum = 0;
   for (var i = 0; i < arr.length; i++) {
      var chromosome = arr[i];
      chromosome.probability = probabilitySum + (chromosome.fitness / fitnessSum);
      probabilitySum = chromosome.probability;
   }

   var selected = [];
   while (selected.length < 2) {
      var rnd = Math.random();
      for (var i = 0; i < arr.length; i++) {
         if (rnd < arr[i].probability && selected.indexOf(arr[i]) < 0) {
            selected.push(arr[i]);

            break;
         }
      }
   }

   return selected;
}

Genetic.prototype.crossOver = function (selectionArr) {
   var chromosome1 = selectionArr[0];
   var chromosome2 = selectionArr[1];

   var crossoverPoint = Math.floor(Math.random() * (chromosome1.length - 1)) + 1;
   var tail1 = chromosome1.data.substring(crossoverPoint);
   var head1 = chromosome1.data.substring(0, crossoverPoint);
   var tail2 = chromosome2.data.substring(crossoverPoint);
   var head2 = chromosome2.data.substring(0, crossoverPoint);

   var child1 = new Genetic.Chromosome(chromosome1.length);
   var child2 = new Genetic.Chromosome(chromosome1.length);
   child1.data = head1 + tail2;
   child2.data = head2 + tail1;
   return [child1, child2];

}
Genetic.prototype.measureFitness = function () {
   for (var i = 0; i < this.population.length; i++) {
      this.setGenomeStructureData(this.population[i]);
      this.population[i].objectiveValue = this.objectiveFunction(this.genomeStructure);
   }
   this.calculateRankedFitness();
}


Genetic.prototype.calculateRankedFitness = function () {

   var arr = this.population.slice().sort(this.isObjectiveValueBetter.bind(this)).map(function (p, index, source) {
      var x = index / (source.length - 1);
      p.fitness = 0.5 + 1 * x * x
      return p;
   });
}

Genetic.prototype.createRandomPopulation = function () {
   var population = [];
   for (var i = 0; i < this.populationSize; i++) {
      population.push(new Genetic.Chromosome(this.chromosomeLength));
   }
   return population;
}


Genetic.prototype.getChromosomeLength = function () {
   var chromosomeLength = 0;

   for (var i = 0; i < this.genes.length; i++) {
      chromosomeLength += this.genes[i].data.binaryDigits;
   }
   return chromosomeLength;
}



Genetic.prototype.buildGenomeStructureAndGenes = function (genomeStructure, genomeTemplate) {
   for (prop in genomeTemplate) {
      if (hasOwnProperty.call(genomeTemplate, prop)) {
         var value = genomeTemplate[prop];
         if (value instanceof Genetic.BaseGene) {
            genomeStructure[prop] = null;
            this.genes.push({
               data: value,
               name: prop,
               parent: genomeStructure
            });
         } else if (value instanceof Object) {
            genomeStructure[prop] = {};
            this.buildGenomeStructureAndGenes([prop], genomeTemplate[prop]);
         }
      }
   }
}