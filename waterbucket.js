var queue = []
var seen  = {}
var goal  = 0

function getState() {
	if (!queue) { return;}
    state = queue[0];
    queue = queue.slice(1);
    return state
};

function addState (parentState,newState) {
    if (newState in seen) {return;}
        seen[newState] = parentState;
        queue.push (newState);
};
	
function getSolution () {
    var solution = [];
    var state = queue[queue.length - 1];
    while (state){
    	solution.push (state);
        state = getParent(state);
	}
    solution.reverse()
    return solution
};

function getParent (childState) {
    if (true) {return seen[childState]}
    else {return;}
};
    
function test (oldstate, newstate) {
    var newA = newstate[0];
    var newB = newstate[1];
    won = (newA == goal || newB == goal);
    addState (oldstate, newstate)
    return won
};

function playGame (aMax, bMax, goal1) {
    goal = goal1;
    addState("", [0,0])   // start with 2 empty buckets
    while (true) {
        oldstate = getState();
        var aHas = oldstate[0];
	    var bHas = oldstate[1];
        if (test (oldstate, [aMax,bHas])) {break;} // fill A from well
        if (test (oldstate, [0,bHas])) {break;} // empty A to well
        if (test (oldstate, [aHas,bMax])) {break;} // fill B from well
        if (test (oldstate, [aHas,0])) {break;} // empty B to well
        howmuch = Math.min(aHas, bMax-bHas)
        if (test (oldstate, [aHas-howmuch,bHas+howmuch])) {break;} // pour A to B
        howmuch = Math.min(bHas, aMax-aHas)
        if (test (oldstate, [aHas+howmuch,bHas-howmuch])) { break;} // pour B to A
	}

    console.log("Solution is ")
    console.log (getSolution().join('\n'))
    
};

playGame(7,11,6)
