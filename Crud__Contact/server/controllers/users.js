import db from "../db.js";

//get user
export const getUsers = (req, res) => {
    const sqlGet = "SELECT * FROM contact_db";

    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
};

//add user
export const postUsers = (req, res) => {
    const {name, email, contact} = req.body;
    const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES (?, ?, ?)";

    db.query(sqlInsert, [name, email, contact], (error, result) => {
        if (error) {
            console.log(error);
        };
    });
};

//view user
export const viewUsers = (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM contact_db WHERE id = ?";

    db.query(sqlGet, id, (error, result) => {
        if (error) {
            console.log(error);
        };
        res.send(result);
    });
};

//update user
export const updateUsers = (req, res) => {
    const { id } = req.params;
    const {name, email, contact} = req.body;
    const sqlUpdate = "UPDATE contact_db SET name = ?, email = ?, contact = ? WHERE id = ?";

    db.query(sqlUpdate, [name, email, contact, id], (error, result) => {
        if (error) {
            console.log(error);
        };
        res.send(result);
    });
};

//delete user
export const deleteUsers = (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM contact_db WHERE id = ?";

    db.query(sqlRemove, id, (error, result) => {
        if (error) {
            console.log(error);
        };
    });
}; 