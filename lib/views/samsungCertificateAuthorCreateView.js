'use babel'
const etch = require('etch');

module.exports = class SamsungCertificateAuthorCreateView {
    constructor(props) {
        this.props = props;
        this.authorInputTips = '';
        this.passwordInputTips = '';
        this.confirmInputTips = '';
        this.countryInputTips = '';
        this.stateInputTips = '';
        this.cityInputTips = '';
        etch.initialize(this);
    }

    render() {
        /** @jsx etch.dom */
        return (
            <div ref='allDiv' className='section-container' style='overflow: hidden'>
                <div ref='disableDiv' style='opacity: 0; height: 100%; width: 100%; position: absolute; z-index: 10;' hidden='hidden'></div>
                <div ref='loadingDiv' style='opacity: 0.5; background-color: #ffffff; height: 100%; width: 100%; position: absolute; z-index: 5; text-align: -webkit-center' hidden='hidden'>
                    <span className='loading loading-spinner-large' style='top: 40%'></span>
                    {/*<span style='font-size: 30px;top: 52%;position: sticky;color: #568af2;'>Loading</span>*/}
                </div>
                <h1 className='section-heading block'>Author Certificate</h1>
                <p>Create a new author Certificate. The fields marked with * are mandatory.</p>
                <div className='block' style='margin-top: 50px; overflow-y:auto; max-height: 500px'>
                    <div className='block' style='margin-top: 20px'>
                        <label className='text-highlight' style='font-size: 15px'>Author name*</label>
                        <input ref='authorInput' className='input-text native-key-bindings' type='text' placeholder='Enter your author name' on={{focus: this.focusAuthorInput}}/>
                        <p className='text-error'>{this.authorInputTips}</p>
                    </div>
                    <div className='block' style='margin-top: 20px'>
                        <label className='text-highlight' style='font-size: 15px'>Passoword*</label>
                        <input ref='passwordInput' className='input-text native-key-bindings' type='password' placeholder='Enter your password (at least 8 characters)' on={{focus: this.focusPasswordInput}}/>
                        <p className='text-error'>{this.passwordInputTips}</p>
                    </div>
                    <div className='block' style='margin-top: 20px'>
                        <label className='text-highlight' style='font-size: 15px'>Confirm passoword*</label>
                        <input ref='confirmInput' className='input-text native-key-bindings' type='password' placeholder='Enter your password again' on={{focus: this.focusConfirmInput}}/>
                        <p className='text-error'>{this.confirmInputTips}</p>
                    </div>
                    <div className='block'>
                    <label className='input-label' style='margin-bottom: 20px'>
                        <input ref='applySamePassword' className='input-checkbox' type='checkbox' checked/>
                        Apply the same password for the distributor certificate
                    </label>
                    </div>
                    <div className='block'>
                        <span ref='iconChevron' className='badge icon icon-chevron-down' on={{click: this.clickIconChevron}}>More details</span>
                    </div>
                    <div ref='detailDiv' className='block' hidden='hidden'>
                        <div className='block' style='margin-top: 20px'>
                            <label className='text-highlight' style='font-size: 15px'>Country</label>
                            <input ref='countryInput' className='input-text native-key-bindings' type='text' placeholder='Enter your country (2-letter code)' on={{focus: this.focusCountryInput}}/>
                            <p className='text-error'>{this.countryInputTips}</p>
                        </div>
                        <div className='block' style='margin-top: 20px'>
                            <label className='text-highlight' style='font-size: 15px'>State</label>
                            <input ref='stateInput' className='input-text native-key-bindings' type='text' placeholder='Enter your state' on={{focus: this.focusStateInput}}/>
                            <p className='text-error'>{this.stateInputTips}</p>
                        </div>
                        <div className='block' style='margin-top: 20px'>
                            <label className='text-highlight' style='font-size: 15px'>City</label>
                            <input ref='cityInput' className='input-text native-key-bindings' type='text' placeholder='Enter your city' on={{focus: this.focusCityInput}}/>
                            <p className='text-error'>{this.cityInputTips}</p>
                        </div>
                        <div className='block' style='margin-top: 20px'>
                            <label className='text-highlight' style='font-size: 15px'>Organization</label>
                            <input ref='organizationInput' className='input-text native-key-bindings' type='text' placeholder='Enter your organization'/>
                        </div>
                        <div className='block' style='margin-top: 20px'>
                            <label className='text-highlight' style='font-size: 15px'>Department</label>
                            <input ref='departmentInput' className='input-text native-key-bindings' type='text' placeholder='Enter your department'/>
                        </div>
                    </div>
                </div>
                <div className='block' style='margin-top: 10px; float:right'>
                    <div className='inline-block btn-group'>
                        <button className='btn' on={{click: this.clickBackBtn}}>{'< Back'}</button>
                        <button className='btn' on={{click: this.clickNextBtn}}>{'Next >'}</button>
                    </div>
                    <button className='inline-block btn' disabled>Finish</button>
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

    clickNextBtn() {
        this.authorInputTips = '';
        if (this.refs.authorInput.value == '' || this.refs.authorInput.value == null) {
            this.authorInputTips = 'The author name must be specified.';
        }
        else {
            this.authorInputTips = 'This field can not contain any of the following charaters: +\\#,<>;\"';
            let match = this.refs.authorInput.value.match(/[^\+^\\^#^,^<^>^;^"]+/);
            if (match != null) {
                if (match.length == 1 && match[0] == this.refs.authorInput.value) {
                    this.authorInputTips = '';
                }
            }
        }

        this.passwordInputTips = '';
        if (this.refs.passwordInput.value.length < 8) {
            this.passwordInputTips = 'The password must contain at least 8 characters.';
        }

        this.confirmInputTips = '';
        if (this.refs.confirmInput.value != this.refs.passwordInput.value) {
            this.confirmInputTips = 'The passwords do not match.';
        }

        if (this.refs.countryInput.value != ''){
            this.countryInputTips = 'Use only 2 alphabetic characters.';
            let match = this.refs.countryInput.value.match(/[a-zA-Z]{2}/);
            if (match != null) {
                if (match.length == 1 && match[0] == this.refs.countryInput.value) {
                    this.countryInputTips = '';
                }
            }
        }

        if (this.refs.stateInput.value != ''){
            this.stateInputTips = 'Use only alphabetic characters.';
            let match = this.refs.stateInput.value.match(/[a-zA-Z]+/);
            if (match != null) {
                if (match.length == 1 && match[0] == this.refs.stateInput.value) {
                    this.stateInputTips = '';
                }
            }
        }

        if (this.refs.cityInput.value != ''){
            this.cityInputTips = 'Use only alphabetic characters.';
            let match = this.refs.cityInput.value.match(/[a-zA-Z]+/);
            if (match != null) {
                if (match.length == 1 && match[0] == this.refs.cityInput.value) {
                    this.cityInputTips = '';
                }
            }
        }

        if (this.authorInputTips != '' || this.passwordInputTips != '' || this.confirmInputTips != '' 
            || this.countryInputTips != '' || this.stateInputTips != '' || this.cityInputTips != '') {
            etch.update(this);
            return;
        }

       

        this.props.onClickNextBtn();
    }

    clickCancelBtn() {
        this.props.onClickCancelBtn();
    }

    focusFileInput() {
        if (this.fileInputTips != '') {
            this.fileInputTips = '';
            etch.update(this);
        }
    }

    focusAuthorInput() {
        if (this.authorInputTips != '') {
            this.authorInputTips = '';
            etch.update(this);
        }
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

    focusCountryInput() {
        if (this.countryInputTips != '') {
            this.countryInputTips = '';
            etch.update(this);
        }
    }

    focusStateInput() {
        if (this.stateInputTips != '') {
            this.stateInputTips = '';
            etch.update(this);
        }
    }

    focusCityInput() {
        if (this.cityInputTips != '') {
            this.cityInputTips = '';
            etch.update(this);
        }
    }

    clickIconChevron() {
        if (this.refs.iconChevron.className == 'badge icon icon-chevron-down') {
            this.refs.iconChevron.className = 'badge icon icon-chevron-up'
            this.refs.detailDiv.hidden = '';
        }
        else {
            this.refs.iconChevron.className = 'badge icon icon-chevron-down';
            this.refs.detailDiv.hidden = 'hidden';
        }
    }

    isApplySamePassword() {
        return this.refs.applySamePassword.checked;
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
        return {
            authorName: this.refs.authorInput.value,
            authorPassword: this.refs.passwordInput.value,
            authorCountry: this.refs.countryInput.value,
            authorState: this.refs.stateInput.value,
            authorCity: this.refs.cityInput.value,
            authorOrganization: this.refs.organizationInput.value,
            authorDepartment: this.refs.departmentInput.value
        }
    }
}