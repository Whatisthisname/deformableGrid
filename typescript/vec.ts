/**
 * methods with prefixed with '_' work in-place
 */
class vec {
    x : number
    y : number
    constructor(x: number, y:number) {
        this.x = x
        this.y = y
        return this
    }

    neg() {
        return new vec(-this.x, -this.y)
    }

    add(vec1 : vec) {
        return new vec(vec1.x + this.x, vec1.y + this.y)
    }

    sub(vec1 : vec) {
        return this.add(vec1.neg())
    }

    dot(vec1 : vec) {
        return vec1.x * this.x + vec1.y * this.y
    }

    length() {
        return Math.sqrt(this.dot(this))
    }

    unit() {
        return this.scale(1.0 / this.length())
    }

    scale(scalar : number) {
        return new vec(this.x * scalar, this.y * scalar)
    }

    lerp (vec1 : vec, t : number = 0) {
        return this.scale(1-t).add(vec1.scale(t))
    }

    _neg() {
        this.x *= -1
        this.y *= -1
    }

    _add(vec1 : vec) {
        this.x += vec1.x
        this.y += vec1.y
    }

    _scale(scalar : number) {
        this.x *= scalar 
        this.y *= scalar
        return this;
    }

    _lerp (vec1 : vec, t = 0) {
        this._scale(1-t)._add(vec1.scale(t))
        return this;
    }

    _unit() {
        let length = this.length()
        this.x *= 1.0/length
        this.y *= 1.0/length
        return this;
    }

}


function shuffle(array : any[]) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }