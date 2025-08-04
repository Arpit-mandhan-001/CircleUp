# CircleUp Backend Server

## Issues Found and Fixed

### 1. Missing Dependencies
**Problem**: `ERR_MODULE_NOT_FOUND` error when trying to start the server
**Solution**: Added proper npm scripts and ran `npm install`

### 2. Missing Environment Variables
**Problem**: `TypeError: Cannot read properties of undefined (reading 'replace')` 
**Solution**: Created `.env` file with required environment variables and added validation

### 3. Invalid Firebase Configuration
**Problem**: `FirebaseAppError: Failed to parse private key`
**Solution**: Added development mode that bypasses Firebase authentication for local testing

### 4. Missing Start Scripts
**Problem**: No proper start script in package.json
**Solution**: Added start and dev scripts to package.json

### 5. Poor Error Handling
**Problem**: Server would crash without helpful error messages
**Solution**: Added comprehensive error handling and validation

## Setup Instructions

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Environment Configuration
The server works in two modes:

#### Development Mode (Default)
- Firebase authentication is bypassed
- Uses mock user for testing
- Only requires MongoDB URI

#### Production Mode
- Requires all Firebase environment variables
- Full authentication enabled

### 3. Environment Variables
Copy the `.env` file and configure:

```env
# Environment
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/circleup

# Firebase Configuration (Only needed in production)
# Uncomment and fill these for production:
# FIREBASE_PROJECT_ID=your-project-id
# FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----"
# FIREBASE_CLIENT_EMAIL=your-service-account@your-project-id.iam.gserviceaccount.com
# FIREBASE_CLIENT_ID=your-client-id
# FIREBASE_CLIENT_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project-id.iam.gserviceaccount.com
```

### 4. Database Setup
Make sure MongoDB is running:
- Local: `mongod` (default: localhost:27017)
- Or use MongoDB Atlas and update the MONGODB_URI

### 5. Running the Server

#### Development
```bash
npm start
# or
npm run dev  # if you have nodemon installed
```

#### Production
```bash
NODE_ENV=production npm start
```

## API Endpoints

### Users
- `POST /users` - Create/Update user (requires auth)
- `GET /users/profile` - Get current user profile (requires auth)

### Posts
- `POST /posts` - Create a new post (requires auth)
- `GET /posts` - Get all posts (public)

## Development Mode Features

- **Mock Authentication**: Uses a default user `dev-user-123` for testing
- **No Firebase Required**: Can test all endpoints without Firebase setup
- **Better Error Messages**: Detailed error logging for debugging

## Production Setup

1. Set `NODE_ENV=production` in your environment
2. Configure all Firebase environment variables
3. Ensure MongoDB is accessible
4. Deploy with proper process manager (PM2, etc.)

## Troubleshooting

### Server won't start
1. Check if all dependencies are installed: `npm install`
2. Verify environment variables in `.env`
3. Ensure MongoDB is running and accessible

### Database connection issues
1. Check MongoDB service is running
2. Verify MONGODB_URI format
3. Check network connectivity to database

### Firebase authentication errors
1. Verify all Firebase environment variables are set
2. Check private key format (should include \n for line breaks)
3. Ensure Firebase project permissions are correct