const rule = require("../../../lib/rules/react-withRouter");
const RuleTester = require("eslint").RuleTester;
RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
  }
});

const message = "Please use a compose function from redux"

const ruleTester = new RuleTester();

ruleTester.run("Do not wrap functions in withRouter", rule, {
    valid: [
      {
          code: `
            compose(
                withRouter,
                connect(mapstate,mapprops)
            )(App)
          `,
      }
    ],
    invalid: [
        {
            code: `
            withRouter(
                connect(maptoProps,map)(App)
            )
            `,
            errors: [{
                message: message,
                type:'Identifier'
            }]
        }
    ]
});
