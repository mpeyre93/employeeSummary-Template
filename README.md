# employeeSummary-Template
This is a Node Command Line Application that takes in information from the user about employees and generates an HTML webpage that displays summaries for each person to generate a software enineering team. 
Since testing is a key piece in making code maintainable, I have tested the program to ensure that all unit tests pass.

The application will prompt the user for information about the team manager and then information about the team members. The user can input any number of team members, and they may be a mix of engineers and interns. When the user has completed building the team, the application will create an HTML file that displays a nicely formatted team roster based on the information provided by the user. 

## User-story
```
As a manager
I want to generate a webpage that displays my team's basic info
so that I have quick access to emails and GitHub profiles
```

## Criteria

* With the use of the [Inquirer npm package](https://github.com/SBoudrias/Inquirer.js/) this program will prompt the user for their email, id, and specific information based on their role with the company. 

* This program will run as a Node CLI to gather information about each employee.

* Below is an example of what the application may look like after a team is created:

![createdTeamScreenshot](Images/teamPageScreenshot.png?raw=true)

* Below is a link to the video demenstration of the running program:

Video of running application can be found in the Images folder as well as the following link: (https://drive.google.com/file/d/1-CeAGMtBiG6A1sbTW0ZE3oz3niyquQTr/view)

The dependencies are, [jest](https://jestjs.io/) for running the provided tests, and [inquirer](https://www.npmjs.com/package/inquirer) for collecting input from the user.

* Below is a screenshot of all tests passing in terminal:

![classtest screenshot](/Images/testScreenshot.png?raw=true)

### Classes
The project containers the following classes: `Employee`, `Manager`, `Engineer`,
`Intern`. The tests for these classes in the `tests` directory all pass.



The first class is an `Employee` parent class with the following properties and
methods:

  * name
  * id
  * email
  * getName()
  * getId()
  * getEmail()
  * getRole() 

The other three classes will extend `Employee`. 

In addition to `Employee`'s properties and methods, `Manager` will also have:

  * officeNumber

  * getRole() 

In addition to `Employee`'s properties and methods, `Engineer` will also have:

  * github username

  * getGithub()

  * getRole() 

In addition to `Employee`'s properties and methods, `Intern` will also have:

  * school 

  * getSchool()

  * getRole() 

### User input

The program will prompt the user to build an engineering team. An engineering
team consists of a manager, and any number of engineers and interns. The user will respond to the prompt questions in the terminal to create their team.

* Below is an example of what the terminal questions may look like while creating the team:

![terminalQuestions](/Images/terminalQuestionsSS.png?raw=true)

### Roster output

The program will generate a `team.html` page in the `output` directory, that displays a nicely formatted team roster. 
Each team member will display the following:

  * Name

  * ID

  * Role

  * Role-specific property (School, link to GitHub profile, or office number)