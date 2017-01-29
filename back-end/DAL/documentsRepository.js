const pmongo = require('promised-mongo');
const config = require('../config/configApp')
const db = pmongo(config.dbURI);

class DocumentsRepository {
    static getAllDocuments() {
        return db.users.aggregate({
            $unwind: "$docs"
        }, {
            $project: {
                "ownerId": "$_id",
                "_id": 0,
                "ownerName": "$name",
                "ownerEmail": "$email",
                "documentInfo": "$docs"
            }
        });
    }

    static getUserDocuments(userId) {
        return db.users.aggregate({
            $match: {
                "_id": pmongo.ObjectId(userId)
            }
        }, {
            $unwind: "$docs"
        }, {
            $project: {
                "ownerId": "$_id",
                "_id": 0,
                "ownerName": "$name",
                "ownerEmail": "$email",
                "documentInfo": "$docs"
            }
        });
    }

    static uploadDocument(userId, document) {
        return db.users.findAndModify({
            query: {
                _id: pmongo.ObjectId(userId)
            },
            update: {
                $push: {
                    docs: document
                }
            }
        });
    }
}

module.exports.DocumentsRepository = DocumentsRepository;