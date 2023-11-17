## 💫 Package Detail

This is a detailed description of the package.

### 🎬 Usage

In the most known way:
```jsx
const title = <CLILabel text="title" styles={{ "text-color": "#222831", y: 2 }} />;
const title = new CLILabel({ text: "title", styles: { "text-color": "#222831", y: 2 }});
```

#### 💾 Configuration required for use

##### directory structure
```
- build
- node_modules
- babel.config.js
- index.js (main)
- package.json
- package-lock.json
- transform-syntax-linterf.js
```

##### npm package installation
```bash
$ npm install babel linterf linterf-scripts
$ npm install --save-dev @babel/cli @babel/core @babel/plugin-syntax-jsx @babel/plugin-transform-react-jsx @babel/preset-env @babel/preset-react
```

##### package.json
```json
"scripts": {
    "build": "linterf-scripts"
}
```

##### babel.config.js
```js
module.exports = {
    "presets": ["@babel/preset-env"],
    "plugins": ["@babel/plugin-syntax-jsx", "./transform-syntax-linterf"],

    "ignore": ["node_modules", "build"]
    // Add folders to exclude
}
```

##### transform-syntax-linterf
```js
module.exports = function(babel) {
    const { types: t } = babel;

    const supportedElements = [];
    // Make sure you write down the names of the widgets you want to use!

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
```

We're all ready now! Please write the code and build it at the terminal.