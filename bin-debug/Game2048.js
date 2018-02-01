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
var Game2048 = (function (_super) {
    __extends(Game2048, _super);
    function Game2048() {
        var _this = _super.call(this) || this;
        _this.gamePanelRadius = 16;
        _this.gridSpacing = 20 * Layout.getInstance().scale;
        _this.gridRadius = 12 * Layout.getInstance().scale;
        _this.grids = new Array(16);
        _this.isGameOver = false;
        _this.animateState = {
            running: 0,
            increase: function () {
                this.running += 1;
            },
            descrease: function () {
                this.running -= 1;
                if (this.running <= 0) {
                    this.running = 0;
                    //动画结束，添加新的grid，然后检测游戏是否结束
                    Game2048.instance.addNewGrids(1);
                    Game2048.instance.checkGameOver();
                }
            }
        };
        _this.blockContent = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192];
        _this.nums = DataManager.getInstance().gameVO.initDataArr;
        Game2048.instance = _this;
        _this.fullScreen = true;
        _this.addBlackBg = false;
        _this.skinName = "resource/ui/GameUI.exml";
        _this.once(egret.Event.ADDED_TO_STAGE, _this.createGameScene, _this);
        return _this;
    }
    Game2048.prototype.createGameScene = function () {
        this.titleLabel.text = DataManager.getInstance().gameVO.appName || "2048小游戏";
        this.titleLabel.text = "2048";
        this.data["curScore"] = 0;
        this.data["curScore"] = 0;
        this.data["bestScore"] = localStorage.getItem("Game2048.data.bestScore");
        this.infoBtn.touchEnabled = true;
        this.infoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onInfoBtn, this);
        this.rewadBtn.touchEnabled = true;
        this.rewadBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRewardBtn, this);
        this.rankBtn.touchEnabled = true;
        this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRankBtn, this);
        this.newGame.touchEnabled = true;
        this.newGame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this);
        this.newGameInGameOver.touchEnabled = true;
        this.newGameInGameOver.addEventListener(egret.TouchEvent.TOUCH_TAP, this.newGameStart, this);
        this.gameBoxSize = this.stage.stageWidth - 40 * Layout.getInstance().scale;
        this.gridSize = parseInt("" + (this.gameBoxSize - this.gridSpacing * 5) / 4);
        this.gamePanel.width = this.gameBoxSize;
        this.gamePanel.height = this.gameBoxSize;
        var gamePanelBg = this.createRadiusSquare(0, 0, this.gameBoxSize, this.gamePanelRadius, 0xbbada0, 1);
        this.gamePanel.addChild(gamePanelBg);
        for (var i = 0; i < 16; i++) {
            var row = parseInt("" + i % 4);
            var col = parseInt("" + i / 4);
            this.gamePanel.addChild(this.createRadiusSquare(this.gridSpacing + (this.gridSpacing + this.gridSize) * row, this.gridSpacing + (this.gridSpacing + this.gridSize) * col, this.gridSize, this.gridRadius, 0xeee4da, 0.35));
        }
        //为 this.gamePanel 添加touch, key 事件
        this.gamePanel.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGamePanelTouchBegin, this);
        document.addEventListener("keyup", Game2048.onKeyup);
        //运行2048 从左侧滑出的动画
        this.slidIn2048.play();
        this.newGameStart();
        if (!GlobalData.isInAPP) {
            ModuleManager.getInstance().openModule("GameInfoVGameNoInAppViewiew");
            return;
        }
        if (!GlobalData.isFirstLog) {
            GlobalData.isFirstLog = true;
            ModuleManager.getInstance().openModule("GameInfoView");
        }
    };
    Game2048.prototype.onGamePanelTouchBegin = function (event) {
        var target = event.currentTarget;
        target.touchX = event.stageX;
        target.touchY = event.stageY;
        this.gamePanel.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onGamePanelTouchMove, this);
    };
    Game2048.prototype.onGamePanelTouchMove = function (event) {
        var target = event.currentTarget;
        var deltaX = event.stageX - target.touchX;
        var deltaY = event.stageY - target.touchY;
        if (Math.abs(deltaX - deltaY) <= 40) {
            //方向区分不太明确，忽略操作
            return;
        }
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX < 0) {
                this.leftMerge();
            }
            else {
                this.rightMerge();
            }
        }
        else {
            if (deltaY < 0) {
                this.upMerge();
            }
            else {
                this.downMerge();
            }
        }
        this.gamePanel.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onGamePanelTouchMove, this);
    };
    Game2048.onKeyup = function (event) {
        if (ModuleManager.getInstance().isContain("GameInfoView")) {
            return;
        }
        var key = event.code;
        switch (key) {
            case "ArrowLeft":
                Game2048.instance.leftMerge();
                break;
            case "ArrowRight":
                Game2048.instance.rightMerge();
                break;
            case "ArrowUp":
                Game2048.instance.upMerge();
                break;
            case "ArrowDown":
                Game2048.instance.downMerge();
                break;
        }
    };
    Game2048.prototype.createRadiusSquare = function (x, y, size, radius, color, alpha) {
        var rect = new eui.Rect(size, size, color);
        rect.x = x;
        rect.y = y;
        rect.alpha = alpha;
        rect.ellipseWidth = radius;
        rect.ellipseHeight = radius;
        return rect;
    };
    Game2048.prototype.createNumGrid = function (index, posX, posY) {
        var numInfo = this.nums[index];
        var rect = new eui.Rect(this.gridSize, this.gridSize, numInfo.backgroundColor);
        rect.x = this.gridSpacing + (this.gridSpacing + this.gridSize) * posX;
        rect.y = this.gridSpacing + (this.gridSpacing + this.gridSize) * posY;
        rect.ellipseWidth = this.gridRadius;
        rect.ellipseHeight = this.gridRadius;
        var label = new eui.Label();
        label.text = "" + numInfo.num;
        label.size = numInfo.fontSize;
        label.bold = true;
        label.textColor = numInfo.color;
        label.width = this.gridSize;
        label.height = this.gridSize;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;
        rect.addChild(label);
        rect["label"] = label;
        return rect;
    };
    Game2048.prototype.onInfoBtn = function () {
        ModuleManager.getInstance().openModule("GameInfoView");
    };
    Game2048.prototype.onRewardBtn = function () {
        ModuleManager.getInstance().openModule("GameRewardsView");
    };
    Game2048.prototype.onRankBtn = function () {
        ModuleManager.getInstance().openModule("RankListView");
    };
    Game2048.prototype.onRestart = function () {
        if (true) {
            this.showGameOver();
        }
        if (false) {
            this.newGameStart();
        }
    };
    Game2048.prototype.newGameStart = function () {
        var that = this;
        this.hideGameOver(function () {
            that.isGameOver = false;
            that.data["curScore"] = 0;
            that.resetGrids();
        });
    };
    Game2048.prototype.leftMerge = function () {
        this.merge(0, 4, 1);
    };
    Game2048.prototype.rightMerge = function () {
        this.merge(3, 4, -1);
    };
    Game2048.prototype.upMerge = function () {
        this.merge(0, 1, 4);
    };
    Game2048.prototype.downMerge = function () {
        this.merge(12, 1, -4);
    };
    Game2048.prototype.merge = function (from, fromDelta, nextDelta) {
        if (this.animateState.running > 0 || this.isGameOver) {
            return;
        }
        for (var i = 0; i < 4; i++) {
            var posIndex = from;
            var fromEnd = from + nextDelta * 3;
            var min = Math.min(from, fromEnd);
            var max = Math.max(from, fromEnd);
            while (posIndex >= min && posIndex <= max) {
                var curGrid = this.grids[posIndex];
                if (curGrid) {
                    curGrid["isMerged"] = false;
                    var reachable = this.findReachablePosIndex(posIndex, nextDelta, min, max);
                    if (reachable != -1) {
                        var deltaX = (parseInt("" + reachable % 4) - parseInt("" + posIndex % 4)) * (this.gridSpacing + this.gridSize);
                        var deltaY = (parseInt("" + reachable / 4) - parseInt("" + posIndex / 4)) * (this.gridSpacing + this.gridSize);
                        var time = (Math.abs(deltaX) + Math.abs(deltaY)) / (this.gridSpacing + this.gridSize) * 80;
                        var lastGrid = this.grids[reachable];
                        if (lastGrid) {
                            if (lastGrid["isMerged"] == false) {
                                if (this.gamePanel.getChildIndex(curGrid.rect) < this.gamePanel.getChildIndex(lastGrid.rect)) {
                                    this.gamePanel.swapChildren(curGrid.rect, lastGrid.rect);
                                }
                                this.grids[posIndex] = null;
                                lastGrid.change(time + 50, this.nums[this.numIndex(lastGrid.num) + 1], this.blockContent[this.numIndex(lastGrid.num) + 1], this.animateState);
                                lastGrid["isMerged"] = true;
                                curGrid.moveToAndFadeOut(deltaX, deltaY, time, this.animateState);
                            }
                        }
                        else {
                            this.grids[reachable] = curGrid;
                            this.grids[posIndex] = null;
                            curGrid.moveTo(deltaX, deltaY, time, this.animateState);
                        }
                    }
                }
                posIndex += nextDelta;
            }
            from += fromDelta;
        }
    };
    Game2048.prototype.numIndex = function (num) {
        console.log("num:" + num);
        for (var i = 0, len = this.nums.length; i < len; i++) {
            if (this.blockContent[i] == num) {
                return i;
            }
        }
        return -1;
    };
    Game2048.prototype.findReachablePosIndex = function (cur, lastDelta, min, max) {
        var reachable = -1;
        var curGrid = this.grids[cur];
        var isCurGridMerged = curGrid["isMerged"];
        var last = cur - lastDelta;
        while (last >= min && last <= max) {
            var tempGrid = this.grids[last];
            if (tempGrid == null || (!isCurGridMerged && tempGrid.num == curGrid.num && !tempGrid["isMerged"])) {
                reachable = last;
            }
            else {
                break;
            }
            last = last - lastDelta;
        }
        return reachable;
    };
    Game2048.prototype.checkGameOver = function () {
        for (var i = 0; i < 16; i++) {
            var grid = this.grids[i];
            if (grid == null) {
                return;
            }
            else {
                if (i % 4 < 3) {
                    var rightGrid = this.grids[i + 1];
                    if (rightGrid == null || grid.num == rightGrid.num) {
                        return;
                    }
                }
                if (i / 4 < 3) {
                    var downGrid = this.grids[i + 4];
                    if (downGrid == null || grid.num == downGrid.num) {
                        return;
                    }
                }
            }
        }
        this.isGameOver = true;
        this.showGameOver();
    };
    Game2048.prototype.showGameOver = function () {
        // this.gameOver.parent.setChildIndex(this.gameOver, this.gameOver.parent.numChildren);
        // this.gameOver.alpha = 0;
        // this.gameOver.visible = true;
        // let fadeIn = egret.Tween.get(this.gameOver);
        // fadeIn.to({
        //     alpha: 1
        // }, 300);
        GlobalData.score = this.data["curScore"];
        console.log("GlobalData.score:" + GlobalData.score);
        ModuleManager.getInstance().openModule("GameEndView");
        this.newGameStart();
    };
    Game2048.prototype.hideGameOver = function (callback) {
        var that = this;
        if (this.gameOver.visible) {
            this.gameOver.alpha = 1;
            var fadeOut = egret.Tween.get(this.gameOver);
            fadeOut.to({
                alpha: 0
            }, 300).call(function () {
                that.gameOver.visible = false;
                callback();
            });
        }
        else {
            callback();
        }
    };
    Game2048.prototype.canMerge = function (from, fromDelta, nextDelta) {
        for (var i = 0; i < 4; i++) {
            var posIndex = from;
            var fromEnd = from + nextDelta * 3;
            var min = Math.min(from, fromEnd);
            var max = Math.max(from, fromEnd);
            while (posIndex >= min && posIndex <= max) {
                var curGrid = this.grids[posIndex];
                if (curGrid) {
                    var reachable = this.findReachablePosIndex(posIndex, nextDelta, min, max);
                    if (reachable != -1) {
                        return true;
                    }
                }
                posIndex += nextDelta;
            }
            from += fromDelta;
        }
        return false;
    };
    Game2048.prototype.resetGrids = function () {
        for (var i = 0, len = this.grids.length; i < len; i++) {
            var grid = this.grids[i];
            if (grid) {
                this.gamePanel.removeChild(grid.rect);
                this.grids[i] = null;
            }
        }
        this.addNewGrids(2);
        // this.testAddNewGrids();
    };
    Game2048.prototype.addNewGrids = function (size) {
        var avas = this.availableGridPos(size);
        for (var i = 0, len = avas.length; i < len; i++) {
            var posIndex = avas[i];
            var row = parseInt("" + posIndex % 4);
            var col = parseInt("" + posIndex / 4);
            var numIndex = Math.random() < 0.8 ? 0 : 1;
            var text = this.nums[numIndex].num;
            var num = this.blockContent[numIndex];
            this.grids[posIndex] = new GridItem(num, text, this.createNumGrid(numIndex, row, col));
            this.gamePanel.addChild(this.grids[posIndex].rect);
            this.increaseSocre(num);
        }
    };
    Game2048.prototype.increaseSocre = function (delta) {
        this.data["curScore"] += delta;
        if (!this.data["bestScore"] || this.data["bestScore"] < this.data["curScore"]) {
            this.data["bestScore"] = this.data["curScore"];
            localStorage.setItem("Game2048.data.bestScore", this.data["bestScore"]);
        }
    };
    /**
     * 仅测试游戏结束状态使用
     */
    // private testAddNewGrids() {
    //     for (var i = 0, len = 15; i < len; i++) {
    //         let row = parseInt("" + i % 4);
    // 		let col = parseInt("" + i / 4);
    //         let numIndex = i % this.nums.length;
    //         let text = this.nums[numIndex].num
    //         let num = this.blockContent[numIndex];
    //         this.grids[i] = new GridItem(num, text,this.createNumGrid(numIndex, row, col));
    //         this.gamePanel.addChild(this.grids[i].rect);
    //         this.increaseSocre(num);
    //     }
    // }
    Game2048.prototype.availableGridPos = function (size) {
        var temp = new Array();
        for (var i = 0, len = this.grids.length; i < len; i++) {
            if (!this.grids[i]) {
                temp.push(i);
            }
        }
        var lenTemp = temp.length;
        var result = new Array();
        for (var i = 0; lenTemp > 0 && i < size; i++) {
            var random = parseInt("" + Math.random() * temp.length);
            if (random == lenTemp - 1) {
                result.push(temp.pop());
            }
            else {
                var g = temp[random];
                temp[random] = temp[lenTemp - 1];
                temp.pop();
                result.push(g);
            }
            lenTemp -= 1;
        }
        return result;
    };
    return Game2048;
}(BaseView));
__reflect(Game2048.prototype, "Game2048");
