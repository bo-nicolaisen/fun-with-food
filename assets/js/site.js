// dom elements for function ------------------------------------------------------

let serchMode = "none";

const myResultElement = document.getElementById("myResult");

const myfirstLetterInput = document.getElementById("firstLetterInput");
const myfirstLetterSearchButton = document.getElementById("firstLetterSearch");

myfirstLetterSearchButton.addEventListener("click", () => {
  serchMode = "firstLetterSearch";
  console.info(myfirstLetterInput.value);
});

const myNameInput = document.getElementById("nameInput");
const myNameSearchButton = document.getElementById("nameSearch");

myNameSearchButton.addEventListener("click", () => {
  serchMode = "nameSearch";
  console.info(myNameInput.value);
  getRecipiesByName(myNameInput.value);
});

const myIdInput = document.getElementById("idInput");
const myIdSearchButton = document.getElementById("idSearch");

myIdSearchButton.addEventListener("click", () => {
  serchMode = "idSearch";
  console.info(myIdInput.value);
});



// fetch functions --------------------------------------------------------------------

function getRecipiesByName(myName) {
  apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${myName}`;

  fetch(apiUrl)
    .then((response) => {
     
        // error checking
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      return response.json(); // Parse the response body as JSON
    })

    .then((data) => {
      // send data on to view functions
      setupResultView(data);
    })

    .catch((error) => {
      serchMode = "error";
      console.error("Error:", error);
      setupResultView(error);
    });
}

//const apiUrl = 'https://dog.ceo/api/breeds/image/random/1';

//const apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=pasta';

// view code ---------------------------------------------------------

function setupResultView(myData) {
  switch (serchMode) {
    case "firstLetterSearch":
      console.log(myData);
      break;

    case "nameSearch":
      console.log(myData.meals);
      let myText = "";

      myData.meals.map((myMeal) => {
        myText += myMeal.strMeal + ", ";
      });

      myResultElement.textContent = myText;
      break;

    case "idSearch":
      console.log(myData);
      break;

    case "errorMessage":
      console.log(myData);
      break;

    default:
      console.warn("ooops no data to show");
      break;
  }
}
