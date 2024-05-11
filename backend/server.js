const express = require("express");
const path = require("path");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

var corsOptions = {
    origin: "http://localhost:8081"
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "frontend", "src", "views"));

// Serve static files from the public directoryd
app.use(express.static(path.join(__dirname, "public")));
app.use(cors(corsOptions));
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// MongoDB stuff
const db = require("../backend/models");
const dbConfig = require("../backend/config/db.config");
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
    (async () => {
      try {
        // signupNewUser();
        const data = await signInUser();
        testUser(data.accessToken);
        // updateSearchHistory(data.accessToken);
        // console.log(data);
        // testadduser();  
      } catch (error) {
          console.error("Sign In error:", error);
      }
    })();
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
  require('../backend/routes/auth.routes')(app);
  require('../backend/routes/user.routes')(app);

app.get("/api/page1data", async (req, res) => {
    res.json([1,2,3,4,5])
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// demonstrates use of the API

async function signupNewUser() {
  const userData = {
    username: "testuser3",
    email: "testuser3@email.com",
    password: "testuser3",
    roles: ["user"] // or ["admin"] or any other roles you support
  };


  return fetch('http://localhost:8080/api/auth/signup', {
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
    username: "testuser",
    password: "testuser",
  };

  // returns the promise?
  return fetch('http://localhost:8080/api/auth/signin', {
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
    return data;
  })
  .catch(error => {
    console.error('Error during signin:', error);
  });
}



// unverified function to test user
async function testUser(tokenValue) {
  fetch('http://localhost:8080/api/test/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': tokenValue
    }
  }).then(response => {
    if (!response.ok) {
      return response.text().then(data => {
        console.error('Error response from server:', data);
        throw new Error(data || 'Network response was not ok');
      });
    }
    return response.text();
  }).then(data => {
    console.log('Test successful: ', data);
  }).catch(error => {
    console.error('Error during testuser:', error);
  });
}

async function updateSearchHistory(tokenValue){

  const history = {
    date: "01/01/2000",
    entry: "Cream of Muhroom Soup"
  };

  fetch('http://localhost:8080/api/auth/updateSearchHistory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': tokenValue
    },
    body: JSON.stringify(history)
  })
  .then( response => {
    if (!response.ok) {
      return response.text().then(data => {
        console.error('Error response from server:', data);
        throw new Error(data || 'Network response was not ok');
      });
    }
    return response.text();
  }).then(data => {
    console.log('Search History Update successful: ', data);
  }).catch(error => {
    console.error('Error during Update Search History:', error);
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