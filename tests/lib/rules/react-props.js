const rule = require("../../../lib/rules/react-props");
const RuleTester = require("eslint").RuleTester;
RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  }
});

const ERROR_MSG_NOT_STYLED = "Please use const a = ({input,whatever props}) => pattern";

const ruleTester = new RuleTester();

ruleTester.run("Use prop destructing", rule, {
    valid: [
      {
          code: `
          {
            const b  = ({yes}) => {
              return yes.map(value => console.log(value))
            }
          }
          `,
      }
    ],
    invalid: [
        {
            code: `
              {
                 const b  = () => {
                  return props.yes.map(value => console.log(value))
                }
              }
            `,
            errors: [{
                message: ERROR_MSG_NOT_STYLED,
                type:'Identifier'
            }]
        }
    ]
});
