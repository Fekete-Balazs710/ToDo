import todo from "../model/todosModel.js";

//Update Title property of todo element
const updateTitle = async (req, res) => {
    const { title } = req.body; // Extract the new isChecked value from the request body
    try {
        const { id } = req.params; // Extract the ID from the request parameters

        // Update the specified todo's isChecked field
        const tUpdate = await todo.findByIdAndUpdate(
            id,
            { $set: { title } },
            { new: true }
        );
        res.json(tUpdate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update todos" });
    }
}

export default updateTitle;