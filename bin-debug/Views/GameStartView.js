var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameStartView = (function (_super) {
    __extends(GameStartView, _super);
    function GameStartView() {
        var _this = _super.call(this) || this;
        _this.fullScreen = true;
        _this.skinName = "resource/skins/GameStartSkin.exml";
        return _this;
    }
    GameStartView.prototype.show = function () {
        _super.prototype.show.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this);
    };
    GameStartView.prototype.onRestart = function (event) {
        GlobalData.score = 0;
        ModuleManager.getInstance().destroyForInstance(this);
        ModuleManager.getInstance().openModule("GameLogic");
    };
    return GameStartView;
}(BaseView));
__reflect(GameStartView.prototype, "GameStartView");
