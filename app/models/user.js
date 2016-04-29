var mongoose = require('mongoose');
 
module.exports = mongoose.model('User',{
    twitter: {
        id: String,
	    token: String,
	    username: String,
	    displayName: String,
	    lastStatus: String
    }
});