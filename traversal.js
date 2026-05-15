// walk down the state space

class node
{}

class StateSpace
{
    constructor(states, arcs)
    {
        this.states = states;
        this.arcs = arcs;
    }
}

let coordVector = [0, 1];
let centerVector = [0, 0];
const manhatttan = coordVector.reduce((sum, val, index) => {return sum + Math.abs(val - coordVector[index])}, 0);
console.log(manhatttan);