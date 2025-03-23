# TourX App Backend

## backend for the TourX App, built with Node.js, Express, and MongoDB.

### Project Structure

```
.env
.gitignore
package.json
README.md
server.js
test.md
models/
    Cruise.js
    Hotel.js
routes/
    cruiseRoutes.js
    hotelRoutes.js
```

### Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd tourx-app/backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your MongoDB URI and other environment variables:
    ```
    PORT=xxxx
    MONGO_URI=your_mongodb_uri
    ```

### Running the Server

To start the server, run:
```sh
node server.js
```

For development, you can use `nodemon` to automatically restart the server on code changes:
```sh
npx nodemon server.js
```

### API Endpoints

### Cruises
- `GET /api/cruises` - Get all cruises
- `GET /api/cruises/:id` - Get a cruise by ID
- `POST /api/cruises` - Create a new cruise
- `PUT /api/cruises/:id` - Update a cruise by ID
- `DELETE /api/cruises/:id` - Delete a cruise by ID

### Hotels
- `GET /api/hotel` - Get all hotels
- `GET /api/hotel/:id` - Get a hotel by ID
- `POST /api/hotel` - Create a new hotel
- `PUT /api/hotel/:id` - Update a hotel by ID

## Technologies Used
- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- cors
- nodemon (for development)

### License
@nvminh162