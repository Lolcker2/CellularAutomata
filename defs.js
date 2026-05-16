exports.Enum = Object.freeze
exports.Skip = []
exports.Noop = () => {}

exports.TOPOLOGY_TYPE = exports.Enum({
    RECT: 0,
    TOR: 1
});

exports.CHORD_TYPE = exports.Enum({
    RADIUS: 0,
    DIAMETER: 1
});

exports.NEIGHBORHOOD_TYPE = exports.Enum({
    MOORE: 0,
    VON_NEUMANN: 1,
    COSTUM: 2
});


class NEIGHBORHOOD
{
    constructor(Ntype, Rad)
    {
        this.Ntype = Ntype;
        this.Rad = Rad;
    }
}

exports.NEIGHBORHOOD = NEIGHBORHOOD;

// given a chord and a number of dimentions
// generates all cartesian products within the specified chord,
// the cord is treated differently depending on whether its a radius or a diameter
// if it's a diameter the products are treated as absolute while for a radius they're
//  treated as relative offsets from the midpoint

exports.CartProducts = (chord, dim, chordType, centerVector) =>
{   
    const radius = chordType === exports.CHORD_TYPE.RADIUS ? chord : Math.floor(chord/2)
    const LineOffset = Array.from({ length: chord%2? radius*2+1 :radius*2 }, (_, i) => chordType === exports.CHORD_TYPE.RADIUS ? i - radius: i);
    switch(dim)
    {
        case 1:
            return LineOffset.map(element => {return parseInt(element) + parseInt(centerVector)});
        case 2:
            return LineOffset.flatMap(x => LineOffset.map(y => [x + centerVector[0], y + centerVector[1]]));
        case 3:
            return LineOffset.flatMap(x => LineOffset.map(y => LineOffset.map(z => [x + centerVector[0], y + centerVector[1], z + centerVector[2]]))).flat();
    }
}

exports.hyperDimArray = (sizes, fillValue) =>
{
    if (sizes.length === 0) return fillValue;
    
    const [currentSize, ...remainingSizes] = sizes;
    
    return Array.from({ length: currentSize }, () => 
        exports.hyperDimArray(remainingSizes, fillValue)
    );
}

exports.atVec = (arr, coordVector) =>
{   
    if(Array.isArray(coordVector))
        return coordVector.reduce((current, coord) => current[coord], arr);
    return  arr[coordVector];
}

exports.UpdateHyperArray = (arr, indices, newValue) => {

     if(!Array.isArray(indices))
     {
        arr[indices] = newValue;
        return;
     }

    // get the last index
    const lastIndex = indices[indices.length - 1];
    const parentIndices = indices.slice(0, -1);

    // reduce until reached the last list
    const parent = exports.atVec(arr, parentIndices);
  
    parent[lastIndex] = newValue;
}

exports.generateNeighborhood = (dim, rad, neighboorhoodType, centerVector) =>
{   
    return exports.CartProducts(rad, dim, exports.CHORD_TYPE.RADIUS, centerVector).flatMap(coordVector => 
    {                   
            const manhatttan = dim == 1? Math.abs(coordVector - centerVector) :
            coordVector.reduce((sum, val, index) => {return sum + Math.abs(val - centerVector[index])}, 0);

            if(manhatttan == 0) {return exports.Skip;} // because of this
            
            switch(neighboorhoodType)
            {
                case exports.NEIGHBORHOOD_TYPE.MOORE:
                    return [coordVector];
                break;
                
                case exports.NEIGHBORHOOD_TYPE.VON_NEUMANN:
                    return manhatttan <= rad? [coordVector] : exports.Skip;
                break;

                default:
                    return exports.Skip;
                break;
            }
    });
}

exports.printarr = (arr, message) =>
{
    console.log(message);
    arr.forEach(element => {
        console.log(element);
    });
}