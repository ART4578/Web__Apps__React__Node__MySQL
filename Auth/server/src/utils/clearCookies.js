import cookieOptions from "./cookieOptions.js";

const clearCookies = (res) => {
    res.clearCookie("token", {
        ...cookieOptions,
        maxAge: 0
    });
};

export default clearCookies;