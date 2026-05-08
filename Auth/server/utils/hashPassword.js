import argon2 from "argon2";

export const hashPassword = async (password) => {
    try {
        return await argon2.hash(password, { type: argon2.argon2id });
    } catch (err) {
        console.error("Hashing error:", err);
        throw new Error("Password hashing failed");
    };
};

export const verifyPassword = async (password, hash) => {
    try {
        return await argon2.verify(hash, password);
    } catch (err) {
        console.error("Verify error:", err);
        return false;
    };
};