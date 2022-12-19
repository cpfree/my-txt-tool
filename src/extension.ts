// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

var workspace = vscode.workspace;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
   // init variables
   var workspaceState = context.workspaceState;

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "my-txt-tool" is now active!');

	let disposable1 = vscode.commands.registerTextEditorCommand('myTxtTool.combineLine', (textEditor, edit) => {
		const selection = getSelectionOrCurrentLine(textEditor);
		const sele = textEditor.document.getText(selection);
		// 替换空换行符
		let translated = sele.replace(/\r?\n(?!\s)/g, "");
		
		textEditor.edit(edit =>
			edit.replace(selection, translated)
		);
	});

	let disposable2 = vscode.commands.registerTextEditorCommand('myTxtTool.wrapLine', (textEditor, edit) => {
		const selection = getSelectionOrCurrentLine(textEditor);
		const sele = textEditor.document.getText(selection);
		// 替换空换行符
		let translated = sele.replace(/\s*?\n\s*(?=\S)/g, '\r\n\r\n');
		
		textEditor.edit(edit =>
			edit.replace(selection, translated)
		);
	});

	let disposable3 = vscode.commands.registerTextEditorCommand('myTxtTool.formatAll', (textEditor, edit) => {
		const selection = getSelectionOrCurrentLine(textEditor);
		const sele = textEditor.document.getText(selection);
      let setting:vscode.WorkspaceConfiguration = workspace.getConfiguration('mytexttool')
      let formatRowPrefix:String|undefined = setting.get('formatRowPrefix', "　　");
		// 替换空换行符 
		let translated = sele.replace(/\s*?\n\s*(?=\S)/g, '\r\n' + formatRowPrefix);
		
		textEditor.edit(edit =>
			edit.replace(selection, translated)
		);
	});

	let disposable4 = vscode.commands.registerTextEditorCommand('myTxtTool.suitRow', (textEditor, edit) => {
		const selection = getSelectionOrCurrentLine(textEditor);
		const sele = textEditor.document.getText(selection);
		const arr = sele.split(/\s*\n\s*/);
		if (arr.length <= 1) {
			return;
		}
		// 数学期望
		let ex = arr.reduce((e, v) => e + v.length, 0) / arr.length;
		ex = Math.ceil(ex);
		// 用户判断和输入
      vscode.window.showInputBox({ 
			// 这个对象中所有参数都是可选参数
				 ignoreFocusOut:true, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
				 placeHolder:'输入行的长度数学期望(数字[1,9999]])', // 在输入框内的提示信息
				 prompt:'当前的数学期望是 ' + ex, // 在输入框下方的提示信息
				 value: String(ex),
				 valueSelection: [ex - 2, ex + 2],
				 validateInput:function(num){ // 对输入内容进行验证并返回
					 const isInt = /^\+?[1-9][0-9]{0,3}$/.test(num);
					 if (isInt) {
						 return '';
					 }
					 return num + '不是正整数';
				 } 
			}).then(function(msg){
				try {
					if (msg && msg.length > 0) {
						ex = parseInt(msg);
						vscode.window.showInformationMessage('数学期望被改为了' + msg);
					}
					// 生成正则表达式
					var re = new RegExp('(?<=[^\\n]{' + ex + ',}[^\\s。！」”(。”)(。」)])\\s*\\n+\\s*', 'g');
					// 替换空换行符
					let translated = sele.replace(re, '');
			 
					textEditor.edit(edit =>
						edit.replace(selection, translated)
					);
			   } catch(e) {
					console.log(e);
			   }
	  });
	});

	context.subscriptions.push(disposable1);
	context.subscriptions.push(disposable2);
	context.subscriptions.push(disposable3);
	context.subscriptions.push(disposable4);

   // 半角字符转换为全角字符(暂时仅限于逗号和句号), ', ' or ',' -> '，'
   context.subscriptions.push(
      vscode.commands.registerTextEditorCommand('myTxtTool.fullToHalf_corner', (textEditor, edit) => {
         const selection = getSelectionOrCurrentLine(textEditor);
         const sele = textEditor.document.getText(selection);
         // 替换空换行符 
         let translated = sele.replace(/，/g, ', ').replace(/。/g, '. ');

         textEditor.edit(edit =>
            edit.replace(selection, translated)
         );
      })
   );

   // 半角字符转换为全角字符(暂时仅限于逗号和句号), ', ' or ',' -> '，'
   context.subscriptions.push(
      vscode.commands.registerTextEditorCommand('myTxtTool.halfToFull_corner', (textEditor, edit) => {
         const selection = getSelectionOrCurrentLine(textEditor);
         const sele = textEditor.document.getText(selection);
         // 替换空换行符 
         let translated = sele.replace(/, ?/g, '，')
               // 开头不能是数字标记行,  不能是一行末尾
               .replace(/(?<!(\n|^)\s*\d{1,5})\. ?/g, '。');

         textEditor.edit(edit =>
            edit.replace(selection, translated)
         );
      })
   );

   // 半角字符后面设置为一个空格, 除了行结尾之外 ===> ', ' or ',' -> '，'
   context.subscriptions.push(
      vscode.commands.registerTextEditorCommand('myTxtTool.setOneSpaceAfterHalfCorner', (textEditor, edit) => {
         const selection = getSelectionOrCurrentLine(textEditor);
         const sele = textEditor.document.getText(selection);
         // 替换空换行符 
         let translated = sele.replace(/, *(?=\S)/g, ', ')
               // 开头不能是数字标记行,  不能是一行末尾
               .replace(/(?<!(\n|^)\s*\d{1,5})\. *(?=\S)/g, '. ');

         textEditor.edit(edit =>
            edit.replace(selection, translated)
         );
      })
   );

   // 半角字符后面清除空格, 除了行开头的行标记 ===> ', ' or ',' -> '，'
   context.subscriptions.push(
      vscode.commands.registerTextEditorCommand('myTxtTool.clearSpaceAfterHalfCorner', (textEditor, edit) => {
         const selection = getSelectionOrCurrentLine(textEditor);
         const sele = textEditor.document.getText(selection);
         // 替换空换行符 
         let translated = sele.replace(/, */g, ',')
               // 去除 . 后面的空格, 约束为 . 不能是开头的行标符号.
               .replace(/(?<!(\n|^)\s*\d{1,4})\. */g, '.');
         
         textEditor.edit(edit =>
            edit.replace(selection, translated)
         );
      })
   );

   // 中英文中间设置空格
   context.subscriptions.push(
      vscode.commands.registerTextEditorCommand('myTxtTool.oneSpaceBetweenEnAndCn', (textEditor, edit) => {
         const selection = getSelectionOrCurrentLine(textEditor);
         const sele = textEditor.document.getText(selection);
         // \b 匹配单词边界
         // 中文字符和英文字符之间设置一个空格 & 英文字符和中文字符之间设置一个空格
         let translated = sele.replace(/((?<=[\u4e00-\u9fa5])\s*\b)|(\b\s*(?=[\u4e00-\u9fa5]))/g, ' ');
         
         textEditor.edit(edit =>
            edit.replace(selection, translated)
         );
      })
   );

   // 中文之间的单个英文前后添加空格和反引号 "`"
   context.subscriptions.push(
      vscode.commands.registerTextEditorCommand('myTxtTool.insertBackquoteBetweenEnAndCn', (textEditor, edit) => {
         const selection = getSelectionOrCurrentLine(textEditor);
         const sele = textEditor.document.getText(selection);
         // \b 匹配单词边界
         // 中文字符和英文字符之间设置一个空格 & 英文字符和中文字符之间设置一个空格
         let translated = sele.replace(/(?<=[\u4e00-\u9fa5])\s*(\w+)\s*(?=[\u4e00-\u9fa5])/g, ' `$1` ');

         textEditor.edit(edit =>
            edit.replace(selection, translated)
         );
      })
   );

}

// 获取选择的数据
function getSelectionOrCurrentLine(textEditor: vscode.TextEditor) {
   let selection:vscode.Range = textEditor.selection;

   const start = selection.start;
   const end = selection.end;

   if (start.line === end.line && start.character === end.character) {
      selection = new vscode.Range(start.line, 0, start.line, Infinity);

      const line = textEditor.document.getText(selection);

      // 默认当前行
      //   selection = new vscode.Range(start.line, 0, start.line, line.length);

      // 默认整篇文章 
      selection = new vscode.Range(0, 0, textEditor.document.lineCount, 0);
   }

   return selection;
}

// this method is called when your extension is deactivated
export function deactivate() {}
