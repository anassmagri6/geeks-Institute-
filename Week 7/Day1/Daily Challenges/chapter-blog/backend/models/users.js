import mongoose from 'mongoose'; 

const userschema = new mongoose.Schema({
    name: {
       type: String,
       required: true,
       trim : true,

    },
    email : {
       type: String,
        required: true,
        unique: true,
        trim :true,
        lowercase: true,
    },
    passwordHash : {
      type: String,
      required: true,
      select: false,
    },
    role : {
        type: String,
        required: true,
        enum: ['admin', 'user'],
        default: 'user',
    },
    }
    );
export default mongoose.model('User', userschema); 


    
    


    