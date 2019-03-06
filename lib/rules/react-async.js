const promiseArray = ['fetch','axios','request']


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
              node
              && (promiseArray.includes(node.name) || node.name.toLowerCase().includes('service'))
              && node.parent.parent;

            const hasThen = checkThen(node.parent);
            const hasCatch = checkCatch(node.parent);

            if (!targetValue) return;
            else if (targetValue && hasThen && hasCatch) {
              context.report({
                node,
                message: "just change then and catch to async/await with try catch"
              });
            } else if (targetValue && hasThen && !hasCatch) {
              context.report({
                node,
                message: "change it to async/await and do not forget to add error handling"
              });
            } else {
              context.report({
                node,
                message: "change it to async/await and how come you do not have then after fetch/axios/request?"
              });
            }
          }
        };
    }
};




function checkThen(parent) {
  let hasThen = false;
  const recurse = newParent => {
    if (newParent === null) return;
    else if (
      newParent.parent &&
      newParent.parent.property &&
      newParent.parent.property.name === "then"
    ) {
      hasThen = true;
      return;
    }
    recurse(newParent.parent);
  };

  recurse(parent);
  return hasThen;
}

function checkCatch(parent) {
  let hasCatch = false;
  const recurse = newParent => {
    if (newParent === null) return;
    else if (
      newParent.parent &&
      newParent.parent.property &&
      newParent.parent.property.name === "catch"
    ) {
      hasCatch = true;
      return;
    }
    recurse(newParent.parent);
  };

  recurse(parent);
  return hasCatch;
}
