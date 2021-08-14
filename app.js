const inquirer = require('inquirer');
// console.log(inquirer);node
const fs = require('fs');
const generatePage = require('./src/page-template');

const promptUser = () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name? (Required)',
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('Please enter your name!');
              return false;
            }
          }
        },
      
        {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username (Required)',
        validate: gitNameInput => {
            if (gitNameInput) {
              return true;
            } else {
              console.log('Please enter your GitHub Username!');
              return false;
            }
          }
      },
      {
          type: 'confirm',
          name:'confirmAbout',
          message:'Would you like to enter some information about youtself for an "About" section?',
          default: true
          },
          {
              type:'input',
            name:'about',
    message: 'Provide some information about yourself:',
when: ({ confirmAbout}) => confirmAbout
}
     
    ]);
  };
  
  const promptProject = portfolioData => {
    
    console.log(`
  =================
  Add a New Project
  =================
  `);

   // If there's no 'projects' array property, create one
   if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
    return inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project? (Required)',
        validate: projectNameInput => {
            if (projectNameInput) {
              return true;
            } else {
              console.log('Please enter the name of your project!');
              return false;
            }
          }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: projectDiscInput => {
            if (projectDiscInput) {
              return true;
            } else {
              console.log('Please enter a description of your project!');
              return false;
            }
          }
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: linkInput => {
            if (linkInput) {
              return true;
            } else {
              console.log('Please enter your GitHub link!');
              return false;
            }
          }
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }

    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
          return promptProject(portfolioData);
        } else {
          return portfolioData;
        }
      });
  
    };

   promptUser()
  .then (promptProject)
  .then(portfolioData => {
      console.log(portfolioData);
  })
        // .then(answers => console.log(answers))
        // .then(promptProject)
        // .then(projectAnswers => console.log(projectAnswers));

// // const profileDataArgs = process.argv.slice(2);

// // console.log(profileDataArgs);

// // const [name, github] = profileDataArgs;

// const pageHTML = generatePage(name, github);

// // // console.log(name, github);

// // const pageHTML = generatePage(name, github);

// // fs.writeFile('./index.html', pageHTML, err => {
// //   if (err) throw err;

// //   console.log('Portfolio complete! Check out index.html to see the output!');
// // });

// fs.writeFile('./index.html', pageHTML, err => {
//     if (err) throw new Error(err);
  
//     console.log('Portfolio complete! Check out index.html to see the output!');
//   });

