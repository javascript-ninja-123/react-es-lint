const notAllowedArray = ["axios", "fetch", "request"];



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
              (notAllowedArray.includes(node.name)  || node.name.toLowerCase().includes('service'))
              && loopThroughParent(node.parent);

            if (!targetValue) return;
            context.report({
              node,
              message: "Please remove this ajax call from this UI component"
            });
          }
        };
    }
};




function loopThroughParent(parent) {
  let functionInTheClass = false;
  const recurse = newParent => {
    if (newParent === null) return;
    else if (
      newParent.superClass &&
      newParent.superClass.name === "Component"
    ) {
      functionInTheClass = true;
      return
    }
    recurse(newParent.parent);
  };
  recurse(parent);
  return functionInTheClass;
}
