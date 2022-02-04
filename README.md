# my-txt-tool

> 个人平时使用 vscode 处理文档, 写博客, 常常需要处理一些文本信息.
>
> - 如写文档时, 输入法调成`中文输入法使用英文标点`, 写完文档又需要通过正则表达式进行`全半角`标点替换.
> - 如写文档时, 英文和中文之间有的有空格, 有的没有空格, 写好的文档又想将文档标准化一下.
>   ...
>   该插件主要是为方便个人快捷处理遇到的一些常需要处理的文本而开发.

## 功能清单如下

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

## 功能示例文本

> 以下所有文本处理的时候.
> - 若选中一些文本, 则 `处理的文本范围` 仅仅限于 `被选中的文本`.
> - 若没有选中文本, 则 `处理的文本范围` 为当前 `vscode` 活跃的文件.

### markdown 文本处理

1. txt-tool: 中英文之间设置一个空格

   源文本

   ```md
   接触到了 vscode 插件开发
   接触到了 vscode 插件开发
   接触到了 vscode 插件开发
   接触到了 vscode 插件开发
   ```

   处理后文本

   ```md
   接触到了 vscode 插件开发
   接触到了 vscode 插件开发
   接触到了 vscode 插件开发
   接触到了 vscode 插件开发
   ```
   
   ![![中英文之间设置一个空格](https://raw.githubusercontent.com/cpfree/my-txt-tool/main/.doc/image/oneSpaceBetweenEnAndCn.gif)](https://gitee.com/cpfree/my-txt-tool/raw/main/.doc/image/oneSpaceBetweenEnAndCn.gif)

2. txt-tool: 中文之间的单个单词两边加上空格和反斜杠

   源文本

   ```md
   接触到了 vscode 插件开发
   接触到了`vscode 插件开发 接触到了vscode` 插件开发
   接触到了 vscode 插件开发
   接触到了 vscode 插件开发
   接触到了 vs code 插件开发
   接触到了 `vs` `code` 插件开发
   接触到了 `vs code`插件开发
   ```

   处理后文本

   ```md
   接触到了 vscode 插件开发
   接触到了`vscode 插件开发 接触到了vscode` 插件开发
   接触到了 vscode 插件开发
   接触到了 vscode 插件开发
   接触到了 vs code 插件开发
   接触到了 `vs` `code` 插件开发
   接触到了 `vs code`插件开发
   ```

   ![![中文之间的单个单词两边加上空格和反斜杠](https://raw.githubusercontent.com/cpfree/my-txt-tool/main/.doc/image/insertBackquoteBetweenEnAndCn.gif)](https://gitee.com/cpfree/my-txt-tool/raw/main/.doc/image/insertBackquoteBetweenEnAndCn.gif)

3. txt-tool: 半角字符 -> 全角字符

   > 暂时只支持`逗号`和`句号`.
   >
   > - 若半角字符后面没有空格, 则直接将半角字符转换为一个全角字符.
   > - 若半角字符后面有一个空格, 则会将半角字符和一个空格转换为一个全角字符.

   源文本

   ```md
   VSCode 是微软出的一款轻量级代码编辑器,免费而且功能强大.
   VSCode 是微软出的一款轻量级代码编辑器, 免费而且功能强大.  
   VSCode 是微软出的一款轻量级代码编辑器、 免费而且功能强大。
   VSCode 是微软出的一款轻量级代码编辑器， 免费而且功能强大。
   ```

   处理后文本

   ```md
   VSCode 是微软出的一款轻量级代码编辑器，免费而且功能强大。
   VSCode 是微软出的一款轻量级代码编辑器， 免费而且功能强大。  
   VSCode 是微软出的一款轻量级代码编辑器、 免费而且功能强大。
   VSCode 是微软出的一款轻量级代码编辑器， 免费而且功能强大。
   ```

   ![![txt-tool: 半角字符 -> 全角字符](https://raw.githubusercontent.com/cpfree/my-txt-tool/main/.doc/image/halfToFull_corner.gif)](https://gitee.com/cpfree/my-txt-tool/raw/main/.doc/image/halfToFull_corner.gif)

4. txt-tool: 全角字符 -> 半角字符

   > 暂时只支持`逗号`和`句号`.
   >
   > - 直接将全角字符转换为一个半角字符加一个空格.

   源文本

   ```md
   VSCode 是微软出的一款轻量级代码编辑器、 免费而且功能强大。
   VSCode 是微软出的一款轻量级代码编辑器、 免费而且功能强大。
   VSCode 是微软出的一款轻量级代码编辑器， 免费而且功能强大。
   ```

   处理后文本

   ```md
   VSCode 是微软出的一款轻量级代码编辑器、 免费而且功能强大.
   VSCode 是微软出的一款轻量级代码编辑器、 免费而且功能强大.  
   VSCode 是微软出的一款轻量级代码编辑器, 免费而且功能强大.
   ```

   ![![中英文之间设置一个空格](https://raw.githubusercontent.com/cpfree/my-txt-tool/main/.doc/image/fullToHalf_corner.gif)](https://gitee.com/cpfree/my-txt-tool/raw/main/.doc/image/fullToHalf_corner.gif)

5. txt-tool: 半角字符后设置一个空格

   源文本

   ```md
   VSCode 是微软出的一款轻量级代码编辑器,免费而且功能强大.  
   VSCode 是微软出的一款轻量级代码编辑器, 免费而且功能强大,  
   VSCode 是微软出的一款轻量级代码编辑器. 免费而且功能强大.,
   VSCode 是微软出的一款轻量级代码编辑器..免费而且功能强大..
   ```

   处理后文本

   ```md
   VSCode 是微软出的一款轻量级代码编辑器,免费而且功能强大.  
   VSCode 是微软出的一款轻量级代码编辑器, 免费而且功能强大,  
   VSCode 是微软出的一款轻量级代码编辑器. 免费而且功能强大. ,
   VSCode 是微软出的一款轻量级代码编辑器. . 免费而且功能强大. .
   ```

   ![![半角字符后设置一个空格](https://raw.githubusercontent.com/cpfree/my-txt-tool/main/.doc/image/setOneSpaceAfterHalfCorner.gif)](https://gitee.com/cpfree/my-txt-tool/raw/main/.doc/image/setOneSpaceAfterHalfCorner.gif)

6. txt-tool: 半角字符后清除空格

   源文本

   ```md
   VSCode 是微软出的一款轻量级代码编辑器,免费而且功能强大.  
   VSCode 是微软出的一款轻量级代码编辑器, 免费而且功能强大,  
   VSCode 是微软出的一款轻量级代码编辑器. 免费而且功能强大.,
   VSCode 是微软出的一款轻量级代码编辑器..免费而且功能强大..
   ```

   处理后文本

   ```md
   VSCode 是微软出的一款轻量级代码编辑器,免费而且功能强大.
   VSCode 是微软出的一款轻量级代码编辑器,免费而且功能强大,
   VSCode 是微软出的一款轻量级代码编辑器.免费而且功能强大.,
   VSCode 是微软出的一款轻量级代码编辑器..免费而且功能强大..
   ```

   ![![半角字符后清除空格](https://raw.githubusercontent.com/cpfree/my-txt-tool/main/.doc/image/clearSpaceAfterHalfCorner.gif)](https://gitee.com/cpfree/my-txt-tool/raw/main/.doc/image/clearSpaceAfterHalfCorner.gif)

### txt 文本处理

1. txt-tool: wrap line

   > 设置行之间有一个空行且仅有一行空行.

   源文本

   ```txt
   维基上对其定义为：一种软件开发技术- 面向服务的体系结构（SOA）架构样式的一种变体，它提倡将单一应用程序划分成一组小的服务，服务之间互相协调、互相配合，为用户提供最终价值。
   每个服务运行在其独立的进程中，服务与服务间采用轻量级的通信机制互相沟通（通常是基于HTTP的RESTful API）。


   每个服务都围绕着具体业务进行构建，并且能够独立地部署到生产环境、类生产环境等。另外，应尽量避免统一的、集中式的服务管理机制，对具体的一个服务而言，应根据上下文，选择合适的语言、工具对其进行构建。
   微服务在管理人员和项目负责人中至少与在开发人员中一样受欢迎。这是微服务的较不寻常的特征之一，因为架构热情通常是为实际工程师保留的。这样做的原因是微服务更好地反映了许多业务主管想要组建和运行其团队以及开发流程的方式。换句话说，微服务是一种架构模型，可以更好地促进所需的运营模型。
   ```

   处理后文本

   ```txt
   维基上对其定义为：一种软件开发技术- 面向服务的体系结构（SOA）架构样式的一种变体，它提倡将单一应用程序划分成一组小的服务，服务之间互相协调、互相配合，为用户提供最终价值。

   每个服务运行在其独立的进程中，服务与服务间采用轻量级的通信机制互相沟通（通常是基于HTTP的RESTful API）。

   每个服务都围绕着具体业务进行构建，并且能够独立地部署到生产环境、类生产环境等。另外，应尽量避免统一的、集中式的服务管理机制，对具体的一个服务而言，应根据上下文，选择合适的语言、工具对其进行构建。

   微服务在管理人员和项目负责人中至少与在开发人员中一样受欢迎。这是微服务的较不寻常的特征之一，因为架构热情通常是为实际工程师保留的。这样做的原因是微服务更好地反映了许多业务主管想要组建和运行其团队以及开发流程的方式。换句话说，微服务是一种架构模型，可以更好地促进所需的运营模型。
   ```

   ![![wrap line](https://raw.githubusercontent.com/cpfree/my-txt-tool/main/.doc/image/wrapline.gif)](https://gitee.com/cpfree/my-txt-tool/raw/main/.doc/image/wrapline.gif)

2. txt-tool: suitRow

   > 之前一段时间开发, 依靠文档上面的开发指引, 将上面的内容拷贝下来, 就变成了源文本形式的文本, 行之间去分不清, 通过该函数去处理文本, 将其简单转换.

   > 注意若行末尾有句号等结束的符号的时候, 转换后, 改行将被视为结束行, 后面的内容另起一行.

   源文本

   ```txt
   维基上对其定义为：一种软件开发技术- 面向服务的体系结构（SOA）
   架构样式的一种变体，它提倡将单一应用程序划分成一组小的服务，
   服务之间互相协调、互相配合，为用户提供最终价值。每个服务运行
   在其独立的进程中，服务与服务间采用轻量级的通信机制互相沟通（
   通常是基于HTTP的RESTful API）。每个服务都围绕着具体业务进行
   构建，并且能够独立地部署到生产环境、类生产环境等。另外，应尽
   量避免统一的、集中式的服务管理机制，对具体的一个服务而言，应
   根据上下文，选择合适的语言、工具对其进行构建。
   微服务在管理人员和项目负责人中至少与在开发人员中一样受欢迎。
   这是微服务的较不寻常的特征之一，因为架构热情通常是为实际工程
   师保留的。这样做的原因是微服务更好地反映了许多业务主管想要组
   建和运行其团队以及开发流程的方式。换句话说，微服务是一种架构
   模型，可以更好地促进所需的运营模型。
   ```

   处理后文本

   ```txt
   维基上对其定义为：一种软件开发技术- 面向服务的体系结构（SOA）架构样式的一种变体，它提倡将单一应用程序划分成一组小的服务，服务之间互相协调、互相配合，为用户提供最终价值。每个服务运行在其独立的进程中，服务与服务间采用轻量级的通信机制互相沟通（通常是基于HTTP的RESTful API）。每个服务都围绕着具体业务进行构建，并且能够独立地部署到生产环境、类生产环境等。另外，应尽量避免统一的、集中式的服务管理机制，对具体的一个服务而言，应根据上下文，选择合适的语言、工具对其进行构建。
   微服务在管理人员和项目负责人中至少与在开发人员中一样受欢迎。
   这是微服务的较不寻常的特征之一，因为架构热情通常是为实际工程师保留的。这样做的原因是微服务更好地反映了许多业务主管想要组建和运行其团队以及开发流程的方式。换句话说，微服务是一种架构模型，可以更好地促进所需的运营模型。
   ```

   ![![suitRow](https://raw.githubusercontent.com/cpfree/my-txt-tool/main/.doc/image/suitRow.gif)](https://gitee.com/cpfree/my-txt-tool/raw/main/.doc/image/suitRow.gif)
