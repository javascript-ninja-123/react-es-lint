const rule = require("../../../lib/rules/react-data-test");
const RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  }
});

const message= "please add data-test"

const ruleTester = new RuleTester();

ruleTester.run("Add data-test", rule, {
    valid: [
      {
          code: `
            const a = () => {

                return(
                    <div data-test="tesss">
        
                    </div>
                    )
            }
          `,
      }
    ],
    invalid: [
        {
            code: `
            const a = () => {

                return(
                    <div>
        
                    </div>
                    )
            }
            `,
            errors: [{
                message: message,
                type:'JSXIdentifier'
            }]
        }
    ]
});
