import { getNotebooksData } from "../models/notebooks"

export const getNotebooks = async (req, res) => {
    try {
        const notebooks = await getNotebooksData()
        res.status(200).json(notebooks)
    } catch (error) {
        res.status(500).json(error)
    }

}