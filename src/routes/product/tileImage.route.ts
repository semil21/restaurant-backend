import tileImageController from "../../controllers/product/tileImage.controler"
import express from "express"

const tileImageRouter = express.Router()

tileImageRouter.post('/add', tileImageController.saveTileImage)
tileImageRouter.post('/:color', tileImageController.getTileImage)
tileImageRouter.put('/edit/:id', tileImageController.editTileImage)

export default tileImageRouter