import mongoose from "mongoose";
mongoose.set('strictQuery', false);


const ProductSchema = new mongoose.Schema({
    title: {
        type:String,
        require:true,
        maxlength:60
    },
    desc: {
        type:String,
        require:true,
        maxlength:200
    },
    img: {
        type: String,
        require: true,
    },
    prices: {
        type: [Number],
        require: true,
    },
    extraOptions: {
        type: [
            {
                text:{type: String, required: true},
                price:{type: Number, required: true}
            }
        ]
    }
},
//{timestamps: true}
);

export default  mongoose.models.Product || mongoose.model("Product", ProductSchema)
