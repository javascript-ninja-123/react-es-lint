const rule = require("../../../lib/rules/react-try-catch");
const RuleTester = require("eslint").RuleTester;
RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
  }
});

const ERROR_MSG_NOT_STYLED = "add try and catch";

const ruleTester = new RuleTester();

ruleTester.run("Do not forget try and catch", rule, {
    valid: [
      {
          code: `
          const c = async  () => {

            try{

            }
            catch(err){

            }
          }
          `,
      }
    ],
    invalid: [
        {
            code: `
                const c = async () => {


                }
            `,
            errors: [{
                message: ERROR_MSG_NOT_STYLED,
                type:'ArrowFunctionExpression'
            }]
        }
    ]
});
