CKEDITOR.plugins.add('imagebrowser', {
	"init": function (editor) {
		if (typeof(editor.config.imageBrowser_listUrl) === 'undefined' || editor.config.imageBrowser_listUrl === null) {
			return;
		}

		editor.config.filebrowserImageBrowseUrl = editor.plugins.imagebrowser.path + "browser/browser.html?listUrl=" + encodeURIComponent(editor.config.imageBrowser_listUrl);
	}
});
