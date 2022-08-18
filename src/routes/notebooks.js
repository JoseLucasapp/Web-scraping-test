import { getNotebooks } from "../controllers/notebooks"

export const notebooksRoutes = (router) => {
    router.get('/', getNotebooks)
}