"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpectronMenuAddon = void 0;
var tslib_1 = require("tslib");
var path = require("path");
var spectron_1 = require("spectron");
var SpectronMenuAddon = (function () {
    function SpectronMenuAddon() {
    }
    SpectronMenuAddon.prototype.createApplication = function (options) {
        if (!options.args) {
            options.args = [];
        }
        options.args.unshift(path.join(__dirname, 'preload.js'));
        options.args.unshift('--require');
        this.app = new spectron_1.Application(options);
        return this.app;
    };
    SpectronMenuAddon.prototype.clickMenu = function () {
        var labels = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            labels[_i] = arguments[_i];
        }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.app.electron.ipcRenderer.sendSync('SPECTRON_MENU_ADDON/CLICK_MENU_ITEM', labels)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    SpectronMenuAddon.prototype.getMenuItem = function () {
        var labels = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            labels[_i] = arguments[_i];
        }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.app.electron.ipcRenderer.sendSync('SPECTRON_MENU_ADDON/GET_MENU_ITEM', labels)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return SpectronMenuAddon;
}());
exports.SpectronMenuAddon = SpectronMenuAddon;
var spectronMenuAddon = new SpectronMenuAddon();
exports.default = spectronMenuAddon;
//# sourceMappingURL=index.js.map