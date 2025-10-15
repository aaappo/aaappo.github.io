// Nimien tallennus ja haku
let friendListData = JSON.parse(localStorage.getItem("friends")) || [];


function displayError(msg) {
  const errorBox = document.getElementById("errorMessage");
  errorBox.textContent = msg;
  errorBox.classList.add("error");
}

function removeError() {
  const errorBox = document.getElementById("errorMessage");
  errorBox.textContent = "";
  errorBox.classList.remove("error");
}

// Uuden kaverin lisäys
function addFriend() {
  const inputField = document.getElementById("friendInput");
  const friendName = inputField.value.trim();

  // Nimirajoitukset
  if (!friendName) {
    displayError("Nimi ei voi olla tyhjä!");
    return;
  }

  if (friendName.length > 20) {
    displayError("Nimi ei voi olla yli 20 merkkiä pitkä!");
    return;
  }

  if (friendName.toLowerCase() === "kikkeli") {
    displayError("painoraja ylitetty ei mahdu listalle");
    return;
  }

  removeError();

  // Kaverin luonti
  const newEntry = {
    id: Date.now(),
    name: friendName,
    date: new Date().toISOString()
  };

  friendListData.push(newEntry);
  saveToLocalStorage();
  inputField.value = "";
  updateList();
}

// Kaverin poisto
function removeFriend(friendId) {
  friendListData = friendListData.filter(item => item.id !== friendId);
  saveToLocalStorage();
  updateList();
}

// Tallennus 
function saveToLocalStorage() {
  localStorage.setItem("friends", JSON.stringify(friendListData));
}

// Listan näyttäminen
function updateList() {
  const ul = document.getElementById("friendList");
  ul.innerHTML = "";

  const sortOption = document.getElementById("sortSelect").value;
  const sortedFriends = [...friendListData];

  // Lajittelu
  if (sortOption === "name") {
    sortedFriends.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    sortedFriends.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  // Listan rakennus
  for (const friend of sortedFriends) {
    const li = document.createElement("li");
    const nameEl = document.createElement("span");
    nameEl.textContent = friend.name;

    const dateEl = document.createElement("span");
    dateEl.textContent = new Date(friend.date).toLocaleDateString("fi-FI");
    dateEl.classList.add("date");

    const delBtn = document.createElement("button");
    delBtn.textContent = "Poista";
    delBtn.classList.add("delete");
    delBtn.onclick = () => removeFriend(friend.id);

    const rightContainer = document.createElement("div");
    rightContainer.style.display = "flex";
    rightContainer.style.alignItems = "center";
    rightContainer.appendChild(dateEl);
    rightContainer.appendChild(delBtn);

    li.appendChild(nameEl);
    li.appendChild(rightContainer);
    ul.appendChild(li);
  }
}

updateList();