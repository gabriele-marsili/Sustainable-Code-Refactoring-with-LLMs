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
    const aa = this.a * this.a;
    const bb = this.b * this.b;
    const cc = this.c * this.c;
    return aa + bb === cc;
};

Triplet.where = function(params) {
    const triplets = [];
    const minFactor = params.minFactor || 1;
    const maxFactor = params.maxFactor;
    const targetSum = params.sum;
    
    for (let a = minFactor; a <= maxFactor; a++) {
        const aa = a * a;
        for (let b = a; b <= maxFactor; b++) {
            const bb = b * b;
            const cc = aa + bb;
            const c = Math.sqrt(cc);
            
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