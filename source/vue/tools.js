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
    // 保存exp 下次更新的时候还能正常运行
    if (!node.expr) {
        node.expr = node.textContent; // {{ message }} 保存至node上
    }
    node.textContent = node.expr.replace(reg, function (...args) {
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
