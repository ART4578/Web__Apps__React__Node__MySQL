import cookieOptions from "./cookieOptions.js";

const setAuthCookies = (res, token) => {
    res.cookie("token", token, cookieOptions);
};

export default setAuthCookies;