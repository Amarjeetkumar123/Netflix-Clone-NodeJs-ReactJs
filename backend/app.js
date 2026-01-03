import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';

import { ENV_VARS } from './config/env.config.js';
import { getClientUrl } from './helpers/helper.js';
import { protectedRoute } from './middlewares/protectedRoute.js';
import authRoutes from './routes/auth.route.js';
import movieRoutes from './routes/movie.route.js';
import tvRoutes from './routes/tv.route.js';
import searchRoutes from './routes/search.route.js';

/**
 * Resolves the absolute path of the current directory.
 * This is useful for resolving relative paths in the application,
 * especially when the application is deployed to a different directory.
 */
const __dirname = path.resolve();

/**
 * Creates and configures an Express application instance with the necessary middleware and routes.
 *
 * @returns {express.Application} The configured Express application instance
 */
export const expressServer = () => {
  // Creates an Express application instance.
  const app = express();

  /**
   * Configures and applies the CORS middleware to the Express application instance.
   * getClientUrl is a function that retrieves the client's base URL. (e.g. http://localhost:5173)
   */
  const baseURL = getClientUrl();
  const allowedOrigins = [baseURL];
  
  // Add production frontend URL if in production
  if (ENV_VARS.NODE_ENV === 'production' && ENV_VARS.CLIENT_URL) {
    allowedOrigins.push(ENV_VARS.CLIENT_URL);
    // Also allow without trailing slash
    if (ENV_VARS.CLIENT_URL.endsWith('/')) {
      allowedOrigins.push(ENV_VARS.CLIENT_URL.slice(0, -1));
    } else {
      allowedOrigins.push(ENV_VARS.CLIENT_URL + '/');
    }
  }
  
  app.use(
    cors({
      origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);
        
        // Check if origin is in allowed list
        const isAllowed = allowedOrigins.some(allowedOrigin => {
          // Remove trailing slash for comparison
          const normalizedOrigin = origin.endsWith('/') ? origin.slice(0, -1) : origin;
          const normalizedAllowed = allowedOrigin.endsWith('/') ? allowedOrigin.slice(0, -1) : allowedOrigin;
          return normalizedOrigin === normalizedAllowed;
        });
        
        if (isAllowed) {
          callback(null, true);
        } else {
          console.error('CORS Error - Origin not allowed:', origin);
          console.error('Allowed origins:', allowedOrigins);
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'UPDATE', 'DELETE'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  /**
   * Uses express.json() middleware to parse incoming JSON requests
   * and make them available on req.body.
   */
  app.use(express.json());

  /**
   * Uses cookieParser() middleware to parse incoming cookie headers
   * and make them available on req.cookies.
   */
  app.use(cookieParser());

  // Defines routes for the '/api/v1/account' , '/api/v1/movie' , '/api/v1/tv' , /api/v1/search' path.
  app.use('/api/v1/account', authRoutes);
  app.use('/api/v1/movie', protectedRoute, movieRoutes);
  app.use('/api/v1/tv', protectedRoute, tvRoutes);
  app.use('/api/v1/search', protectedRoute, searchRoutes);

  // Serves the production build of the frontend if the NODE_ENV environment variable is set to "production".
  // Only serve static files if frontend is bundled with backend (monorepo deployment)
  // For separate deployments (Vercel + Render), this should be disabled
  if (ENV_VARS.NODE_ENV === 'production' && process.env.SERVE_FRONTEND === 'true') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
  }

  return app;
};
