import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
    name: string;
    age: number;
    email: string;
    batch: string;
    course: string;
    createdAt: Date;
    updatedAt: Date;
}

const studentSchema: Schema = new Schema({
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 1, max: 100 },
    email: { type: String, required: true, trim: true },
    batch: { type: String, required: true, trim: true },
    course: { type: String, required: true, trim: true }
}, {
    timestamps: true
});

const Student = mongoose.model<IStudent>('Student', studentSchema);

export default Student;