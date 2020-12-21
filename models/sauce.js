const mongoose = require('mongoose');
const { stringify } = require('querystring');

const sauceschema = mongoose.Schema({
    id: { type: mongoose.Types.ObjectId, require: true },
    userId: { type: String, require: true },
    name: { type: String, require: true },
    manufacturer: { type: String, require: true },
    description: { type: String, require: true },
    mainPepper: { type: String, require: true },
    imageUrl: { type: String, require: true },
    heat: { type: Number, require: true },
    likes: { type: Number, require: true },
    dislikes: { type: Number, require: true },
    usersLiked: { type: [String], require: true },
    usersDisliked: { type: [String], require: true }
});

module.exports = mongoose.model('sauce', sauceschema);