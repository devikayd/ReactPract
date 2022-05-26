class Places {
    constructor(imageUri, title, address, location){
        this.title = title,
        this.address = address,
        this.location = location,
        this.imageUri = imageUri,
        this.id = new Date().toString() + Math.random().toString();

    }
}

