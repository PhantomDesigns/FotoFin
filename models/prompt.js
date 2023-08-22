import mongoose, { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    foto: {
        type: String,
        required: [true, 'Foto is required.'],
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required.'],
    },
    promptTime: { 
        type : Date, 
        default: Date.now 
    },
    tag: {
        type: String,
        required: [true, 'Tag is required.'],
    }

});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;