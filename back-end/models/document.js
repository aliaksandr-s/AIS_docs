class Document {
    constructor(obj) {
        this.name = obj && obj.name;
        this.date = obj && obj.date;
        this.status = obj && obj.status;
        this.url = obj && obj.url;
    }
}

module.exports.Document = Document;