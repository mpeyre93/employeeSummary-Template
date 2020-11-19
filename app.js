const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// use inquirer to gather information about the development team members,
// and create objects for each team member
// ===== START FUNCTION ===== 
const teamMembers = [];
const teamID = [];

//initialize program
function init() {
    // Using inquirer to gather information about the development team members,
    // and to create objects for each team member

    //function for user to input a manager for the team and prompt specific questions for manager team member
    function createManager() {
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is your name?",
            },
            {
                type: "input",
                name: "managerID",
                message: "What is your employee ID?",
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
            //create and add manager object from user responses
        ]).then(response => {
            const manager = new Manager(response.managerName, response.managerID, response.managerEmail, response.managerOfficeNumber);
            teamMembers.push(manager);
            teamID.push(response.managerID);
            addTeamMember();
        });
    }
    //add team member function, questions based on role of employee input from user
    function addTeamMember() {
        // prompt user for employee's role
        inquirer.prompt([
            {
                type: "list",
                name: "memberRole",
                message: "What is the role of your team member?",
                choices: [
                    "Engineer",
                    "Intern",
                    "Team is complete"
                ]
            }
        ]).then(userChoice => {
            switch (userChoice.memberRole) {
                //if users selects the engineer then the createEngineer function is called for specific questions
                case "Engineer":
                    createEngineer();
                    break;
                //if users selects the intern then the createIntern function is called fpr specific questions
                case "Intern":
                    createIntern();
                    break;
                default:
                    buildTeam();
            }
        });
    }

    //create engineer and prompt user questions specific to engineer team member
    function createEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is your engineer's name?",
            },
            {
                type: "input",
                name: "engineerID",
                message: "What is engineer's employee ID?",
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
            //create and add engineer object from user responses
            const engineer = new Engineer(response.engineerName, response.engineerID, response.engineerEmail, response.engineerGit);
            teamMembers.push(engineer);
            teamID.push(response.engineerID);
            addTeamMember();
        });
    }
    //create intern and prompt user questions specific to intern team member
    function createIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is your intern's name?",
            },
            {
                type: "input",
                name: "internID",
                message: "What is your intern's employee ID?",
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
            //create and add intern object from user responses
            const intern = new Intern(response.internName, response.internID, response.internEmail, response.school);
            teamMembers.push(intern);
            teamID.push(response.internID);
            addTeamMember();
        });
    }

    //After the user has input all employees desired, call the `render` function
    //pass in an array containing all employee objects; the `render` function will
    //generate and return a block of HTML including templated divs for each employee

    //After you have your html, create an HTML file using the HTML
    //returned from the `render` function. Write it to a file named `team.html` in the
    //`output` folder, using the variable `outputPath` to target this location.
    function buildTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
        //success message for user to know their team was created
        console.log("Your team is complete!");
    }

    //call manager function to initialize program to prompt user for manager questions
    createManager();
}

//initialize program
init();