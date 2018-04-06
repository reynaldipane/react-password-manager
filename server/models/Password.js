const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;
const timestamps    = require('mongoose-timestamp');

const passwordSchema = new Schema({
    url    : String,
    username : String,
    password : String,
    userid  : {
      type : Schema.Types.ObjectId, ref : 'User'
    },
})

passwordSchema.plugin(timestamps);

const Password = mongoose.model('Password', passwordSchema);

module.exports = Password;
