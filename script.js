const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const clearButton = document.getElementById('clear-button');
const searchHistoryList = document.getElementById('search-history');

let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

function renderHistory() {
    searchHistoryList.innerHTML = '';
    searchHistory.forEach((term, index) => {
        const li = document.createElement('li');
        li.textContent = term;

        const deleteButton = document.createElement('span');
        deleteButton.textContent = '✖';  // Using a cross symbol
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', () => deleteSearchTerm(index));

        li.appendChild(deleteButton);
        searchHistoryList.appendChild(li);
    });
}


function addSearchTerm(term) {
    if (term) {
        searchHistory.unshift(term);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        renderHistory();
    }
}

function deleteSearchTerm(index) {
    searchHistory.splice(index, 1);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    renderHistory();
}

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    addSearchTerm(searchTerm);
    searchInput.value = '';
});

clearButton.addEventListener('click', () => {
    searchHistory = [];
    localStorage.removeItem('searchHistory');
    renderHistory();
});

renderHistory();
