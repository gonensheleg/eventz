const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    minlength:2,
    maxlength:60,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    unique: true,
    required: true
    },
  phone: String,
  token: String,
  password: {
    type: String,
    required: true,
    minlength:8,
    maxlength:1024
  },
  status: { type: Boolean , default: false}
},{
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);



//match: /pattern/
//enum: [array of valid strings] like ["shlomi","gonen"]
//required: function() {return this.status} that return boolean
/* A custom validateor
  validate: {
    type: Array,
    validate: function(v){
        return v && v.length > 0;
    },
    message: 'A course should have at least one tag'
  }
*/
