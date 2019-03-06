const message = "Please use a compose function from redux"





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
            Identifier(node) {
              if (node.name === "withRouter") {
                if (node.parent && node.parent.callee.name === "compose") return;
                if (Array.isArray(node.parent.arguments) && node.parent.arguments.length > 0) {
                  return node.parent.arguments.some(childNode => {
                    if (
                      childNode.type === "CallExpression" &&
                      childNode.callee.callee.name === "connect"
                    ) {
                      context.report({
                        node: node,
                        message: message
                      });
                      return true;
                    }
                    return;
                  });
                }
                return;
              }
            }
          };
    }
};
