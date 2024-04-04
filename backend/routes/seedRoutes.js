const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dmark8mtj",
  api_key: "628849163324471",
  api_secret: "9HugmB-7htSK0RrcYfvq6UQJRj4",
});
const image = "./public/image.jpg";
const storage = new multer.memoryStorage();
const upload = multer({
  storage,
});

// Connection URI
const uri = "mongodb+srv://sagarsoft:sagarsoft@cluster0.eesz4vc.mongodb.net/";
const dbName = "employee-engage";
const usersCollectionName = "users";
const postsCollectionName = "posts";
const jobsCollectionName = "jobs";
// Read JSON files
const usersRawData = fs.readFileSync("./seed/users.json");
const users = JSON.parse(usersRawData);

const postsRawData = fs.readFileSync("./seed/posts.json");
const posts = JSON.parse(postsRawData);

const jobsRawData = fs.readFileSync("./seed/jobs.json");
const jobs = JSON.parse(jobsRawData);

// POST endpoint to seed users collection
router.post("/seed/users", async (req, res) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(usersCollectionName);

    // Insert the users data into the collection
    const result = await collection.insertMany(users);
    console.log(
      `${result.insertedCount} documents inserted into users collection.`
    );
    res.status(201).json({
      message: `${result.insertedCount} documents inserted into users collection`,
    });
  } catch (error) {
    console.error("Error seeding users collection:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await client.close();
  }
});

// POST endpoint to seed posts collection
router.post("/seed/posts", async (req, res) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(postsCollectionName);

    // Insert the posts data into the collection
    const result = await collection.insertMany(posts);
    console.log(
      `${result.insertedCount} documents inserted into posts collection.`
    );
    res.status(201).json({
      message: `${result.insertedCount} documents inserted into posts collection`,
    });
  } catch (error) {
    console.error("Error seeding posts collection:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await client.close();
  }
});

router.post("/seed/jobs", async (req, res) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(jobsCollectionName);

    // Insert the posts data into the collection
    const result = await collection.insertMany(jobs);
    console.log(
      `${result.insertedCount} documents inserted into posts collection.`
    );
    res.status(201).json({
      message: `${result.insertedCount} documents inserted into posts collection`,
    });
  } catch (error) {
    console.error("Error seeding posts collection:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await client.close();
  }
});

router.get("/posts", async (req, res) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // const { image } = req.query;
  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(postsCollectionName);

    const posts = await collection.find({}).toArray();

    if (posts.length > 0) {
      const postsWithImages = await Promise.all(
        posts.map(async (post) => {
          try {
            const uploadedImage = await cloudinary.uploader.upload(image);
            return { ...post, imageUrl: uploadedImage.secure_url };
          } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);

            return post;
          }
        })
      );

      res.status(200).json(postsWithImages);
    } else {
      res.status(404).json({ message: "No posts found" });
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await client.close();
  }
});

router.post("/login", async (req, res) => {
  const { email } = req.body;

  // Check if email is provided in the request body
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(usersCollectionName);

    // Find user with the provided email
    const user = await collection.findOne({ email });

    if (user) {
      const {
        name,
        empId,
        gender,
        email,
        joiningDate,
        skills,
        role,
        jobRole,
        ProfileImage,
        ProfileImage1,
      } = user;
      res.status(200).json({
        name,
        empId,
        email,
        gender,
        joiningDate,
        skills,
        role,
        jobRole,
        ProfileImage,
        ProfileImage1,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await client.close();
  }
});

// GET endpoint to fetch users
router.get("/users", async (req, res) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(usersCollectionName);

    const users = await collection.find({}).toArray();

    if (users.length > 0) {
      // If users found, send them in the response
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "No users found" });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await client.close();
  }
});

// GET endpoint to fetch jobs
router.get("/jobs", async (req, res) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(jobsCollectionName);

    const jobs = await collection.find({}).toArray();

    if (jobs.length > 0) {
      // If jobs found, send them in the response
      res.status(200).json(jobs);
    } else {
      // If no jobs found, return an empty array
      res.status(404).json({ message: "No jobs found" });
    }
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await client.close();
  }
});

