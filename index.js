// fun weird bugs with the adding part
// So first off the button on the newly added form do not work. I understand why though
//  they are broken cause crossOffArticle and expandArticle run once DOMContentLoaded happens. And they get their buttons right then
//  from there they get an event to add to each button (tWhe button list they determined on page load. before custom park added)
//  And for some reason if I just re run the code, the event handlers break. Probably because they already have an event handler, and i am then adding another


/* ~~~~~~~~~~~~~~~~~~~~~~~~ 20.5 Event Listeners ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// DOM CONTENT LOADED (it is a thing tht goes off only once the page has fully loaded)


function babyFirstEventListener() {
  const Btn = document.querySelectorAll("button");
  Btn.forEach((currentBtn) => {
    console.log("Gwstgwset3tw");

    currentBtn.addEventListener("click", (event) => {
      console.log("congrats you win", event.target);
    });
  });
}
// babyFirstEventListener()

function favoritePark() {
  const allRateBtns = document.querySelectorAll(".rate-button");
  allRateBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const parentPark = event.target.parentElement;
      if (!parentPark.style.backgroundColor) {
        parentPark.style.backgroundColor = "#c8e6c9";
      } else {
        parentPark.style.backgroundColor = "";
      }
    });
  });
}
// babySecondEventListener()

function expandArticleBody() {
  // Select all the view stat button so we can attach event listeners for clicks to them
  let statButton = document.querySelectorAll(".expand_button");
  // console.log("BUTTON ARE")
  // console.log(statButton);

  // for each button in StatButtons wanna add a event listener
  statButton.forEach((currentButton) => {
    currentButton.addEventListener("click", () => {
      // what to do on click
      // get acess to section that the button is inside of and that has stat div (it is like 3 divs up)
      let parentSection =
        currentButton.parentElement.parentElement.parentElement;

      let statsDiv = parentSection.querySelector(".stats");
      // console.log(statsDiv);

      // now change the ".hiden" class from it
      // statsDiv.classList.remove("hidden")

      // or can change the CSS of it to make it display as a block (rn is displays an none i think)
      // and also have an if statement to open/ close the expanded stats
      if (currentButton.innerText === "View Stats") {
        statsDiv.style.display = "block";
        currentButton.innerText = "Hide Stats";
      } else {
        statsDiv.style.display = "none";
        currentButton.innerText = "View Stats";
      }
    });
  });
}

//helper function to sort parks
function sortByName(array) {
  array.sort((parkA, parkB) => {
    parkA = parkA.querySelector(".park-name").innerText.toLocaleLowerCase();
    parkB = parkB.querySelector(".park-name").innerText.toLocaleLowerCase();
    if (parkA < parkB) {
      return -1;
    } else if (parkA > parkB) {
      return 1;
    } else {
      return 0;
    }
  });
  return array;
}

// helper function to sort ratings
function sortByRating(array) {
  array.sort((parkA, parkB) => {
    parkA = parkA.querySelector(".park-rating").innerText;
    parkB = parkB.querySelector(".park-rating").innerText;
    if (parkA > parkB) {
      return -1;
    } else if (parkA < parkB) {
      return 1;
    } else {
      return 0;
    }
  });
  return array;
}

function nameSorter() {
  const nameSorter = document.querySelector("#name-sorter");
  nameSorter.addEventListener("click", (event) => {
    const main = document.querySelector("main");
    const parkList = document.querySelectorAll(".park-display");
    event.preventDefault();
    main.innerHTML = "";
    console.log(parkList);
    // testing putting it back in. it...works???? it posts the stuff but the CSS is not re-applied to them for some reason
    // parkList.forEach((currentPark) => {
    //   console.log(currentPark)
    //   main.innerHTML += currentPark.innerHTML
    // })
    // Make an array from parkList (it is technically not an array, but a Node list. Remember forEach works on it, but for loops had use .values())
    let parkArray = Array.from(parkList);

    //now sort the parkArray
    parkArray = sortByName(parkArray);

    // Now put the parks back into main (which is its parent luckily)
    parkArray.forEach((park) => {
      main.appendChild(park);
    });
  });
}

// nameSorter();

// functionally the same thin as name sort function, but with rating
function rateSorter() {
  const ratingSorter = document.querySelector("#rating-sorter");
  ratingSorter.addEventListener("click", (event) => {
    const main = document.querySelector("main");
    const parkList = document.querySelectorAll(".park-display");
    event.preventDefault();
    main.innerHTML = "";
    console.log(parkList);

    let parkArray = Array.from(parkList);
    console.log(parkArray);
    parkArray = sortByRating(parkArray);

    parkArray.forEach((park) => {
      main.appendChild(park);
    });
  });
}
// rateSorter()

function crossOffArticle() {
  // when mark visited is clicked, strike through text
  // used later to toggle button
  let allVisitButtons = document.querySelectorAll(".toggle-visited");
  // now need to add event listener for each button
  allVisitButtons.forEach((currentBtn) => {
    currentBtn.addEventListener("click", () => {
      // need parent element again, and it is like 3 higher
      let section = currentBtn.parentElement.parentElement.parentElement;
      if (currentBtn.innerText === "Mark Visited") {
        section.classList.add("cross-off");
        currentBtn.innerText = "Mark Unvisited";
      } else {
        section.classList.remove("cross-off");
        currentBtn.innerText = "Mark Visited";
      }
    });
  });
}

// crossOffArticle();

/* ~~~~~~~~~~~~~~~~~~~~~~~~ 20.6 form submissions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

const submitHandler = (event) => {
  const form = document.querySelector("#park-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    // console.log("The form was submitted");

    const formData = new FormData(event.target);
    const parkName = document.querySelector("#name-input").value;
    // console.log(parkName)

    // console.log(formData.get("name"))
    const errors = validateForm();

    const errorElements = document.querySelectorAll(".error");
    for (let element of errorElements) {
      element.style.display = "none";
    }

    Object.keys(errors).forEach((key) => {
      // Find the specific error element
      const errorElement = document.querySelector(`#${key}-form .error`);
      errorElement.innerHTML = errors[key];
      errorElement.style.display = "block";
    });

    // If there are no errors
    if (!Object.keys(errors).length) {
      // Create a new element
      const parkSection = document.createElement("section");

      // Add the park class
      parkSection.classList.add("park-display");

      // Construct the HTML for this element
      const content = `
          <h2>
            <div class="park-name">
              ${formData.get("name")}
            </div>
            <div class="park-rating">
            ${formData.get("rating")}
            </div>
          </h2>
          <div class="location-display">${formData.get("location")}</div>
          <div class="description-display">
            <p>
            ${formData.get("description")}
            </p>
            <div class="description-controls">
              <button class="expand_button">View Stats</button>
              <button class="toggle-visited">Mark Visited</button>
            </div>
          </div>
          <button class="rate-button" title="Add to Favourites">&#9734;</button>
          <div class="stats hidden">
            <div class="established-display stat">
              <h3>Established</h3>
              <div class="value">${formData.get("established")}</div>
            </div>
            <div class="area-display stat">
              <h3>Area</h3>
              <div class="value">${formData.get("area")}</div>
            </div>
            <div class="rating-display stat">
              <h3>Rating</h3>
              <div class="value">${formData.get("rating")}</div>
            </div>
          </div>
        </section>`;


      // Set the innerHTML
      parkSection.innerHTML = content;

      // Append to the main element
      document.querySelector("main").appendChild(parkSection);

    }
  });
};

function validateExists(value) {
  return value && value.trim();
}
function validateForm() {
  const errors = {};

  // check name
  if (!validateExists(document.querySelector("#name-input").value)) {
    errors.name = "Please enter a name";
  }

  //check location
  if (!validateExists(document.querySelector("#location-input").value)) {
    errors.location = "Please enter a location";
  }

  // check describption
  if (!validateExists(document.querySelector("#description-input").value)) {
    errors.description = "Please enter a description";
  }

  // check establish
  if (!validateExists(document.querySelector("#established-input").value)) {
    errors.established = "Please enter a established";
  }

  // check area
  if (!validateExists(document.querySelector("#area-input").value)) {
    errors.area = "Please enter a area";
  }

  // check rating
  if (!validateExists(document.querySelector("#rating-input").value)) {
    errors.rating = "Please enter a rating";
  }
  // check rating between 1 and 5
  if (
    document.querySelector("#rating-input").value > 5 ||
    document.querySelector("#rating-input").value < 1
  ) {
    errors.rating = "Rating must be between 1 and 5";
  }

  console.log(errors);

  return errors;
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~ DOM content after page load ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function main() {
  expandArticleBody();
  crossOffArticle();
  nameSorter();
  rateSorter();
  favoritePark();
  submitHandler();
}

window.addEventListener("DOMContentLoaded", (event) => {
  console.log("page loaded");
  main();
});
