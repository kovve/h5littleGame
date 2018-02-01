var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GridItem = (function () {
    function GridItem(num, text, rect) {
        this._num = num;
        this._rect = rect;
        this._text = text;
    }
    Object.defineProperty(GridItem.prototype, "num", {
        get: function () {
            return this._num;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridItem.prototype, "text", {
        get: function () {
            return this._text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridItem.prototype, "rect", {
        get: function () {
            return this._rect;
        },
        enumerable: true,
        configurable: true
    });
    GridItem.prototype.moveTo = function (deltaX, deltaY, time, animateState) {
        animateState.increase();
        var tw = egret.Tween.get(this.rect);
        tw
            .to({
            x: this.rect.x + deltaX,
            y: this.rect.y + deltaY
        }, time)
            .call(function () {
            animateState.descrease();
        });
    };
    GridItem.prototype.change = function (delay, numInfo, num, animateState) {
        animateState.increase();
        this._num = num;
        var that = this;
        var tw = egret.Tween.get(this.rect);
        tw
            .wait(delay)
            .call(function () {
            var label = that.rect["label"];
            label.text = "" + numInfo.num;
            label.size = numInfo.fontSize;
            label.textColor = numInfo.color;
            that.rect.fillColor = numInfo.backgroundColor;
            animateState.descrease();
        });
    };
    GridItem.prototype.moveToAndFadeOut = function (deltaX, deltaY, time, animateState) {
        animateState.increase();
        var that = this;
        var tw = egret.Tween.get(this.rect);
        tw
            .to({
            x: this.rect.x + deltaX,
            y: this.rect.y + deltaY
        }, time)
            .to({
            alpha: 0
        }, 250)
            .call(function () {
            animateState.descrease();
        });
    };
    return GridItem;
}());
__reflect(GridItem.prototype, "GridItem");
