const arrayMethods = ['find','some', 'reduce','map','filter', 'slice','split'];



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
            && node.parent.object
            && node.parent.object.type === "Identifier"
            && !arrayMethods.includes(node.name)
            && arrayMethods.includes(node.parent.property.name)
            && node.parent.parent.parent.operator !== "&&"
            && node.parent.parent.parent.operator !== "LogicalExpression"
            if(!targetValue) return

            context.report({
              node,
              message:"When you use array, please follow this pattern, array && array.map()"
            })
          }
        };
    }
};
