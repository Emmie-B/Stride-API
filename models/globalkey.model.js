import mongoose from 'mongoose';

const globalkeySchema = new mongoose.Schema({
    holderId: {
        type: String,
        required: true
    },
    holdername: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    publickey:{
        type: String,
        required: true,
    }
    
},
{
    timestamps: true
}
);

const GlobalKey = mongoose.model('GlobalKey', globalkeySchema);

export default GlobalKey;