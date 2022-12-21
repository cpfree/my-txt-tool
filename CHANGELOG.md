# Change Log

## v0.0.3版本

1. 简单开发了功能.

## v0.0.4 版本

1. 更换了插件名称为 `my-txt-tool`, 原来的名称为 `txt-novel-format`
2. 更换了插件的引擎
3. 更换了插件的组织签名为 `cosycode`, 原来的组织签名为 `cpfree`
4. 添加了新功能

## v0.1.0 版本

- 初步整理好 `README.md`, 以及示例文本.
- 修改了之前的一些bug, 优化了相关处理逻辑
- 初步定义好功能

   功能清单如下

   | 命令                                    | 标签                                             |
   | --------------------------------------- | ------------------------------------------------ |
   | myTxtTool.fullToHalf_corner             | txt-tool: 全角字符 -> 半角字符                   |
   | myTxtTool.halfToFull_corner             | txt-tool: 半角字符 -> 全角字符                   |
   | myTxtTool.setOneSpaceAfterHalfCorner    | txt-tool: 半角字符后设置一个空格                 |
   | myTxtTool.clearSpaceAfterHalfCorner     | txt-tool: 半角字符后清除空格                     |
   | myTxtTool.oneSpaceBetweenEnAndCn        | txt-tool: 中英文之间设置一个空格                 |
   | myTxtTool.insertBackquoteBetweenEnAndCn | txt-tool: 中文之间的单个单词两边加上空格和反斜杠 |
   | myTxtTool.suitRow                       | txt-tool: suitRow                                |
   | myTxtTool.wrapLine                      | txt-tool: wrap line                              |

## v0.1.1 版本

修改了`半角字符后设置一个空格`功能的bug

## v0.1.2 版本

`半角字符转全角字符`功能不会修改到markdown前面的序列号的 `.` 字符

## v0.1.3 版本

添加了配置功能, 可以在 settings 中配置功能的启动和停止

## v0.2.0 版本

添加了自定义功能, 用户可以通过配置 settings 文件来实现自定义的文本功能.
