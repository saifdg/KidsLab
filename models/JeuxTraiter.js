const mongoose = require('mongoose');

const JeuxTraiterSchema  = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    jeuxTraiter:[
        {
            jeux:{
                type:String
            }
        }
    ],
    fault:[
        {
            fault:{
                type:String
            },
            type:{type:String}
        }
    ]
    
    
})

module.exports = JeuxTraiter = mongoose.model('JeuxTraiter', JeuxTraiterSchema);