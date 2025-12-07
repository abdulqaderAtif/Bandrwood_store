# BandrWood

BandrWood is a simple grocery store web application designed for practice and study. It allows users to browse products, view product details, add items to a shopping cart, and manage user authentication.

## Features
- **Product Browsing**: Explore a variety of products, including fresh fruits, vegetables, and meats.
- **Product Details**: View detailed information about each product.
- **Shopping Cart**: Add products to the cart, adjust quantities, and view order summaries.
- **User Authentication**: Sign up and log in to manage your account.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Project Structure
```
BandrWood/
├── index.html                # Homepage
├── cart_page.html            # Shopping cart page
├── login.html                # Login page
├── sign_up.html              # Sign-up page
├── product_details_page_*.html # Product detail pages
├── style.css                 # Shared styles
├── js/                       # JavaScript files
│   ├── login.js              # Login page logic
│   ├── signup.js             # Sign-up page logic
├── server.js                 # Backend server
├── package.json              # Node.js dependencies
└── products/                 # Product images
```

## Getting Started

### Prerequisites
- Node.js installed on your system.
- MySQL database running locally.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/abdulqaderAtif/Bandrwood_store.git
   ```
2. Navigate to the project directory:
   ```bash
   cd BandrWood
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Database Setup
1. Create a MySQL database named `bandrwood_db`.
2. Update the database credentials in `server.js` if necessary.
3. Use `phpMyAdmin` or a MySQL client to create the required tables.

### Running the Application
1. Start the server:
   ```bash
   npm start
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## API Endpoints
- **Health Check**: `GET /api/health`
- **Sign Up**: `POST /api/signup`
- **Login**: `POST /api/login`

## External Dependencies
- **Node.js Packages**:
  - `express`: Web server framework.
  - `mysql2`: MySQL client.
  - `cors`: Middleware for handling CORS.
- **CDNs**:
  - Font Awesome for icons.

## Contributing
Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the ISC License.
