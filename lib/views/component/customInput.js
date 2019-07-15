'use babel'
const etch = require('etch');
const platform = require('os').platform;
const { dialog } = require('electron').remote;

// Reg Exp List
var regObjList = [{
    format: 'directory',
    exp: platform == 'win32' ? /^[a-zA-Z]:(\\[^\\^\/^:^\*^\?^\"^<^>^|]+)*\\?/ : /^\/([^\/]+\/?)*/,
    errTip: 'Please check the directory format.'
},{
    format: 'profile',
    exp: /[a-zA-Z-_0-9]+/,
    errTip: 'Use only alphabetic, numeric, \'-\', and \'_\' characters.'
},{
    format: 'project',
    exp: /[a-zA-Z0-9]+/,
    errTip: 'Use only alphabetic and numeric characters.'
},{
    format: 'author',
    exp: /[^\+^\\^#^,^<^>^;^"]+/,
    errTip: 'This field can not contain any of the following charaters: +\\#,<>;\"'
},{
    format: 'country',
    exp: /[a-zA-Z]{2}/,
    errTip: 'Use only 2 alphabetic characters.'
},{
    format: 'region',
    exp: /[a-zA-Z]+/,
    errTip: 'Use only alphabetic characters.'
},{
    format: 'email',
    exp: /[A-Za-z0-9!#$%&\'*+/=?^_`\{\|\}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`\{\|\}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?/,
    errTip: 'The email address format is invalid.'
},{
    format: 'password',
    exp: /.{8,}/,
    errTip: 'The password must contain at least 8 characters.'
}];

function matchRegExp(value, exp) {
    let match = value.match(exp);
    if (match != null && match[0] == value) {
            return true;
    }
    return false;
}

function getRegObj(format) {
    return regObjList.find((obj) => { 
        return obj.format == format; 
    });
}

module.exports = class CustomInput {
    constructor(props, children) {
        this.props = props ? props : {};
        this.children = children;
        this.regObj = this.props.hasOwnProperty('format') ? getRegObj(this.props.format) : null;
        etch.initialize(this);
        if (this.props.hasOwnProperty('format') || this.props.hasOwnProperty('valueChecker')) {
            this.refs.input.addEventListener('focus', this.onFocus.bind(this));
            this.refs.input.addEventListener('blur', this.onBlur.bind(this));
        }
        if (this.props.hasOwnProperty('defaultValue')) {
            this.refs.input.value = this.props.defaultValue;
            this.refs.input.disabled = true;
            if (this.props.hasOwnProperty('browse')) {
                this.refs.browseBtn.disabled = true;
            }
        }
        Object.defineProperty(this, 'value', {get: function() {return this.refs.input.value;}});
    }

    render() {
        let defaultType = this.props.hasOwnProperty('type') ? this.props.type : 'text';
        let defaultPlaceholder = this.props.hasOwnProperty('placeholder') ? this.props.placeholder : '';
        let defaultValue = this.props.hasOwnProperty('value') ? this.props.value : '';

        /** @jsx etch.dom */
        return (
            <div className='block' >
                <label className='inline-block' style='font-size: 15px'>{this.children}</label>
                {
                    this.props.hasOwnProperty('browse') ? 
                    <button ref='browseBtn' className='inline-block btn btn-xs icon icon-file-directory' style='margin-bottom: 4px' onclick={this.clickBrowseBtn.bind(this)}>Browse...</button> : null
                }
                {
                    this.props.hasOwnProperty('defaultValue') ? 
                    <label className='inline-block input-label' style='float:right'>
                        <input ref='checkBox' className='input-checkbox' type='checkbox' checked  onclick={this.clickCheckBox.bind(this)}/>
                        Use default location
                    </label> : null
                }
                <input ref='input' className='input-text native-key-bindings' type={defaultType} placeholder={defaultPlaceholder} value={defaultValue}/>
                <p ref='p' className='text-error'>&nbsp;</p>
            </div>
        )
    }

    update(props) {
        this.props = props;
        return etch.update(this);
    }

    async destroy() {
        await etch.destroy(this);
    }

    getValue() {
        return this.refs.input.value;
    }

    onFocus() {
        this.refs.p.innerHTML = '&nbsp;';
    }

    onBlur() {
        if (this.props.hasOwnProperty('valueChecker')) {
            let errTip = this.props.valueChecker()
            if (errTip != null) {
                this.refs.p.textContent = errTip;
                return;
            }
        }
        if (this.props.hasOwnProperty('format')) {
            if (this.refs.input.value != '' && !matchRegExp(this.refs.input.value, this.regObj.exp)) {
                this.refs.p.textContent = this.regObj.errTip;
            }
        }
    }

    isValid() {
        if (!this.props.hasOwnProperty('optional') && this.refs.input.value == '') {
            this.refs.p.textContent = 'This field must be specified.';
            return false;
        }
        if (this.props.hasOwnProperty('valueChecker')) {
            let errTip = this.props.valueChecker()
            if (errTip != null) {
                this.refs.p.textContent = errTip;
                return false;
            }
        }
        if (this.props.hasOwnProperty('format')) {
            if (this.refs.input.value != '' && !matchRegExp(this.refs.input.value, this.regObj.exp)) {
                this.refs.p.textContent = this.regObj.errTip;
                return false;
            }
        }
        return true;
    }

    clickBrowseBtn() {
        let dialogOpt = {};
        switch (this.props.browse) {
            case 'p12':
                dialogOpt = {
                    title: 'Atom - Tizen SDK',
                    properties: ['openFile', 'showHiddenFiles'],
                    filters: [{name: '', extensions: ['p12']}]
                }
                break;
            case 'dir':
            default:
                dialogOpt = {
                    title: 'Atom - Tizen SDK',
                    properties: ['openDirectory', 'showHiddenFiles']
                }
                break;
        }
        dialog.showOpenDialog(dialogOpt, (files) => {
            if (files) {
                this.refs.p.innerHTML = '&nbsp;';
                this.refs.input.value = files[0];
            }
        });
    }

    clickCheckBox() {
        if (this.refs.checkBox.checked) {
            this.refs.input.value = this.props.defaultValue;
        }

        this.refs.input.disabled = this.refs.checkBox.checked;
        if (this.props.hasOwnProperty('browse')) {
            this.refs.browseBtn.disabled = this.refs.checkBox.checked;
        }
    }
}