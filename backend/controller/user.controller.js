import User from '../models/user.model.js';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.log("error in fetching users:", error.message);
        res.status(500).json({ success:false, message: "Server Error"});
    }
}

export const createUser = async (req, res) => {
    const user = req.body; // user will send this data
    if (!user.name || !user.email || !user.password) {
        return res.status(400).json( {
            success:false, message: "Please provide all fields"})
    }

    const newUser = new User(user)

    try {
        await newUser.save();
        res.status(201).json({success: true, data: newUser})
    } catch (error) {
        console.error("Error in creating user:", error.message);
        res.status(500).json({ success:false, message: "Server Error" });
    }
}

export const updateUser = async(req,res) => {
    const { id } = req.params;

    const user = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json( { success:false, message: "Invalid User ID"});
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
        res.status(200).json({ success: true, data: updatedUser});
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error"});
    }
}

export const deleteUser = async(req,res) => {
    const {id} = req.params;

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "User deleted"});
        console.log("id:", id);
    } catch (error) {
        console.log("error in deleting user:", error.message);
        res.status(404).json({ success: false, message: "User not found"});
    }
}
