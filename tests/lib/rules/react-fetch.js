const rule = require("../../../lib/rules/react-fetch");
const RuleTester = require("eslint").RuleTester;
RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  }
});

const ERROR_MSG_NOT_STYLED = "Please remove this ajax call from this UI component";

const ruleTester = new RuleTester();

ruleTester.run("Rmove console.* from React", rule, {
    valid: [
      {
          code: `
          const west = () => {
              fetch('url')
            }
          `,
      }
    ],
    invalid: [
        {
            code: `
            class yes extends Component{
                man(){
                    promService('')
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
