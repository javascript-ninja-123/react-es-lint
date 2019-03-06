const rule = require("../../../lib/rules/react-syntax");
const RuleTester = require("eslint").RuleTester;
RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  }
});

const ERROR_MSG_NOT_STYLED = "Please use destructing for React. Remove React. Shoulde be import React, {whatever} from 'react'";

const ruleTester = new RuleTester();

ruleTester.run("No ugly React Sytax", rule, {
    valid: [
      {
          code: `
          <Fragment>whatever</Fragment>
          `,
      }
    ],
    invalid: [
        {
            code: `
                <React.Fragment>
                whatever
                </React.Fragment>
            `,
            errors: [{
                message: ERROR_MSG_NOT_STYLED,
                type:'JSXOpeningElement'
            }]
        }
    ]
});
