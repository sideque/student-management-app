import { timeStamp } from 'console';
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
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    batch: { type: String, required: true },
    course: { type: String, required: true }
},{
    timestamps: true
})

const Student = mongoose.model<IStudent>('student',studentSchema)

export default Student;