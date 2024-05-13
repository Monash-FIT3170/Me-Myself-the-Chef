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
const SearchHistory = db.searchhistory
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

        // await signupNewUser();
        const data = await signInUser();
        // testUser(data.accessToken);
        // updateSearchHistory(data.accessToken);
        updatePreferences(data.accessToken);
        // console.log(data);
        // testadduser(); 
        // testaddsearchHistory();

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
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// set port, listen for requests on port 8081
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


// functions to demonstrate use of the API

async function signupNewUser() {
  // signs in a new user with the credential's outline in userData object
  const userData = {
    username: "testuser3",
    email: "testuser3@email.com",
    password: "testuser3",
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
  // signs in a user, using the credentials from the userData object
  const userData = {
    username: "testuser3",
    password: "testuser3",
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



// test if a user exists?
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
    date: "11/05/2000",
    entry: "Poison Pie"
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

async function updatePreferences(tokenValue){

  const preference1 = {
    ingredient: "seafood"
  };
  const preference2 = {
    ingredient: "almonds"
  };
  const preferenceList = [preference1, preference2];
  console.log(JSON.stringify(preferenceList));

  fetch('http://localhost:8080/api/auth/updatePreferences', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': tokenValue
    },
    body: JSON.stringify(preferenceList)
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
    console.log('Preferences Update successful: ', data);
  }).catch(error => {
    console.error('Error during Updating Preferences:', error);
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

async function testaddsearchHistory(){
  const SH = db.searchhistory
  try {
    await Promise.all([
      new SH({ date: "it", entry: "worked again"}).save(),
    ]);
      console.log("SearchHistory added successfully.");
  } catch (err) {
    console.error("Error adding SearchHistory:", err);
  }
}