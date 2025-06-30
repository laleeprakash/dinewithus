require('dotenv').config();
 
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');  
const prisma = new PrismaClient(); 

app.use(cors({
  origin: 'https://dinewith.netlify.app/',
  credentials: true
}));
app.use(express.json());
app.use(bodyParser.json({ limit: '10mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Create user and return JWT token
app.get("/",function(req,res){
     res.send("hello from localhots:3000")
})
app.get("/users",async function(req,res){
  const user = await prisma.user.findMany({
    select:{
      id:true,
      username:true,
      name:true
    }
  })
  res.status(201).send({
    user
  })
})
app.post('/signup', async (req, res) => {
  const { username, name, password, phone } = req.body;

  if (!username || !name || !password) {
    return res.status(400).send({ error: 'Please provide username, name, and password.' });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { username } });

    if (existingUser) {
      return res.status(400).send({ msg: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { username, name, phone, password: hashedPassword },
      select: { username: true, name: true },
    });

    const token = jwt.sign({ userId: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).send({
      message: 'User created successfully!',
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while creating the user.' });
  }
});

// Signin - authenticate the user and return JWT token
app.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ error: 'Please provide both username and password.' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(400).send({ error: 'Invalid credentials. User not found.' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).send({ error: 'Invalid credentials. Incorrect password.' });
    }

    const token = jwt.sign({ userId: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).send({
      message: 'Signed in successfully!',
      token,
      user: { id: user.id, username: user.username, name: user.name }, // Include user ID in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while signing in.' });
  }
});


app.post("/owner-signup", async function (req, res) {
  const { name, email, password } = req.body;

  // Input validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Please enter a valid email address." });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long." });
  }

  try {
    // Check if an owner with the same email already exists
    const existingOwner = await prisma.restaurant_owner.findUnique({
      where: { email },
    });

    if (existingOwner) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create the new owner
    const owner = await prisma.restaurant_owner.create({
      data: {
        name,
        email,
        password: hashedPassword, // Save the hashed password
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    // Return success response
    res.status(201).json({
      message: "Owner created successfully.",
      owner,
    });
  } catch (error) {
    console.error("Error creating owner:", error);
    res.status(500).json({ message: "An error occurred while creating the owner." });
  }
});





app.post("/owner-signin", async function (req, res) {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    // Find the owner by email
    const owner = await prisma.restaurant_owner.findUnique({
      where: { email },
    });

    // If owner doesn't exist, return an error
    if (!owner) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordCorrect = await bcrypt.compare(password, owner.password);

    // If the password is incorrect, return an error
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate a JWT (ensure JWT_SECRET is available in your environment)
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined!");
      return res.status(500).json({ message: "Internal server error." });
    }

    const token = jwt.sign(
      { id: owner.id, email: owner.email },
      process.env.JWT_SECRET, // Use a secret key from environment variables
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Return success response with the token (or just a success message)
    res.status(200).json({
      message: "Signin successful.",
      token, // Include the token in the response
      owner: {
        id: owner.id,
        name: owner.name,
        email: owner.email,
      },
    });
  } catch (error) {
    console.error("Error during signin:", error);
    res.status(500).json({ message: "An error occurred during signin." });
  }
});


app.get("/approvedrestaurant", async function(req, res) {
  try {
    const approvedrestaurant = await prisma.restaurant.findMany({
      where: {
        approval: 1, // Fetch only approved restaurants
      },
      select: {
        id: true,
        name: true,
        description: true,
        imageurl: true,
        location:true
      },
    });

    res.status(200).send({ approvedrestaurant }); // 200 OK for successful fetching
  } catch (error) {
    console.error("Error fetching approved restaurants:", error);
    res.status(500).send({ message: "Error fetching approved restaurants", error: error.message });
  }
});




app.get("/rejectedrestaurant", async function(req, res) {
  try {
    const rejectedRestaurants = await prisma.restaurant.findMany({
      where: {
        approval: 0, // Fetch only rejected restaurants (approval = 0)
      },
      select: {
        id: true,
        name: true,
        description: true,
        imageurl: true,
      },
    });

    res.status(200).send({ rejectedrestaurant: rejectedRestaurants });
  } catch (error) {
    console.error("Error fetching rejected restaurants:", error);
    res.status(500).send({ message: "Error fetching rejected restaurants", error: error.message });
  }
});



app.post('/addrestaurant/:id', async (req, res) => {  // Update the route to include the dynamic id in URL
  const { id } = req.params;  // Get ownerId from URL params
  const { name, location, description, imageurl } = req.body;

  console.log("Request Body:", req.body);  // Debugging
  console.log("Request Params:", req.params);  // Debugging

  // Validation check
  if (!name || !location || !imageurl) {
    return res.status(400).send({ error: 'Please provide name, location, description, and image URL.' });
  }

  try {
    // Check if ownerId is valid (Optional, depending on your logic)
    const owner = await prisma.restaurant_owner.findUnique({ where: { id: parseInt(id) } });
    if (!owner) {
      return res.status(404).send({ error: 'Owner not found.' });
    }

    // Create restaurant
    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        location,
        description,
        imageurl, 
        ownerId: parseInt(id)  // Ensure ownerId is a number
      }
    });

    res.status(201).send({ message: 'Restaurant added successfully!', restaurant });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while adding the restaurant.' });
  }
});
app.get("/restaurants/:id/dining", async (req, res) => {
  const { id } = req.params; // Get restaurant ID from URL params

  try {
    // Fetch all dining (tables) for this restaurant
    const diningOptions = await prisma.table.findMany({
      where: {
        restaurantId: parseInt(id), // Filter tables by restaurant ID
      },
    });

    if (diningOptions.length === 0) {
      return res.status(404).send({ message: "No dining options found for this restaurant." });
    }

    // Return the dining options in the response
    res.status(200).send({ diningOptions });
  } catch (error) {
    console.error("Error fetching dining options:", error);
    res.status(500).send({ error: "Error fetching dining options." });
  }
});


app.get('/restaurants/:id/checktable', async (req, res) => {
  const { id } = req.params;
  const { tableNumber } = req.query; // Get table number from query params

  try {
    // Query to check if a table already exists for the given restaurant
    const existingTable = await Table.findOne({
      restaurantId: id, // Assuming restaurantId is stored in Table model
      tableNumber: tableNumber, // Check if the table number exists for this restaurant
    });

    if (existingTable) {
      // If a table with the same tableNumber exists
      return res.json({ exists: true });
    } else {
      // If no table exists with the same tableNumber
      return res.json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking table:", error);
    return res.status(500).json({ message: "Error checking table number" });
  }
});



app.get('/restaurants/:ownerId', async (req, res) => {
  const { ownerId } = req.params;

  try {
    // Fetch all restaurants for the given ownerId
    const restaurants = await prisma.restaurant.findMany({
      where: { ownerId: parseInt(ownerId) }
    });

    if (!restaurants.length) {
      return res.status(404).send({ message: "No restaurants found for this owner." });
    }

    res.status(200).send({ restaurants });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error fetching restaurants.' });
  }
});


// Fetch all restaurants
app.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany({});
    res.status(200).send({restaurants });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while fetching restaurants.' });
  }
});

// POST route to add dining for a restaurant
app.post("/restaurants/:id/adddining", async (req, res) => {
  const { id } = req.params; // Get restaurant ID from URL params
  const { tableNumber, capacity } = req.body; // Get table number and capacity from request body

  try {
    // Parse tableNumber to an integer to match Prisma's expected data type
    const parsedTableNumber = parseInt(tableNumber, 10);
    const parsedCapacity = parseInt(capacity, 10);

    // Ensure the values are valid integers before inserting them into the database
    if (isNaN(parsedTableNumber) || isNaN(parsedCapacity)) {
      return res.status(400).send({ error: "Invalid table number or capacity." });
    }

    // Create a new dining (table) for the restaurant
    const add_dining = await prisma.table.create({
      data: {
        tableNumber: parsedTableNumber, // Use parsed integer value
        capacity: parsedCapacity,        // Use parsed integer value
        restaurantId: parseInt(id),      // Ensure restaurantId is an integer
      },
    });

    res.status(200).send({ message: "Dining option added successfully!", add_dining });
  } catch (error) {
    console.error("Error adding dining option:", error);
    res.status(500).send({ error: "Error adding dining option." });
  }
});



app.put('/user/update/:id', async function (req, res) {
  const { id } = req.params; // Extract user ID from the URL
  const { username, phone, name, password } = req.body;

  try {
    // Hash the new password if provided
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    // Update the user's profile
    const update = await prisma.user.update({
      where: {
        id: Number(id), // Ensure the ID is a number
      },
      data: {
        username,
        phone,
        name,
        password: hashedPassword, // Update password only if provided
      },
    });

    res.status(200).send({
      msg: 'Updated Successfully',
      user: update,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send({ msg: 'Failed to update profile' });
  }
});

app.get("/user/:id", async function (req, res) {
  const { id } = req.params; // Extract id from route parameters
  
  try {
    const user = await prisma.user.findFirst({
      where: { id: Number(id) }, // Assuming `id` is numeric; if it's a string, remove `Number(id)`
      select: {
        username: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Approve restaurant
app.put('/approverestaurant/:id', async (req, res) => {
  const { id } = req.params;  // Get restaurant id from URL params

  try {
    // Find the restaurant by ID and update its approval status to 'approved' (approval = 1)
    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: parseInt(id) },  // Ensure the ID is an integer
      data: { approval: 1 },  // Set approval to 1 (approved)
    });

    res.status(200).json({
      message: 'Restaurant approved successfully',
      restaurant: updatedRestaurant,
    });
  } catch (error) {
    console.error('Error approving restaurant:', error);
    res.status(500).json({ message: 'Error approving restaurant', error: error.message });
  }
}); 

// Reject restaurant
app.put('/rejected/:id', async (req, res) => {
  const { id } = req.params;  // Get restaurant id from URL params

  try {
    // Find the restaurant by ID and update its approval status to 'rejected' (approval = 0)
    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: parseInt(id) },  // Ensure the ID is an integer
      data: { approval: 0 },  // Set approval to 0 (rejected)
    });

    res.status(200).json({
      message: 'Restaurant rejected successfully',
      restaurant: updatedRestaurant,
    });
  } catch (error) {
    console.error('Error rejecting restaurant:', error);
    res.status(500).json({ message: 'Error rejecting restaurant', error: error.message });
  }
});

// Add admin endpoint
app.post('/add_admin', async (req, res) => {
  const { username, name, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the admin user
    const addadmin = await prisma.admin.create({ // Corrected model name
      data: {
        username,
        name,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        name: true,
      },
    });

    res.status(201).send({ addadmin });
  } catch (error) {
    console.error('Error creating admin:', error);

    // Handle unique constraint violation (e.g., duplicate username)
    if (error.code === 'P2002') {
      return res.status(400).send({ error: 'Username already exists.' });
    }

    res.status(500).send({ error: 'Failed to create admin.' });
  }
});

// Admin login endpoint
app.post('/adminlogin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: 'Please provide both email and password.' });
  }

  try {
    const admin = await prisma.admin.findUnique({ where: { username: email } }); // Corrected query

    if (!admin) {
      return res.status(400).send({ error: 'Invalid credentials. Admin not found.' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);

    if (!isPasswordCorrect) {
      return res.status(400).send({ error: 'Invalid credentials. Incorrect password.' });
    }

    // Token generation for admin (optional, based on your requirements)
    const token = jwt.sign({ adminId: admin.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).send({
      message: 'Signed in as admin successfully!',
      token,
      admin: { username: admin.username, name: admin.name },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while signing in as admin.' });
  }
});
app.get("/restaurant/:id", async function (req, res) {
  const { id } = req.params; // Extract id from request parameters

  // Check if the ID is a valid integer
  if (isNaN(parseInt(id))) {
    return res.status(400).send({ message: "Invalid restaurant ID" });
  }

  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id: parseInt(id), // Ensure the ID is parsed as an integer
      },
      select: {
        id: true, // Include the ID in the response
        name: true,
        location: true,
        description: true,
        imageurl: true,
        Rating: true,
      },
    });

    if (restaurant) {
      res.status(200).send(restaurant); // Successfully found the restaurant
    } else {
      res.status(404).send({ message: "Restaurant not found" }); // If no restaurant found
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" }); // Handle potential errors
  }
});


app.get("/:userId/bookedtable", async function (req, res) {
  const { userId } = req.params;

  try {
    const bookedTables = await prisma.booking.findMany({
      where: {
        customerId: parseInt(userId), // Ensure customerId is a number
      },
      select: {
        id: true,
        bookingDate: true,
        numberOfGuests: true,
        tableId: true,
        restaurant: {
          select: {
            name: true,
            location: true,
          },
        },
      },
    });

    if (!bookedTables.length) {
      return res.status(404).json({ message: "No bookings found for this user" });
    }

    return res.json(bookedTables);
  } catch (error) {
    console.error("Error fetching booked tables:", error);
    return res.status(500).json({ message: "An error occurred while fetching the booked tables." });
  }
});


app.get("/gets", async function(req,res){
    const all = await prisma.admin.findMany({})
    res.status(201).send({
      msg:"Got all values.....",
      all
    })
})


app.post("/feedback",async function(req,res){
  const {email,full_Name,message} = req.body;
  const messages = await prisma.feedback.create({
      data:{email,full_Name,message},
      select:{id:true,full_Name:true,message:true}
  })
  res.send({
    messages
  })
})

app.put("/updatestatus", async function (req, res) {
  try {
    const { tableId } = req.body;

    
    const find = await prisma.table.findUnique({
      where: {
        id: tableId,  
      },
    });
     if (find) {
     
      const update = await prisma.table.update({
        where: {
          id: tableId,  
        },
        data: {
          status: 1, 
        },
      });
      res.status(200).json({ msg: "Updated successfully", updatedBooking: update });
    } else {
      // If no booking is found with the given tableId
      res.status(404).json({ msg: "Booking not found" });
    }
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ msg: "Error updating booking status", error: error.message });
  }
});
app.put("/:userId/cancel-booking/:bookingId", async (req, res) => {
  const { userId, bookingId } = req.params;

  try {
    // Check if the booking belongs to the user
    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(bookingId) },
    });

    if (!booking || booking.customerId !== parseInt(userId)) {
      return res.status(404).json({ message: "Booking not found or unauthorized." });
    }

    // Update the table status to "available" (status: 0)
    const tableUpdate = await prisma.table.update({
      where: { id: booking.tableId },
      data: { status: 0 },
    });

    // Optionally, update the booking status to "cancelled" or delete it
    await prisma.booking.delete({
      where: { id: parseInt(bookingId) },
    });

    return res.status(200).json({ message: "Booking canceled successfully.", tableUpdate });
  } catch (error) {
    console.error("Error canceling the booking:", error);
    return res.status(500).json({ message: "An error occurred while canceling the booking." });
  }
});

