import todo from "../model/todosModel.js";

//Update Description property of todo element
const updateDescription = async (req, res) => {
    const { description } = req.body; // Extract the new isChecked value from the request body
    try {
        const { id } = req.params; // Extract the ID from the request parameters

        // Update the specified todo's isChecked field
        const tUpdate = await todo.findByIdAndUpdate(
            id,
            { $set: { description } },
            { new: true }
        );
        res.json(tUpdate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update todos" });
    }
}

export default updateDescription;