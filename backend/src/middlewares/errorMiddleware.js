const errorHandler = (err, req, res, next) => {
    // Default to 500 if not specified
    const statusCode = res.statusCode ? res.statusCode : 500;

    // If status code is 200 (ok) but we have an error, change to 500
    // This happens sometimes if we throw an error inside a route that didn't set status
    const finalStatus = statusCode === 200 ? 500 : statusCode;

    res.status(finalStatus);

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

module.exports = { errorHandler };
