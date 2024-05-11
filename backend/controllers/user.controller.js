exports.allAccess = async (req, res) => {
  try {
    res.status(200).send("Public Content.");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.userBoard = async (req, res) => {
  try {
    res.status(200).send("User Content.");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.adminBoard = async (req, res) => {
  try {
    res.status(200).send("Admin Content.");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.moderatorBoard = async (req, res) => {
  try {
    res.status(200).send("Moderator Content.");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
