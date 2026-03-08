
// CA = {d, s, n, f}

class CA
{
    CreateLattice()
    {
        let elem = this.states[0];

        this.size.forEach(dim => {
            elem = Array(dim).fill(elem);
        });
        return elem;
    }

    Run()
    {
        let agg = this.size.reduce((partialMul, a) => partialMul * a, 1);
        let indecies = Array(this.size).fill(0);
        for(let i = 0; i < agg; i++)
        {
            
            for(let j = 0; j < indecies.length -1; j++)
            {
                if(indecies[j] == this.size[j])
                {
                    indecies[j] = 0;
                    indecies[j+1]++;
                }
            }
            indecies[0]++
        }
    }

    constructor(states, size, transition) //neighborhood, transition
    {
        this.wrapp = true; // torus or sqaure
        this.states = states;
        this.transition = transition;
        this.size = size;
        this.lattice = this.CreateLattice();
        console.log(this.lattice);
    }
}


var gol = (x, ...args) => {let sum = args.reduce((partialSum, a) => partialSum + a, 0); return sum == 3 || (sum==2 && x);}


var test = new CA([0, 1], [5, 5], gol);

// make run work
// get wrapp done
// test

// get statespace
