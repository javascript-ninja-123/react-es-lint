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
          ArrowFunctionExpression(node) {
            let message = "";

            function findTryAndCatch(node) {
              const getTryContent = body =>
                body.filter(value => value.type === "TryStatement");
              const tryArray = getTryContent(node.body.body);
              if (node.body && node.body.body.length <= 0){
                	message ="add try and catch"
              	return false
              }
              else if (tryArray.length <= 0) {
                message = "forgot to add try, please use try and catch";
                return false;
              } else if (
                tryArray[0].handler &&
                tryArray[0].handler.type !== "CatchClause"
              ) {
                message = "forgot to add catch, please use try and catch";
                return false;
              }
              return true;
            }

            const targetValue = node && node.async === true && !findTryAndCatch(node);

            if (!targetValue) return;
            context.report({
              node,
              message: message
            });
          }
        };
    }
};
