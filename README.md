# MapChat App

MapChat is a social media web application that allows users to create, view, and interact with posts displayed on a world map. The size of each post's marker dynamically increases based on user engagement, promoting a sense of collaboration and community.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Team Members](#team-members)

---

## Features

- **Guest features**: 
  - Can view the posts and the comments on the map however they cant interact with them. 
- **User Features**:
  - Remember login
  - Create, edit, and delete posts.
  - Comment on posts and view existing comments.
  - Delete their own comments.
  - Like and unlike posts.
  - Change map themes and styles.
- **Dynamic Engagement**:
  - Post markers grow in size based on the number of likes.
- **Privacy Protection**:
  - Locations are approximate to ensure user privacy.

---

## Installation

### Prerequisites
1. **Node.js** (v16 or higher)
2. **PHP** (v8.0 or higher)
3. **Composer** (latest version)
4. **PostgreSQL** (v13 or higher)

### Steps to Install
1. Clone the repository:
```bash
   git clone https://github.com/alex-305/map-app.git
   cd map-app
```

2. Install dependencies:
  ```bash
   composer install
   npm install
   ```

3. Run database migrations and seeder:
  ```bash
   php artisan migrate --seed
   ```

4. Build and serve the application:
  ```bash
   npm run dev
   php artisan serve
   ```

---

## Usage

### Guest Features
- Browse posts on the map.
- View comments and engagement numbers.
- Register/Login

### User Features
- Create an account, log in, and manage your profile.
- Create and delete posts
- Interact wih posts (like, comment, create, delete)
- Change the map style and app theme.

### Future Features
- Adding friends
- Private messages

---

## API Endpoints

### Authentication
- `POST /register`: Register a new user
- `POST /login`: Log in a user
- `POST /logout`: Log out user 
- `GET /check`: Check if the user is logged in

#### Password Management
- `POST /forgot-password`: send a password reset link to the users email
- `POST /verify-password`: verify the password reset token
- `POST /password/email`: send a reset link email 
- `POST /password/reset`: reset the password 
- `GET /password/reset/{token}`: show the password reset form
- `GET /password/reset`: show the password reset request form 

### Posts
- `GET /posts`
- `GET /posts/user/{userId}`
- `POST /posts`
- `GET /posts/{post}` 
- `PUT /posts/{post}` 
- `DELETE /posts/{post}` 

### Likes
- `POST /posts/{post}/like` 
- `DELETE /posts/{post}/unlike` 
- `GET /posts/{post}/like`

### Comments
- `GET /posts/{post}/comments`
- `POST /posts/{post}/comments` 
- `DELETE /posts/{post}/comments/{comment}`

### Users
- `GET /users/{user}`: 
- `POST /users/{user}/update-username` 
- `POST /users/{user}/update-email` 
- `POST /users/{user}/update-password` 

### Settings
- `GET /settings`
- `POST /settings`

---

## Database Schema

### Users Table
- **Fields**:
  - `id`: primary key
  - `username`: users display name
  - `email`: users email address
  - `password`: users password
  - `email_verified_at`: timestamp for email verification
  - `remember_token`: token for remember me functionality
- **Relationships**:
  - a user can create multiple posts likes and comments

### Posts Table
- **Fields**:
  - `id`: primary key
  - `content`: text content
  - `latitude`: approximate latitude of the posts location
  - `longitude`: approximate longitude of the posts location
  - `like_count`: count of likes for the post
  - `comment_count`: count of comments for the post
  - `color`: represents the visual style of the post marker
  - `author_id`: foreign key to the users table
- **Relationships**:
  - a post has many likes and comments
  - a post belongs to a user

### Likes Table
- **Fields**:
  - `id`: primary key
  - `user_id`: foreign key to the users table
  - `post_id`: foreign key to the posts table
- **Relationships**:
  - a like belongs to a user and a post

### Comments Table
- **Fields**:
  - `id`: primary key
  - `post_id`: foreign key to the posts table
  - `author_id`: foreign key to the users table
  - `content`: the comments text content
- **Relationships**:
  - a comment belongs to a post and a user

---

## Team Members
- **Alex Gonzalez**
- **Claudio Olmeda Florio**
- **Samuel Anderson**
- **Joel Bustamante**
- **Juancarlos Alguera**
