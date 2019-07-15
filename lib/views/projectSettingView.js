'use babel'
const etch = require('etch');

module.exports = class ProjectSettingsView {
    constructor(props) {
        this.props = props;
        this.pathInputTips = '';
        this.nameInputTips = '';
        this.pathInputDisabled = true;
        this.browseBtnDisable = true;
        etch.initialize(this);
    }

    render() {
        /** @jsx etch.dom */
        return (
            <div className='section-container' style='overflow: hidden'>
                <h1 className='section-heading block'>Define the project properties</h1>
                <p>New folder with the name as "Project name" will be created in the directory as "Location"</p>
                <div className='block' style='margin-top: 50px'>
                    <label className='inline-block' style='font-size: 15px'>Project name</label>
                    <input ref='nameInput' className='input-text native-key-bindings' type='text' placeholder='The name of the project to create' value={this.props.nameInputValue} on={{focus: this.focusNameInput}}/>
                    <p className='text-error'>{this.nameInputTips}</p>
                </div>
                <div className='block' style='margin-top: 20px'>
                    <label className='inline-block' style='font-size: 15px'>Location</label>
                    <button className='inline-block btn btn-xs icon icon-file-directory' style='margin-bottom: 4px' disabled={this.browseBtnDisable} on={{click: this.clickBrowseBtn}}>Browse...</button>
                    <label className='inline-block input-label' style='float:right'>
                        <input ref='useDefaultCheckBox' className='input-checkbox' type='checkbox' checked  on={{click: this.clickUseDefaultCheckBox}}/>
                        Use default location
                    </label>
                    <input ref='pathInput' className='input-text native-key-bindings' type='text' placeholder='The location of the project to create' value={this.props.pathInputValue} disabled={this.pathInputDisabled}  on={{focus: this.focusPathInput}}/>
                    <p className='text-error'>{this.pathInputTips}</p>
                </div>
                <div className='block' style='margin-top: 10px; float:right'>
                    <div className='inline-block btn-group'>
                        <button className='btn' on={{click: this.clickBackBtn}}>{'< Back'}</button>
                        <button className='btn' disabled>{'Next >'}</button>
                    </div>
                    <button className='inline-block btn' on={{click: this.clickFinishBtn}}>Finish</button>
                    <button className='inline-block btn' on={{click: this.clickCancelBtn}}>Cancel</button>
                </div>
            </div>
        )
    }

    update(props) {
        if (props.hasOwnProperty('pathInputDisabled')) {
            this.pathInputDisabled = props.pathInputDisabled;
        }

        if (props.hasOwnProperty('pathInputValue')) {
            //this.props.pathInputValue = props.pathInputValue;  <===  this does not work
            this.refs.pathInput.value = props.pathInputValue;
        }

        if (props.hasOwnProperty('pathInputTips')) {
            this.pathInputTips = props.pathInputTips;
        }

        if (props.hasOwnProperty('nameInputValue')) {
            this.refs.nameInput.value = props.nameInputValue;
        }

        if (props.hasOwnProperty('nameInputTips')) {
            this.nameInputTips = props.nameInputTips;
        }

        if (props.hasOwnProperty('browseBtnDisable')) {
            this.browseBtnDisable = props.browseBtnDisable;
        }

        return etch.update(this);
    }

    async destroy() {
        await etch.destroy(this);
    }

    clickUseDefaultCheckBox() {
        if (this.refs.useDefaultCheckBox.checked == true) {
            this.update({
                browseBtnDisable: true,
                pathInputDisabled: true,
                pathInputValue: this.props.pathInputValue
            });
        }
        else {
            this.update({
                browseBtnDisable: false,
                pathInputDisabled: false
            });
        }
    }

    clickBrowseBtn() {
        this.props.onClickBrowseBtn();
    }

    clickBackBtn() {
        this.props.onClickBackBtn();
    }

    clickCancelBtn() {
        this.props.onClickCancelBtn();
    }

    clickFinishBtn() {
        this.props.onClickFinishBtn(this.refs.nameInput.value, this.refs.pathInput.value);
    }
/*
    inputNameInput() {
        if (this.refs.useDefaultCheckBox.checked == true) {
            this.update({
                pathInputValue: this.props.pathInputValue + this.refs.nameInput.value
            });
        }
    }
*/
    focusNameInput() {
        if (this.nameInputTips != '')
        {
            this.nameInputTips = '';
            this.update({nameInputTips: ''});
        }
    }

    focusPathInput() {
        if (this.pathInputTips != '')
        {
            this.pathInputTips = '';
            this.update({pathInputTips: ''})
        }
    }
}