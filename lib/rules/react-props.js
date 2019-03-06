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
              node.name === "props" &&
              node.parent.object &&
              loopThroughParent(node.parent);

            if (!targetValue) return;
            context.report({
              node,
              message: "Please use const a = ({input,whatever props}) => pattern"
            });
          }
        };
    }
};



function loopThroughParent(parent) {
  let functionInTheClass = false;
  let result = true;
  const recurse = newParent => {
    if(newParent === null) return
    else if(newParent.type === "ClassProperty" ||  newParent.type === "MethodDefinition"){
      result = false;
      functionInTheClass = true;
    }
    else if(newParent.type === "ArrowFunctionExpression" || newParent.type === "FunctionDeclaration"){
      result = true;
    }
    recurse(newParent.parent);
  };
   recurse(parent);
   return functionInTheClass ? false : result
}
