module.exports = function auth(req, res, next) {
    if (!req.user.isAdmin) {
        res.status(403).send("Access Forbidden.")
        return;
    }
    next();
}