app.post("/booking/:userId/:restaurantId", async function(req, res) {
  try {
    const { userId, restaurantId } = req.params;
    const { bookingDate, numberOfGuests, tableId } = req.body;

    // Ensure valid data
    if (!userId || !restaurantId || !bookingDate || !numberOfGuests || !tableId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Proceed with booking logic
    const add = await prisma.booking.create({
      data: {
        customerId: parseInt(userId),
        bookingDate: bookingDate,
        numberOfGuests: numberOfGuests,
        tableId: tableId,
        restaurantId:parseInt(restaurantId),
      }
    });

    res.json({ msg: "Booked successfully...", booking: add });
  } catch (error) {
    console.error("Error in booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.get("/:restaurantId/notify_restaurant", async function (req, res) {
  const { restaurantId } = req.params;

  try {
    const restaurant = await prisma.restaurant.findFirst({
      where: {
        id: parseInt(restaurantId),
        tables: {
          some: { status: 1 }, // Only return if at least one table is booked
        },
      },
      select: {
        id: true,
        name: true,
        location: true,
        imageurl:true,
        tables: {
          where: { status: 1 },
          select: {
            id: true,
            tableNumber: true,
            capacity: true,
          },
        },
      },
    });

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found or has no booked tables" });
    }

    res.json(restaurant);
  } catch (error) {
    console.error("Error fetching restaurant data:", error);
    res.status(500).json({ error: "Failed to fetch restaurant data" });
  }
});
app.get("/feedbacks",async function(req,res){
  const feedbacks = await prisma.feedback.findMany({})
  res.status(201).send({feedbacks})
})

app.get("/booked_table", async function(req, res) {
  const { restaurantId, bookingDate } = req.query;

  if (!restaurantId || !bookingDate) {
    return res.status(400).send("restaurantId and bookingDate are required.");
  }

  try {
    const find_booked_table = await prisma.booking.findMany({
      where: {
        restaurantId: parseInt(restaurantId),
        bookingDate: {
          equals: new Date(bookingDate),
        },
      },
      select: {
        tableId: true,
        status:true
      }
    });

    if (find_booked_table) {
      res.status(200).send(find_booked_table);
    } else {
      res.status(404).send("No booking found for this date and restaurant.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.get("/restaurants/:restaurantId/availability", async (req, res) => {
  try {
    const { bookingDate } = req.query;
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: parseInt(req.params.restaurantId) },
      include: {
        tables: {
          where: { status: 0 }, // Only available tables
          include: {
            bookings: {
              where: { bookingDate: new Date(bookingDate) }
            }
          }
        }
      }
    });

    const availableTables = restaurant?.tables.filter(table => 
      table.bookings.length === 0
    ) || [];
    
    res.json({ availableTables });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/restaurants/:restaurantId/tables", async (req, res) => {
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: parseInt(req.params.restaurantId) },
      include: { tables: true }
    });
    res.json({ tables: restaurant?.tables || [] });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
 

app.get("/owner/:id", async function (req, res) {
  const { id } = req.params; // Assuming the ownerId is passed in the URL
  try {
    const ownerData = await prisma.restaurant_owner.findUnique({
      where: {
        id: parseInt(id), // Ensure id is properly parsed as an integer
      },
      select: {
        // Select the fields from the restaurant_owner model
        name: true,
        email: true,
        restaurant: {
          where: {
            tables: {
              some: {
                status: 1, // Only include restaurants with tables that are booked (status 1)
              },
            },
          },
          select: {
            name: true,
            location: true,
            tables: {
              select: {
                id: true,
                tableNumber: true,
                capacity: true,
                status: true,
              },
            },
            bookings: {
              select: {
                customerId: true,
                bookingDate: true,
                tableId: true,
                user: {  // Fetch the user related to the booking
                  select: {
                    username: true,
                    name: true,
                    phone: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!ownerData) {
      return res.status(404).send("Owner not found");
    }

    res.json(ownerData); // Send the entire response to the client
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Server error");
  }
});
 
///////////////////////////////////////////
app.put("/tables/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Validate input
    if (isNaN(id)) {  // Fixed missing parenthesis
      return res.status(400).json({ 
        success: false,
        message: "Invalid table ID",
        details: `Received ID: ${id}`
      });
    }

    if (status !== 0 && status !== 1) {
      return res.status(400).json({ 
        success: false,
        message: "Status must be 0 (available) or 1 (booked)",
        receivedStatus: status
      });
    }

    // Check if table exists first
    const tableExists = await prisma.table.findUnique({
      where: { id: parseInt(id) }
    });

    if (!tableExists) {
      return res.status(404).json({
        success: false,
        message: "Table not found",
        tableId: id
      });
    }

    const updatedTable = await prisma.table.update({
      where: { id: parseInt(id) },
      data: { status },
      include: {
        restaurant: {
          select: {
            name: true,
            ownerId: true
          }
        }
      }
    });

    // Log the status change


    res.json({
      success: true,
      message: `Table status updated to ${status === 0 ? 'Available' : 'Booked'}`,
      data: updatedTable
    });

  } catch (error) {
    console.error("Error updating table status:", error);
    
    // More detailed error response
    res.status(500).json({ 
      success: false,
      message: "Failed to update table status",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
  console.log("Loaded DB URL:", process.env.DATABASE_URL);

});
