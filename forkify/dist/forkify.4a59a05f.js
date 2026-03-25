// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  function $parcel$resolve(url) {  url = importMap[url] || url;  return import.meta.resolve(distDir + url);}newRequire.resolve = $parcel$resolve;

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"5DuvQ":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "8ad96e854a59a05f";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"7dWZ8":[function(require,module,exports,__globalThis) {
//import "regenerator-runtime/runtime";
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _modelJs = require("./model.js");
var _recipeViewJs = require("./views/recipeView.js");
var _recipeViewJsDefault = parcelHelpers.interopDefault(_recipeViewJs);
var _resultViewJs = require("./views/resultView.js");
var _resultViewJsDefault = parcelHelpers.interopDefault(_resultViewJs);
var _bookMarkViewJs = require("./views/bookMarkView.js");
var _bookMarkViewJsDefault = parcelHelpers.interopDefault(_bookMarkViewJs);
var _paginationViewJs = require("./views/paginationView.js");
var _paginationViewJsDefault = parcelHelpers.interopDefault(_paginationViewJs);
var _addRecipeViewJs = require("./views/addRecipeView.js");
var _addRecipeViewJsDefault = parcelHelpers.interopDefault(_addRecipeViewJs);
var _configJs = require("./config.js");
const controlRecipes = async function() {
    try {
        const id = window.location.hash.slice(1);
        if (!id) return;
        (0, _recipeViewJsDefault.default).renderSpinner();
        await _modelJs.loadRecipe(id);
        (0, _recipeViewJsDefault.default).render(_modelJs.state.recipe);
    } catch (err) {
        console.error(err);
    }
};
const controlSearch = async function() {
    try {
        const query = document.querySelector(".search__field").value;
        if (!query) return;
        await _modelJs.loadSearchResults(query);
        (0, _resultViewJsDefault.default).render(_modelJs.getSearchResultPage());
        (0, _paginationViewJsDefault.default).render(_modelJs.state.search);
    } catch (err) {
        console.error(err);
    }
};
const controlPagination = function(goToPage) {
    (0, _resultViewJsDefault.default).render(_modelJs.getSearchResultPage(goToPage));
    (0, _paginationViewJsDefault.default).render(_modelJs.state.search);
};
const controlBookmark = function() {
    if (!_modelJs.state.recipe.bookmarked) _modelJs.addBookmark(_modelJs.state.recipe);
    else _modelJs.deleteBookmark(_modelJs.state.recipe.id);
    localStorage.setItem("bookmarks", JSON.stringify(_modelJs.state.bookmarks));
    (0, _recipeViewJsDefault.default).render(_modelJs.state.recipe);
    if (_modelJs.state.bookmarks.length === 0) (0, _bookMarkViewJsDefault.default).noBookmarks();
    else //bookMarkView.render(model.state.bookmarks);
    (0, _bookMarkViewJsDefault.default).render(JSON.parse(localStorage.getItem("bookmarks")));
};
const controlServings = function(newServings) {
    _modelJs.updateServings(newServings);
    (0, _recipeViewJsDefault.default).render(_modelJs.state.recipe);
};
const controlAddRecipe = async function(newRecipe) {
    try {
        (0, _addRecipeViewJsDefault.default).renderSpinner();
        await _modelJs.uploadRecipe(newRecipe);
        console.log(_modelJs.state.recipe);
        (0, _recipeViewJsDefault.default).render(_modelJs.state.recipe);
        (0, _addRecipeViewJsDefault.default).renderMessage("La receta ha sido correctamente a\xf1adida");
        (0, _bookMarkViewJsDefault.default).render(_modelJs.state.bookmarks);
        window.history.pushState(null, "", `#${_modelJs.state.recipe.id}`);
        setTimeout(function() {
            (0, _addRecipeViewJsDefault.default).toggleWindow();
        }, (0, _configJs.MODAL_CLOSE_SEC) * 1000);
    } catch (err) {
        console.log(err);
        (0, _addRecipeViewJsDefault.default).renderError(err.message);
    }
};
const init = function() {
    (0, _bookMarkViewJsDefault.default).addHandlerBookmark(controlBookmark);
    (0, _paginationViewJsDefault.default).addhandlerClick(controlPagination);
    (0, _recipeViewJsDefault.default).addhandlerUpdateServings(controlServings);
    (0, _addRecipeViewJsDefault.default).addHandlerUpload(controlAddRecipe);
    const storage = JSON.parse(localStorage.getItem("bookmarks")) || [];
    _modelJs.state.bookmarks = storage;
    if (storage.length === 0) (0, _bookMarkViewJsDefault.default).noBookmarks();
    else (0, _bookMarkViewJsDefault.default).render(storage);
};
init();
document.querySelector(".search").addEventListener("submit", function(e) {
    e.preventDefault();
    controlSearch();
});
[
    'hashchange',
    'load'
].forEach((ev)=>window.addEventListener(ev, controlRecipes));

},{"./model.js":"3QBkH","./views/recipeView.js":"3wx5k","./views/resultView.js":"2iOri","./views/bookMarkView.js":"jJV54","./views/paginationView.js":"7NIiB","./views/addRecipeView.js":"8AWnP","./config.js":"2hPh4","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"3QBkH":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "state", ()=>state);
parcelHelpers.export(exports, "loadRecipe", ()=>loadRecipe);
parcelHelpers.export(exports, "getSearchResultPage", ()=>getSearchResultPage);
parcelHelpers.export(exports, "loadSearchResults", ()=>loadSearchResults);
parcelHelpers.export(exports, "addBookmark", ()=>addBookmark);
parcelHelpers.export(exports, "deleteBookmark", ()=>deleteBookmark);
parcelHelpers.export(exports, "updateServings", ()=>updateServings);
parcelHelpers.export(exports, "uploadRecipe", ()=>uploadRecipe);
var _configJs = require("./config.js");
//import { getJSON, sendJSON } from "./helpers.js";
var _helpersJs = require("./helpers.js");
const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: (0, _configJs.RESULTS_PER_PAGE)
    },
    bookmarks: []
};
const createRecipeObject = function(data) {
    let { recipe } = data.data;
    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ...recipe.key && {
            key: recipe.key
        }
    };
};
const loadRecipe = async function(idRecipe) {
    try {
        const data = await (0, _helpersJs.AJAX)(`${(0, _configJs.API_URL)}/${idRecipe}?key=${(0, _configJs.API_KEY)}`);
        state.recipe = createRecipeObject(data);
        state.recipe.bookmarked = state.bookmarks.some((bm)=>bm.id === state.recipe.id);
        console.log(state.recipe);
    } catch (err) {
        throw err;
    }
};
const getSearchResultPage = function(page = state.search.page) {
    state.search.page = page;
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    return state.search.results.slice(start, end);
};
const loadSearchResults = async function(query) {
    try {
        const data = await (0, _helpersJs.AJAX)(`${(0, _configJs.API_URL)}?search=${query}&key=${(0, _configJs.API_KEY)}`);
        state.search.query = query;
        state.search.results = data.data.recipes.map((rec)=>({
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
                ...rec.key && {
                    key: rec.key
                }
            }));
    } catch (err) {
        throw err;
    }
};
function addBookmark(recipe) {
    if (state.bookmarks.some((el)=>el.id === recipe.id)) return;
    state.bookmarks.push(recipe);
    if (recipe.id == state.recipe.id) state.recipe.bookmarked = true;
}
const deleteBookmark = function(id) {
    const index = state.bookmarks.findIndex((el)=>el.id === id);
    state.bookmarks.splice(index, 1);
    if (id === state.recipe.id) state.recipe.bookmarked = false;
};
const updateServings = function(newServings) {
    state.recipe.ingredients.forEach((element)=>{
        element.quantity = element.quantity * newServings / state.recipe.servings;
    });
    state.recipe.servings = newServings;
};
const uploadRecipe = async function(newRecipe) {
    try {
        const objEntries = Object.fromEntries(newRecipe);
        const ingredientes = Object.entries(objEntries).filter((entry)=>entry[0].startsWith('ingredient') && entry[1] !== '').map((ing)=>{
            const ingArr = ing[1].replaceAll(" ", "").split(",");
            console.log(ingArr);
            if (ingArr.length !== 3) throw new Error("Formato de ingredientes incorrectos!!, por favor usa el formato correcto");
            const [quantity, unit, description] = ingArr;
            return {
                quantity: quantity ? +quantity : null,
                unit,
                description
            };
        });
        const recipe = {
            title: objEntries.title,
            publisher: objEntries.publisher,
            source_url: objEntries.sourceUrl,
            image_url: objEntries.image,
            servings: +objEntries.servings,
            cooking_time: +objEntries.cookingTime,
            ingredients: ingredientes
        };
        const data = await (0, _helpersJs.AJAX)(`${(0, _configJs.API_URL)}?key=${(0, _configJs.API_KEY)}`, recipe);
        state.recipe = createRecipeObject(data);
        addBookmark(state.recipe);
    } catch (err) {
        throw err;
    }
};

},{"./config.js":"2hPh4","./helpers.js":"7nL9P","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"2hPh4":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "API_URL", ()=>API_URL);
parcelHelpers.export(exports, "API_KEY", ()=>API_KEY);
parcelHelpers.export(exports, "TIMEOUT_SECS", ()=>TIMEOUT_SECS);
parcelHelpers.export(exports, "RESULTS_PER_PAGE", ()=>RESULTS_PER_PAGE);
parcelHelpers.export(exports, "MODAL_CLOSE_SEC", ()=>MODAL_CLOSE_SEC);
const API_URL = 'https://forkify-api.jonas.io/api/v2/recipes';
const API_KEY = 'eb293983-48f5-428b-b48e-a0e9cea08a6d'; // no importa que se vea la key :)
const TIMEOUT_SECS = 10;
const RESULTS_PER_PAGE = 10;
const MODAL_CLOSE_SEC = 2.5;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jnFvT":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"7nL9P":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AJAX", ()=>AJAX);
var _config = require("./config");
const AJAX = async function(url, uploadData) {
    try {
        const fetchPro = uploadData ? fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(uploadData)
        }) : fetch(url);
        const res = await Promise.race([
            fetchPro,
            timeout((0, _config.TIMEOUT_SECS))
        ]);
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;
    } catch (err) {
        throw err;
    }
};
/** 
export const getJSON = async function (url) {
    try {
        const response = await Promise.race([fetch(url), timeout(TIMEOUT_SECS)]);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`${data.message} (${response.status})`);
        }

        return data;
    } catch (err) {
        throw err;
    }

}*/ const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(()=>{
            reject(new Error("Request took too long!"));
        }, s * 1000);
    });
}; /*
export const sendJSON = async function (url, uploadData) {
    try {
        const fetchPro = fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(uploadData),
        });
        const response = await Promise.race([fetchPro, timeout(TIMEOUT_SECS)]);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`${data.message} (${response.status})`);
        }

        return data;
    } catch (err) {
        throw err;
    }

}*/ 

},{"./config":"2hPh4","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"3wx5k":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _iconsSvg = require("url:../../img/icons.svg");
var _iconsSvgDefault = parcelHelpers.interopDefault(_iconsSvg);
var _fractionJs = require("fraction.js");
class RecipeView {
    #parentElement = document.querySelector('.recipe');
    #data;
    render(data) {
        this.#data = data;
        const markup = this.#generateMarkUp();
        this.#clear();
        this.#parentElement.insertAdjacentHTML("afterbegin", markup);
        console.log("data de las recetas", data);
    }
    renderSpinner() {
        const mark = `<div class="spinner">
			<svg>
				<use href="${(0, _iconsSvgDefault.default)}#icon-loader"></use>
			</svg>
		</div>`;
        this.#parentElement.innerHTML = "";
        this.#parentElement.insertAdjacentHTML("afterbegin", mark);
    }
    addhandlerUpdateServings(handler) {
        this.#parentElement.addEventListener("click", (event)=>{
            const btn = event.target.closest(".btn--update-servings");
            if (!btn) return;
            const updateTo = +btn.dataset.updateTo;
            if (updateTo <= 0) return;
            handler(updateTo);
        });
    }
    #clear() {
        this.#parentElement.innerHTML = "";
    }
    #generateMarkUp() {
        let ingredientesHTML = this.#generateIngredientsHTML(this.#data.ingredients);
        return `
			<figure class="recipe__fig">
			<img src="${this.#data.image}" alt="${this.#data.title}" class="recipe__img" />
			<h1 class="recipe__title">
				<span>${this.#data.title}</span>
			</h1>
			</figure>

			<div class="recipe__details">
			<div class="recipe__info">
				<svg class="recipe__info-icon">
				<use href="${0, _iconsSvgDefault.default}#icon-clock"></use>
				</svg>
				<span class="recipe__info-data recipe__info-data--minutes">${this.#data.cookingTime}</span>
				<span class="recipe__info-text">minutes</span>
			</div>
			<div class="recipe__info">
				<svg class="recipe__info-icon">
				<use href="${0, _iconsSvgDefault.default}#icon-users"></use>
				</svg>
				<span class="recipe__info-data recipe__info-data--people">${this.#data.servings}</span>
				<span class="recipe__info-text">servings</span>

				<div class="recipe__info-buttons">
				<button class="btn--tiny btn--update-servings" data-update-to="${this.#data.servings - 1}">
					<svg>
					<use href="${0, _iconsSvgDefault.default}#icon-minus-circle"></use>
					</svg>
				</button>
				<button class="btn--tiny btn--update-servings"  data-update-to="${this.#data.servings + 1}">
					<svg>
					<use href="${0, _iconsSvgDefault.default}#icon-plus-circle"></use>
					</svg>
				</button>
				</div>
			</div>

			<div class="recipe__user-generated ${this.#data.key ? '' : 'hidden'}">
				<svg>
				<use href="${0, _iconsSvgDefault.default}#icon-user"></use>
				</svg>
			</div>
			<button class="btn--round btn--bookmark">
				<svg class="">
				<use href="${0, _iconsSvgDefault.default}#icon-bookmark${this.#data.bookmarked ? '-fill' : ''}"></use>
				</svg>
			</button>
			</div>

			<div class="recipe__ingredients">
			<h2 class="heading--2">Recipe ingredients</h2>
			<ul class="recipe__ingredient-list">
				${ingredientesHTML}
			</ul>
			</div>

			<div class="recipe__directions">
			<h2 class="heading--2">How to cook it</h2>
			<p class="recipe__directions-text">
				This recipe was carefully designed and tested by
				<span class="recipe__publisher">${this.#data.publisher}</span>. Please check out
				directions at their website.
			</p>
			<a
				class="btn--small recipe__btn"
				href="${this.#data.source_url}"
				target="_blank"
			>
				<span>Directions</span>
				<svg class="search__icon">
				<use href="${0, _iconsSvgDefault.default}#icon-arrow-right"></use>
				</svg>
			</a>
			</div>`;
    }
    #generateIngredientsHTML(ingredients) {
        let ingredientesHTML = "";
        ingredients.forEach((element)=>{
            ingredientesHTML += `<li class="recipe__ingredient">
					<svg class="recipe__icon">
						<use href="${0, _iconsSvgDefault.default}#icon-check"></use>
					</svg>
					<div class="recipe__quantity">${element.quantity ? new (0, _fractionJs.Fraction)(element.quantity).toFraction(true) : ""}</div>
					<div class="recipe__description">
						<span class="recipe__unit">${element.unit}</span>
						${element.description}
					</div>
				</li>`;
        });
        return ingredientesHTML;
    }
}
exports.default = new RecipeView();

},{"url:../../img/icons.svg":"fd0vu","fraction.js":"md6n5","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"fd0vu":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("icons.0809ef97.svg") + "?" + Date.now();

},{}],"md6n5":[function(require,module,exports,__globalThis) {
/*
Fraction.js v5.3.4 8/22/2025
https://raw.org/article/rational-numbers-in-javascript/

Copyright (c) 2025, Robert Eisele (https://raw.org/)
Licensed under the MIT license.
*/ 'use strict';
(function(F) {
    function D() {
        return Error("Parameters must be integer");
    }
    function x() {
        return Error("Invalid argument");
    }
    function C() {
        return Error("Division by Zero");
    }
    function q(a, b) {
        var d = g, c = h;
        let f = h;
        if (void 0 !== a && null !== a) {
            if (void 0 !== b) {
                if ("bigint" === typeof a) d = a;
                else {
                    if (isNaN(a)) throw x();
                    if (0 !== a % 1) throw D();
                    d = BigInt(a);
                }
                if ("bigint" === typeof b) c = b;
                else {
                    if (isNaN(b)) throw x();
                    if (0 !== b % 1) throw D();
                    c = BigInt(b);
                }
                f = d * c;
            } else if ("object" === typeof a) {
                if ("d" in a && "n" in a) d = BigInt(a.n), c = BigInt(a.d), "s" in a && (d *= BigInt(a.s));
                else if (0 in a) d = BigInt(a[0]), 1 in a && (c = BigInt(a[1]));
                else if ("bigint" === typeof a) d = a;
                else throw x();
                f = d * c;
            } else if ("number" === typeof a) {
                if (isNaN(a)) throw x();
                0 > a && (f = -h, a = -a);
                if (0 === a % 1) d = BigInt(a);
                else {
                    b = 1;
                    var k = 0, l = 1, m = 1;
                    let r = 1;
                    1 <= a && (b = 10 ** Math.floor(1 + Math.log10(a)), a /= b);
                    for(; 1E7 >= l && 1E7 >= r;)if (c = (k + m) / (l + r), a === c) {
                        1E7 >= l + r ? (d = k + m, c = l + r) : r > l ? (d = m, c = r) : (d = k, c = l);
                        break;
                    } else a > c ? (k += m, l += r) : (m += k, r += l), 1E7 < l ? (d = m, c = r) : (d = k, c = l);
                    d = BigInt(d) * BigInt(b);
                    c = BigInt(c);
                }
            } else if ("string" === typeof a) {
                c = 0;
                k = b = d = g;
                l = m = h;
                a = a.replace(/_/g, "").match(/\d+|./g);
                if (null === a) throw x();
                "-" === a[c] ? (f = -h, c++) : "+" === a[c] && c++;
                if (a.length === c + 1) b = w(a[c++], f);
                else if ("." === a[c + 1] || "." === a[c]) {
                    "." !== a[c] && (d = w(a[c++], f));
                    c++;
                    if (c + 1 === a.length || "(" === a[c + 1] && ")" === a[c + 3] || "'" === a[c + 1] && "'" === a[c + 3]) b = w(a[c], f), m = t ** BigInt(a[c].length), c++;
                    if ("(" === a[c] && ")" === a[c + 2] || "'" === a[c] && "'" === a[c + 2]) k = w(a[c + 1], f), l = t ** BigInt(a[c + 1].length) - h, c += 3;
                } else "/" === a[c + 1] || ":" === a[c + 1] ? (b = w(a[c], f), m = w(a[c + 2], h), c += 3) : "/" === a[c + 3] && " " === a[c + 1] && (d = w(a[c], f), b = w(a[c + 2], f), m = w(a[c + 4], h), c += 5);
                if (a.length <= c) c = m * l, f = d = k + c * d + l * b;
                else throw x();
            } else if ("bigint" === typeof a) f = d = a, c = h;
            else throw x();
        }
        if (c === g) throw C();
        e.s = f < g ? -h : h;
        e.n = d < g ? -d : d;
        e.d = c < g ? -c : c;
    }
    function w(a, b) {
        try {
            a = BigInt(a);
        } catch (d) {
            throw x();
        }
        return a * b;
    }
    function u(a) {
        return "bigint" === typeof a ? a : Math.floor(a);
    }
    function n(a, b) {
        if (b === g) throw C();
        const d = Object.create(v.prototype);
        d.s = a < g ? -h : h;
        a = a < g ? -a : a;
        const c = y(a, b);
        d.n = a / c;
        d.d = b / c;
        return d;
    }
    function A(a) {
        const b = Object.create(null);
        if (a <= h) return b[a] = h, b;
        for(; a % p === g;)b[p] = (b[p] || g) + h, a /= p;
        for(; a % B === g;)b[B] = (b[B] || g) + h, a /= B;
        for(; a % z === g;)b[z] = (b[z] || g) + h, a /= z;
        for(let d = 0, c = p + z; c * c <= a;){
            for(; a % c === g;)b[c] = (b[c] || g) + h, a /= c;
            c += G[d];
            d = d + 1 & 7;
        }
        a > h && (b[a] = (b[a] || g) + h);
        return b;
    }
    function y(a, b) {
        if (!a) return b;
        if (!b) return a;
        for(;;){
            a %= b;
            if (!a) return b;
            b %= a;
            if (!b) return a;
        }
    }
    function v(a, b) {
        q(a, b);
        if (this instanceof v) a = y(e.d, e.n), this.s = e.s, this.n = e.n / a, this.d = e.d / a;
        else return n(e.s * e.n, e.d);
    }
    "undefined" === typeof BigInt && (BigInt = function(a) {
        if (isNaN(a)) throw Error("");
        return a;
    });
    const g = BigInt(0), h = BigInt(1), p = BigInt(2), B = BigInt(3), z = BigInt(5), t = BigInt(10), e = {
        s: h,
        n: g,
        d: h
    }, G = [
        p * p,
        p,
        p * p,
        p,
        p * p,
        p * B,
        p,
        p * B
    ];
    v.prototype = {
        s: h,
        n: g,
        d: h,
        abs: function() {
            return n(this.n, this.d);
        },
        neg: function() {
            return n(-this.s * this.n, this.d);
        },
        add: function(a, b) {
            q(a, b);
            return n(this.s * this.n * e.d + e.s * this.d * e.n, this.d * e.d);
        },
        sub: function(a, b) {
            q(a, b);
            return n(this.s * this.n * e.d - e.s * this.d * e.n, this.d * e.d);
        },
        mul: function(a, b) {
            q(a, b);
            return n(this.s * e.s * this.n * e.n, this.d * e.d);
        },
        div: function(a, b) {
            q(a, b);
            return n(this.s * e.s * this.n * e.d, this.d * e.n);
        },
        clone: function() {
            return n(this.s * this.n, this.d);
        },
        mod: function(a, b) {
            if (void 0 === a) return n(this.s * this.n % this.d, h);
            q(a, b);
            if (g === e.n * this.d) throw C();
            return n(this.s * e.d * this.n % (e.n * this.d), e.d * this.d);
        },
        gcd: function(a, b) {
            q(a, b);
            return n(y(e.n, this.n) * y(e.d, this.d), e.d * this.d);
        },
        lcm: function(a, b) {
            q(a, b);
            return e.n === g && this.n === g ? n(g, h) : n(e.n * this.n, y(e.n, this.n) * y(e.d, this.d));
        },
        inverse: function() {
            return n(this.s * this.d, this.n);
        },
        pow: function(a, b) {
            q(a, b);
            if (e.d === h) return e.s < g ? n((this.s * this.d) ** e.n, this.n ** e.n) : n((this.s * this.n) ** e.n, this.d ** e.n);
            if (this.s < g) return null;
            a = A(this.n);
            b = A(this.d);
            let d = h, c = h;
            for(let f in a)if ("1" !== f) {
                if ("0" === f) {
                    d = g;
                    break;
                }
                a[f] *= e.n;
                if (a[f] % e.d === g) a[f] /= e.d;
                else return null;
                d *= BigInt(f) ** a[f];
            }
            for(let f in b)if ("1" !== f) {
                b[f] *= e.n;
                if (b[f] % e.d === g) b[f] /= e.d;
                else return null;
                c *= BigInt(f) ** b[f];
            }
            return e.s < g ? n(c, d) : n(d, c);
        },
        log: function(a, b) {
            q(a, b);
            if (this.s <= g || e.s <= g) return null;
            var d = Object.create(null);
            a = A(e.n);
            const c = A(e.d);
            b = A(this.n);
            const f = A(this.d);
            for(var k in c)a[k] = (a[k] || g) - c[k];
            for(var l in f)b[l] = (b[l] || g) - f[l];
            for(var m in a)"1" !== m && (d[m] = !0);
            for(var r in b)"1" !== r && (d[r] = !0);
            l = k = null;
            for(const E in d)if (m = a[E] || g, d = b[E] || g, m === g) {
                if (d !== g) return null;
            } else if (r = y(d, m), d /= r, m /= r, null === k && null === l) k = d, l = m;
            else if (d * l !== k * m) return null;
            return null !== k && null !== l ? n(k, l) : null;
        },
        equals: function(a, b) {
            q(a, b);
            return this.s * this.n * e.d === e.s * e.n * this.d;
        },
        lt: function(a, b) {
            q(a, b);
            return this.s * this.n * e.d < e.s * e.n * this.d;
        },
        lte: function(a, b) {
            q(a, b);
            return this.s * this.n * e.d <= e.s * e.n * this.d;
        },
        gt: function(a, b) {
            q(a, b);
            return this.s * this.n * e.d > e.s * e.n * this.d;
        },
        gte: function(a, b) {
            q(a, b);
            return this.s * this.n * e.d >= e.s * e.n * this.d;
        },
        compare: function(a, b) {
            q(a, b);
            a = this.s * this.n * e.d - e.s * e.n * this.d;
            return (g < a) - (a < g);
        },
        ceil: function(a) {
            a = t ** BigInt(a || 0);
            return n(u(this.s * a * this.n / this.d) + (a * this.n % this.d > g && this.s >= g ? h : g), a);
        },
        floor: function(a) {
            a = t ** BigInt(a || 0);
            return n(u(this.s * a * this.n / this.d) - (a * this.n % this.d > g && this.s < g ? h : g), a);
        },
        round: function(a) {
            a = t ** BigInt(a || 0);
            return n(u(this.s * a * this.n / this.d) + this.s * ((this.s >= g ? h : g) + a * this.n % this.d * p > this.d ? h : g), a);
        },
        roundTo: function(a, b) {
            q(a, b);
            var d = this.n * e.d;
            a = this.d * e.n;
            b = d % a;
            d = u(d / a);
            b + b >= a && d++;
            return n(this.s * d * e.n, e.d);
        },
        divisible: function(a, b) {
            q(a, b);
            return e.n === g ? !1 : this.n * e.d % (e.n * this.d) === g;
        },
        valueOf: function() {
            return Number(this.s * this.n) / Number(this.d);
        },
        toString: function(a = 15) {
            let b = this.n, d = this.d;
            var c;
            a: {
                for(c = d; c % p === g; c /= p);
                for(; c % z === g; c /= z);
                if (c === h) c = g;
                else {
                    for(var f = t % c, k = 1; f !== h; k++)if (f = f * t % c, 2E3 < k) {
                        c = g;
                        break a;
                    }
                    c = BigInt(k);
                }
            }
            a: {
                f = h;
                k = t;
                var l = c;
                let m = h;
                for(; l > g; k = k * k % d, l >>= h)l & h && (m = m * k % d);
                k = m;
                for(l = 0; 300 > l; l++){
                    if (f === k) {
                        f = BigInt(l);
                        break a;
                    }
                    f = f * t % d;
                    k = k * t % d;
                }
                f = 0;
            }
            k = f;
            f = this.s < g ? "-" : "";
            f += u(b / d);
            (b = b % d * t) && (f += ".");
            if (c) {
                for(a = k; a--;)f += u(b / d), b %= d, b *= t;
                f += "(";
                for(a = c; a--;)f += u(b / d), b %= d, b *= t;
                f += ")";
            } else for(; b && a--;)f += u(b / d), b %= d, b *= t;
            return f;
        },
        toFraction: function(a = !1) {
            let b = this.n, d = this.d, c = this.s < g ? "-" : "";
            if (d === h) c += b;
            else {
                const f = u(b / d);
                a && f > g && (c += f, c += " ", b %= d);
                c = c + b + "/" + d;
            }
            return c;
        },
        toLatex: function(a = !1) {
            let b = this.n, d = this.d, c = this.s < g ? "-" : "";
            if (d === h) c += b;
            else {
                const f = u(b / d);
                a && f > g && (c += f, b %= d);
                c = c + "\\frac{" + b + "}{" + d;
                c += "}";
            }
            return c;
        },
        toContinued: function() {
            let a = this.n, b = this.d;
            const d = [];
            for(; b;){
                d.push(u(a / b));
                const c = a % b;
                a = b;
                b = c;
            }
            return d;
        },
        simplify: function(a = .001) {
            a = BigInt(Math.ceil(1 / a));
            const b = this.abs(), d = b.toContinued();
            for(let f = 1; f < d.length; f++){
                let k = n(d[f - 1], h);
                for(var c = f - 2; 0 <= c; c--)k = k.inverse().add(d[c]);
                c = k.sub(b);
                if (c.n * a < c.d) return k.mul(this.s);
            }
            return this;
        }
    };
    "function" === typeof define && define.amd ? define([], function() {
        return v;
    }) : (Object.defineProperty(v, "__esModule", {
        value: !0
    }), v["default"] = v, v.Fraction = v, module.exports = v);
})(this);

},{}],"2iOri":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _iconsSvg = require("url:../../img/icons.svg");
var _iconsSvgDefault = parcelHelpers.interopDefault(_iconsSvg);
class ResultView {
    #parentElement = document.querySelector(".search-results");
    #data;
    render(data) {
        this.#data = data;
        this.#parentElement.innerHTML = "";
        console.log(data);
        const markup = data.map((result)=>`<li class="preview">
                <a class="preview__link preview__link--active" href="#${result.id}">
                <figure class="preview__fig">
                    <img src="${result.image}" alt="Test" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${result.title}</h4>
                    <p class="preview__publisher">${result.publisher}</p>
                    <div class="preview__user-generated ${result.key ? '' : 'hidden'}">
                        <svg>
                            <use href="${0, _iconsSvgDefault.default}#icon-user"></use>
                        </svg>
                    </div>
                </div>
                </a>
            </li>`).join("");
        this.#parentElement.insertAdjacentHTML("afterbegin", markup);
    }
}
exports.default = new ResultView();

},{"url:../../img/icons.svg":"fd0vu","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jJV54":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _iconsSvg = require("url:../../img/icons.svg");
var _iconsSvgDefault = parcelHelpers.interopDefault(_iconsSvg);
class BookMarkView {
    #parentElement = document.querySelector('.bookmarks');
    #data;
    render(data) {
        this.#data = data || [];
        const markup = this.#generateMarkUp();
        this.#clear();
        this.#parentElement.insertAdjacentHTML("afterbegin", markup);
    }
    #clear() {
        this.#parentElement.innerHTML = '';
    }
    noBookmarks() {
        this.#clear();
        this.#parentElement.innerHTML = `<div class="message">
                <div>
                    <svg>
                        <use href="${0, _iconsSvgDefault.default}#icon-smile"></use>
                      </svg>
                </div>
                <p>
                    No bookmarks yet. Find a nice recipe and bookmark it :)
                </p>
            </div>`;
    }
    #generateMarkUp() {
        return this.#data.reverse().map((bookmark)=>`
            <li class="preview">
                <a class="preview__link" href="#${bookmark.id}">
                <figure class="preview__fig">
                    <img src="${bookmark.image}" alt="${bookmark.title}" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__name">${bookmark.title}</h4>
                    <p class="preview__publisher">${bookmark.publisher}</p>
                </div>
                </a>
            </li>
            `).join('');
    }
    addHandlerBookmark(handler) {
        document.querySelector(".container").addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--round');
            if (!btn) return;
            handler();
        });
    }
}
exports.default = new BookMarkView();

},{"url:../../img/icons.svg":"fd0vu","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"7NIiB":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _iconsSvg = require("url:../../img/icons.svg");
var _iconsSvgDefault = parcelHelpers.interopDefault(_iconsSvg);
class PaginationView {
    #parentElement = document.querySelector(".search-results");
    #data;
    render(data) {
        this.#data = data;
        const markup = this.#generateMarkUp();
        //this.#clear();
        this.#parentElement.insertAdjacentHTML("beforeend", markup);
    }
    addhandlerClick(handler) {
        this.#parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--inline');
            if (!btn) return;
            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        });
    }
    #generateMarkUp() {
        const numPages = Math.ceil(this.#data.results.length / this.#data.resultsPerPage);
        const currentPage = this.#data.page;
        if (currentPage === 1 && numPages > 1) return this.#generateButtonNext(currentPage);
        if (currentPage === numPages && numPages > 1) return this.#generateButtonPrev(currentPage);
        if (currentPage < numPages) return this.#generateButtonPrev(currentPage) + this.#generateButtonNext(currentPage);
        return "";
    }
    #clear() {
        this.#parentElement.innerHTML = '';
    }
    #generateButtonPrev(currentPage) {
        return `<button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
                        <svg class="search__icon">
                            <use href="${0, _iconsSvgDefault.default}#icon-arrow-left"></use>
                        </svg>
                        <span>Page ${currentPage - 1}</span>
                    </button>`;
    }
    #generateButtonNext(currentPage) {
        return `<button data-goto="${currentPage + 1}"class="btn--inline pagination__btn--next">
                        <span>Page ${currentPage + 1}</span>
                        <svg class="search__icon">
                            <use href="${0, _iconsSvgDefault.default}#icon-arrow-right"></use>
                        </svg>
                    </button>`;
    }
}
exports.default = new PaginationView();

},{"url:../../img/icons.svg":"fd0vu","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"8AWnP":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _iconsSvg = require("url:../../img/icons.svg");
var _iconsSvgDefault = parcelHelpers.interopDefault(_iconsSvg);
class AddRecipeView {
    #parentElement = document.querySelector('.upload');
    #window = document.querySelector(".add-recipe-window");
    #overlay = document.querySelector(".overlay");
    #btnOpen = document.querySelector(".nav__btn--add-recipe");
    #btnClose = document.querySelector(".btn--close-modal");
    constructor(){
        this.addHandlerShowWindow();
        this.addHandlerCloseWindow();
    }
    toggleWindow() {
        this.#overlay.classList.toggle("hidden");
        this.#window.classList.toggle("hidden");
    }
    addHandlerShowWindow() {
        this.#btnOpen.addEventListener("click", this.toggleWindow.bind(this));
    }
    addHandlerCloseWindow() {
        this.#btnClose.addEventListener("click", this.toggleWindow.bind(this));
        this.#overlay.addEventListener("click", this.toggleWindow.bind(this));
    }
    addHandlerUpload(handler) {
        this.#parentElement.addEventListener("submit", function(event) {
            event.preventDefault();
            const dataArr = [
                ...new FormData(this)
            ];
            handler(dataArr);
        });
    }
    #clear() {
        this.#parentElement.innerHTML = '';
    }
    renderError(mensaje) {
        const markUp = `<div class="error">
                        <div>
                        <svg>
                            <use href="${(0, _iconsSvgDefault.default)}#icon-alert-triangle"></use>
                        </svg>
                        </div>
                        <p>${mensaje}</p>
                    </div>`;
        this.#clear();
        this.#parentElement.insertAdjacentHTML("afterbegin", markUp);
    }
    renderMessage(mensaje) {
        const markUp = `<div class="message">
                <div>
                    <svg>
                    <use href="${(0, _iconsSvgDefault.default)}#icon-smile"></use>
                    </svg>
                </div>
                <p>${mensaje}</p>
            </div>`;
        this.#clear();
        this.#parentElement.insertAdjacentHTML("afterbegin", markUp);
    }
    renderSpinner() {
        const mark = `<div class="spinner">
                <svg>
                    <use href="${(0, _iconsSvgDefault.default)}#icon-loader"></use>
                </svg>
            </div>`;
        this.#parentElement.innerHTML = "";
        this.#parentElement.insertAdjacentHTML("afterbegin", mark);
    }
}
exports.default = new AddRecipeView();

},{"url:../../img/icons.svg":"fd0vu","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}]},["5DuvQ","7dWZ8"], "7dWZ8", "parcelRequire3a11", {}, "./", "/")

//# sourceMappingURL=forkify.4a59a05f.js.map
