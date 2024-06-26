import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
const dnd_URL = "https://www.dnd5eapi.co/api";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index1.ejs");
});

//when MY server gets a request on "/" this function is called
app.get("/submit", async (req, res) => {
  try {
    let character = {
      classes: "",
      race: "",
      skills: [],
      damageType: "",
    };
    // ----- MAKE REQUEST TO DND SERVER
    const classResponse = await axios.get(
      "https://www.dnd5eapi.co/api/classes"
    );
    //classResponse is an object of counts, results
    // ----- WE HAVE RESPONSE SO WE ARE BACK TO BEING A SERVER

    // const {
    //   data: { results: classesArray },
    // } = await axios.get("https://www.dnd5eapi.co/api/classes");
    // const randomClasses =
    //   classesArray[Math.floor(Math.random() * classesArray.length)].name;

    const classData = classResponse.data;
    const classesArray = classData.results;
    const randomClasses =
      classesArray[Math.floor(Math.random() * classesArray.length)].name;
    character.classes = randomClasses;
    console.log(classesArray);

    const raceResponse = await axios.get("https://www.dnd5eapi.co/api/races");
    const raceData = raceResponse.data;
    const raceArray = raceData.results;
    const randomRace =
      raceArray[Math.floor(Math.random() * raceArray.length)].name;
    character.race = randomRace;

    const skillsResponse = await axios.get(
      "https://www.dnd5eapi.co/api/skills"
    );
    const skillsData = skillsResponse.data;
    const skillsArray = skillsData.results;

    const skill1 =
      skillsArray[Math.floor(Math.random() * skillsArray.length)].name;
    //character.skills = randomSkills1;

    const skill2 =
      skillsArray[Math.floor(Math.random() * skillsArray.length)].name;

    if (skill1 === skill2) {
      do {
        skill2 =
          skillsArray[Math.floor(Math.random() * skillsArray.length)].name;
      } while (skill1 === skill2);
    }

    const damageResponse = await axios.get(
      "https://www.dnd5eapi.co/api/damage-types"
    );
    const damageData = damageResponse.data;
    const damageArrray = damageData.results;
    const randomDamage =
      damageArrray[Math.floor(Math.random() * damageArrray.length)].name;
    character.damageType = randomDamage;

    console.log(randomClasses, randomRace, skill1, skill2, randomDamage);

    res.render("index.ejs", {
      dndclass: randomClasses,
      race: randomRace,
      skill1: skill1,
      skill2: skill2,
      damage: randomDamage,
    });
  } catch (error) {
    console.error(error.response.data);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`You got served on port ${port}!!`);
});
