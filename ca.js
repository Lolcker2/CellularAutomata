var utils = require("./defs.js");



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


    NeighborhoodSelection()
    {


        try {
        // Risky code you want to ignore if it fails
        riskyAction();
        } catch {
        // Empty block: execution just continues after this
        }

    }


    Run()
    {   
        utils.CartProducts(this.sizes[0], this.sizes[1], utils.CHORD_TYPE.DIAMETER).forEach(coordVector => {
            console.log(coordVector);
        });
    }

    constructor(stateSet, sizes, transitionFunction) //neighborhood, transition
    {
        // field initialization
        this.stateSet = stateSet;
        this.transitionFunction = transitionFunction;
        this.sizes = sizes;

        this.top = utils.TOPOLOGY_TYPE.RECT; // torus or sqaure

        this.lattice = this.CreateLattice();
        console.log(this.lattice);
        this.Run();
    }
}

// the format for a transition function is the current cell, and a spread ordered list of the neighboorhood
// whether the neighborhood is moore of von neuman will be determined by the selection of the elements of the ordered list
var gol = (x, ...args) => {let sum = args.reduce((partialSum, a) => partialSum + a, 0); return sum == 3 || (sum==2 && x);}


var test = new CA([0, 1], [3, 2], gol);

// changing [5, 5] to [5, 2] and [5, 5, 5] to [5, 3]
// make run work
// get wrapp done
// test

// get statespace
