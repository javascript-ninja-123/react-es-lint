const rule = require("../../../lib/rules/react-ref");
const RuleTester = require("eslint").RuleTester;
RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  }
});

const message = "Please use ref={this.ref}"

const ruleTester = new RuleTester();

ruleTester.run("Use prop destructing", rule, {
    valid: [
      {
          code: `
            class whatup extends React.Component{
                render(){
                    return(
                        <div ref={this.ref}>
                        </div>
                    )
                }
            }
          `,
      }
    ],
    invalid: [
        {
            code: `
            class whatup extends React.Component{
                render(){
                    return(
                        <div ref={() => this.ref}>
                        </div>
                    )
                }
            }
            `,
            errors: [{
                message,
                type:'JSXIdentifier'
            }]
        }
    ]
});
