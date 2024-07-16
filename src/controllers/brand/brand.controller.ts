import Brand from "../../schemas/brand/branch.schema"
import BrandLogo from "../../schemas/brand/brandImage"
import expressAsyncHandler from "express-async-handler"

const createNewBrand = expressAsyncHandler(async (req: any, res: any) => {
    const { brandName, brandDescription, originCountry, brandLogo } = req.body;

    try {
        const saveBrand = await Brand.create({ name: brandName, description: brandDescription, origin: originCountry });

        if (!saveBrand) {
            return res.status(400).send({ response: 'Brand already exists' });
        }

        const brandId = saveBrand._id;
        const brandImage = await BrandLogo.create({ brand: brandId, logo: brandLogo });

        if (!brandImage) {
            return res.status(400).send({ response: 'Failed to save brand image' });
        }

        const pipeline = [
            {
                $match: { _id: saveBrand._id }
            },
            {
                $lookup: {
                    from: "brandlogos",
                    localField: "_id",
                    foreignField: "brand",
                    as: "result"
                }
            },
            {
                $addFields: {
                    logo: { $arrayElemAt: ["$result.logo", 0] }
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    origin: 1,
                    status: 1,
                    logo: 1,
                    __v: 1
                }
            }
        ];

        const aggregatedBrand = await Brand.aggregate(pipeline);

        if (aggregatedBrand.length > 0) {
            res.status(200).send({ response: aggregatedBrand[0] });
        } else {
            res.status(404).send({ response: 'Brand not found after aggregation' });
        }

    } catch (error) {
        console.error("Error creating new brand:", error);
        res.status(500).send({ response: "Server error, failed to create new brand" });
    }
});

const getBrands = expressAsyncHandler(async (req, res) => {

    try {

        const getBrandPipeline = [
            {
                $lookup: {
                    from: "brandlogos",
                    localField: "_id",
                    foreignField: "brand",
                    as: "brands"
                }
            },
            {
                $unwind: "$brands"
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    status: 1,
                    origin: 1,
                    "logo": "$brands.logo"
                }
            }
        ]

        const getRecords = await Brand.aggregate(getBrandPipeline)

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

const updateBrandStatus = expressAsyncHandler(async (req, res) => {

    const { brandId } = req.params
    const { status } = req.body

    try {
        const updateRecord = await Brand.findByIdAndUpdate(
            { _id: brandId },
            { status: status },
            { new: true }
        )

        if (updateRecord) {
            res.status(200).send({ response: updateRecord })
        }
        else {
            res.status(400).send({ response: 'Failed to update brand status' })
        }
    }
    catch (error) {
        res.status(500).send({ response: 'Server Error, failed to update brand status' })
    }
})


export default { createNewBrand, getBrands, updateBrandStatus }
