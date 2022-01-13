
module.exports = {
  printWidth: 140, // 超过最大值换行
  bracketSpacing: true,
  jsxBracketSameLine: true,
  trailingComma: 'es5', //尽可能控制尾随逗号的输出。 有效选项： '无' - 无尾随逗号 ' es5' - 在ES5中有效的尾随逗号（对象，数组等） 'all' - 尾随逗号 尽可能（函数参数）
  tabWidth: 2, // 缩进字节数
  useTabs: false, // 缩进不使用tab，使用空格
  semi: true, // 句尾添加分号
  quoteProps: 'as-needed', // 对象的 key 仅在必要时用引号
  arrowParens: 'always', //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
  endOfLine: 'auto', // 结尾是 \n \r \n\r auto,
  htmlWhitespaceSensitivity: 'ignore',
};
