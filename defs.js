let Enum = Object.freeze

const TOPOLOGY_TYPE = Enum({
    RECT: 0,
    TOR: 1
});


const CHORD_TYPE = Enum({
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
    const radius = chordType === CHORD_TYPE.RADIUS ? chord : Math.floor(chord/2)
    const LineOffset = Array.from({ length: chord%2? radius*2+1 :radius*2 }, (_, i) => chordType === CHORD_TYPE.RADIUS ? i - radius: i);
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



const hood = (dim, rad) =>
{
    CartProducts(rad, dim, CHORD_TYPE.RADIUS).forEach(coordVector => {
            console.log(coordVector);
            const manhatttan = coordVector.reduce((partialSum, a) => partialSum + a, 0);
            /*         if manhattan_dist == 0: 
            continue  # Skip the root cell (origin)
            
        if mode == "moore":
            offsets.append(delta)
        elif mode == "von_neumann" and manhattan_dist <= radius:
            offsets.append(delta) */

    });
}


module.exports = {hood, CHORD_TYPE, CartProducts, TOPOLOGY_TYPE, Enum}