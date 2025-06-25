document.addEventListener("DOMContentLoaded", function () {
  populateDropdowns();
  populateInterestDropdown();
  fetchProgramData();  // Load the program data from the JSON file
});

// Course Map
const courseMap = new Map([
  ["ENG4U", "ENG4U - English, Grade 12, University Preparation"],
  ["MHF4U", "MHF4U - Advanced Functions, Grade 12, University Preparation"],
  ["MCV4U", "MCV4U - Calculus and Vectors, Grade 12, University Preparation"],
  ["ICS4U", "ICS4U - Computer Science, Grade 12, University Preparation"],
  ["SPH4U", "SPH4U - Physics, Grade 12, University Preparation"],
  ["SCH4U", "SCH4U - Chemistry, Grade 12, University Preparation"],
  ["SBI4U", "SBI4U - Biology, Grade 12, University Preparation"],
  ["BBB4M", "BBB4M - International Business Fundamentals, Grade 12, University/College Preparation"],
  ["N/A", "N/A"]
]);

const interests = [
  "Technology & Engineering",
  "Business & Finance",
  "Health & Medicine",
  "Social Sciences",
  "Arts & Humanities"
];

// Populate all course dropdowns
function populateDropdowns() {
  for (let i = 1; i <= 6; i++) {
    let dropdown = document.getElementById(`course${i}`);
    courseMap.forEach((value, key) => {
      let option = document.createElement("option");
      option.value = key;
      option.textContent = value;
      dropdown.appendChild(option);
    });
  }
}

// Populate interest dropdown
function populateInterestDropdown() {
  let interestDropdown = document.getElementById("interest");
  interests.forEach(interest => {
    let option = document.createElement("option");
    option.value = interest;
    option.textContent = interest;
    interestDropdown.appendChild(option);
  });
}

let programData = []; // Store the program data here

// Fetch the JSON file (universities.json)
function fetchProgramData() {
  fetch('universities.json')  // Ensure the path is correct for your JSON file
    .then(response => response.json())
    .then(data => {
      programData = data; // Store the data in the programData variable
      console.log(programData);  // Optional: check the data in the console
    })
    .catch(error => console.error("Error loading the JSON data:", error));
}

document.getElementById("submitButton").addEventListener("click", calculateUniversities);

function calculateUniversities() {
  let selectedCourses = [];
  for (let i = 1; i <= 6; i++) {
    let course = document.getElementById(`course${i}`).value;
    if (course !== "N/A") selectedCourses.push(course);
  }

  let selectedInterest = document.getElementById("interest").value;

  let eligiblePrograms = findEligiblePrograms(selectedCourses, selectedInterest);
  displayResults(eligiblePrograms);
}

function findEligiblePrograms(courses, interest) {
  if (!programData || programData.length === 0) return []; // If program data isn't loaded yet, return empty array

  return programData.filter(program =>
    program.interest === interest &&
    program.requiredCourses.every(course => courses.includes(course))
  ).map(program => program.name);
}

function displayResults(eligiblePrograms) {
  let resultDiv = document.getElementById("results");
  resultDiv.innerHTML = "<h2>Eligible Programs:</h2>";
  resultDiv.innerHTML += eligiblePrograms.length > 0
    ? eligiblePrograms.map(program => `<p><b>${program}</b></p>`).join("")
    : "<p>No matching programs.</p>";
}
