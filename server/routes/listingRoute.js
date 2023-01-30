const express = require("express");
const { addListing, getListings } = require("../controller/listingController");
const { upload } = require("../middlewares/multer");

const router = express.Router();

router.post("/addListing", upload.single("file") ,addListing);
router.get("/allListing", getListings);
// router.get("/:id", getListing);
// router.put("/:id", editListing);
// router.delete("/:id", deleteListing);

// router.get("/all", (req, res) => {
//   console.log("Hey!");
//   res.send("Hey , Kreena here!");
// });

// router.get("/home", auth, (req, res) => {
//   console.log("Welcome");
//   res.status(200).send("Welcome 🙌 ");
// });

module.exports = router;
