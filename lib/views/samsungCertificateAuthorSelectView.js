'use babel'
const etch = require('etch');
const { dialog } = require('electron').remote;
const checkP12Password = require('../p12ToPem').checkP12Password;
const existsSync = require('fs').existsSync;
const platform = require('os').platform;
const sep = require('path').sep;
const extensionRootPath = require('../common').extensionRootPath;

const resourcePath1 = extensionRootPath + sep + 'resource' + sep + 'SamsungCertificate';
const resourcePath2 = extensionRootPath + sep + 'resource';

module.exports = class SamsungCertificateAuthorSelectView {
    constructor(props) {
        this.props = props;
        this.fileInputTips = '';
        this.passwordInputTips = '';
        etch.initialize(this);
    }

    render() {
        /** @jsx etch.dom */
        return (
            <div className='section-container' style='overflow: hidden'>
                <h1 className='section-heading block'>Author Certificate</h1>
                <p>Select an existing author certificate.</p>
                <div className='block' style='margin-top: 50px'>
                    <label className='inline-block text-highlight' style='font-size: 15px'>Author certificate file location</label>
                    <button className='inline-block btn btn-xs icon icon-file-directory' style='margin-bottom: 4px' on={{click: this.clickBrowseBtn}}>Browse...</button>
                    <input ref='fileInput' className='input-text native-key-bindings' type='text' on={{focus: this.focusFileInput}}/>
                    <p className='text-error'>{this.fileInputTips}</p>
                </div>
                <div className='block' style='margin-top: 20px'>
                    <label className='text-highlight' style='font-size: 15px'>Password</label>
                    <input ref='passwordInput' className='input-text native-key-bindings' type='password' placeholder='Enter password of the author certificate you select' on={{focus: this.focusPasswordInput}}/>
                    <p className='text-error'>{this.passwordInputTips}</p>
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

    clickBrowseBtn() {
        let resourcePath = resourcePath2;
        if (existsSync(resourcePath1)) {
            resourcePath = resourcePath1;
        }
        dialog.showOpenDialog({
            title: 'Choose author certificate file',
            defaultPath: resourcePath,
            properties: ['openFile', 'showHiddenFiles'],
            filters: [{name: '', extensions: ['p12']}]
        }, (files) => {
            if (files) {
                if (this.fileInputTips != '') {
                    this.fileInputTips = '';
                }
                this.refs.fileInput.value = files[0];
            }
        });
    }

    clickBackBtn() {
        this.props.onClickBackBtn();
    }

    clickNextBtn() {
        let pathValue = this.refs.fileInput.value;
        let systemPlatform = platform;

        if (pathValue == '') {
            this.fileInputTips = 'The directory must be specified.'
            etch.update(this);
            return;
        }

        if (systemPlatform == 'win32') {
            this.fileInputTips = 'Please check the directory format, and make sure invalid characters \\\/:*?\"<>| are not included.';
            let pathMatch = pathValue.match(/^[a-zA-Z]:(\\[^\\^\/^:^\*^\?^\"^<^>^|]+)*\\?/g);
            if (pathMatch != null) {
                if (pathMatch.length == 1 && pathMatch[0] == pathValue) {
                    this.fileInputTips =  '';
                }
            }
        }
        else {
            this.fileInputTips = 'Please check the directory format.';
            let pathMatch = pathValue.match(/^\/([^\/]+\/?)*/g);
            if (pathMatch != null) {
                if (pathMatch.length == 1 && pathMatch[0] == pathValue) {
                    this.fileInputTips = '';
                }
            }
        }

        if (this.fileInputTips != '') {
            etch.update(this);
            return;
        }

        if (existsSync(this.refs.fileInput.value) != true) {
            this.fileInputTips = 'The file does not exist.'
            etch.update(this);
            return;
        }

        if (checkP12Password(this.refs.fileInput.value, this.refs.passwordInput.value) != true) {
            this.passwordInputTips = 'The password you entered is incorrect.'
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

    focusPasswordInput() {
        if (this.passwordInputTips != '') {
            this.passwordInputTips = '';
            etch.update(this);
        }
    }

    getInfo() {
        return {
            authorFile: this.refs.fileInput.value,
            authorPassword: this.refs.passwordInput.value
        }
    }
}