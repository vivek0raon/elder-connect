// import User from "../models/User.js";

// export const getCaretakers = async (req, res) => {
//   try {
//     //const caretakers = await User.find({ role: "caretaker" });
// //const caretakers = await User.find();
// const caretakers = await User.find({
//   role: { $regex: "caretaker", $options: "i" }
// });
//     console.log("Caretakers:", caretakers);

//     res.json(caretakers);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
import User from "../models/User.js";

/* ================= GET CARETAKERS ================= */
export const getCaretakers = async (req, res) => {
  try {
    const caretakers = await User.find({
      role: { $regex: "caretaker", $options: "i" }
    });

    console.log("Caretakers:", caretakers);

    res.json(caretakers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/* ================= UPDATE USER (PROFILE) ================= */
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedUser);

  } catch (err) {
    res.status(500).json({
      message: "Profile update failed",
      error: err.message
    });
  }
};