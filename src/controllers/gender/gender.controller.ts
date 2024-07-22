import Gender from "../../schemas/gender/gender.schema";
import expressAsyncHandler from "express-async-handler";

const saveGender = expressAsyncHandler(async (req, res) => {
  const { genderName } = req.body;

  console
  try {
    const saveData = await Gender.create({ name: genderName });

    if (saveData) {
      res.status(200).send({ response: saveData });
    } else {
      res.status(500).send({ response: "Failed to save gender" });
    }
  } catch (error) {
    res.status(500).send({ response: "Server Error, failed to save gender" });
  }
});

const getGenderData = expressAsyncHandler(async (req, res) => {
  try {
    const gnderPipeline = [
      {
        $match: {
          status: true,
        },
      },
    ];
    const getRecords = await Gender.aggregate(gnderPipeline);

    if (getRecords) {
      res.status(200).send({ response: getRecords });
    } else {
      res.status(400).send({ response: "Failed to get gender data" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ response: "Server Error, failed to get gender data" });
  }
});

export default { saveGender, getGenderData };
