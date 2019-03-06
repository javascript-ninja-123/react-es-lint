const notAllowedLibraries = [
  "redux-thunk",
  "redux-form",
  "react-redux-form"
];

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
          Literal(node) {
            const targetValue = node 
            && notAllowedLibraries.includes(node.value);
            if (!targetValue) return;
            context.report({
              node,
              message: "This third-party library is either depreacated or disencouraged"
            });
          }
        };
    }
};
