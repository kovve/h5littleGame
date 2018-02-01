class GameRewardsView extends BaseView {
    // private gameBtn:eui.Button;
    private okBtn:eui.Button;
	private desc:eui.Label;

	public constructor() {
        super();
        this.skinName = "resource/skins/RewardsSkin.exml";
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.verticalCenter = this.horizontalCenter = 0;

        this.desc.text = StringUtil.formatStr(""+DataManager.getInstance().gameVO.awardExplain);

        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
		// this.linkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLink, this);
    }

    private onClose (event: egret.TouchEvent):void
    {
        super.hide();

    }
}