const rule = require("../../../lib/rules/react-function");
const RuleTester = require("eslint").RuleTester;
RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  }
});

const ERROR_MSG_NOT_STYLED = "Please use onAttribute={this.function} pattern";

const ruleTester = new RuleTester();

ruleTester.run("No React fat arrow expression function in attribute", rule, {
    valid: [
      {
          code: `
          <Button onClick={this.man}>submit</Button>
          `,
      }
    ],
    invalid: [
        {
            code: `
              <Button onClick={() => this.man()}>submit</Button>
            `,
            errors: [{
                message: ERROR_MSG_NOT_STYLED,
                type:'JSXOpeningElement'
            }]
        }
    ]
});
