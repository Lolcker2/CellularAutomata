var Utils = require("./defs.js");



class CA
{
    CreateLattice()
    {
        let elem = this.stateSet[0];
        const sizes = Array(this.sizes[1]).fill(this.sizes[0]);
        sizes.forEach(dim => {
            elem = Array(dim).fill(elem);
        });
        return elem;
    }


    NeighborhoodSelection(coordVector, neighboorhood)
    {
        const latticedNeighborhood = neighborhood.flatMap(neighbor => {
            try {
                return [neighbor.reduce((current, coord) => current[coord], this.lattice)];
            } catch {
                return Utils.Skip;
            }
        });


            /* 
    
    const lastIndex = indices[indices.length - 1];
const parentIndices = indices.slice(0, -1);

// 2. Navigate to the parent container
const parent = parentIndices.reduce((current, index) => current[index], multiArray);

// 3. Modify the original array using the last index
parent[lastIndex] = newValue;

    */

       // coordVector.reduce((current, coord) => current[coord], this.lattice) = Utils.Noop // apply the transition
    }


    Step()
    {   
        Utils.CartProducts(this.sizes[0], this.sizes[1], Utils.CHORD_TYPE.DIAMETER).forEach(coordVector => {
            console.log(coordVector);
            const neighboorhood = Utils.generateNeighborhood(2, 1, Utils.NEIGHBORHOOD_TYPE.VON_NEUMANN, coordVector);
            this.NeighborhoodSelection(coordVector, neighboorhood);
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
    }
}

// the format for a transition function is the current cell, and a spread ordered list of the neighboorhood
// whether the neighborhood is moore of von neuman will be determined by the selection of the elements of the ordered list
var gol = (x, ...args) => {let sum = args.reduce((partialSum, a) => partialSum + a, 0); return sum == 3 || (sum==2 && x);}


//var test = new CA([0, 1], [5, 2], gol);


const l = [[1, 2], [3, 4]];
console.log(l[...[0, 1]]);

// changing [5, 5] to [5, 2] and [5, 5, 5] to [5, 3]
// make Step work
// get wrapp done
// test

// get statespace
