'use babel'
const etch = require('etch');
const $ = etch.dom;

module.exports = class SamsungCertificateDistributorCreateView {
    constructor(props) {
        this.props = props;
        this.passwordInputTips = '';
        this.confirmInputTips = '';
        etch.initialize(this);
    }

    render() {
        /** @jsx etch.dom */
        return (
            <div className='section-container' style='overflow: hidden'>
                <div ref='disableDiv' style='opacity: 0; height: 100%; width: 100%; position: absolute; z-index: 10;' hidden='hidden'></div>
                <div ref='loadingDiv' style='opacity: 0.5; background-color: #ffffff; height: 100%; width: 100%; position: absolute; z-index: 5; text-align: -webkit-center' hidden='hidden'>
                    <span className='loading loading-spinner-large' style='top: 40%'></span>
                    {/*<span style='font-size: 30px;top: 52%;position: sticky;color: #568af2;'>Loading</span>*/}
                </div>
                <h1 className='section-heading block'>Distributor Certificate</h1>
                <p>To install applications to a Samsung device, the device DUID (Device Unique Identifier) must be included in the distributor certificate.</p>
                <div className='block' style='margin-top: 50px;'>
                    <label className='text-highlight inline-block' style='font-size: 15px'>
                        Privilege level
                    </label>
                    <select ref='privilegeSelect' className='inline-block input-select' on={{change: this.changePrivilegeSelect}}>
                        <option>Public</option>
                        <option>Partner</option>
                    </select>
                    <div className='block' style='margin-top: 20px'>
                        <label className='text-highlight' style='font-size: 15px'>Passoword</label>
                        <input ref='passwordInput' className='input-text native-key-bindings' type='password' placeholder='Enter your password (at least 8 characters)' value={this.props.defaultPassword} on={{focus: this.focusPasswordInput}}/>
                        <p className='text-error'>{this.passwordInputTips}</p>
                    </div>
                    <div className='block' style='margin-top: 20px'>
                        <label className='text-highlight' style='font-size: 15px'>Confirm passoword</label>
                        <input ref='confirmInput' className='input-text native-key-bindings' type='password' placeholder='Enter your password again' value={this.props.defaultPassword} on={{focus: this.focusConfirmInput}}/>
                        <p className='text-error'>{this.confirmInputTips}</p>
                    </div>
                </div>
                <div className='block' style='margin-top: 40px;'>
                    <label className='input-label text-highlight' style='font-size: 15px'>
                        Add individual DUIDs
                    </label>
                    <div ref='duidList' className='block' style='height: 170px; margin-top: 10px; overflow-y :scroll'>
                        <input className='input-text native-key-bindings' type='text' placeholder='Enter DUID manually'/>
                        <input className='input-text native-key-bindings' type='text' style='margin-top: 3px' placeholder='Enter DUID manually'/>
                        <input className='input-text native-key-bindings' type='text' style='margin-top: 3px' placeholder='Enter DUID manually'/>
                        <input className='input-text native-key-bindings' type='text' style='margin-top: 3px' placeholder='Enter DUID manually'/>
                        <input className='input-text native-key-bindings' type='text' style='margin-top: 3px' placeholder='Enter DUID manually'/>
                        <input className='input-text native-key-bindings' type='text' style='margin-top: 3px' placeholder='Enter DUID manually'/>
                        <input className='input-text native-key-bindings' type='text' style='margin-top: 3px' placeholder='Enter DUID manually'/>
                        <input className='input-text native-key-bindings' type='text' style='margin-top: 3px' placeholder='Enter DUID manually'/>
                        <input className='input-text native-key-bindings' type='text' style='margin-top: 3px' placeholder='Enter DUID manually'/>
                        <input className='input-text native-key-bindings' type='text' style='margin-top: 3px' placeholder='Enter DUID manually'/>
                        <input className='input-text native-key-bindings' type='text' style='margin-top: 3px' placeholder='Enter DUID manually'/>
                    </div>
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
        return etch.update(this);
    }

    async destroy() {
        await etch.destroy(this);
    }

    clickBackBtn() {
        this.props.onClickBackBtn();
    }

    clickFinishBtn() {
        this.passwordInputTips = '';
        if (this.refs.passwordInput.value.length < 8) {
            this.passwordInputTips = 'The password must contain at least 8 characters.';
        }

        this.confirmInputTips = '';
        if (this.refs.confirmInput.value != this.refs.passwordInput.value) {
            this.confirmInputTips = 'The passwords do not match.';
        }

        this.props.onClickFinishBtn();
    }

    clickCancelBtn() {
        this.props.onClickCancelBtn();
    }


    focusPasswordInput() {
        if (this.passwordInputTips != '') {
            this.passwordInputTips = '';
            etch.update(this);
        }
    }

    focusConfirmInput() {
        if (this.confirmInputTips != '') {
            this.confirmInputTips = '';
            etch.update(this);
        }
    }

    loadingStart() {
        this.refs.loadingDiv.hidden = '';
    }

    loadingStop() {
        this.refs.loadingDiv.hidden = 'hidden';
    }

    setViewDisabled(disabled) {
        if (disabled == true) {
            this.refs.disableDiv.hidden = '';
        }
        else if (disabled == false) {
            this.refs.disableDiv.hidden = 'hidden';
        }
    }

    getInfo() {
        let duids = new Array();
        let inputCollection = this.refs.duidList.getElementsByTagName('input');
        for (let i = 0; i < 10; i++) {
            if (inputCollection[i].value != '') {
                duids.push(inputCollection[i].value);
            }
        }

        return {
            privilegeLevel: this.refs.privilegeSelect.selectedIndex == 0 ? 'Public' : 'Partner',
            distributorPassword: this.refs.passwordInput.value,
            duidList: duids
        }
    }
}