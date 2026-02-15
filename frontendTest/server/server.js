const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const DATA_PATH = path.resolve(__dirname, "../public/new_database.json");

app.delete("/languages/:id", (req, res) => {
  const { id } = req.params;

  try {
    const raw = fs.readFileSync(DATA_PATH);
    const data = JSON.parse(raw);

    if (!data[id]) {
      return res.status(404).json({ message: "Language not found" });
    }

    delete data[id];

    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

    res.json({ message: "Language deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
