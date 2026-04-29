let Enum = Object.freeze

const TOPOLOGY_TYPE = Enum({
    RECT: 0,
    TOR: 1
});


const chord_TYPE = Enum({
    RADIUS: 0,
    DIAMETER: 1
});


// given a chord and a number of dimentions
// generates all cartesian products within the specified chord,
// the cord is treated differently depending on whether its a radius or a diameter
// if it's a diameter the products are treated as absolute while for a radius they're
//  treated as relative offsets from the midpoint

const CartProducts = (chord, dim, chordType) => 
{   
    const radius = chordType === chord_TYPE.RADIUS ? chord : Math.floor(chord/2)
    const LineOffset = Array.from({ length: chord%2? radius*2+1 :radius*2 }, (_, i) => chordType === chord_TYPE.RADIUS ? i - radius: i);
    switch(dim)
    {
        case 1:
            return LineOffset;
        case 2:
            return LineOffset.flatMap(x => LineOffset.map(y => [x, y]));
        case 3:
            return LineOffset.flatMap(x => LineOffset.map(y => LineOffset.map(z => [x, y, z]))).flat();
    }
}




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
        CartProducts(this.sizes[0], this.sizes[1], chord_TYPE.DIAMETER).forEach(coordVector => {
            console.log(coordVector);
        });
    }

    constructor(stateSet, sizes, transitionFunction) //neighborhood, transition
    {
        // field initialization
        this.stateSet = stateSet;
        this.transitionFunction = transitionFunction;
        this.sizes = sizes;

        this.top = TOPOLOGY_TYPE.RECT; // torus or sqaure

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
