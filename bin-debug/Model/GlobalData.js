var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var GlobalData = (function () {
    function GlobalData() {
    }
    GlobalData.isFirstLog = false;
    // public static josnStr:string;
    GlobalData.version = 20180201;
    //游戏得分
    GlobalData.score = 0;
    /*是否在App中玩这个游戏*/
    GlobalData.isInAPP = false;
    /*用户ID*/
    GlobalData.userID = "599";
    /*appID*/
    GlobalData.appID = 1;
    //2048
    GlobalData.gameId = 2; //小游戏固定ID  每个小游戏拥有独有ID不可变
    GlobalData.postJosn = {
        "domain": "",
        "appId": 0,
        "sort": 0
    };
    return GlobalData;
}());
__reflect(GlobalData.prototype, "GlobalData");
