const snackGrid = document.getElementById('snackGrid');
const snackImgInput = document.getElementById('snackImgInput');
const snackLabelInput = document.getElementById('snackLabelInput');
const addSnackBtn = document.getElementById('addSnackBtn');
const backHomeBtn = document.getElementById('backHomeBtn');

// Load snacks from localStorage and render
function loadSnacks() {
  const savedSnacks = JSON.parse(localStorage.getItem('snacks')) || [];
  snackGrid.innerHTML = ''; // clear container

  savedSnacks.forEach(snack => {
    addSnackToGrid(snack.img, snack.label);
  });
}

// Create and add snack card element to grid
function addSnackToGrid(imgSrc, label) {
  const newCard = document.createElement('div');
  newCard.classList.add('snack-card');
  newCard.dataset.label = label;

  const img = document.createElement('img');
  img.src = imgSrc;
  img.alt = label;

  const span = document.createElement('span');
  span.textContent = label;

  newCard.appendChild(img);
  newCard.appendChild(span);

  newCard.style.cursor = 'pointer';

  // Click snack to delete with confirmation
  newCard.addEventListener('click', () => {
    const confirmed = confirm(`Are you sure you want to delete "${label}"?`);
    if (confirmed) {
      deleteSnack(label);
    }
  });

  snackGrid.appendChild(newCard);
}

// Delete snack from localStorage and reload grid
function deleteSnack(label) {
  let savedSnacks = JSON.parse(localStorage.getItem('snacks')) || [];
  savedSnacks = savedSnacks.filter(snack => snack.label !== label);
  localStorage.setItem('snacks', JSON.stringify(savedSnacks));
  loadSnacks();
}

// Add snack button handler
addSnackBtn.addEventListener('click', () => {
  const file = snackImgInput.files[0];
  const label = snackLabelInput.value.trim();

  if (!file || !label) {
    alert("Please upload a photo and enter a label!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const imgURL = e.target.result;

    const savedSnacks = JSON.parse(localStorage.getItem('snacks')) || [];
    savedSnacks.push({ img: imgURL, label });
    localStorage.setItem('snacks', JSON.stringify(savedSnacks));

    loadSnacks();

    // Clear inputs
    snackImgInput.value = '';
    snackLabelInput.value = '';
  };
  reader.readAsDataURL(file);
});

// Back to homepage button
backHomeBtn.addEventListener('click', () => {
  window.location.href = 'lovey.html';
});

// On page load:
loadSnacks();
