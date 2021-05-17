import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "dirtxtformat" is now active!');
	
	let disposable1 = vscode.commands.registerTextEditorCommand('extension.txtNovelFormat.combineLine', (textEditor, edit) => {
		const selection = getSelectionOrCurrentLine(textEditor);
		const sele = textEditor.document.getText(selection);
		// 替换空换行符
		let translated = sele.replace(/\r?\n(?!\s)/g, "");
		
		textEditor.edit(edit =>
			edit.replace(selection, translated)
		);
	});

	let disposable2 = vscode.commands.registerTextEditorCommand('extension.txtNovelFormat.wrapLine', (textEditor, edit) => {
		const selection = getSelectionOrCurrentLine(textEditor);
		const sele = textEditor.document.getText(selection);
		// 替换空换行符
		let translated = sele.replace(/\s*?\n\s*(?=\S)/g, '\r\n\r\n');
		
		textEditor.edit(edit =>
			edit.replace(selection, translated)
		);
	});

	let disposable3 = vscode.commands.registerTextEditorCommand('extension.txtNovelFormat.formatAll', (textEditor, edit) => {
		const selection = getSelectionOrCurrentLine(textEditor);
		const sele = textEditor.document.getText(selection);
		// 替换空换行符
		let translated = sele.replace(/\s*?\n\s*(?=\S)/g, '\r\n\r\n　　');
		
		textEditor.edit(edit =>
			edit.replace(selection, translated)
		);
	});


	let disposable4 = vscode.commands.registerTextEditorCommand('extension.txtNovelFormat.suitRow', (textEditor, edit) => {
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
					var re = new RegExp('(?<=\\S{' + ex + ',}[^\\s。！」”(。”)(。」)])\\s*\\n+\\s*', 'g');
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
}

// 获取选择的数据
function getSelectionOrCurrentLine(textEditor: vscode.TextEditor) {
	let selection:vscode.Range = textEditor.selection;
 
	const
	  start = selection.start,
	  end = selection.end;
 
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
