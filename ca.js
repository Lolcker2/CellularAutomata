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
        const latticedNeighborhood = neighborhood.flatMap(neighbor => {
            try {
                return [Utils.atVec(this.lattice, neighbor)];
            } catch {
                return Utils.Skip;
            }
        });

        console.log(`neighborhood ${latticedNeighborhood}`);
        Utils.UpdateHyperArray(this.lattice, coordVector, this.transitionFunction(Utils.atVec(this.lattice, coordVector), ...latticedNeighborhood));
         // apply the transition
    }


    Step()
    {   
        Utils.CartProducts(this.sizes[0], this.sizes[1], Utils.CHORD_TYPE.DIAMETER, Array(this.sizes[1]).fill(0)).forEach(coordVector => {
            const neighboorhood = Utils.generateNeighborhood(2, 1, Utils.NEIGHBORHOOD_TYPE.VON_NEUMANN, coordVector);
            this.NeighborhoodSelection(coordVector, neighboorhood);
        });
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
        this.neighborhoodType = Utils.NEIGHBORHOOD_TYPE.VON_NEUMANN;
        
        
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
