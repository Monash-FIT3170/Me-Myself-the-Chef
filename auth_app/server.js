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
    // signInUser();
    // testappuser();
    // testadduser();
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

// Creates the roles if they don't already exist
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
}

// demonstrates use of the API

async function signupNewUser() {
  const userData = {
    username: "app_user12",
    email: "appuser0@example.com12",
    password: "appuser_pass10",
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
    return response.json().then(data => {
      throw new Error(data.message || 'Network response was not ok');
    });
  }
  return response.json();
})
.then(data => {
  console.log('Sign in successful:', data);
})
.catch(error => {
  console.error('Error during sign in:', error);
});
}


async function signInUser() {
  const userData = {
    username: "app_user12",
    password: "appuser_pass1",
  };


  fetch('http://localhost:8080/api/auth/signin', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(userData)
})
.then(response => {
  if (!response.ok) {
    return response.json().then(data => {
      throw new Error(data.message || 'Network response was not ok');
    });
  }
  return response.json();
})
.then(data => {
  console.log('SignIn successful:', data);
})
.catch(error => {
  console.error('Error during signup:', error);
});
}

// unverified function to test user
async function testUser(tokenValue) {
  fetch('http://localhost:8080/api/test/user', {
    method: 'POST',
    headers: {
      'x-access-token': tokenValue
    }
  }).then(response => {
    if (!response.ok) {
      console.log("Error response", response);
      throw new Error('Network response was not ok');
    }
    return response.json();
  }).then(data => {
    console.log('Test successful:', data);
  }).catch(error => {
    console.error('Error during signup:', error);
  });
}

// These functions add users directly without using the API

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