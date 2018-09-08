function getLocation(href) {
    var l = document.createElement('a');
    l.href = href;
    return l;
}

function getKoboApiUrl(apiPath) {
    const curLoc = getLocation(window.location.href);
    const splits = curLoc.pathname.split('/');
    if (splits.length < 3) {
        return;
    }

    return '/' + [splits[1], splits[2], apiPath.replace(/^\//, '')].join('/');
}

function addToCart(pid, apiUrl='/zh/tw/shoppingcartwidget/add') {
    $.post(
        apiUrl, 
        {
            Id: pid,
            IsKoboLoveMembership: false
        },
        null,
        'json'
    ).done((resp) => {
        console.log(resp);
    });
}

function koboAddAll() {

    const apiUrl = getKoboApiUrl('/shoppingcartwidget/add');
    console.log(apiUrl);

    $.each(
        $('li.item-wrapper.book'),
        (idx, x) => {
            const pid = $(x).data('track-info').productId;
            console.log(pid);
            addToCart(pid, apiUrl);
        }
    );
}

function addSequenceShortCuts(){
    $.each(
        $('span.product-sequence-field'),
        (idx, x) => {
            $(x).after(`<div class="kobo-aa add-btn" data-href="${$(x).children('a').attr('href')}">將全系列加入購物車</div>`);
        }
    );
}

console.log('koboAddAll loaded ...');
addSequenceShortCuts();