const rule = require("../../../lib/rules/react-maybe");
const RuleTester = require("eslint").RuleTester;
RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  }
});

const ERROR_MSG_NOT_STYLED = "When you use array, please follow this pattern, array && array.map()";

const ruleTester = new RuleTester();

ruleTester.run("Add maybe check for array in React", rule, {
    valid: [
      {
          code: `
          {
            array && array.map()
          }
          `,
      }
    ],
    invalid: [
        {
            code: `
              {
                array.reduce()
              }
            `,
            errors: [{
                message: ERROR_MSG_NOT_STYLED,
                type:'Identifier'
            }]
        }
    ]
});
