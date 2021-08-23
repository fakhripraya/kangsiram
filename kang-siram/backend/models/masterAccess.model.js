const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const masterAccessSchema = new Schema({
    AccessId: {
        type: String,
        required: true,
        unique: true
    },
    AccessName: {
        type: String,
        required: true,
        unique: true
    },
    isDelete: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

const MasterAccess = mongoose.model('dbMasterAccess', masterAccessSchema);

module.exports = MasterAccess;