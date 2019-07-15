'use babel'
const etch = require('etch');

module.exports = class TizenCertificateDistributorStartView {
    constructor(props) {
        this.props = props;
        etch.initialize(this);
    }

    render() {
        /** @jsx etch.dom */
        return (
            <div className='section-container' style='overflow: hidden'>
                <h1 className='section-heading block'>Distributor Certificate</h1>
                <p>A distributor issues a certificate of its own to developers. And the distributor checks if an application submitted to its app store includes its distributor certificate.</p>
                <div className='block' style='margin-top: 50px'>
                    <label className='input-label text-highlight' style='font-size: 15px'>
                        <input ref='defaultInput' className='input-radio' type='radio' name='distributorRadio' checked on={{click: this.clickDefaultInput}}/>
                        Use the default Tizen distributor certificate
                    </label>
                    <p style='margin-left: 20px'>The Tizen SDK offers a default Tizen distributor certificate, which you can use to submit your application to the Tizen Store.</p>
                    <label className='inline-block input-label' style='margin-left: 20px'>
                        <input ref='privilegeInput' className='input-checkbox' type='checkbox' on={{click: this.clickPrivilegeInput}}/>
                        Privilege level
                    </label>
                    <select ref='privilegeSelect' className='inline-block input-select' disabled on={{change: this.changePrivilegeSelect}}>
                        <option>Public (Default)</option>
                        <option>Partner</option>
                    </select>
                    <p ref='privilegeTips' className='text-subtle' style='margin-left: 20px'>You can use only public level APIs.</p>
                </div>
                <div className='block' style='margin-top: 25px'>
                    <label className='input-label text-highlight' style='font-size: 15px'>
                        <input ref='selectInput' className='input-radio' type='radio' name='distributorRadio' on={{click: this.clickSelectInput}}/>
                        Select a distributor certificate for another app store
                    </label>
                    <p style='margin-left: 20px'>If you own a distributor certificate for another app store, and want to submit your application to that store, add that distributor certificate to the certificate profile.</p>
                </div>
                <div className='block' style='margin-top: 30px; float:right'>
                    <div className='inline-block btn-group'>
                        <button className='btn' on={{click: this.clickBackBtn}}>{'< Back'}</button>
                        <button ref='nextBtn' className='btn' disabled on={{click: this.clickNextBtn}}>{'Next >'}</button>
                    </div>
                    <button ref='finishBtn' className='inline-block btn' on={{click: this.clickFinishBtn}}>Finish</button>
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

    clickDefaultInput() {
        this.refs.privilegeInput.disabled = false;
        if (this.refs.privilegeInput.checked == true) {
            this.refs.privilegeSelect.disabled = false;
        }
        else {
            this.refs.privilegeSelect.disabled = true;
        }

        this.refs.nextBtn.disabled = true;
        this.refs.finishBtn.disabled = false;
    }

    clickSelectInput() {
        this.refs.privilegeInput.disabled = true;
        this.refs.privilegeSelect.disabled = true;
        this.refs.nextBtn.disabled = false;
        this.refs.finishBtn.disabled = true;
    }

    clickPrivilegeInput() {
        if (this.refs.privilegeInput.checked == true) {
            this.refs.privilegeSelect.disabled = false;
        }
        else {
            this.refs.privilegeSelect.disabled = true;
        }
    }

    changePrivilegeSelect() {
        let option = this.refs.privilegeSelect.selectedIndex;
        if (option == 0) {
            this.refs.privilegeTips.textContent = 'You can use only public level APIs.';
        }
        else if (option == 1) {
            this.refs.privilegeTips.textContent = 'You can use public and partner level APIs.';
        }
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

    isUseDefaultSelected() {
        return this.refs.defaultInput.checked;
    }

    getInfo() {
        if (this.refs.privilegeSelect.selectedIndex == 0)
            return 'public';
        else
            return 'partner'
    }
}