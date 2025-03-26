// Error handling middleware that catches any errors passed down the middleware chain.
const errorHandler = (err, req, res, next) => {
    // Log the error stack trace to the console for debugging purposes.
    console.error(err.stack);
  
    // Respond with a 500 status code and a JSON error message.
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  };
  
  // Export the errorHandler as the default export.
  export default errorHandler;