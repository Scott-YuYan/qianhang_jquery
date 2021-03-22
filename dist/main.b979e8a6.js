// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var hashMap = [{
  logo: 'jQuery',
  logoType: 'icon',
  href: 'https://www.jquery123.com/',
  link: 'jquery123.com'
}, {
  logo: 'docker',
  logoType: 'icon',
  href: 'https://docs.docker.com/',
  link: 'docker.com'
}, {
  logo: 'nodejs',
  logoType: 'icon',
  href: 'http://nodejs.cn/api/',
  link: 'nodejs.cn'
}];
var $siteList = $('.siteList');
var $lastLi = $siteList.find('li.lastLi');

var initLocalStorage = function initLocalStorage() {
  if (window.localStorage.getItem('hashmap') === null) {
    window.localStorage.setItem('hashmap', JSON.stringify(hashMap));
  }
};

var saveLocal = function saveLocal() {
  window.localStorage.setItem('hashmap', JSON.stringify(hashMap));
};

var replaceHref = function replaceHref(href) {
  return href.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
};

var render = function render() {
  $siteList.find('li:not(.lastLi)').remove();
  var hashMapJson = JSON.parse(window.localStorage.getItem('hashmap'));
  hashMapJson.forEach(function (node, index) {
    var $li;

    if (node.logoType === 'icon') {
      $li = $("\n            <li>\n                <div class=\"site\">\n                    <div class=\"close\" title=\"\u5220\u9664\">\n                        <svg class=\"icon\" aria-hidden=\"true\">\n                            <use xlink:href=\"#icon-guanbi\"></use>\n                        </svg>\n                    </div>\n                    <div class=\"iconWrapper\">\n                        <svg class=\"icon\" aria-hidden=\"true\">\n                            <use xlink:href=\"#icon-".concat(node.logo, "\"></use>\n                        </svg>\n                    </div>\n                    <div id=\"link3\" class=\"link\">").concat(node.link, "</div>\n                </div>\n            </li>\n            ")).insertBefore($lastLi);
    } else {
      $li = $("\n            <li>\n                <div class=\"site\">\n                    <div class=\"close\" title=\"\u5220\u9664\">\n                        <svg class=\"icon\" aria-hidden=\"true\">\n                             <use xlink:href=\"#icon-guanbi\"></use>\n                        </svg>\n                    </div>\n                    <div class=\"logo\">\n                        ".concat(node.link[0].toUpperCase(), "\n                    </div>\n                    <div id=\"link3\" class=\"link\">").concat(node.link, "</div>\n                </div>\n            </li>\n            ")).insertBefore($lastLi);
    }

    $li.on('click', function () {
      window.open(node.href);
    });
    $li.on('click', '.close', function (event) {
      event.stopPropagation();
      var hashMapJson = JSON.parse(window.localStorage.getItem('hashmap'));
      hashMapJson.splice(index, 1);
      window.localStorage.setItem('hashmap', JSON.stringify(hashMapJson));
      render();
    });
  });
};

initLocalStorage();
render(); //渲染页面

$('.addSite').on('click', function () {
  var href = window.prompt("请输入网址");

  if (href) {
    if (href.indexOf("http") !== 0) {
      href = "http://" + href;
    }

    var hashMapJson = JSON.parse(window.localStorage.getItem('hashmap'));
    hashMapJson.push({
      logo: href[7],
      logoType: 'text',
      href: href,
      link: replaceHref(href)
    });
    window.localStorage.setItem('hashmap', JSON.stringify(hashMapJson));
    render();
  }
});

window.onbeforeunload = function () {
  console.log('hi');
};

$(document).on('keypress', function (event) {
  var hashMapJson = JSON.parse(window.localStorage.getItem('hashmap'));
  var key = event.key;
  hashMapJson.forEach(function (node) {
    if (node.link[0].toLowerCase() === key) {
      window.open(node.href);
    }
  });
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.b979e8a6.js.map