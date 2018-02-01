class GameStartView extends BaseView {
    public constructor() {
        super();
        this.fullScreen = true;
        this.skinName = "resource/skins/GameStartSkin.exml";
    }
    public show(): void
    {
        super.show();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this)
    }
    private onRestart (event: egret.TouchEvent):void
    {
        GlobalData.score = 0;
        ModuleManager.getInstance().destroyForInstance(this);
        ModuleManager.getInstance().openModule("GameLogic");
       
    }

}