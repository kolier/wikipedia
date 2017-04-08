var isReadMode = document.getElementsByClassName("action-view").length > 0;
var hasToc = document.getElementById("toc") !== null;
var hasSeeAlso = document.getElementById("See_also") !== null;
var hasReferences = document.getElementById("References") !== null;
var hasFile = document.getElementById("file") !== null;
var hasExternalLinks = document.getElementById("External_links") !== null;
var hasCatLinks = document.getElementById("catlinks") !== null;

/// Move footer to sidebar
function RemoveFooter() {
	var footer = document.getElementById("footer");
	var footerInSidebar = document.createElement("div");
	footerInSidebar.setAttribute("class", "portal");
	footerInSidebar.innerHTML = '<h3>Footer</h3><div class="body">' + footer.innerHTML + '</div>';
	document.getElementById("mw-panel").appendChild(footerInSidebar);
	if (footer) {
		footer.parentNode.removeChild(footer);
	}	
}

/// Add custom options
function AddCustomOptions() {
	var ul = document.getElementById("ca-talk").parentNode;
	var options = '\
		<span>\
			<select onchange="CenterContent(this.value)">\
				<option value="600">600</option>\
				<option value="660">660</option>\
				<option value="720" selected>720</option>\
				<option value="780">780</option>\
				<option value="full">full</option>\
			</select>\
		</span>';
	var li = document.createElement("li");
	li.setAttribute("id", "ca-content-width");
	li.innerHTML = options;
	ul.appendChild(li);
}

/// Center the main content
/// TODO: Bug in full mode and when resize window
/// TODO: TOC problem in full mode
function CenterContent(width) {
	var content = document.getElementById("content");
	//if (hasReferences || hasToc || hasSeeAlso || hasExternalLinks) {
	if (hasCatLinks) {
		if (width == 'full') {
			content.style.maxWidth = "";
			content.style.marginLeft = "";
			document.getElementById("left-navigation").style.marginLeft = "";
		} else if (width >= 0) {
			if (width > 0) {
				content.style.maxWidth = width + "px";
			}
			// Keep it center while resize by passing in width = 0
			var offset = (document.body.offsetWidth - content.offsetWidth) / 2;
			content.style.marginLeft = offset + "px";
			document.getElementById("left-navigation").style.marginLeft = offset + "px";
		}
	}
}

/// Refix the ToC after some scroll
function MoveToc() {
	var toc = document.getElementById("toc");
	if (hasToc) {
		/*
			var offset = (document.body.offsetWidth - toc.offsetWidth) / 2;
			content.style.marginRight = offset + "px";
		*/
		// @todo It should follow the actual height of the header instead of current solution
		if (document.body.scrollTop >= 200) {
			toc.style.top = "4%";
		}
		else {
			toc.style.top = "8.5%";
		}
	}
}

/* Listen to Events */
RemoveFooter();
AddCustomOptions();
CenterContent(720);
MoveToc();

window.onresize = function () {
	CenterContent(0);
	MoveToc();
}

window.onscroll = function () {
	MoveToc();
}
