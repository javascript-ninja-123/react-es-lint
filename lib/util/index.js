

function findAttribute(node, attriubteName){
    if(!Array.isArray(node.parent.attributes) || node.parent.attributes.length <= 0) return false
    let result = false;
    let attribute;
    node.parent.attributes.some(att => {
      if(att.name.name === attriubteName){
          result = true;
          attribute = att
          return true;
      }
    })
    return {
        result,
        attribute
    };
}

module.exports = {
    findAttribute
}
