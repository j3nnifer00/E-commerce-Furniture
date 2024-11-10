const authoriseAdmin = (req, res, next) => {

    if (!req.user.isAdmin){
        return res.status(403).json({message: 'Access denied',
            isAdmin: req.user.isAdmin
        });
    }

    next();
}

module.exports = authoriseAdmin;