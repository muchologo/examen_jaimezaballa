"use strict";
class InvalidArgumentException {
	codeType: number = 0;
	message: string
	constructor (message:string) {
		this.message = message;
	}
};

class Desafio {
	nombre: string;
	claridad: number;
	originalidad: number;
	dificultad: number;
	
	constructor(nombre: string, claridad: number, originalidad: number, dificultad: number) {
		this.nombre = nombre;
		if (claridad<1 || claridad>100) {
			throw new InvalidArgumentException("La claridad definida para " + nombre + " debe ser un numero entre 1 y 100");
		}
		if (originalidad<1 || originalidad>100) {
			throw new InvalidArgumentException("La originalidad definida para " + nombre + " debe ser un numero entre 1 y 100");
		}
		if (dificultad<1 || dificultad>100) {
			throw new InvalidArgumentException("La dificultad definida para " + nombre + " debe ser un numero entre 1 y 100");
		}
		this.claridad = claridad;
		this.originalidad = originalidad;
		this.dificultad = dificultad;
	}
}

class PuntosDeComparacion {
	constructor(desafioA: Desafio, desafioB: Desafio) {
		const comparacionA: number[] = [
			desafioA.claridad,
			desafioA.originalidad,
			desafioA.dificultad
		];
		const comparacionB: number[] = [
			desafioB.claridad,
			desafioB.originalidad,
			desafioB.dificultad
		];

		let matrix:number[] = [0, 0], i:number, a:number, b:number;
		for (i = 0; i < comparacionA.length; i++) {
			a = comparacionA[i];
			b = comparacionB[i];
			if (a > b) {
				matrix[0]++;
			} else if (a < b) {
				matrix[1]++;
			}
		}
		return matrix;
	}
}

try {
	const desafioA:Desafio = new Desafio("Alice", 17, 28, 30);
	const desafioB:Desafio = new Desafio("Bob", 99, 16, 8);
	const matrix = new PuntosDeComparacion(desafioA, desafioB); // Should return [2, 1]
	console.log(matrix);
} catch (e) {
	if (e.codeType == 0) {
		console.log(e.message);
	} else {
		console.log(e);
	}
}