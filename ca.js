var Utils = require("./defs.js");



class CA
{
    CreateLattice()
    {
        let elem = this.stateSet[0];
        const sizes = Array(this.sizes[1]).fill(this.sizes[0]); // [5, 2] -> [5, 5]
        return Utils.hyperDimArray(sizes, this.stateSet[0]);
    }

    // problematic
    NeighborhoodSelection(coordVector, neighborhood)
    {
        //console.log(coordVector)
        const latticedNeighborhood = neighborhood.flatMap(neighbor => {
            try {
                console.log(`index ${neighbor}`);
                const result = [Utils.atVec(this.lattice, neighbor)];
                console.log(`result ${result}`);
                return result // returns nan
            } catch {
                return Utils.Skip; // returns underfined rather than not in the arr
            }
        }).filter(e=>e);


        Utils.printarr(latticedNeighborhood, "latticedNeighborhood");
        console.log(`new result ig ${this.transitionFunction(Utils.atVec(this.lattice, coordVector), ...latticedNeighborhood)}`);
        Utils.UpdateHyperArray(this.temp_lattice, coordVector, this.transitionFunction(Utils.atVec(this.lattice, coordVector), ...latticedNeighborhood));
        // dont change the array immeditaly, change a temp array
    }

    Step()
    {   
        Utils.CartProducts(this.sizes[0], this.sizes[1], Utils.CHORD_TYPE.DIAMETER, Array(this.sizes[1]).fill(0)).forEach(coordVector => {
            console.log(`vecor: ${coordVector}`);
            const neighborhood = Utils.generateNeighborhood(2, 1, this.neighborhoodType, coordVector);
            Utils.printarr(neighborhood, "neighborhood");
            this.NeighborhoodSelection(coordVector, neighborhood);
        });
        this.lattice = this.temp_lattice.map(e=>e);
    }


    Print()
    {   
        Utils.CartProducts(this.sizes[0], this.sizes[1], Utils.CHORD_TYPE.DIAMETER, Array(this.sizes[1]).fill(0)).forEach(coordVector => {
            console.log(`${coordVector}: [${Utils.atVec(this.lattice, coordVector)}]`);
        });
    }



    constructor(stateSet, sizes, transitionFunction) //neighborhood, transition
    {
        // field initialization
        this.stateSet = stateSet;
        this.transitionFunction = transitionFunction;
        this.sizes = sizes;

        this.top = Utils.TOPOLOGY_TYPE.RECT; // torus or sqaure

        this.lattice = this.CreateLattice();
        this.temp_lattice = this.CreateLattice();
        this.neighborhoodType = Utils.NEIGHBORHOOD_TYPE.MOORE;
        
        
        this.lattice[0][1] = 1;
        this.lattice[1][0] = 1;
        this.lattice[1][1] = 1;
        
        console.log(this.lattice);
        this.Step();
        console.log(this.lattice);
    }
}

// the format for a transition function is the current cell, and a spread ordered list of the neighboorhood
// whether the neighborhood is moore of von neuman will be determined by the selection of the elements of the ordered list
var gol = (x, ...args) => {let sum = args.reduce((partialSum, a) => partialSum + a, 0); console.log(sum); return (sum == 3 || (sum==2 && x))?1:0;}


var test = new CA([0, 1], [5, 2], gol);


//console.log(gol(0, 1, 1, 1, 0, 0, 0, 0, 0))

// changing [5, 5] to [5, 2] and [5, 5, 5] to [5, 3]
// make Step work
// get wrapp done
// test

// get statespace
