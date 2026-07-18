import mongoose, { type Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { toTitleCase } from "../utils/string.js";

export interface User extends Document {
  cpf: string;
  name: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<User>(
  {
    cpf: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
      trim: true,
      match: [/^\d{11}$/, "CPF must contain exactly 11 digits"],
    },
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
      set: toTitleCase,
    },
    email: {
      type: String,
      required: [true, "User e-mail is required"],
      unique: true,
      trim: true,
      lowercase: true,
      maxLength: [255, "E-mail must be at most 255 characters"],
      match: [/\S+@\S+\.\S+/, "Please, fill a valid e-mail address"],
    },
    password: {
      type: String,
      required: [true, "User password is required"],
      minLength: 60,
      maxLength: 60,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.plugin(mongoosePaginate);

const User = mongoose.model<User, mongoose.PaginateModel<User>>("User", userSchema);

export default User;
