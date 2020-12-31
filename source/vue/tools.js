const reg = /\{\{((?:.|\r?\n)+?)\}\}/g;

export function compiler(node, vm) {
    let childNodes = node.childNodes;
    let childNodeArr = [...childNodes];
    childNodeArr.forEach(child => {
        if (child.nodeType === 1) {
            // 元素节点递归使用
            compiler(child, vm);
        } else if(child.nodeType === 3) {
            compilerText(child, vm);
        }
    })
}


export function compilerText(node, vm) {
    node.textContent = node.textContent.replace(reg, function (...args) {
        return getValue(trimSpace(args[1]), vm);
    })
}

// 去除空格
function trimSpace(str) {
    return str.replace(/\s+/g, '');
}

// 获取值
function getValue(expr, vm) {
    let keys = expr.split('.');
    return keys.reduce((prevValue, curValue) => {
        prevValue = prevValue[curValue];
        return prevValue;
    }, vm)
}
