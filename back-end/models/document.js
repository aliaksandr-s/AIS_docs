class Document {
    constructor(document) {
        this.name = document && document.name;
        this.date = document && document.date;
        this.status = document && document.status;
        this.url = document && document.url;
    }
}

module.exports.Document = Document;