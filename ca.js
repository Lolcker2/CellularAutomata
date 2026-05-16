var Utils = require("./defs.js");



class CA
{
    CreateLattice()
    {
        let elem = this.stateSet[0];
        const sizes = Array(this.sizes[1]).fill(this.sizes[0]); // [5, 2] -> [5, 5]
        return Utils.hyperDimArray(sizes, this.stateSet[0]);
    }

    NeighborhoodSelection(coordVector, neighborhood)
    {
        const latticedNeighborhood = neighborhood.flatMap(neighbor => {
            try {
                const result = [Utils.atVec(this.lattice, neighbor)];
                return result;
            } catch {
                return Utils.Skip
            }
        }).filter(e=>e);
        Utils.UpdateHyperArray(this.temp_lattice, coordVector, this.stateSet[this.transitionFunction(Utils.atVec(this.lattice, coordVector), ...latticedNeighborhood)]); 
    }

    Step()
    {   
        //this.Print(Array(this.sizes[1]).fill(0), "haaaaaaaaaaaaaa");
        Utils.CartProducts(this.sizes[0], this.sizes[1], Utils.CHORD_TYPE.DIAMETER, Array(this.sizes[1]).fill(0)).forEach(coordVector => {
            const neighborhood = Utils.generateNeighborhood(this.sizes[1], this.neighborhood.Rad, this.neighborhood.Ntype, coordVector);
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
        this.neighborhood = new Utils.NEIGHBORHOOD(Utils.NEIGHBORHOOD_TYPE.MOORE, 1);
        
        this.lattice[4] = this.stateSet[1];
        
        console.log(`${this.lattice}`);
        for(var i = 0; i < 5; i++)
        {   
             this.Step();
            console.log(`${this.lattice}`);
        }
       
    }
}

// the format for a transition function is the current cell, and a spread ordered list of the neighboorhood
// whether the neighborhood is moore of von neuman will be determined by the selection of the elements of the ordered list
var gol = (x, ...args) => {let sum = args.reduce((partialSum, a) => partialSum + a, 0); console.log(sum); return (sum < 4 && (sum == 3 || (sum==2 && x)))?1:0;}
var states = ['.', '@'];
var rule30 = (x, ...args) => {args = args.map(e=>{return e == states[1]});x=(x==states[1]);return args[0] ^ (x || args[1])};

// gol
//var test = new CA([0, 1], [5, 2], gol);


// rule30
var test = new CA(states, [9, 1], rule30);

// get statespace
