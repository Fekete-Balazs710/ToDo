import todo from "../model/todosModel.js";

//Update isEditing property of todo element
const updateIsEditing =  async (req, res) => {
    const { isEditing } = req.body; // Extract the new isChecked value from the request body
    try {
        const { id } = req.params; // Extract the ID from the request parameters

        // Update all todos with isChecked set to false except the one specified by ID
        await todo.updateMany(
            { _id: { $ne: id } }, // Update all documents except the one specified by ID
            { $set: { isEditing: false } }
        );

        // Update the specified todo's isChecked field
        const tUpdate = await todo.findByIdAndUpdate(
            id,
            { $set: { isEditing } },
            { new: true }
        );
        res.json(tUpdate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update todos" });
    }
}

export default updateIsEditing;