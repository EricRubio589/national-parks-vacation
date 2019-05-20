
const apiKey = 'thk0P2qqcVbTygSaXjR5hKjMgMSq08UfeSrtYIEe';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${[encodeURIComponent(key)]}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}


function getParks(URL, state, maxResults, apiKey) {
    
    const params = {
        stateCode: state,
        limit: maxResults
    }
    
    const queryString = formatQueryParams(params);
    const url = URL + '?' + queryString + '&api_key=' + apiKey;
    console.log(url);
    
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(error => {
        alert(error)
    })
}

function displayResults(responseJson, maxResults) {
    for (let i = 0; i < responseJson.data.length & i < maxResults; i++) {
        $('.resultsList')
        .append(`<li><h3>${responseJson.data[i].fullName}</h3>
        <p>${responseJson.data[i].description}</p>
        <a href="${responseJson.data[i].url}">Link to the site</a>
        </li>`);
    }
    $('.resultsContainer').show();
}

function handleFormSubmit() {
    $('.parksForm').on('submit', function() {
        event.preventDefault();
        $('.resultsList').empty();
        const URL = 'https://api.nps.gov/api/v1/parks'
        const state = $('#stateInput').val().split(",");
        const maxResults = $('#maxResultsInput').val();
        getParks(URL, state, maxResults, apiKey);
    })
}

$(function initialize() {
    console.log("waiting for user selection");
    handleFormSubmit();
})