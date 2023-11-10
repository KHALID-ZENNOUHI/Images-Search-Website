const accessKey = "49VOBpjVHzKzQjeYy1rHnX2cd1v7gQ_c7Dol9D_GeOE";
const formElement = document.querySelector("form");
const inputElement = document.getElementById("searche-input");
const searcheResults = document.querySelector(".searche-results");
const showMore = document.getElementById("Show-more-button");

let inputData = "";
let page = 1;

async function searcheImages() {
    inputData = inputElement.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;
    if (page === 1) {
        searcheResults.innerHTML = "";
    }
    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("searche-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href =  result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searcheResults.appendChild(imageWrapper);
    })
    page++;
    if (page > 1) {
        showMore.style.display = "block";
    }
}

formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searcheImages();
})
showMore.addEventListener("click", () => {
    searcheImages();
})