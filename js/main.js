const lightOnIcon = () => {
  return `<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 21.851 27.313"
      class="btn__icon"
    >
      <path
        d="M14.925,2A12.071,12.071,0,0,0,7.31,4.417,8.979,8.979,0,0,0,4,11.56a12.433,12.433,0,0,0,2.662,6.858,27.742,27.742,0,0,0,4.166,4.673v3.491a2.752,2.752,0,0,0,2.731,2.731h2.731a2.752,2.752,0,0,0,2.731-2.731V23.091a27.743,27.743,0,0,0,4.166-4.673,12.433,12.433,0,0,0,2.662-6.858,8.979,8.979,0,0,0-3.31-7.143A12.071,12.071,0,0,0,14.925,2Z"
        transform="translate(-4 -2)"
      />
    </svg>`;
};

const lightOffIcon = () => {
  return `<svg
      class="btn__icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 21.851 27.313"
    >
      <path
        d="M14.925,2A12.071,12.071,0,0,0,7.31,4.417,8.979,8.979,0,0,0,4,11.56a12.433,12.433,0,0,0,2.662,6.858,27.742,27.742,0,0,0,4.166,4.673v3.491a2.752,2.752,0,0,0,2.731,2.731h2.731a2.752,2.752,0,0,0,2.731-2.731V23.091a27.743,27.743,0,0,0,4.166-4.673,12.433,12.433,0,0,0,2.662-6.858,8.979,8.979,0,0,0-3.31-7.143A12.071,12.071,0,0,0,14.925,2Zm0,2.731a9.435,9.435,0,0,1,5.905,1.816,6.035,6.035,0,0,1,2.289,5.012,10.517,10.517,0,0,1-2.169,5.292,24.865,24.865,0,0,1-3.881,4.268H12.781A24.866,24.866,0,0,1,8.9,16.852,10.517,10.517,0,0,1,6.731,11.56,6.035,6.035,0,0,1,9.02,6.548,9.435,9.435,0,0,1,14.925,4.731Z"
        transform="translate(-4 -2)"
      />
    </svg>`;
};

const clickAwayListener = () => {
  return `<div class='click-away-listener'></div>`;
};

const createElementFromHTML = (htmlString) => {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
};

const lightOffIconElement = createElementFromHTML(lightOffIcon());
const lightOnIconElement = createElementFromHTML(lightOnIcon());
const clickAwayListenerElement = createElementFromHTML(clickAwayListener());

const noti = new Notification("notification", { duration: 2000 });

const clipboard = new ClipboardJS("#emailText");

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

// theme
const themeButton = document.querySelector("#switchThemeButton");

const setDarkMode = (value) => {
  const body = document.body;
  const icon = themeButton.querySelector(".btn__icon");
  const text = themeButton.querySelector("#switchText");

  if (value) {
    localStorage.setItem("darkMode", "true");
    body.classList.add("dark");

    icon?.remove();
    themeButton.insertBefore(lightOffIconElement, text);
    text.innerHTML = "OFF";
  } else {
    localStorage.setItem("darkMode", "false");
    body.classList.remove("dark");

    icon?.remove();
    themeButton.insertBefore(lightOnIconElement, text);
    text.innerHTML = "ON";
  }
};

// get current theme state
let darkMode = localStorage.getItem("darkMode") === "true";
setDarkMode(darkMode);

themeButton.addEventListener("click", () => {
  darkMode = !darkMode;
  if (darkMode) setDarkMode(true);
  else setDarkMode(false);
});

const setMenuState = (value) => {
  // dropdown
  const menuPresenter = document.querySelector("#menuPresenter");
  const menu = menuPresenter.querySelector(".menu");

  if (value) {
    menu.classList.add("open");
    menuPresenter.appendChild(clickAwayListenerElement);
  } else {
    menu.classList.remove("open");
    clickAwayListenerElement.remove();
  }
};

const dropdown = menuPresenter.querySelector(".menu-root");

clickAwayListenerElement.addEventListener("click", () => {
  setMenuState(false);
});

let toggle = false;
dropdown.addEventListener("click", () => {
  toggle = !toggle;

  setMenuState(toggle);
});
