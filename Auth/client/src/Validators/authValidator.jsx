const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FULL_NAME_REGEX = (min) => new RegExp(`^[A-Z][a-z]{${min - 1},}$`);
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const normalize = (value, lower = false) => {
    const values = value.trim();
    return lower ? values.toLowerCase() : values;
};

export const registerValidator = ({ first_name = "", last_name = "", email = "", password = "" }) => {
    const errors = {};

    const f = normalize(first_name);
    const l = normalize(last_name);
    const e = normalize(email, true);
    const p = normalize(password);

    if (!f) errors.first_name = "First name is required.";
    else if (!FULL_NAME_REGEX(3).test(f)) errors.first_name = "Must start with capital letter and be at least 3 characters.";

    if (!l) errors.last_name = "Last name is required.";
    else if (!FULL_NAME_REGEX(5).test(l)) errors.last_name = "Must start with capital letter and be at least 5 characters.";

    if (!e) errors.email = "Email is required.";
    else if (!EMAIL_REGEX.test(e)) errors.email = "Invalid email address.";

    if (!p) errors.password = "Password is required.";
    else if (!PASSWORD_REGEX.test(p)) errors.password = "Password must contain uppercase, lowercase, number, symbol, ≥8 chars."; 
    
    return errors;
};

export const loginValidator = ({ email = "", password = "" }) => {
    const errors = {};

    const e = normalize(email, true);
    const p = normalize(password);

    if (!e) errors.email = "Email is required.";
    else if (!EMAIL_REGEX.test(e)) errors.email = "Invalid email address.";
    
    if (!p) errors.password = "Password is required.";

    return errors;
};