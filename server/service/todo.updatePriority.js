import todo from "../model/todosModel.js";

//Update priority property of todo element
const updatePriority = async (req, res) => {
    const { priority} = req.body; // Extract the new isChecked value from the request body
    try {
        const { id } = req.params; // Extract the ID from the request parameters

        // Update the specified todo's isChecked field
        const tUpdate = await todo.findByIdAndUpdate(
            id,
            { $set: { priority } },
            { new: true }
        );
        res.json(tUpdate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update todos" });
    }
}

export default updatePriority;