exports.sendError = (res, error, statusCode = 401) => {
    return res.status(statusCode).json({ error });
}