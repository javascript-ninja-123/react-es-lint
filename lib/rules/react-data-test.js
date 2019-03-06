const attriubteName = "data-test";
const message= "please add data-test"

  function findOneLevelUpReturnStatement(node){
    if(!node.parent) return false
    else if(!node.parent.parent) return false
    else if(!node.parent.parent.parent) return false
    return node.parent.parent.parent.type === "ReturnStatement"
  }

  function findAttribute(node){
      if(!Array.isArray(node.parent.attributes) || node.parent.attributes.length <= 0) return false
      let result = false;
      node.parent.attributes.some(att => {
        if(att.name.name === attriubteName){
            result = true;
            return true;
        }
      })
      return result;
  }

  

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
                if (node.parent.type === "JSXClosingElement") return;
                if (!findOneLevelUpReturnStatement(node)) return;
                //this is a container element
                else {
                  if (!findAttribute(node)) {
                    context.report({
                      node,
                      message: message
                    });
                  }
                  return;
                }
              }
         };
    }
};
