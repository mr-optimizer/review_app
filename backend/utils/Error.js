exports.sendError = (res, error, statusCode = 401) => {
    return res.status(statusCode).json({ error });
}
exports.handleNotFound = (req, res) =>{
    this.sendError(res, 'Not found!!', 404);
}