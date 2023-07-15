/*
#####################################################################
#                       CAR SERVICE                                 #
#####################################################################
*/

const db = require("../models/db");

// Function to retrieve all cars with images
function getAllCarsWithImages() {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT c.*, GROUP_CONCAT(i.image_url) AS car_urls
      FROM cars AS c
      INNER JOIN car_images AS i ON c.Plates_Number = i.Plates_Number
      GROUP BY c.Plates_Number
    `;
    db.query(query, (error, results) => {
      if (error) {
        console.error("Error retrieving cars:", error);
        reject("Error retrieving cars");
      } else {
        const carsWithImages = results.map((car) => ({
          ...car,
          car_urls: car.car_urls ? car.car_urls.split(",") : [],
        }));
        resolve(carsWithImages);
      }
    });
  });
}

module.exports = {
  getAllCarsWithImages,
};

/*
#####################################################################
#                      END OF SERVICE                               #
#####################################################################
*/
