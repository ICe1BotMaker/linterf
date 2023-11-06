module.exports = function(babel) {
    const { types: t } = babel;

    const supportedElements = ['CLILabel', 'CLIButton', 'CLIPanel'];

    return {
        name: 'transform-jsx-syntax',
        visitor: {
            JSXElement(path) {
                const elementName = path.node.openingElement.name.name;

                if (supportedElements.includes(elementName)) {
                    const pathAttr = path.node.openingElement.attributes;
                    const pathProps = pathAttr.map((attr) => {
                        const key = attr.name.name;
                        let value;

                        if (t.isJSXExpressionContainer(attr.value)) value = attr.value.expression;
                        else value = attr.value;

                        return t.objectProperty(t.stringLiteral(key), value);
                    });
                    
                    const newElement = t.newExpression(t.identifier(elementName), [
                        t.objectExpression(pathProps),
                    ]);
                    
                    path.replaceWith(newElement);
                }
            },
        },
    };
};