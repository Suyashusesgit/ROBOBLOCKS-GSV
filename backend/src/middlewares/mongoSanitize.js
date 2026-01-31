const sanitize = require('mongo-sanitize');

const mongoSanitize = () => {
    return (req, res, next) => {
        if (req.body) {
            req.body = sanitize(req.body);
        }
        if (req.params) {
            req.params = sanitize(req.params);
        }
        if (req.query) {
            // Express 5: req.query is a getter, so we sanitize properties in place
            // or filter keys. assigning req.query = ... throws error.
            const sanitizedQuery = sanitize(req.query);

            // If the structure is same, we can just replace values.
            // If keys are removed, we must delete them.
            for (const key in req.query) {
                if (Object.prototype.hasOwnProperty.call(req.query, key)) {
                    // Check if key exists in sanitized version
                    if (sanitizedQuery && Object.prototype.hasOwnProperty.call(sanitizedQuery, key)) {
                        // Safe to assume value might change but key remains? 
                        // Actually mongo-sanitize removes keys starting with $ or containing .
                        // So if key is gone in sanitized, we delete it from req.query
                    } else {
                        delete req.query[key];
                    }
                }
            }
            // To be safe and simple: mongo-sanitize strips $ and . from keys/values.
            // It recursively sanitizes.
            // Since we can't replace req.query, we have to rely on the fact that 
            // req.query is usually a plain object (if not using extended query parser?).
            // Let's iterate and replace.
            if (req.query && typeof req.query === 'object') {
                const clean = sanitize(req.query);
                // Clear existing query
                for (const key in req.query) {
                    delete req.query[key];
                }
                // Assign new values
                Object.assign(req.query, clean);
            }
        }
        next();
    };
};

module.exports = mongoSanitize;
