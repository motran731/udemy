import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
const dnd_URL = "https://www.dnd5eapi.co/api";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.render("index.ejs");
// });
//when MY server gets a request on "/" this function is called
app.get("/", async (req, res) => {
  try {
    let character = {
      class: "",
      race: "",
      skills: "",
      damageType: "",
    };
    // ----- MAKE REQUEST TO DND SERVER
    const classResponse = await axios.get(
      "https://www.dnd5eapi.co/api/classes"
    );
    // ----- WE HAVE RESPONSE SO WE ARE BACK TO BEING A SERVER

    const classData = classResponse.data;
    const classesArray = classData.results;
    const randomClasses =
      classesArray[Math.floor(Math.random() * classesArray.length)].name;

    //console.log(randomClasses);

    const raceResponse = await axios.get("https://www.dnd5eapi.co/api/races");
    const raceData = raceResponse.data;
    const raceArray = raceData.results;
    const randomRace =
      raceArray[Math.floor(Math.random() * raceArray.length)].name;
    //console.log(randomRace);

    const skillsResponse = await axios.get(
      "https://www.dnd5eapi.co/api/skills"
    );
    const skillsData = skillsResponse.data;
    const skillsArray = skillsData.results;
    const randomSkills =
      skillsArray[Math.floor(Math.random() * skillsArray.length)].name;
    //console.log(randomSkills);

    const damageResponse = await axios.get(
      "https://www.dnd5eapi.co/api/damage-types"
    );
    const damageData = damageResponse.data;
    const damageArrray = damageData.results;
    const randomDamage =
      damageArrray[Math.floor(Math.random() * damageArrray.length)].name;
    console.log(randomClasses, randomRace, randomSkills, randomDamage);
    res.render("index.ejs", { data: character });
  } catch (error) {
    console.error(error.response.data);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`You got served on port ${port}!!`);
});
