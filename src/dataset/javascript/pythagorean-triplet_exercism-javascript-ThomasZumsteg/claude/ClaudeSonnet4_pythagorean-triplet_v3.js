var Triplet = function(a, b, c) { 
    this.a = a; 
    this.b = b; 
    this.c = c; 
};

Triplet.prototype.sum = function() { 
    return this.a + this.b + this.c; 
};

Triplet.prototype.product = function() { 
    return this.a * this.b * this.c; 
};

Triplet.prototype.isPythagorean = function() {
    return (this.a * this.a) + (this.b * this.b) === (this.c * this.c);
};

Triplet.where = function(params) {
    const triplets = [];
    const minFactor = params.minFactor || 1;
    const maxFactor = params.maxFactor;
    const targetSum = params.sum;
    
    for (let a = minFactor; a <= maxFactor; a++) {
        const aSquared = a * a;
        
        for (let b = a; b <= maxFactor; b++) {
            const bSquared = b * b;
            const cSquared = aSquared + bSquared;
            const c = Math.sqrt(cSquared);
            
            if (c === Math.floor(c) && c >= b && c <= maxFactor) {
                if (!targetSum || (a + b + c === targetSum)) {
                    triplets.push(new Triplet(a, b, c));
                }
            }
        }
    }
    
    return triplets;
};

export default Triplet;