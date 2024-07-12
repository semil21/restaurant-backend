import Brand from "../../schemas/brand/branch.schema"
import BrandLogo from "../../schemas/brand/brandImage"
import expressAsyncHandler from "express-async-handler"

const createNewBrand = expressAsyncHandler(async (req, res) => {

    const { brandName, brandDescription, originCountry, brandLogo } = req.body
    try {
        const saveBrand = await Brand.create({ name: brandName, description: brandDescription, origin: originCountry })

        if (saveBrand) {

            const brandId = saveBrand._id

            const brandImage = await BrandLogo.create({ brand: brandId, logo: brandLogo })

            if (brandImage) {
                res.status(200).send({ response: saveBrand, brandImage })
            }
            else {
                res.status(400).send({ response: 'Failed to save brand image' })
            }
        }
        else {
            res.status(400).send({ response: 'Brand already exists' })
        }
    }
    catch (error) {
        res.status(500).send({ response: "Server error, failed to create new brand" })
    }
})

const getBrands = expressAsyncHandler(async (req, res) => {

    try {

        const getBrandPipeline = [
            {
                $lookup: {
                    from: "brands",
                    localField: "brand",
                    foreignField: "_id",
                    as: "brand"
                }
            },
            {
                $unwind: "$brand"
            },
            {
                $project: {
                    _id: 1,
                    brandId: "$brand._id",
                    name: "$brand.name",
                    description: "$brand.description",
                    origin: "$brand.origin",
                    status: "$brand.status",
                    logo: 1
                }
            }
        ]

        const getRecords = await BrandLogo.aggregate(getBrandPipeline)

        if (getRecords) {
            res.status(200).send({ response: getRecords })
        }
        else {
            res.status(400).send({ response: 'Failed to get brands' })
        }
    }
    catch (error) {
        res.status(500).send({ response: 'Server error, failed to get brands' })
    }
})


export default { createNewBrand, getBrands }
