// Link icon - External link icon will only show with specific parents - like main.
const modifyPage = () => {
  const body = document.querySelector("body");
  const main = document.createElement("main");
  body.appendChild(main);
  const links = document.querySelectorAll("a");
  main.appendChild(links[0]);
  main.appendChild(links[1]);
};

modifyPage();
