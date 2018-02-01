var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameVo = (function () {
    function GameVo() {
    }
    /**
     *  创建一个从服务器获取的GameVo
    **/
    GameVo.createVo = function (obj) {
        var vo = new GameVo();
        // vo.StatusCode = parseInt(obj['StatusCode']);
        // vo.retMessage = obj['retMessage'];
        // vo.retData = obj['retData'];
        vo.appName = obj['appName'];
        vo.bgMusic = obj['bgMusic'];
        vo.bgImage = obj['bgImage'];
        vo.normalShotScore = parseInt(obj['normalShotScore']);
        vo.specilShotScore = parseInt(obj['specilShotScore']);
        vo.pointSpeed = parseInt(obj['pointSpeed']);
        vo.adSlogan = obj['adSlogan'];
        vo.appExplain = obj['appExplain'];
        vo.gameIntro = obj['gameIntro'];
        vo.startTime = obj['startTime'];
        vo.endTime = obj['endTime'];
        vo.thumb = obj['thumb'];
        vo.beginMessage = obj['beginMessage'];
        vo.endMessage = obj['endMessage'];
        vo.initDataArr = obj['blockContent'];
        vo.awardExplain = obj['awardExplain'] || "\u5468\u699C\u7279\u7B49\u5956\uFF1A1\u540D\uFF0C\u6F5C\u6C5F\u5927\u867E8\u53EA\uFF0C\u5956\u54C1\u7531\u6F5C\u6C5F\u98DF\u54C1\u516C\u53F8\u63D0\u4F9B\u3002\n\u5468\u699C\u4E00\u7B49\u5956\uFF1A2\u540D\uFF0C\u6F5C\u6C5F\u5927\u867E6\u53EA\uFF0C\u5956\u54C1\u7531\u6F5C\u6C5F\u98DF\u54C1\u516C\u53F8\u63D0\u4F9B\u3002\n\u5468\u699C\u4E8C\u7B49\u5956\uFF1A2\u540D\uFF0C\u6F5C\u6C5F\u5927\u867E4\u53EA\uFF0C\u5956\u54C1\u7531\u6F5C\u6C5F\u98DF\u54C1\u516C\u53F8\u63D0\u4F9B\u3002\n\u5468\u699C\u4E09\u7B49\u5956\uFF1A2\u540D\uFF0C\u6F5C\u6C5F\u5927\u867E2\u53EA\uFF0C\u5956\u54C1\u7531\u6F5C\u6C5F\u98DF\u54C1\u516C\u53F8\u63D0\u4F9B\u3002\n\n\u901A\u5168\u5173\u7528\u6237\u5C06\u6709\u673A\u4F1A\u83B7\u5F97\u6700\u9AD8\u4E00\u5343\u5143\u73B0\u91D1\u7EA2\u5305\u5956\u52B1\u3002\n\u5468\u699C\u5956\u52B1\u4F1A\u5728\u6BCF\u5468\u65E5\u768420:00\u8FDB\u884C\u7EDF\u8BA1\uFF0C\u83B7\u5956\u7528\u6237\u53EF\u51ED\u501F\u5E10\u53F7\u6392\u540D\uFF0C\u524D\u5F80\u6D4F\u9633\u5E7F\u64AD\u7535\u89C6\u53F0\u8FDB\u884C\u5151\u6362\u3002\n\u672C\u6D3B\u52A8\u6392\u540D\u4EE5\u201C\u638C\u4E0A\u6F5C\u6C5F\u201D\u5BA2\u6237\u7AEF\u6392\u4F4D\u4E3A\u51C6\u3002\n\u672C\u6B21\u6D3B\u52A8\u6700\u7EC8\u89E3\u91CA\u6743\u5F52\u6F5C\u6C5F\u5E7F\u64AD\u7535\u89C6\u53F0\u6240\u6709\uFF01";
        vo.downloadUrl = obj["downloadUrl"];
        return vo;
    };
    return GameVo;
}());
__reflect(GameVo.prototype, "GameVo");
