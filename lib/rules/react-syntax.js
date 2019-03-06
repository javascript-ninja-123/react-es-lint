const shouldbeRefactored = ["lazy",'Fragment', 'Component',"createContext", "PureComponent"]

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
        JSXOpeningElement(node){
         const oneOfReact =
         node
         && node.name.object
         && node.name.object.name === 'React'
        	&& shouldbeRefactored.includes(node.name.property.name)

            if(!oneOfReact)return
         		context.report({
              	node,
                	message:"Please use destructing for React. Remove React. Shoulde be import React, {whatever} from 'react'"
            })
        }
      };
    }
};
