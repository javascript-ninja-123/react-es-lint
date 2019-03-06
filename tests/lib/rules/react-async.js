const rule = require("../../../lib/rules/react-async");
const RuleTester = require("eslint").RuleTester;
RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  }
});

const ERROR_MSG_NOT_STYLED = "change it to async/await and how come you do not have then after fetch/axios/request?";

const ruleTester = new RuleTester();

ruleTester.run("Rmove then and catch from React", rule, {
    valid: [
      {
          code: `
           function b(){
              console.log('yess')
            }
          `,
      }
    ],
    invalid: [
        {
            code: `
            customService('')
            .catch("sss")
            `,
            errors: [{
                message: ERROR_MSG_NOT_STYLED,
                type:'Identifier'
            }]
        }
    ]
});
