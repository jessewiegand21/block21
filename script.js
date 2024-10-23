const newData = [];

const state = {
  events: [],
};

const url =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2408-FTB-MT-WEB-PT/events";

const element = document.getElementById("table");

const submitButton = document.querySelector("#submit");

const deleteButton = document.querySelector("#deleteButton");

const form = document.querySelector("#form");

deleteButton.addEventListener("click", () => {
  const tableRow = document.querySelector("#table-row");
  tableRow.remove();
});

function render() {
  const newEvent = state.events.map((item) => {
    const newElement = document.createElement("tr");
    const eventDateTime = new Date(item.date);
    const dateString = eventDateTime.toLocaleDateString();
    const timeString = eventDateTime.toLocaleTimeString();
    newElement.innerHTML = `
    <td><h3>Name:<h3></td>
    <td>${item.name}</td>
    <td><h3>Date:<h3></td>
    <td>${dateString}</td>
    <td><h3>Time:<h3></td>
    <td>${timeString}</td>
    <td><h3>Location:<h3></td>
    <td>${item.location}</td>
    <td><h3>Description:<h3></td>
    <td>${item.description}</td>
    <td><button id="${item.id}"class="deleteButton">Delete</button></td>
    `;
    return newElement;
  });

  element.replaceChildren(...newEvent);
  return newEvent;
}

element.addEventListener("click", (e) => {
  if (e.target.className === "deleteButton") {
    console.log(e.target.id);
    async function deleteParty() {
      fetch(`${url}/${e.target.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/jason",
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("Delete Successful");
          } else {
            console.log("Delete Failed");
          }
          getData();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    deleteParty();
  }
});

async function addParty(party) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(party),
  });
  getData();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.querySelector("#formName");

  const date = document.querySelector("#formDate");

  const time = document.querySelector("#formTime");

  const location = document.querySelector("#formLocation");

  const description = document.querySelector("#formDescription");

  const info = {
    name: name.value,
    date: new Date(date.value).toISOString(),
    location: location.value,
    description: description.value,
  };
  console.log(JSON.stringify(info));
  addParty(info);
  getData();
  render();
});

async function getData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      state.events = data.data;
      console.log(state);
      console.log("Success", data);
    } else {
      console.log("Server Error", data.error.message);
    }
  } catch (error) {
    console.log("Error", error);
  }
  render();
}
getData();
