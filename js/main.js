(() => {
  const noti = new Notification("notification", { duration: 2000 });

  const clipboard = new ClipboardJS("#email-text");

  clipboard.on("success", function (e) {
    noti.show();
    noti.setText("Copied To Clipboard");
    noti.setVariant("success");

    e.clearSelection();
  });

  clipboard.on("error", function (e) {
    noti.show();
    noti.setVariant("error");
    noti.setText("Copied To Clipboard");
  });
})();
