"use strict";
var IB = {

	images : {},
	
	init : function() {
		var head, thisdir, baseHref = IB.getQueryStringParam("baseHref");
		if (baseHref) {
			thisdir = location.href.replace(/\/[^\/]*(?:\?.*)?$/,"/");
			document.getElementById("loadMsg").lastChild.lastChild.src = thisdir+"loading.gif";
			head = (document.head || document.getElementsByTagName("head")[0]);
			(head.getElementsByTagName("link")[0]).href = thisdir+"browser.css";
			(head.getElementsByTagName("base")[0]).href = baseHref;
		}
		$("ul").on("click", "li", function() { if (IB.shown) IB.shown.className = ""; (IB.shown = this).className = "shown"; IB.renderImagesForFolder($(this).text()); });
		$("#container").on("click", "a", function() { window.opener.CKEDITOR.tools.callFunction(IB.getQueryStringParam("CKEditorFuncNum"), this.href);	window.close();	return false; });
		$.getJSON(IB.getQueryStringParam("listUrl"), IB.processData);
	},
	
	processData : function(list) {
		var item, folder, i, l, count = 0, $ul = $("ul"), images = IB.images;
		for (i=0, l = list.length; i<l; i++) {
			var item = list[i];
			var folder = ((!item.folder)?"Images":item.folder);
			delete item.folder;
			if (item.imageUrl) {
				if (!item.thumbUrl) item.thumbUrl = item.imageUrl;
				if (!item.label) item.label = ""; else item.label = "<pre>"+item.label+"</pre>";
				if (images.hasOwnProperty(folder)) images[folder].push(item);
				else {
					images[folder] = [item];
					$("<li></li>").text(folder).appendTo($ul);
					count++;
				} 
			}
		}
		if (count>0) $($ul.get(0).firstChild).click();
		if (count<=1) { $ul.remove(); document.getElementById("container").style.top = "0"; }
		$("#loadMsg").remove();		
	},
	
	renderImagesForFolder : function(folder) {
		var i, l, img, images = IB.images[folder], $container = $("#container").html("");
		for (i = 0, l = images.length; i<l; i++) {
			img = images[i];
			$container.append($.parseHTML('<a href="'+img.imageUrl+'"><img src="'+img.thumbUrl+'">'+img.label+'</a>'));
		}
	},
	
	getQueryStringParam : function(name) {
		var result = window.location.search.match(new RegExp("[?&]" + name + "=([^&]*)"));
		return ((result && (result.length > 1)) ? decodeURIComponent(result[1]) : null);
	}
};

$(document).ready(IB.init);
