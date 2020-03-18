var request = null;

function onCreated() {
  if (browser.runtime.lastError) {
    console.log("Error: ${browser.runtime.lastError}");
  } else {
    console.log("Item created successfully");
  }
}

function scraping_worker() {
  var host_url =

    function reqListener() {
      console.log(this.responseText);
      content = this.responseText;
    }

  setInterval(function () {
    if (request != null) {
      var oReq = new XMLHttpRequest();
      oReq.addEventListener("load", reqListener);
      oReq.open("GET", "http://localhost:8000/?url=" + request);
      oReq.send();
      request = null;
    }
  }, 1000);
}


scraping_worker(); //start worker



browser.browserAction.onClicked.addListener(capture_scraper);

function capture_scraper(url) {
  var tab_created = browser.tabs.create({
    active: false,
    url: "http://localhost:8000/?url=" + url,
  });

  tab_created.then(function (tab) {
    setTimeout(function () {
      browser.tabs.remove(tab.id);
    }, 500);
  }, function () {});
}



browser.contextMenus.create({
  id: "log-selection",
  title: browser.i18n.getMessage("log_selection_title"),
  contexts: ["selection"]
}, onCreated);

browser.contextMenus.create({
  id: "scrape_url",
  title: browser.i18n.getMessage("scrape_url_title")
}, onCreated);

browser.contextMenus.onClicked.addListener(function (info, tab) {
  switch (info.menuItemId) {
    case "log-selection":
      console.log(info.selectionText); //get the selected text
      //info.linkUrl;
      //do some action related to the context_menu
      break;
    case "scrape_url":
      request = info.pageUrl;
      //info.linkUrl;
      //do some action related to the context_menu
      break;
  }
});