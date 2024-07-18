import SubCategory from "../../schemas/category/subCategory.schema";
import expressAsyncHandler from "express-async-handler";

const saveSubCategory = expressAsyncHandler(async (req, res) => {
    const { category, subCategory, gender } = req.body;

    try {
        const newSubCategory = await SubCategory.create({ category: category, name: subCategory, gender: gender });

        const pipeline = [
            { $match: { _id: newSubCategory._id } },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            { $unwind: '$category' },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    status: 1,
                    gender: 1,
                    "category": "$category.name",
                    "category_id": "$category._id",
                    "category_status": "$category.status",
                }
            }
        ];

        const saveRecord = await SubCategory.aggregate(pipeline).exec();

        if (saveRecord.length > 0) {
            res.status(200).send({ response: saveRecord[0] });
        } else {
            res.status(500).send({ response: 'Failed to create new subcategory' });
        }
    } catch (error) {
        res.status(500).send({ response: "Server Error, Failed to create subcategory" });
    }
});


const getAllCategories = (expressAsyncHandler(async (req, res) => {

    try {
        const categoriesPipeline = [
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "result"
                }
            },
            {
                $unwind: "$result"
            },
            {
                $addFields: {
                    "category": "$result.name",
                    "category_status": "$result.status",
                    "category_id": "$result._id"
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    status: 1,
                    gender: 1,
                    category: 1,
                    category_status: 1,
                    category_id: 1
                }
            }
        ]

        const getRecords = await SubCategory.aggregate(categoriesPipeline)

        if (getRecords) {
            res.status(200).send({ response: getRecords })
        }
        else {
            res.status(500).send({ response: 'Failed to get categories' })
        }
    }
    catch (error) {
        res.status(500).send({ response: 'Server error, failed to get categories' })
    }
}))




const getSubCategories = expressAsyncHandler(async (req, res) => {
    const { categoryId } = req.params
    try {
        const getData = await SubCategory.find(
            { category: categoryId }
        ).lean()
        if (getData) {
            res.status(200).send({ response: getData })
        }
        else {
            res.status(500).send({ response: 'Failed to get sub categories' })
        }
    }
    catch (error) {
        res.status(500).send({ response: 'Server Error, Failed to get sub categories' })
    }
})


const editSubCategory = expressAsyncHandler(async (req, res) => {
    const { subCategoryId } = req.params
    const data = req.body
    try {
        const updatedRecord = await SubCategory.findOneAndUpdate(
            { _id: subCategoryId },
            data,
            { new: true }
        )

        if (updatedRecord) {
            const pipeline = [
                { $match: { _id: updatedRecord._id } },
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category"
                    }
                },
                { $unwind: "$category" },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        gender: 1,
                        status: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        categoryId: "$category._id",
                        categoryName: "$category.name"

                    }
                }
            ]

            const result = await SubCategory.aggregate(pipeline).exec()

            res.status(200).send({ response: result[0] })
        } else {
            res.status(500).send({ response: 'Failed to update sub category' })
        }
    } catch (error) {
        res.status(500).send({ response: 'Server Error, Failed to update sub category' })
    }
})


const deleteSubCategory = expressAsyncHandler(async (req, res) => {
    const { subCategoryId } = req.params
    try {
        const deleteRecord = await SubCategory.findByIdAndDelete(
            { _id: subCategoryId },
            { new: true }
        )
        if (deleteRecord) {
            res.status(200).send({ response: deleteRecord })
        }
        else {
            res.status(500).send({ response: 'Failed to delete sub category' })
        }
    }
    catch (error) {
        res.status(500).send({ response: 'Server Error, Failed to delete sub category' })
    }
})

const handleStatus = expressAsyncHandler(async (req, res) => {
    const { subCategoryId } = req.params
    const { status } = req.body

    try {
        const updateRecord = await SubCategory.findByIdAndUpdate(
            { _id: subCategoryId },
            { status: status },
            { new: true }
        ).lean()

        if (updateRecord) {
            res.status(200).send({ response: updateRecord })
        }
        else {
            res.status(400).send({ response: 'Failed to update sub catgory status' })
        }
    }
    catch (error) {
        res.status(500).send({ response: 'Server error, Failed to update sub category status' })
    }
})

const getActiveSubCategory = expressAsyncHandler(async (req, res) => {
    try {
        const activeSubCategoryPipeline = [
            {
                $match: {
                    "status": true
                }
            }
        ]

        const getRecords = await SubCategory.aggregate(activeSubCategoryPipeline)

        if (getRecords) {
            res.status(200).send({ response: getRecords })
        }
        else {
            res.status(400).send({ response: 'Failed to get active sub categories' })
        }
    }
    catch (error) {
        res.status(500).send({ response: 'Server erroe, failed to get active sub categories' })
    }
})



export default { saveSubCategory, getSubCategories, editSubCategory, deleteSubCategory, getAllCategories, handleStatus, getActiveSubCategory }