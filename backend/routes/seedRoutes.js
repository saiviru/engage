const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const fs = require('fs');

// Connection URI
const uri = 'mongodb+srv://sagarsoft:sagarsoft@cluster0.eesz4vc.mongodb.net/';
const dbName = 'employee-engage';
const usersCollectionName = 'users';
const postsCollectionName = 'posts';
const jobsCollectionName = 'jobs';
// Read JSON files
const usersRawData = fs.readFileSync('./seed/users.json');
const users = JSON.parse(usersRawData);

const postsRawData = fs.readFileSync('./seed/posts.json');
const posts = JSON.parse(postsRawData);

const jobsRawData = fs.readFileSync('./seed/jobs.json');
const jobs = JSON.parse(jobsRawData)

// POST endpoint to seed users collection
router.post('/seed/users', async (req, res) => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(usersCollectionName);

    // Insert the users data into the collection
    const result = await collection.insertMany(users);
    console.log(`${result.insertedCount} documents inserted into users collection.`);
    res.status(201).json({ message: `${result.insertedCount} documents inserted into users collection` });
  } catch (error) {
    console.error('Error seeding users collection:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.close();
  }
});

// POST endpoint to seed posts collection
router.post('/seed/posts', async (req, res) => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(postsCollectionName);

    // Insert the posts data into the collection
    const result = await collection.insertMany(posts);
    console.log(`${result.insertedCount} documents inserted into posts collection.`);
    res.status(201).json({ message: `${result.insertedCount} documents inserted into posts collection` });
  } catch (error) {
    console.error('Error seeding posts collection:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.close();
  }
});


router.post('/seed/jobs', async (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
    try {
      await client.connect();
      const database = client.db(dbName);
      const collection = database.collection(jobsCollectionName);
  
      // Insert the posts data into the collection
      const result = await collection.insertMany(jobs);
      console.log(`${result.insertedCount} documents inserted into posts collection.`);
      res.status(201).json({ message: `${result.insertedCount} documents inserted into posts collection` });
    } catch (error) {
      console.error('Error seeding posts collection:', error);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      await client.close();
    }
  });
  router.get('/posts', async (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
    try {
      await client.connect();
      const database = client.db(dbName);
      const collection = database.collection(postsCollectionName);
  
      // Find all posts in the collection
      const posts = await collection.find({}).toArray();
  
      
      if (posts.length > 0) {
        res.status(200).json(posts);
      } else {
        // If no posts found, return an empty array
        res.status(404).json({ message: 'No posts found' });
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      await client.close();
    }
  });


  router.post('/login', async (req, res) => {
    const { email } = req.body; // Extract email from request body
  
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
    try {
      await client.connect();
      const database = client.db(dbName);
      const collection = database.collection(usersCollectionName);
  
      // Find user with the provided email
      const user = await collection.findOne({ email });
  
      if (user) {
        // If user is found, extract required details and send them in the response
        const { name, empId, gender, joiningDate, skills, role } = user;
        res.status(200).json({ name, empId, gender, joiningDate, skills, role });
      } else {
        // If user is not found, send 404 Not Found response
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      await client.close();
    }
  });
  


module.exports = router;
