const url = "https://programming-quotes-api.herokuapp.com/quotes";
const list = document.querySelector(".quotes");
const refreshButton = document.querySelector(".refresh-button");
const error_text = document.querySelector(".error");
load_quotes();

function load_quotes() {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Something went wrong ${response.status}`);
    })
    .then((data) => {
      const quote = data[Math.floor(Math.random() * data.length)];
      list.textContent = "";
      const li = document.createElement("li");
      li.classList.add("quote");

      const html = `
        <p>${quote.en}</p>
         <span class='author'> by ${quote.author}</span>
      `;
      li.innerHTML = html;
      list.appendChild(li);

      refreshButton.addEventListener("click", (e) => {
        e.preventDefault();
        refreshButton.classList.add("fa-spin");
        setTimeout(() => {
          const quote = data[Math.floor(Math.random() * data.length)];
          list.textContent = "";
          const li = document.createElement("li");
          li.classList.add("quote");

          const html = `
        <p>${quote.en}</p>
         <span class='author'> by ${quote.author}</span>
      `;
          li.innerHTML = html;
          list.appendChild(li);
          refreshButton.classList.remove("fa-spin");
        }, 500);
      });
    })
    .catch((error) => {
      error_text.textContent = "Something Went Wrong! Please Try Again!";
      error_text.style.display = "block";
    });
}
