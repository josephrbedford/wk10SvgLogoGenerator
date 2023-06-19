const inquirer = require('inquirer');
const { writeFile } = require('fs/promises');
const { Circle, Triangle, Square } = require('./shapes');

const { LogoText, SVG } = require('./Svg');




class CLI {
  constructor() {
   
  }

  run() {

    return inquirer
      .prompt([
        {
          type: 'input',
          name: 'text',
          message: 'Enter 1-3 characters for the logo.',
      },
      {
          type: 'input',
          name: 'textColour',
          message: 'Text Colour (keyword or hex).',
      },
      {
          type: 'list',
          name: 'shape',
          message: 'Shape?',
          choices: ['circle', 'triangle', 'square'],
      },
      {
          type: 'input',
          name: 'shapeColour',
          message: 'Shape Colour (keyword or hex).',
      },
      ])                                  // Call questions script to get input from user
      .then((responses) => {  
               
        const svg = this.generateSVG(responses);          // Generate SVG

        const markup = svg.render();                      // Render Elements

        return writeFile("logo.svg", markup)              // Write logo to file
      })
      .then(() => console.log('Logo written to file!'))
      .catch((err) => {
        console.log(err);
      });
    }

  generateSVG(options) {

    const logoText = new LogoText(options.text, options.textColour);

    switch (options.shape) {
      case "circle":
        const circle = new Circle(options.shapeColour);
        return new SVG(circle, logoText);
      case "square":
        const square = new Square(options.shapeColour);
        return new SVG(square, logoText);
      case "triangle":
        const triangle = new Triangle(options.shapeColour);
        return new SVG(triangle, logoText);
    }
  }
}

module.exports = CLI;