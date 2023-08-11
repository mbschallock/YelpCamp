const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected')
});

const sample = (array) => array[Math.floor(Math.random() *array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i =0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground ({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            author: '6470fcbd4baa42c033079d15',
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum sapiente alias velit vero aspernatur reiciendis repellendus nostrum quasi, et provident iste inventore exercitationem quae mollitia asperiores nemo cupiditate ipsam est!',
            price,
            geometry: {
              type : "Point", 
              coordinates : [
                  cities[random1000].longitude,
                  cities[random1000].latitude,
                ]
            },
            images : [
                {
                  url: 'https://res.cloudinary.com/dbort6nod/image/upload/v1687307096/YelpCamp/rnjirloftctnomtnzyye.jpg',
                  filename: 'YelpCamp/rnjirloftctnomtnzyye',
                },
                {
                  url: 'https://res.cloudinary.com/dbort6nod/image/upload/v1687307140/YelpCamp/hgneveuj3fwrfpxtwph3.jpg',
                  filename: 'YelpCamp/hgneveuj3fwrfpxtwph3',
                }
              ]
        })
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
})
