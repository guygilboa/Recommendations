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

    getTemplateElement(id, title, thumbnail, url, branding, origin) {
        const template = `<div class="item-container" data-item-id="{id}">          
                            <a class="item-link" href="{url}" target="_blank">
                            <div class=""><span class="item-image" style="{thumbnail}"></span>
                            <span class="item-title">{title}</span>
                            </div></div>`;

        const el = document.createElement('div');
        el.innerHTML = template;
        return el.firstChild;
    }
}

class SponsoredRecommendation extends Recommendation {
    constructor(type, name, url, thumbnails) {
        super(type, name, url, thumbnails);
    }

    getTemplateElement(id, title, thumbnail, url, branding, origin) {
        const template = `<div class="item-container" data-item-id="{id}">          
                            <a class="item-link" href="{url}" target="_blank">
                            <div class="item-wrapper"><span class="item-image" style="{thumbnail}"></span>
                            <span class="item-title">{title}</span>
                            <span class="item-branding">{branding} | {origin}</span>
                            </div></div>`.replace('{id}', id).replace('{url}', url).replace('{thumbnail}', 'background-image: url(' + thumbnail + ');').replace('{title}', title).replace('{branding}', branding).replace('{origin}', origin);

        const el = document.createElement('div');
        el.innerHTML = template;
        return el.firstChild;
    }
}

class OrganicRecommendation extends Recommendation {
    constructor(type, name, url, thumbnails) {
        super(type, name, url, thumbnails);
    }

    getTemplateElement(id, title, thumbnail, url, branding, origin) {
        return super.getTemplateElement(id, title, thumbnail, url, branding, origin);
    }
}
