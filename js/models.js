const recommendationType = {
    SPONSORED: "sponsored",
    ORGANIC: "organic"
}

class Recommendation {
    constructor(type, name, url, thumbnails) {
        this.type = type;
        this.name = name;
        this.url = url;
        this.thumbnails = thumbnails;
    }

    getTemplateElement(id, title, thumbnail, url) {
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
    }
}

class SponsoredRecommendation extends Recommendation {
    constructor(type, name, url, thumbnails) {
        super(type, name, url, thumbnails);
    }

    getTemplateElement(id, title, thumbnail, url) {
        const template = `<div class="item-container" data-item-id="{id}">          
                            <a title="" href="{url}" target="_blank" class="">
                            <div class=""><span class="item-image" style="{thumbnail}"></span>
                            <span class="branding">{title}</span>
                            </div></div>`.
        replace('{id}', id).
        replace('{url}', url).
        replace('{thumbnail}', 'background-image: url(' + thumbnail + ');').
        replace('{title}', title);

        const el = document.createElement('div');
        el.innerHTML = template;

        return el.firstChild;
    }
}

class OrganicRecommendation extends Recommendation {
    constructor(type, name, url, thumbnails) {
        super(type, name, url, thumbnails);
    }

    getTemplateElement(id, title, thumbnail, url) {
        return super.getTemplateElement(id, title, thumbnail, url);
    }
}


