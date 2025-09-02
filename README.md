# FoodFusion – Share, Cook, Connect

## 📌 Overview

**FoodFusion** is a recipe-sharing platform designed to bring food enthusiasts together. Users can register, share their recipes, and explore dishes shared by others. The platform includes powerful search features, allowing users to find recipes based on ingredients or dietary preferences such as vegetarian, vegan, or gluten-free. **FoodFusion** encourages a collaborative cooking experience, where users can share images of their dishes and save their favorite recipes.

---

## 🔹 Key Features

### 👤 **User Profiles**
- Users can create accounts and manage their profiles.
- Personal information such as name, email, and password are stored securely.

### 🥘 **Recipe Sharing**
- Post your recipes with detailed instructions, ingredients, and images of your dishes.
- Share your culinary creations with the community.

### 🔍 **Ingredient-Based Search**
- Search for recipes based on available ingredients you have at home.

### 📝 **Recipe Name Search**
- Find recipes by name, keywords, or category.

### 🥑 **Dietary Filters**
- Filter recipes by categories such as vegetarian, vegan, gluten-free, and more.

### ❤️ **Favorites Section**
- Save your favorite recipes for easy access later.

### 🖼 **Image Upload**
- Upload images of your dishes when posting recipes to showcase your culinary skills.

### 🛠 **Recipe Management**
- Edit or delete only the recipes you have posted.

---

## 🔹 Tech Stack

- **Frontend**: Next.js, React.js
- **Backend**: Node.js, Express.js, GraphQL Subscriptions with Apollo Server
- **Database**: MongoDB (users, recipes, favorites, reviews)
- **Authentication**: JWT with HttpOnly cookies
- **Realtime**: GraphQL Subscriptions (for real-time recipe addition)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/en/) (v16 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A running [MongoDB](https://www.mongodb.com/) instance (local or cloud, e.g., MongoDB Atlas)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/foodfusion.git
    cd foodfusion
    ```

2. **Install Backend Dependencies:**

    ```bash
    cd backend
    npm install
    ```

3. **Install Frontend Dependencies:**

    ```bash
    cd frontend
    npm install
    ```

---

## ⚙️ Configuration (Environment Variables)

This project requires environment variables to be set up for both the backend and frontend.

### Backend (/backend/.env)

Create a `.env` file in the `/backend` directory and add the following variables:

```bash
# /backend/.env

# Port for the backend server
PORT=8080

# Your MongoDB connection string
MONGO_URI=mongodb://localhost:27017/foodfusion

# A secret key for signing JWT tokens
JWT_SECRET=your_jwt_secret_key
```

## 🏃 Running the Application

### Backend Server

To start the backend server, navigate to the `/backend` directory and run:

```bash
npm run dev
```


### The backend server will start on the port specified in your .env file (e.g., http://localhost:8080).

### Frontend Development Server

To start the frontend React application, navigate to the `/frontend` directory and run:

```bash
npm run dev
```

### The frontend will open in your browser at http://localhost:3000.

## 🚀 Future Scope

- **User-generated Challenges**: Users can create cooking challenges (e.g., "Vegan Week").
- **Recipe Collaboration**: Allow users to collaborate on recipes by adding instructions or modifying ingredients together.
- **Reviews Feature**: A feature will be added to allow users to leave reviews on recipes, rate them, and provide feedback to other users.
- **Timetable for Recipes**: Implement a timetable feature where users can schedule recipes for specific days, plan meals ahead of time, and track their cooking plans.
- **Shopping List for Ingredients**: Create a shopping list feature that automatically generates a list of ingredients needed for selected recipes, making grocery shopping easier and more efficient.
