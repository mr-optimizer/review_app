const Actor = require("../models/actor");
const {
  uploadImageToCloud,
  formatActor,
} = require("../utils/helper");

exports.createActor = async (req, res) => {
  const { name, about, gender } = req.body;
  const { file } = req;
  const newActor = new Actor({ name, about, gender });
  if (file) {
    const { url, public_id } = await uploadImageToCloud(file.path);
    newActor.avatar = { url, public_id };
  }
  await newActor.save();
  res.status(201).json({ actor: formatActor(newActor) });
};
