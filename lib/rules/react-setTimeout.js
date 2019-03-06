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
          const targetValue =
          node &&
          node.name === 'setTimeout'
          if(!targetValue)return
          context.report({
            node,
            message:"Please use Rx js"
          })
        }
      };
    }
};
