const rule = require("../../../lib/rules/react-import");
const RuleTester = require("eslint").RuleTester;
RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  }
});

const ERROR_MSG_NOT_STYLED = "This third-party library is either depreacated or disencouraged";

const ruleTester = new RuleTester();

ruleTester.run("Do not use not authorized library", rule, {
    valid: [
      {
          code: `
             "redux"
          `,
      }
    ],
    invalid: [
        {
            code: `
              'redux-thunk'
            `,
            errors: [{
                message: ERROR_MSG_NOT_STYLED,
                type:'Literal'
            }]
        }
    ]
});
