const hashMap = [
    { logo: 'jQuery', logoType: 'icon', href: 'https://www.jquery123.com/', link: 'jquery123.com' },
    { logo: 'docker', logoType: 'icon', href: 'https://docs.docker.com/', link: 'docker.com' },
    { logo: 'nodejs', logoType: 'icon', href: 'http://nodejs.cn/api/', link: 'nodejs.cn' }
];
const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.lastLi');

const initLocalStorage = (() => {
    if (window.localStorage.getItem('hashmap') === null) {
        window.localStorage.setItem('hashmap', JSON.stringify(hashMap));
    }
})

const saveLocal = (() => {
    window.localStorage.setItem('hashmap', JSON.stringify(hashMap))
});

const replaceHref = ((href) => {
    return href.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
})

const render = (() => {
    $siteList.find('li:not(.lastLi)').remove();
    let hashMapJson = JSON.parse(window.localStorage.getItem('hashmap'));
    hashMapJson.forEach((node, index) => {
        let $li;
        if (node.logoType === 'icon') {
            $li = $(`
            <li>
                <div class="site">
                    <div class="close" title="删除">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-guanbi"></use>
                        </svg>
                    </div>
                    <div class="iconWrapper">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-${node.logo}"></use>
                        </svg>
                    </div>
                    <div id="link3" class="link">${node.link}</div>
                </div>
            </li>
            `).insertBefore($lastLi)
        } else {
            $li = $(`
            <li>
                <div class="site">
                    <div class="close" title="删除">
                        <svg class="icon" aria-hidden="true">
                             <use xlink:href="#icon-guanbi"></use>
                        </svg>
                    </div>
                    <div class="logo">
                        ${node.link[0].toUpperCase()}
                    </div>
                    <div id="link3" class="link">${node.link}</div>
                </div>
            </li>
            `).insertBefore($lastLi)
        }
        $li.on('click', () => {
            window.open(node.href)
        })
        $li.on('click', '.close', (event) => {
            event.stopPropagation();
            let hashMapJson = JSON.parse(window.localStorage.getItem('hashmap'));
            hashMapJson.splice(index, 1);
            window.localStorage.setItem('hashmap', JSON.stringify(hashMapJson))
            render();
        })
    })
});

initLocalStorage();
render();//渲染页面

$('.addSite')
    .on('click', () => {
        let href = window.prompt("请输入网址");
        if (href) {
            if (href.indexOf("http") !== 0) {
                href = "http://" + href;
            }
            let hashMapJson = JSON.parse(window.localStorage.getItem('hashmap'));
            hashMapJson.push(
                { logo: href[7], logoType: 'text', href: href, link: replaceHref(href) }
            );
            window.localStorage.setItem('hashmap', JSON.stringify(hashMapJson))
            render();
        }
    })

window.onbeforeunload = () => {
    console.log('hi')
};

$(document).on('keypress', (event) => {
    let hashMapJson = JSON.parse(window.localStorage.getItem('hashmap'));
    const { key } = event;
    hashMapJson.forEach((node) => {
        if (node.link[0].toLowerCase() === key) {
            window.open(node.href);
        }
    })
})
