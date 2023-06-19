const { SVG, LogoText } = require("./Svg");
const { Square } = require("./shapes");

test("should render 200x200 svg element", () => {

    const color = "red";
    const expectedSvg = 
        `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg"><rect x="90" y="40" width="120" height="120" fill="red" /><text x="150" y="125" font-size="60" text-anchor="middle" fill="red">HQW</text></svg>`;

    const square = new Square(color);
    const logoText = new LogoText("HQW", color);

    const svg = new SVG(square, logoText);
    expect(svg.render()).toEqual(expectedSvg);
});