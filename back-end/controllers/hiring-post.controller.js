const {
  getAllHiringPostInSystem,
  getOwnHiringPosts,
  createHiringPost,
  updateHiringPost,
  removeHiringPost,
  applyToHiringPost,
} = require("../services/hiring-post.service");

const getAllHiringPosts = async (req, res) => {
  const { page, searchParam } = req.query;
  try {
    const results = await getAllHiringPostInSystem(page, searchParam);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOwnHiringPosts = async (req, res) => {
    const { _id } = req.user;
    const { page, searchParam } = req.query;
    try {
        const results = await getOwnHiringPosts(_id, page, searchParam)
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const create = async (req, res) => {
  const { _id } = req.user;
  const body = req.body;

  try {
    const result = await createHiringPost(_id, body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    await updateHiringPost(id, body);
    res.status(200).json({ message: "Updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await removeHiringPost(id);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const applyToPost = async (req, res) => {
  const { _id } = req.user;
  const {postId} = req.body;
  try {
    await applyToHiringPost(_id, postId);
    res.status(201).json({ message: "Applied" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllHiringPosts,
  create,
  update,
  remove,
  getAllOwnHiringPosts,
  applyToPost
};
