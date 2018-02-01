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
var GameRewardsView = (function (_super) {
    __extends(GameRewardsView, _super);
    function GameRewardsView() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/RewardsSkin.exml";
        return _this;
    }
    GameRewardsView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.verticalCenter = this.horizontalCenter = 0;
        this.desc.text = StringUtil.formatStr("" + DataManager.getInstance().gameVO.awardExplain);
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        // this.linkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLink, this);
    };
    GameRewardsView.prototype.onClose = function (event) {
        _super.prototype.hide.call(this);
    };
    return GameRewardsView;
}(BaseView));
__reflect(GameRewardsView.prototype, "GameRewardsView");
