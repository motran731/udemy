import generateName from "sillyname";

import superheroes from "superheroes";

var sillyName = generateName();

console.log(`My name is ${sillyName}.`);

var superhero = superheroes.random();
console.log(`I am a superhero ${superhero}`);
