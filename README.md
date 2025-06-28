# Posts-Project-
📝 Posts Web App
A full-featured social posting application built with Node.js, Express.js, and MongoDB. Users can sign up, log in securely using hashed credentials, write posts, like others' posts, and manage their profile picture. It’s a mini social platform focused on basic user interaction and content sharing.

🚀 Features
🔐 Authentication

Login with email + password (secured via bcrypt)

Session handling with cookie-parser

👤 User System

Create a new user account

Log in to access personal profile

Change profile picture by clicking on it

✍️ Posts

Logged-in users can create posts with a title and description

Posts are visible to all users

Any user can like others' posts

Only the post's creator can delete their post

🖼️ Profile Picture Upload

Upload or change profile photo by clicking the profile image

🗄️ MongoDB Integration

All user data and posts are stored in MongoDB

🛠️ Tech Stack
Layer	Technology
Backend	Node.js, Express.js
Database	MongoDB, Mongoose
Security	bcrypt, cookie-parser
File Upload	multer (for profile images)
Frontend	HTML, CSS, JavaScript (Vanilla or EJS)

📂 Project Structure
text
Copy
Edit
posts-app/
├── config/
│   └── multerconfig.js
├── models/
│   ├── user.js
│   └── post.js
├── views/
│   ├── edit.ejs
│   ├── index.ejs
│   ├── login.ejs
│   ├── profile.ejs
│   └── profilepic.ejs
├── public/
│   └── uploads/      
├── app.js
├── .env
├── package.json
└── README.md
📦 Setup Instructions
1. Clone the Repository
 ```
git clone https://github.com/yourusername/posts-app.git
cd posts-app
```
2. Install Dependencies
```
npm install
```
3. Create a .env File
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/postsdb
SECRET=your_cookie_secret
```
4. Run the App
```
node app.js
```
Then open: http://localhost:3000

📸 Screenshots 

Login page
![Screenshot (313)](https://github.com/user-attachments/assets/24ae418b-e53b-4177-bea8-5dc43c688afb)

Profile page with posts
![Screenshot (312)](https://github.com/user-attachments/assets/06e84c56-12c1-4371-9e82-7cfd8dbbe6c7)

Create Account
![Screenshot (314)](https://github.com/user-attachments/assets/751c422f-f2a3-41ac-aa95-514cd37bbc2a)


📄 License
This project is licensed under the MIT License.
