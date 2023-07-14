const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/*
#####################################################################
#                       USER REGISTER SERVICE                       #
#####################################################################
*/

// Function to check if a city exists
function checkCityExists(db, cityCode) {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM cities WHERE City_Code = ?", [cityCode], (error, results) => {
      if (error) {
        reject("Failed to register user");
      } else {
        resolve(results.length > 0);
      }
    });
  });
}

// Function to insert a city
function insertCity(db, cityCode, cityName) {
  return new Promise((resolve, reject) => {
    db.query("INSERT INTO cities (City_Code, City_Name) VALUES (?, ?)", [cityCode, cityName], (error) => {
      if (error) {
        reject("Failed to register user");
      } else {
        resolve();
      }
    });
  });
}

// Function to insert a user
  function insertUser(db, user) {
  return new Promise((resolve, reject) => {
    db.query("INSERT INTO users SET ?", user, (error, results) => {
      if (error) {
        reject("Failed to register user");
      } else {
        resolve(results);
      }
    });
  });
}

// Function to register a user
async function registerUser(db, userData) {
  const {
    id,
    phone_number,
    driving_license,
    picture,
    email,
    password,
    city_code,
    city_name,
    street_name,
    first_name,
    last_name,
  } = userData;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user object with hashed password
    const user = {
      id,
      phone_number,
      driving_license,
      picture,
      email,
      password: hashedPassword,
      city_code,
      street_name,
      first_name,
      last_name,
    };

    // Check if the city already exists
    const cityExists = await checkCityExists(db, city_code);

    if (cityExists) {
      // City already exists, update the user instead of inserting
      const userResults = await insertUser(db, user);
      return { results: userResults, message: "User registered successfully" };
    } else {
      // City does not exist, insert the city and user
      await insertCity(db, city_code, city_name);
      const userResults = await insertUser(db, user);
      return { results: userResults, message: "User registered successfully" };
    }
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Failed to register user");
  }
}
/*
#####################################################################
#                      END USER REGISTER SERVICE                    #
#####################################################################
*/





/*
#####################################################################
#                       USER LOGIN SERVICE                          #
#####################################################################
*/


// Function to retrieve user by email
function getUserByEmail(db, email) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (error, results) => {
      if (error) {
        console.error(error);
        reject("Internal server error");
      } else {
        resolve(results);
      }
    });
  });
}

// Function to compare passwords
async function comparePasswords(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

// Function to generate JWT token
function generateToken(userId) {
  return jwt.sign(
    { userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "12h" }
  );
}

// Function to handle user login
async function loginUser(db, email, password) {
  try {
    // Check if the user exists in the database
    const results = await getUserByEmail(db, email);
    if (results.length === 0) {
      throw new Error("User not found");
    }

    const user = results[0];

    // Compare the provided password with the hashed password
    const passwordMatch = await comparePasswords(password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    // Password is correct, user is authenticated
    // Generate a token with the userId
    const token = generateToken(user.Id);

    // Return the token and user details
    return {
      message: "Login successful",
      token,
      userFirstName: user.first_name,
      userId: user.Id,
    };
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Failed to login");
  }
}

/*
#####################################################################
#                   END OF USER LOGIN SERVICE                       #
#####################################################################
*/

module.exports = {
  registerUser,
  loginUser
};