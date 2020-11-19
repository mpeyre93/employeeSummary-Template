const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const teamArrayID = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// ===== START FUNCTION ===== 


//initialize program
function init() {
    // Using inquirer to gather information about the development team members,
    // and to create objects for each team member

    //function for user to input a manager for the team
    function addManager() {
        //questions specific to manager team member
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is your name?",
            },
            {
                type: "input",
                name: "managerID",
                message: "What is your ID?",
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is your email?",
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is your office number?",
            }
            //user input created into an object for manager
        ]).then(response => {
            const manager = new Manager(response.managerName, response.managerID, response.managerEmail, response.managerOfficeNumber);
            teamMembers.push(manager);
            teamArrayID.push(response.managerID);
            createTeam();
        });
    }
    //create team function, questions based on role of employee input from user
    function createTeam() {
        // prompt for employee role
        inquirer.prompt([
            {
                type: "list",
                name: "memberRole",
                message: "What is the role of your team memeber?",
                choices: [
                    "Engineer",
                    "Intern",
                    "Team is complete"
                ]
            }
        ]).then(userChoice => {
            switch (userChoice.memberRole) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    buildTeam();
            }
        });
    }

    // add Engineer function
    function addEngineer() {
        // prompt questions about engineer
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is your Engineer's name?",
            },
            {
                type: "input",
                name: "engineerID",
                message: "What is engineer's ID?",
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is engineer's email?",
            },
            {
                type: "input",
                name: "engineerGit",
                message: "What is engineer's GitHub username?",
            }
        ]).then(response => {
            // create Engineer object
            const engineer = new Engineer(response.engineerName, response.engineerID, response.engineerEmail, response.engineerGit);
            teamMembers.push(engineer);
            teamArrayID.push(response.engineerID);
            createTeam();
        });
    }
    //add intern and prompt users of specific questions
    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is your intern's name?",
            },
            {
                type: "input",
                name: "internID",
                message: "What is your intern's ID?",
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is your intern's email?",
            },
            {
                type: "input",
                name: "school",
                message: "What school is your intern attending?",
            }
        ]).then(response => {
            // create object
            const intern = new Intern(response.internName, response.internID, response.internEmail, response.school);
            teamMembers.push(intern);
            teamArrayID.push(response.internID);
            createTeam();
        });
    }

    // After the user has input all employees desired, call the `render` function (required
    // above) and pass in an array containing all employee objects; the `render` function will
    // generate and return a block of HTML including templated divs for each employee

    // After you have your html, you're now ready to create an HTML file using the HTML
    // returned from the `render` function. Now write it to a file named `team.html` in the
    // `output` folder. You can use the variable `outputPath` above to target this location.
    function buildTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    }

    //call manager function to initialize program to prompt user for manager questions
    addManager();
}

//initialize program
init();