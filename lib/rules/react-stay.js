const command = "@stay";
const message = "Please do not remove this function/logic!!";

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
        
            const recurse = (node) => {
                if(!node.parent){
                    return;
                }
                else if(Array.isArray(node.parent.leadingComments)){
                    node.parent.leadingComments.some(value => {
                        if(value.type === "Line" && value.value === command){
                            context.report({
                                node,
                                message
                              })
                            return true;
                        }
                    })
                }
                else{
                    recurse(node.parent)
                }
            }
            if(Object.keys(node).find(value => value === "leadingComments")){
                recurse(node);
            }
          }
      };
    }
};
