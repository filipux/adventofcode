// ====================== TEST 1 =========================================
function diffChars(a, b) {
   return Math.abs(a.charCodeAt(0) - b.charCodeAt(0));
};

function fitness(g) {
   var diff = 0;
   diff += diffChars("f", g.x0);
   diff += diffChars("i", g.x1);
   diff += diffChars("l", g.x2);
   diff += diffChars("i", g.x3);
   diff += diffChars("p", g.x4);

   return diff

}

var alphabet = "abcdefghijklmnopqrstuvqxyzåäö".split("");
var genome = {
   x0: Genetic.Enum(alphabet),
   x1: Genetic.Enum(alphabet),
   x2: Genetic.Enum(alphabet),
   x3: Genetic.Enum(alphabet),
   x4: Genetic.Enum(alphabet)
};

var genetic = new Genetic(genome, fitness);
genetic.generations = 1000;
var result = genetic.minimize();
console.log(result);

// ====================== TEST 2 =========================================

function rosenbrock(g) {
   return (1 - g.x) * (1 - g.x) + 100 * (g.y - g.x * g.x) * (g.y - g.x * g.x);

}

var genome = {
   x: Genetic.Float(-5, 5),
   y: Genetic.Float(-5, 5)
};

var genetic = new Genetic(genome, rosenbrock);
genetic.generations = 2000;
var result = genetic.minimize();
console.log(result);