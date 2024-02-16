const DB = "alten"
const collection = "products"
const file_path = path.join(__dirname, "products.json")

const products = EJSON.parse(fs.readFileSync(file_path))
db.getSiblingDB(DB).getCollection(collection).insertMany(products)
