function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}

browser.contextMenus.create({
  id: "log-selection",
  title: browser.i18n.getMessage("contextMenuItemSelectionLogger"),
  contexts: ["selection"]
}, onCreated);


browser.contextMenus.onClicked.addListener(function(info, tab) {
  switch (info.menuItemId) {
    case "log-selection":
      console.log(info.selectionText); //get the selected text
      //info.linkUrl;
      //do some action related to the context_menu
      break;

  }
})