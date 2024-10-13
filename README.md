
# Product Management API

This is a simple RESTful API for managing a list of products. It allows users to create, update, delete, and fetch products, with search functionality based on product names or categories.

## Features

- Create, read, update, and delete products.
- Search products by name or category.
- Pagination for product listings.

## Technologies Used

- Node.js
- Express.js
- Sequelize (ORM)
- MySQL (Database)
- dotenv (for environment variables)

## Installation

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v12 or later)
- [MySQL](https://dev.mysql.com/downloads/mysql/)
- npm (Node Package Manager)

### Steps to Run the Project

1. **Clone the repository**

   ```bash
   git clone https://github.com/CodeSagePath/product-api.git
   cd product-api
   ```

2. **Install dependencies**

   Use npm or Yarn to install the required packages:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root of your project and add your database configuration:

   ```env
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_HOST=localhost
   DB_DIALECT=mysql
   PORT=3000
   ```

   Replace `your_database_name`, `your_database_user`, and `your_database_password` with your actual database credentials.

4. **Initialize the database**

   If you haven't set up the database, you can create the necessary tables using Sequelize. Run the following command:

   ```bash
   npx sequelize-cli db:migrate
   ```

5. **Run the server**

   Start the server using the following command:

   ```bash
   npm start
   ```

   or, if you're using Yarn:

   ```bash
   yarn start
   ```

   The API will be available at `http://localhost:3000/api/products`.

## API Endpoints

### Products

- **GET /api/products**
  - Fetch a list of products (supports pagination and search).
  - Query parameters:
    - `page`: Page number (default: 1)
    - `size`: Number of products per page (default: 10)
    - `search`: Search term for product name or category.

- **GET /api/products/:id**
  - Fetch a product by its ID.

- **POST /api/products**
  - Create a new product.
  - Request body:
    ```json
    {
      "name": "string",
      "price": "number",
      "description": "string",
      "category": "string"
    }
    ```

- **PUT /api/products/:id**
  - Update an existing product by its ID.
  - Request body: same as `POST /api/products`.

- **DELETE /api/products/:id**
  - Delete a product by its ID.

## Error Handling

The API returns appropriate HTTP status codes for errors, including:

- `400 Bad Request`: Invalid input or missing required fields.
- `404 Not Found`: Product not found.
- `500 Internal Server Error`: Server-side errors.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the MIT License.