browser.commands.onCommand.addListener(function (command) {
  if (command === "toggle-feature") {
    console.log("Toggling the feature!");
  }
});