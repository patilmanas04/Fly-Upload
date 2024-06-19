# AeroDash: Drone Data Management Dashboard

## Overview

**AeroDash** is a robust web application designed to manage drone data efficiently in the cloud. Built with the MERN stack (MongoDB, Express, React, Node.js), AeroDash provides a comprehensive dashboard with user authentication, file upload capabilities for images and videos, and backend video compression to ensure optimal storage and performance.

## Features

- **User Authentication**: Secure login and signup functionality using email or username.
- **Dashboard**: Intuitive and user-friendly interface for managing drone data.
- **File Upload**: Seamless upload of images and videos with support for multiple file formats.
- **Video Compression**: Efficient backend video compression to maintain quality while reducing file size.
- **Cloud Storage**: Integration with cloud services to store and manage uploaded files.

## Tech Stack

- **Frontend**: React.js, Next.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **File Handling**: Multer, Sharp, FFmpeg
- **Authentication**: JWT (JSON Web Tokens)

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- FFmpeg

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/patilmanas04/Fly-Upload.git
   cd AeroDash
   ```

2. Install backend dependencies:
    ```bash
    cd server
    npm install
    ```

3. Install frontend dependencies:
    ```bash
    cd ../client
    npm install
    ```

4. Set up environment variables:

    Create a `.env` file in the `server` directory and add the following variables:
    ```bash
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

### Running the Application

1. Start the backend server:
    ```bash
    cd server
    npm start
    ```

2. Start the frontend server:
    ```bash
    cd ../client
    npm run dev
    ```

3. Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
For any questions or inquiries, please reach out to the project maintainer at `pmanas13092004@gmail.com`.