router.post("/upload", upload.single("my_file"), async (req, res) => {
  console.log({ res });
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    res.json(cldRes);
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
});

async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

router.put(
  "/updateProfileImages",
  upload.single("my_file"),
  async (req, res) => {
    const file = req.file;
    const email = req.body.email;
    console.log("hit:", { file, email });
    // Check if email is provided in the request body
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      await client.connect();
      const database = client.db(dbName);
      const collection = database.collection(usersCollectionName);

      // Prepare the update object
      const updateObj = {};

      // Update user profile images based on email
      const result = await collection.findOne({ email }, { $set: updateObj });
      console.log({ result });
      const base64String = req.file.buffer.toString("base64");
      console.log(typeof req.file);
      // console.log({base64String});

      if (result.empId !== 0 && file) {
        const uploadedProfileImage = await cloudinary.uploader.upload(
          `data:${req.file.mimetype};base64,${base64String}`
        );
        result.ProfileImage = uploadedProfileImage.secure_url;
      }
      await collection.updateOne({ email }, { $set: result });
      // if (result.empId !== 0 && ProfileImage1) {
      //   // Upload ProfileImage1 to Cloudinary
      //   const uploadedProfileImage1 = await cloudinary.uploader.upload(
      //     req.file.buffer
      //   );
      //   result.ProfileImage1 = uploadedProfileImage1.secure_url;
      // }

      if (result.ProfileImage !== "") {
        console.log("pppp", result);
        // If user is found and profile images are updated successfully, send success response
        res.status(200).json({ message: "Profile image updated successfully" });
      } else if (result.ProfileImage1 !== 0) {
        res.status(200).json({ message: "cover image updated successfully" });
      } else {
        // If user is not found, send 404 Not Found response
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error updating profile images:", error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await client.close();
    }
  }
);

router.put(
  "/coverImage",
  upload.single("my_file"),
  async (req, res) => {
    const file = req.file;
    const email = req.body.email;
    console.log("hit:", { file, email });
    // Check if email is provided in the request body
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      await client.connect();
      const database = client.db(dbName);
      const collection = database.collection(usersCollectionName);

      // Prepare the update object
      const updateObj = {};

      // Update user profile images based on email
      const result = await collection.findOne({ email }, { $set: updateObj });
      console.log({ result });
      const base64String = req.file.buffer.toString("base64");
      console.log(typeof req.file);
      // console.log({base64String});

      if (result.empId !== 0 && file) {
        const uploadedProfileImage = await cloudinary.uploader.upload(
          `data:${req.file.mimetype};base64,${base64String}`
        );
        result.ProfileImage1 = uploadedProfileImage.secure_url;
      }
      await collection.updateOne({ email }, { $set: result });

      if (result.ProfileImage !== "") {
        res.status(200).json({ message: "cover image updated successfully", data: result });
      } else {
        // If user is not found, send 404 Not Found response
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error updating cover image:", error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await client.close();
    }
  }
);
router.post("/createPost", async (req, res) => {
  const { image, postId, postTitle, postDesc } = req.body;

  // Check if all required parameters are provided
  if (!image || !postId || !postTitle || !postDesc) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const uploadedImage = await cloudinary.uploader.upload(image);

    // Respond with all parameters including the Cloudinary URL
    res
      .status(200)
      .json({ image: uploadedImage.secure_url, postId, postTitle, postDesc });
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/createJob", async (req, res) => {
  const { Author, jobTitle, jobDesc, jobId, jobLoc, expReq } = req.body;

  // Check if all required parameters are provided
  if (!Author || !jobTitle || !jobDesc || !jobId || !jobLoc || !expReq) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    // Respond with all parameters
    res.status(200).json({ Author, jobTitle, jobDesc, jobId, jobLoc, expReq });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
