/**
 *
 * @author 
 *
 */
class UIManager extends egret.EventDispatcher{
	public constructor() {
    	super();
	}
	
	private static instance:UIManager;
	public static getInstance():UIManager
	{
        if(this.instance == null)
        {
            this.instance = new UIManager();
        }
        return this.instance;
	}
	private ui:eui.Component;

    public static statViewIndex:number = 0;
    public static gameContentIndex:number = 1;
    public static endViewIndex:number = 2;
    public static rankViewIndex:number = 3;
    public static gameInfoIndex:number = 4;
    
	
	/**底图层*/
    private _mapLevel:egret.Sprite;

    private _gameLvel:eui.Group;

    private _appLevel:eui.Group;

    private _topLevel:eui.Group;

    private _loadLevel:eui.Group;

	
	/**正在进行UI打开关闭动画，不能操作*/
	private is_ui_tween:boolean;
	
	/**二级界面的缓动大类型（退出时需要用）*/
    private second_tween_type: number = 0;
    /**二级界面的缓动小类型（退出时需要用）*/
    private second_tween_sub_type: number = 0;

    public bg:egret.Bitmap;

    public startGame():void
	{
    	
	    this._mapLevel = new egret.Sprite();
        this._gameLvel = new eui.Group();
	    this._appLevel = new eui.Group();
        this._topLevel = new eui.Group();
	    this._loadLevel = new eui.Group();

        // this._mapLevel.width = GlobalData.GameStage_width;
        // this._mapLevel.height = GlobalData.GameStage_height;
        //
        // this._gameLvel.width = Layout.getInstance().stage.stageWidth;
        // this._gameLvel.height = Layout.getInstance().stage.stageHeight;
        //
        // this._gameLvel.layout = new eui.BasicLayout();

        this._appLevel.width = Layout.getInstance().stage.stageWidth;
        this._appLevel.height = Layout.getInstance().stage.stageHeight;
        this._appLevel.touchEnabled = false;

        this._appLevel.layout = new eui.BasicLayout();
        
        Layout.getInstance().stage.addChild(this._mapLevel);
        Layout.getInstance().stage.addChild(this._gameLvel);
        Layout.getInstance().stage.addChild(this._appLevel);
        Layout.getInstance().stage.addChild(this._topLevel);
        Layout.getInstance().stage.addChild(this._loadLevel);
	}
	public get appLevel():eui.Group
    {
        return this._appLevel;
    }
    public get mapLevel():egret.Sprite
    {
        return this._mapLevel;
    }

}
