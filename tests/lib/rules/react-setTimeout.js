const rule = require("../../../lib/rules/react-setTimeout");
const RuleTester = require("eslint").RuleTester;
RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  }
});

const ERROR_MSG_NOT_STYLED = "Please use Rx js";

const ruleTester = new RuleTester();

ruleTester.run("Use prop destructing", rule, {
    valid: [
      {
          code: `
          class Run extends Component{
            	man(){
                  console.log('yess')
                }
            	render(){

                }
            }
          `,
      }
    ],
    invalid: [
        {
            code: `
            class Run extends Component{
              	man(){

                  	setTimeout(() => {

                      },1000)
                  }
              	render(){

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
