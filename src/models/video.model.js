import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema=new mongoose.Schema({
    videoFile:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    thumbnail:{
        type:String,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    title:{
        type:String,
        unique:true,
        required:true,
        index:true,
    },
    description:{
        type:String,
    },
    duration:{
        type:Number,
        required:true,  
    },
    views:{
        type:Number,
        required:true,
        default:0,  
    },
    isPublished:{
        type:Boolean,
        required:true,  
        default:true,
    }
},{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model('Video',videoSchema)