'use babel'
const etch = require('etch');

module.exports = class TizenCertificateAuthorCreateView {
    constructor(props) {
        this.props = props;
        this.fileInputTips = '';
        this.authorInputTips = '';
        this.passwordInputTips = '';
        this.confirmInputTips = '';
        this.countryInputTips = '';
        this.stateInputTips = '';
        this.cityInputTips = '';
        this.emailInputTips = '';
        etch.initialize(this);
    }

    render() {
        /** @jsx etch.dom */
        return (
            <div className='section-container' style='overflow: hidden'>
                <h1 className='section-heading block'>Author Certificate</h1>
                <p>Create a new author Certificate. The fields marked with * are mandatory.</p>
                <div className='block' style='margin-top: 50px; overflow-y:auto; max-height: 500px'>
                    <div className='block'>
                        <label className='text-highlight' style='font-size: 15px'>Key filename*</label>
                        <input ref='fileInput' className='input-text native-key-bindings' type='text' placeholder='Enter the key filename' on={{focus: this.focusFileInput}}/>
                        <p className='text-error'>{this.fileInputTips}</p>
                    </div>
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
                        <div className='block' style='margin-top: 20px'>
                            <label className='text-highlight' style='font-size: 15px'>Email</label>
                            <input ref='emailInput' className='input-text native-key-bindings' type='text' placeholder='Enter your email address' on={{focus: this.focusEmailInput}}/>
                            <p className='text-error'>{this.emailInputTips}</p>
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
        if (this.refs.fileInput.value == '' || this.refs.fileInput.value == null) {
            this.fileInputTips = 'The key filename must be specified.';
        }
        else {
            // Need to check file exist or not here, TO BE DONE!!!
            this.fileInputTips = 'Use only alphabetic, numeric, \'-\', and \'_\' characters.';
            let fileMatch = this.refs.fileInput.value.match(/[a-zA-Z0-9-_]+/);
            if (fileMatch != null) {
                if (fileMatch.length == 1 && fileMatch[0] == this.refs.fileInput.value) {
                    this.fileInputTips = '';
                }
            }
        }

        this.authorInputTips = '';
        if (this.refs.authorInput.value == '' || this.refs.authorInput.value == null) {
            this.authorInputTips = 'The author name must be specified.';
        }
        else {
            this.authorInputTips = 'This field can not contain any of the following charaters: +\\#,<>;\"';
            let match = this.refs.authorInput.value.match(/[^\+^\\^#^,^<^>^;^"]+/);
            console.log(match);
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
            console.log(match);
            if (match != null) {
                if (match.length == 1 && match[0] == this.refs.countryInput.value) {
                    this.countryInputTips = '';
                }
            }
        }

        if (this.refs.stateInput.value != ''){
            this.stateInputTips = 'Use only alphabetic characters.';
            let match = this.refs.stateInput.value.match(/[a-zA-Z]+/);
            console.log(match);
            if (match != null) {
                if (match.length == 1 && match[0] == this.refs.stateInput.value) {
                    this.stateInputTips = '';
                }
            }
        }

        if (this.refs.cityInput.value != ''){
            this.cityInputTips = 'Use only alphabetic characters.';
            let match = this.refs.cityInput.value.match(/[a-zA-Z]+/);
            console.log(match);
            if (match != null) {
                if (match.length == 1 && match[0] == this.refs.cityInput.value) {
                    this.cityInputTips = '';
                }
            }
        }
        
        this.emailInputTips = '';
        if (this.refs.emailInput.value != ''){
            this.emailInputTips = 'The address format is invalid.';
            let match = this.refs.emailInput.value.match(/[A-Za-z0-9!#$%&\'*+/=?^_`\{\|\}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`\{\|\}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?/);
            console.log(match);
            if (match != null) {
                if (match.length == 1 && match[0] == this.refs.emailInput.value) {
                    this.emailInputTips = '';
                }
            }
        }

        if (this.fileInputTips != '' || this.authorInputTips != '' || this.passwordInputTips != '' || this.confirmInputTips != '' 
            || this.countryInputTips != '' || this.stateInputTips != '' || this.cityInputTips != '' || this.emailInputTips != '') {
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

    focusEmailInput() {
        if (this.emailInputTips != '') {
            this.emailInputTips = '';
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

    getInfo() {
        return {
            authorFile: this.refs.fileInput.value,
            authorName: this.refs.authorInput.value,
            authorPassword: this.refs.passwordInput.value,
            authorCountry: this.refs.countryInput.value,
            authorState: this.refs.stateInput.value,
            authorCity: this.refs.cityInput.value,
            authorOrganization: this.refs.organizationInput.value,
            authorDepartment: this.refs.departmentInput.value,
            authorEmail: this.refs.emailInput.value
        }
    }
}