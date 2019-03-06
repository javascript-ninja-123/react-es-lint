const {findAttribute} = require("../util")
const message = "Please use ref={this.ref}"


module.exports = {
    meta: {
        type: "suggestion",

        docs: {
            description: "disallow unnecessary semicolons",
            category: "Possible Errors",
            recommended: true,
        },
        fixable: "code",
        schema: [] // no options
    },
    create: function(context) {
        return {
            JSXIdentifier(node) {
              const a = findAttribute(node, "ref")  
              if (a.result) {
                  if(a.attribute.value){
                      if(a.attribute.value.expression.type === "ArrowFunctionExpression") {
                          context.report({
                              node,
                              message
                            });
                      }
                      return
                  }
                  return
              }
               return 
            }
          };
    }
};



