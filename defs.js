let Enum = Object.freeze

const TOPOLOGY_TYPE = Enum({
    RECT: 0,
    TOR: 1
});



class CA
{
    CreateLattice()
    {
        //this.size is a index-dim pair where
        // index is the ordinal number of the dimension
        // dim is the size along that dimension
        let elem = this.stateSet[0];

        this.sizes.forEach(dim => {
            elem = Array(dim).fill(elem);
        });
        return elem;
    }

    Run()
    {   
        // agg is the total number of cells in the multi-dim grid
        let agg = this.sizes.reduce((partialMul, a) => partialMul * a, 1);
        let indecies = Array(this.sizes).fill(0); // coord vector

        //foreach
        for(let i = 0; i < agg; i++)
        {
            
            // updating coords
            for(let j = 0; j < indecies.length -1; j++)
            {
                if(indecies[j] == this.sizes[j])
                {
                    indecies[j] = 0;
                    indecies[j+1]++;
                }
            }
            indecies[0]++
        }
    }

    constructor(stateSet, sizes, transitionFunction) //neighborhood, transition
    {
        // field initialization
        this.stateSet = stateSet;
        this.transitionFunction = transitionFunction;
        this.sizes = sizes;

        this.top = TOPOLOGY_TYPE.RECT; // torus or sqaure

        this.lattice = this.CreateLattice();
    }
}

// the format for a transition function is the current cell, and a spread ordered list of the neighboorhood
// whether the neighborhood is moore of von neuman will be determined by the selection of the elements of the ordered list
var gol = (x, ...args) => {let sum = args.reduce((partialSum, a) => partialSum + a, 0); return sum == 3 || (sum==2 && x);}


var test = new CA([0, 1], [5, 5], gol);


// make run work
// get wrapp done
// test

// get statespace
