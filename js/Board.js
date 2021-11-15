class Board {
    constructor (x, y, w, h, image) {
        this.image = image;
        this.width = w;
        this.height = h;

        this.body = Bodies.rectangle (x, y, this.width, this.height, {isStatic : true});
        World.add (world, this.body);
    }

    display () {
        var pos = this.body.position;

        push ();
        imageMode (CENTER);
        image (this.image, pos.x, pos.y, this.width, this.height);
        pop ();
    }

    /*remove (index) {
        Matter.World.remove (world, this.body);
        delete boardA [index];
    }*/
}