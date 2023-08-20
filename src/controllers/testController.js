const testController = (req, res, next) => {
  try {
    res.status(200).send({
      message: "api testing is working fine",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { testController };
