class ContadorDePalabras {
    
    palabras:string;
    conAcentos:object = {};
    sinAcentos:object = {};
    
    noLatin:RegExp = new RegExp(/[^a-zA-Z0-9\u0080-\u00FF]/, 'g');
    
    private separarPalabras(palabras:string) {
        return palabras.replace(this.noLatin, " ").replace(/\s+/g, " ").toLowerCase().split(" ");
    }
    
    private contarPalabras(palabras) {
        let p:string, arr:object = {};
        palabras.map((palabra, indice) => {
            p = palabra.trim();
            if (p.length>0) {
                if (!arr.hasOwnProperty(p)) {
                    arr[p] = 0;
                }
                arr[palabra]++;
            }
        });
        return arr;
    }

    constructor(palabras:string) {
        this.palabras = palabras;

        const partesConAcentos = this.separarPalabras(palabras);
        const partesSinAcentos = this.separarPalabras(palabras.normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
        
        this.conAcentos = this.contarPalabras(partesConAcentos);
        this.sinAcentos = this.contarPalabras(partesSinAcentos);
    }
    toString() {
        return JSON.stringify(this.palabras);
    }
    
}

const palabras = "Érase una vez una niñita que lucía una hermosa capa de color rojo. Como la niña la usaba muy a menudo, todos la llamaban Caperucita Roja. Un día, la mamá de Caperucita Roja la llamó y le dijo: —Abuelita no se siente muy bien, he horneado unas galletitas y quiero que tú se las lleves. —Claro que sí —respondió Caperucita Roja, poniéndose su capa y llenando su canasta de galletas recién horneadas. Antes de salir, su mamá le dijo: — Escúchame muy bien, quédate en el camino y nunca hables con extraños. —Yo sé mamá —respondió Caperucita Roja y salió inmediatamente hacia la casa de la abuelita."
const contador = new ContadorDePalabras(palabras);
console.log(contador); // Should print a JSON with the results