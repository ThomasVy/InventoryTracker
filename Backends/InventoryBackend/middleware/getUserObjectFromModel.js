function getUserObjectFromModel(model) {
  return async (req, res, next) => {
    const { user } = req;
    if (!user)
      return res.status(403).json({ message: "User not supplied" });

    const userObject = await model.findOne({ user }).exec();
    if (!userObject)
      return res
        .status(204).json({ message: "No user found"});

    req.userObject = userObject;
    next();
  };
}

module.exports = getUserObjectFromModel;
