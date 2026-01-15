const getCsrfToken = (req, res) => {
    try {
        res.status(200).json({
            csrfToken: req.csrfToken()
        });
    } catch (err) {
        res.status(403).json({
            message: "CSRF token error"
        });
    };
};

export default getCsrfToken;