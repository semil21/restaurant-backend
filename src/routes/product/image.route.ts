import imageContoller from "../../controllers/product/images.controller";
import express from "express"

const imageRouter = express.Router()

imageRouter.post("/add", imageContoller.saveImage)
imageRouter.post("/:id", imageContoller.getImages)
imageRouter.put("/:id", imageContoller.handleImageStatus)

export default imageRouter