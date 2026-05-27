import { changeCurrentPassword } from "./src/controllers/user.controller";
import { User } from "./src/models/user.model";

// register api
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  return res.status(200).json(user);
});

//login api
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User Not Found",
    });
  }

  if (user.password !== password) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  return res.status(200).json({
    message: "Login Sucessfully",
  });
});

// fetch product api
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


//add product to cart 

const cartSchema = new mongoose.Schema({
  userId: String,
  productId: String,
  quantity: {
    type: Number,
    default: 1
  }
});

const Cart = mongoose.model("Cart", cartSchema);


app.post("/api/cart", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cartItem = await Cart.create({
      userId,
      productId,
      quantity: 1
    });

    res.status(201).json({
      success: true,
      message: "Product added to cart",
      cartItem
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});
