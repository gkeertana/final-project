// scripts/data.mjs
import dotenv from "dotenv";
import path   from "path";
import mongoose from "mongoose";

// 1) Load your .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// 2) Grab the URI
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error("Please set MONGO_URI in .env.local");
}

// 3) Connect to MongoDB
await mongoose.connect(MONGO_URI, {
  bufferCommands: false,
  maxIdleTimeMS: 10000,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 20000,
});
console.log("✅ Connected to MongoDB");

// 4) Define a minimal schema (matching your app)
const locationSchema = new mongoose.Schema({
  address:     String,
  street:      String,
  zipcode:     String,
  borough:     String,
  cuisine:     String,
  grade:       String,
  name:        String,
  on_wishlist: [String],
  location_id: String,
});

// 5) Model
const Location = mongoose.models.locations ||
                 mongoose.model("locations", locationSchema);

// 6) Your 10 test records
const sampleLocations = [
  { address:"123 Main St",   street:"Main St",   zipcode:"10001", borough:"Manhattan",   cuisine:"Italian",      grade:"A", name:"Mama Mia Pizzeria",    on_wishlist:[], location_id:"loc-001" },
  { address:"456 Elm Ave",    street:"Elm Ave",  zipcode:"11211", borough:"Brooklyn",    cuisine:"Thai",         grade:"B", name:"Bangkok Bistro",        on_wishlist:[], location_id:"loc-002" },
  { address:"789 Oak Blvd",   street:"Oak Blvd", zipcode:"10453", borough:"Bronx",       cuisine:"Chinese",      grade:"A", name:"Golden Dragon",         on_wishlist:[], location_id:"loc-003" },
  { address:"101 Pine St",    street:"Pine St",  zipcode:"11101", borough:"Queens",      cuisine:"Mexican",      grade:"B", name:"La Fiesta",             on_wishlist:[], location_id:"loc-004" },
  { address:"202 Cedar Rd",   street:"Cedar Rd", zipcode:"10002", borough:"Manhattan",   cuisine:"Japanese",     grade:"A", name:"Sushi World",           on_wishlist:[], location_id:"loc-005" },
  { address:"303 Birch Ln",   street:"Birch Ln", zipcode:"11206", borough:"Brooklyn",    cuisine:"Indian",       grade:"A", name:"Curry House",           on_wishlist:[], location_id:"loc-006" },
  { address:"404 Maple Ave",  street:"Maple Ave",zipcode:"10457", borough:"Bronx",       cuisine:"Greek",        grade:"B", name:"Olympia Taverna",       on_wishlist:[], location_id:"loc-007" },
  { address:"505 Walnut St",  street:"Walnut St",zipcode:"11102", borough:"Queens",      cuisine:"French",       grade:"A", name:"Le Petit Café",         on_wishlist:[], location_id:"loc-008" },
  { address:"606 Cherry Blvd",street:"Cherry Blvd",zipcode:"10003", borough:"Manhattan", cuisine:"Mediterranean",grade:"A", name:"Mediterraneo",         on_wishlist:[], location_id:"loc-009" },
  { address:"707 Poplar Rd",  street:"Poplar Rd",zipcode:"11216", borough:"Brooklyn",    cuisine:"American",     grade:"B", name:"Burger Barn",           on_wishlist:[], location_id:"loc-010" },
];

// 7) Clear existing docs
await Location.deleteMany({});
console.log("🧹 Cleared old locations");

// 8) Insert samples
const inserted = await Location.insertMany(sampleLocations);
console.log(`🌱 Seeded ${inserted.length} locations`);

// 9) Disconnect & exit
await mongoose.disconnect();
process.exit(0);
