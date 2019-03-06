const notAllowed = ['log','info','time','timeEnd','dir','table']



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
          Identifier(node){
            const targetValue =
              node
              && node.name === 'console'
              && node.parent.property
              && notAllowed.includes(node.parent.property.name)
            if(!targetValue) return
            context.report({
            node,
              message:"Remove console, use console.warn() for the future reference"
            })
          }
        };
    }
};
