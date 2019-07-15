'use babel'
const etch = require('etch');
const parseString = require('xml2js').parseString;
const extensionRootPath = require('../common').extensionRootPath;
const sep = require('path').sep;
const existsSync = require('fs').existsSync;
const readFileSync = require('fs').readFileSync;

var profilePath = extensionRootPath + sep + 'resource' + sep + 'profiles.xml';

function checkIfProfileExists(profileCheck) {
    let isExist = false;

    if(existsSync(profilePath)){
        let data = readFileSync(profilePath,'utf-8');
        //parse profiles.xml file to get author and distributor p12 certificate file 
        parseString(data, {explicitArray : false}, function(err,result) {
            let jsonData = JSON.stringify(result);
            let jsonArray = JSON.parse(jsonData);

            let profiles = jsonArray.profiles.profile;   
            let name = '';  
            if(profiles && (!profiles.length)){ //For only one profile case 
                name = profiles.$.name;
                if (name == profileCheck) {
                    isExist = true;
                    return;
                }
            }else if(profiles && profiles.length){ //For multiple profile case
                for(var i = 0; i < profiles.length; i++){
                    name = profiles[i].$.name;
                    if (name == profileCheck) {
                        isExist = true;
                        return;
                    }
                }
            }

            isExist = false;
        });
    }

    return isExist;
}

module.exports = class TizenCertificateProfileView {
    constructor(props) {
        this.props = props;
        this.nameInputTips = '';
        etch.initialize(this);
    }

    render() {
        /** @jsx etch.dom */
        return (
            <div className='section-container' style='overflow: hidden'>
                <h1 className='section-heading block'>Certificate Profile</h1>
                <p>The certificate profile consists of the author and distributor certificates. To distribute your application, you must create a certificate profile and sign the application with it.</p>
                <div className='block' style='margin-top: 50px'>
                    <label className='text-highlight' style='font-size: 15px'>Certificate profile name</label>
                    <input ref='nameInput' className='input-text native-key-bindings' type='text' placeholder='Enter profile name' on={{focus: this.focusNameInput}}/>
                    <p className='text-error'>{this.nameInputTips}</p>
                </div>
                <div className='block' style='margin-top: 10px; float:right'>
                    <div className='inline-block btn-group'>
                        <button className='btn' disabled>{'< Back'}</button>
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

    clickNextBtn() {
        if (this.refs.nameInput.value == '' || this.refs.nameInput.value == null) {
            this.nameInputTips = 'The profile name must be specified.';
            etch.update(this);
            return;
        }

        let nameMatch = this.refs.nameInput.value.match(/[a-zA-Z-_0-9]+/);
        if (nameMatch != null) {
            if (nameMatch.length == 1 && nameMatch[0] == this.refs.nameInput.value) {
                if (checkIfProfileExists(this.refs.nameInput.value) == true) {
                    this.nameInputTips = 'A certificate profile with the same name already exists.';
                    etch.update(this);
                    return;
                }
                
                this.props.onClickNextBtn();
                return;
            }
        }

        this.nameInputTips = 'Use only alphabetic, numeric, \'-\', and \'_\' characters.';
        etch.update(this);
        return;
    }

    clickCancelBtn() {
        this.props.onClickCancelBtn();
    }

    focusNameInput() {
        if (this.nameInputTips != '') {
            this.nameInputTips = '';
            etch.update(this);
        }
    }

    getInfo() {
        return this.refs.nameInput.value;
    }

}