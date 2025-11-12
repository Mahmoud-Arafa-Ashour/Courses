const express = require('express');
const verifyToken = require('../middleware/verifyToken.js');
const app = express();
app.use(express.json());
const router = express.Router();
const{
    getAllUsers,
    getUserById,
    register,
    updateUser,
    deleteUser,
    login
} = require('../services/users_services.js');
const upload = require('../utils/uploadFile.js');


router
.route('/')
.get(verifyToken,getAllUsers);

router
.route('/register')
.post( upload.uploadImage.single('Avatar'),register);

router
.route('/:userId' , verifyToken)
.get(verifyToken,getUserById)
.patch(verifyToken,updateUser)
.delete(verifyToken,deleteUser);

router
.route('/login')
.post(login);

module.exports = router;