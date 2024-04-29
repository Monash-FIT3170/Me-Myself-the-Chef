// import modules
const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

// add request body parser and cors middleware?
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// MongoDB stuff
const db = require("./models");
const dbConfig = require("./config/db.config");
const Role = db.role;
const AppUser = db.appuser;
const User = db.user;

const uri = "mongodb+srv://cheetah5i89:OwnLj9rEoEO0V0qo@testdatabase.486pb2d.mongodb.net/?retryWrites=true&w=majority&appName=TestDatabase";

db.mongoose
  .connect(uri, {
    // neither of these work
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
    testappuser();
    testadduser();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to me myself the chef application." });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// set port, listen for requests on port 8081
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


// function Type 1
// function initial() {
//   Role.estimatedDocumentCount((err, count) => {
//     if (!err && count === 0) {
//       new Role({
//         name: "user"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'user' to roles collection");
//       });

//       new Role({
//         name: "moderator"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'moderator' to roles collection");
//       });

//       new Role({
//         name: "admin"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'admin' to roles collection");
//       });
//     }
//   });
// }

// function 2
async function initial() {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count === 0) {
      await Promise.all([
        new Role({ name: "user" }).save(),
        new Role({ name: "moderator" }).save(),
        new Role({ name: "admin" }).save()
      ]);
      console.log("Roles added successfully.");
    } else {
      console.log("Roles already exist.");
    }
  } catch (err) {
    console.error("Error adding roles:", err);
  }
  
const userData = {
  username: "example_username",
  email: "example@example.com",
  password: "example_password",
  roles: ["user"] // or ["admin"] or any other roles you support
};

fetch('http://localhost:8080/api/auth/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(userData)
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  console.log('Signup successful:', data);
})
.catch(error => {
  console.error('Error during signup:', error);
});
}

async function testappuser() {
  try {
    const count = await AppUser.estimatedDocumentCount();
    if (count === 0) {
      await Promise.all([
        new AppUser({ name: "test", email: "testemail", password: "testpass" }).save(),
      ]);
      console.log("AppUser added successfully.");
    } else {
      console.log("AppUseralready exist.");
    }
  } catch (err) {
    console.error("Error adding AppUser:", err);
  }
}

async function testadduser() {
  try {
    const count = await AppUser.estimatedDocumentCount();
      await Promise.all([
        new User({ name: "test", email: "testemail", password: "testpass" }).save(),
      ]);
      console.log("User added successfully.");
  } catch (err) {
    console.error("Error adding User:", err);
  }
}