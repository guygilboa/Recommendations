function getRecommendations(numOfItems) {
    const url = taboolaAPIUrl.replace('{count}', numOfItems);
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function () {
            if (req.status === 200) {
                resolve(req.response);
            } else {
                reject(Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject(Error("Something went wrong ..."));
        };
        req.send();
    });
}

const createCard = () => {
    const template = `<li>
    <div class="card">
      <div class="card-content">
        <div class="content">
          <div class="name">fff</div>
          <div class="description">fdfdf fgfd</div>
        </div>
      </div>
    </div>
  </li>`;

    const el = document.createElement('div');
    el.innerHTML = template;

    return el.firstChild;
};

function getCard(type) {
    let recommendationObject;

    switch (type) {
        case recommendationType.SPONSORED:
            recommendationObject = new SponsoredRecommendation();
            break;

        case recommendationType.ORGANIC:
            recommendationObject = new OrganicRecommendation();
            break;
    }

    return recommendationObject;
}

function displayRecommendations(results, type) {
    const resultsObj = JSON.parse(results);
    const listRecommendations = resultsObj.list;
    let recommendationObject = getCard(type);

    let container = document.getElementById('recommendations-container')
    let fragment = new DocumentFragment();

    let length = listRecommendations.length;
    // I use for because it much faster than forEach
    for (let i = 0; i < length; i++) {
        let template = recommendationObject.getTemplateElement(listRecommendations[i].id,
            listRecommendations[i].name,
            decodeURIComponent(listRecommendations[i].thumbnail[0].url),
            listRecommendations[i].url)
        fragment.appendChild(template);
    }

    container.appendChild(fragment);
}

(function () {
    getRecommendations(10).then(
        function (response) {
            displayRecommendations(response, recommendationType.SPONSORED);
            document.getElementById('loader').style.display = 'none';
            document.getElementById('recommendations-container').style.display = 'flex';
        }, function (error) {
            document.getElementById('loader').style.display = 'none';
            console.error("Failed!", error);
        });
})();