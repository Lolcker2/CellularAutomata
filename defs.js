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


// given a chord and a number of dimentions
// generates all cartesian products within the specified chord,
// the cord is treated differently depending on whether its a radius or a diameter
// if it's a diameter the products are treated as absolute while for a radius they're
//  treated as relative offsets from the midpoint

exports.CartProducts = (chord, dim, chordType, centerVector) => // problematic [0, 1] doesnt have [1, 0]
{   
    const radius = chordType === exports.CHORD_TYPE.RADIUS ? chord : Math.floor(chord/2)
    const LineOffset = Array.from({ length: chord%2? radius*2+1 :radius*2 }, (_, i) => chordType === exports.CHORD_TYPE.RADIUS ? i - radius: i);
    switch(dim)
    {
        case 1:
            return LineOffset.map(element => element + centerVector);
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
    return coordVector.reduce((current, coord) => current[coord], arr);
}

exports.UpdateHyperArray = (arr, indices, newValue) => {
    // get the last index
    const lastIndex = indices[indices.length - 1];
    const parentIndices = indices.slice(0, -1);

    // reduce until reached the last list
    const parent = exports.atVec(arr, parentIndices);
  
    parent[lastIndex] = newValue;
}

 // problematic [0, 1] doesnt have [1, 0] in moores
exports.generateNeighborhood = (dim, rad, neighboorhoodType, centerVector) =>
{   
    const manhatttanCenter = centerVector.reduce((partialSum, a) => partialSum + Math.abs(a), 0); // there is a problem with the calculation
    console.log(`total: ${exports.CartProducts(rad, dim, exports.CHORD_TYPE.RADIUS, centerVector)}`);
    return exports.CartProducts(rad, dim, exports.CHORD_TYPE.RADIUS, centerVector).flatMap(coordVector => 
    {       
            const manhatttan = coordVector.reduce((partialSum, a) => partialSum + Math.abs(a), 0);
            if(manhatttan == manhatttanCenter) {return exports.Skip;} // because of this
            
            switch(neighboorhoodType)
            {
                case exports.NEIGHBORHOOD_TYPE.MOORE:
                    console.log(`moore ${coordVector}`);
                    return [coordVector];
                break;
                
                case exports.NEIGHBORHOOD_TYPE.VON_NEUMANN:
                    return manhatttan-manhatttanCenter <= rad? [coordVector] : exports.Skip;
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