'use babel'
const etch = require('etch');
const $ = etch.dom;
const parseString = require('xml2js').parseString;
const extensionRootPath = require('../common').extensionRootPath;
const sep = require('path').sep;
const existsSync = require('fs').existsSync;
const readFileSync = require('fs').readFileSync;
const { dialog } = require('electron').remote;

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

function readProfileItems() {
    let items = new Array();

    if(existsSync(profilePath)){
        let data = readFileSync(profilePath,'utf-8');
        parseString(data, {explicitArray : false}, function(err,result) {
            let jsonData = JSON.stringify(result);
            let jsonArray = JSON.parse(jsonData);

            let profiles = jsonArray.profiles.profile;   
            if(profiles && (!profiles.length)){ //For only one profile case 
                items.push(profiles.$.name);
            }else if(profiles && profiles.length){ //For multiple profile case
                for(var i = 0; i < profiles.length; i++){
                    items.push(profiles[i].$.name);
                }
            }
        });
    }

    return items;
}

module.exports = class SamsungCertificateProfileView {
    constructor(props) {
        this.props = props;
        this.nameInputTips = '';
        this.selectedProfile = null;
        etch.initialize(this);
    }

    render() {
        let profileItems = readProfileItems();
        let itemLists = new Array();

        profileItems.forEach((item) => {
            itemLists.push($.li({on:{click: this.selectProfileItem}}, item));
        });

        let orderList = $.ol({ref:'selectList', className:'list-group', style:'overflow-y:auto; margin-top: 0px; max-height: -webkit-fill-available'}, itemLists);

        /** @jsx etch.dom */
        return (
            <div className='section-container' style='overflow: hidden'>
                <h1 className='section-heading block'>Certificate Profile</h1>
                <p>The certificate profile consists of the author and distributor certificates. To distribute your application, you must create a certificate profile and sign the application with it.</p>
                <div className='block' style='margin-top: 50px'>
                    <label className='input-label text-highlight' style='font-size: 15px'>
                        <input ref='createInput' className='input-radio' type='radio' name='profileRadio' checked on={{click: this.clickCreateInput}}/>
                        Create a new certificate profile
                    </label>
                    <input ref='nameInput' className='input-text native-key-bindings' type='text' style='margin-top: 10px' placeholder='Enter profile name' on={{focus: this.focusNameInput}}/>
                    <p className='text-error'>{this.nameInputTips}</p>
                </div>
                <div className='block' style='margin-top: 40px'>
                    <label className='input-label text-highlight' style='font-size: 15px'>
                        <input ref='selectInput' className='input-radio' type='radio' name='profileRadio' on={{click: this.clickSelectInput}}/>
                        Select an existing certificate profile
                    </label>
                    <div className='select-list input-text' style='height: 130px; margin-top: 10px' disabled>
                        {orderList}
                    </div>
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

    selectProfileItem(event) {
        if (this.selectedProfile != null) {
            this.selectedProfile.classList.remove('selected');
        }
        event.target.classList.add('selected');
        this.selectedProfile = event.target;
    }

    clickCreateInput() {
        this.refs.selectList.disabled = true;
        this.refs.nameInput.disabled = false;
    }

    clickSelectInput() {
        this.refs.selectList.disabled = false;
        this.refs.nameInput.disabled = true;
    }

    clickNextBtn() {
        // For select case, no need to check profile name
        if (this.refs.createInput.checked == false) {
            // Show dialog
            dialog.showMessageBox({
                title: 'Certificate profile',
                message: 'An author certificate already exists in this profile. Do you want to remove it and create a new author certificate?',
                buttons: ['Yes', 'No']
            }, (response) => {
                let answer = 'select';
                if (response == 0) {
                    answer = 'create';
                }
                this.props.onClickNextBtn(answer);
            });
            return;
        }

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

                this.props.onClickNextBtn('create');
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

    isCreateNewSelected() {
        return this.refs.createInput.checked;
    }

    getInfo() {
        if (this.refs.createInput.checked == true)
            return this.refs.nameInput.value;
        else
            return this.selectedProfile.innerText;
    }

}