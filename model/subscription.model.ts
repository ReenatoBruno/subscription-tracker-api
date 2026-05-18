import mongoose, { type Document, type Types } from "mongoose";

interface ISubscription extends Document {
  name: string;
  price: number;
  currency: "USD" | "EUR" | "BRL";
  frequency: "Monthly" | "Quarterly" | "Semiannual" | "Yearly";
  category:
    | "Sports"
    | "News"
    | "Entertainment"
    | "Lifestyle"
    | "Technology"
    | "Finance"
    | "Politics"
    | "others";
  paymentMethod: string;
  status: "Active" | "Canceled" | "Expired";
  startDate: Date;
  renewalDate: Date;
  user: Types.ObjectId;
}

const subscriptionSchema = new mongoose.Schema<ISubscription>(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Price must be greater then 0"],
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "BRL"],
      default: "BRL",
    },
    frequency: {
      type: String,
      enum: ["Monthly", "Quarterly", "Semiannual", "Yearly"],
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Sports",
        "News",
        "Entertainment",
        "Lifestyle",
        "Technology",
        "Finance",
        "Politics",
        "others",
      ],
      required: true,
    },
    paymentMethod: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Canceled", "Expired"],
      default: "Active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start date must be in the past",
      },
    },
    renewalDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value: Date) {
          return value > (this as unknown as ISubscription).startDate;
        },
        message: "Renewal date must be after the start date",
      },
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

subscriptionSchema.pre("save", async function () {
  if (!this.renewalDate) {
    const renewalPeriods: { [key in ISubscription["frequency"]]: number } = {
      Monthly: 30,
      Quarterly: 90,
      Semiannual: 180,
      Yearly: 365,
    };
    const days = renewalPeriods[this.frequency];
    if (days) {
      this.renewalDate = new Date(this.startDate);
      this.renewalDate.setDate(this.renewalDate.getDate() + days);
    }
  }
  if (this.renewalDate < new Date()) {
    this.status = "Expired";
  }
});

const Subscription = mongoose.model<ISubscription>(
  "Subscription",
  subscriptionSchema,
);

export default Subscription;
