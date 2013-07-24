CKEDITOR.plugins.add('imagebrowser', {
	"init": function (editor) {
		if (editor.config.imageBrowser_listUrl!=null) editor.config.filebrowserImageBrowseUrl = editor.plugins.imagebrowser.path + "browser/browser.html?listUrl=" + encodeURIComponent(editor.config.imageBrowser_listUrl) + (editor.config.baseHref ? "&baseHref=" + encodeURIComponent(editor.config.baseHref) : "");
	}
});
