const rule = require("../../../lib/rules/react-console");
const RuleTester = require("eslint").RuleTester;
RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  }
});

const ERROR_MSG_NOT_STYLED = "Remove console, use console.warn() for the future reference";

const ruleTester = new RuleTester();

ruleTester.run("Rmove console.* from React", rule, {
    valid: [
      {
          code: `
            console.warn('yess')
          `,
      }
    ],
    invalid: [
        {
            code: 'console.log("adsfsd")',
            errors: [{
                message: ERROR_MSG_NOT_STYLED,
                type:'Identifier'
            }]
        }
    ]
});
