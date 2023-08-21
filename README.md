# Plant-It

## Introduction
Welcome to Plant-It, the thriving online hub for all things green and leafy! Whether you're a seasoned botanist or just starting your journey into the world of plants, Plant-It is your go-to destination for plant-related questions and discoveries.

Our platform is designed to foster a vibrant community of plant enthusiasts who can connect, learn, and share their botanical knowledge. Have a burning question about that mysterious vine in your backyard or the strange succulent on your windowsill? Plant-It's forum is the place to ask, and our passionate community is here to help.

But that's not all! We've integrated cutting-edge technology into Plant-It by harnessing the power of the Plant ID API. Now, when you stumble upon an unfamiliar plant during your nature walks or in your neighbor's garden, simply snap a photo and let our AI-powered Plant ID tool work its magic. It will identify the plant for you, so you can return to Plant-It armed with knowledge and ready to seek advice from our community members.

Join Plant-It today and let's cultivate a greener, more informed world together!

## Credits
The plant identification API was kindly provided by https://plant.id/
Information about converting images to Base64 was obtained by following this tutorial: https://refine.dev/blog/how-to-base64-upload/#example

## Features
- Post questions about plants.
- View and answer questions posted by other users.
- Upload images of unknown plants for identification.
- Utilize the Plant ID API to receive probable plant names and their accuracy percentages.

## Prerequisites
- Node.js and npm
- SQL database (e.g., MySQL)

Make sure you have the following Node.js dependencies installed:

```json
"dependencies": {
  "bcrypt": "^5.1.0",
  "connect-session-sequelize": "^7.1.7",
  "dotenv": "^16.3.1",
  "express": "^4.18.2",
  "express-handlebars": "^7.1.2",
  "express-session": "^1.17.3",
  "mysql2": "^3.6.0",
  "sequelize": "^6.32.1"
}

