class GameVo {
	public constructor() {
	}
	// 状态码(后台判断站点是否开启该应用，应用时间是否过期)
	public StatusCode:number;
	//返回消息（站点未开通该应用的情况下，状态码为0，消息为“暂未开通”）
    public retMessage:string;
	// 数据内容
	// public retData:string;
	//应用名称
	public appName:string;

	/**背景音乐*/
	public bgMusic:string;
	/**背景图片*/
	public bgImage:string;
	// 击中普通时钟得分
	public normalShotScore:number;
	// 击中特殊时钟得分
	public specilShotScore:number;
	//子弹移动速度
	public pointSpeed:number;
	//广告标语
	public adSlogan:string;
	//应用说明
	public appExplain:string;
	//游戏介绍说明
	public gameIntro:string;
	//奖励说明
	public awardExplain:string;

	//下载地址
	public downloadUrl:string;
	/**上线时间*/
	public startTime:string;
	/**结束时间 */
	public endTime:string ;
	
	/**缩略图（分享或列表页使用）*/
	public thumb:string;
	/**开始前提醒*/
	public beginMessage:string;
	/**结束后提醒*/
	public endMessage:string;



	//初始化数组
	public initDataArr:any[];

    public testStr:number

    /**
	 *  创建一个从服务器获取的GameVo
    **/
	public static createVo(obj:any):GameVo
	{
		var vo:GameVo = new GameVo();

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
		vo.initDataArr = obj['blockContent'] as any[];
		vo.awardExplain = obj['awardExplain'] || `周榜特等奖：1名，潜江大虾8只，奖品由潜江食品公司提供。
周榜一等奖：2名，潜江大虾6只，奖品由潜江食品公司提供。
周榜二等奖：2名，潜江大虾4只，奖品由潜江食品公司提供。
周榜三等奖：2名，潜江大虾2只，奖品由潜江食品公司提供。

通全关用户将有机会获得最高一千元现金红包奖励。
周榜奖励会在每周日的20:00进行统计，获奖用户可凭借帐号排名，前往浏阳广播电视台进行兑换。
本活动排名以“掌上潜江”客户端排位为准。
本次活动最终解释权归潜江广播电视台所有！`;
		vo.downloadUrl = obj["downloadUrl"];

		return vo;
	}
}