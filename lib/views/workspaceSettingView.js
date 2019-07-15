'use babel'
const etch = require('etch');

module.exports = class WorkspaceSettingView {
    constructor(props) {
        this.props = props;
        if (props.hasOwnProperty('pathInputValue') && props.pathInputValue != null) {
            this.pathInputValue = props.pathInputValue;
        }
        else {
            this.pathInputValue = '';
        }
        this.pathInputTips = '';
        this.backBtnDisabled = false;
        this.nextBtnDisabled = false;
        this.finishBtnDisabled = true;
        etch.initialize(this);
    }

    render() {
        /** @jsx etch.dom */
        return (
            <div className='section-container' style='overflow: hidden'>
                <h1 className='section-heading block'>Select a directory as workspace</h1>
                <p>IDE uses the workspace directory to store its prefences and development artifacts</p>
                <div className='block' style='margin-top: 50px'>
                    <label className='inline-block' style='font-size: 15px'>Workspace</label>
                    <button className='inline-block btn btn-xs icon icon-file-directory' style='margin-bottom: 4px' on={{click: this.clickBrowseBtn}}>Browse...</button>
                    <input ref='pathInput' className='input-text native-key-bindings' type='text' placeholder='The directory of workspace' value={this.pathInputValue} on={{focus: this.focusPathInput}}/>
                    <p className='text-error'>{this.pathInputTips}</p>
                    <label className='input-label' style='margin-top: 20px'>
                        <input ref='setDefaultCheckBox' className='input-checkbox' type='checkbox'/>
                        Use this as the default and do not ask again
                    </label>
                </div>
                <div className='block' style='margin-top: 10px; float:right'>
                    <div className='inline-block btn-group'>
                        <button className='btn' disabled={this.backBtnDisabled} on={{click: this.clickBackBtn}}>{'< Back'}</button>
                        <button className='btn' disabled={this.nextBtnDisabled} on={{click: this.clickNextBtn}}>{'Next >'}</button>
                    </div>
                    <button className='inline-block btn' disabled={this.finishBtnDisabled} on={{click: this.clickFinishBtn}}>Finish</button>
                    <button className='inline-block btn' on={{click: this.clickCancelBtn}}>Cancel</button>
                </div>
            </div>
        )
    }

    update(props) {

        if (props.hasOwnProperty('pathInputValue')) {
            this.pathInputValue = props.pathInputValue;
        }

        if (props.hasOwnProperty('nextBtnDisabled')) {
            this.nextBtnDisabled = props.nextBtnDisabled;
        }

        if (props.hasOwnProperty('pathInputTips')) {
            this.pathInputTips = props.pathInputTips;
        }

        return etch.update(this);
    }

    async destroy() {
        await etch.destroy(this);
    }

    clickBackBtn() {
        this.props.onClickBackBtn();
    }

    clickNextBtn() {
        this.props.onClickNextBtn();
    }

    clickFinishBtn() {
        this.props.onClickFinishBtn();
    }

    clickCancelBtn() {
        this.props.onClickCancelBtn();
    }

    clickBrowseBtn() {
        this.props.onClickBrowseBtn();
    }

    focusPathInput() {
        if (this.pathInputTips != '')
        {
            this.pathInputTips = '';
            this.update({pathInputTips: this.pathInputTips})
        }
    }

    getPathInputValue() {
        return this.refs.pathInput.value;
    }

    getSetDefaultValue() {
        return this.refs.setDefaultCheckBox.checked;
    }
}