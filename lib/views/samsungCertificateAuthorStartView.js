'use babel'
const etch = require('etch');

module.exports = class SamsungCertificateAuthorStartView {
    constructor(props) {
        this.props = props;
        etch.initialize(this);
    }

    render() {
        /** @jsx etch.dom */
        return (
            <div className='section-container' style='overflow: hidden'>
                <h1 className='section-heading block'>Author Certificate</h1>
                <p>The author certificate provides a unique signature that is used when you sign your application with a certificate profile.</p>
                <div className='block' style='margin-top: 50px'>
                    <label className='input-label text-highlight' style='font-size: 15px'>
                        <input ref='createInput' className='input-radio' type='radio' name='authorRadio' checked/>
                        Create a new author certificate
                    </label>
                </div>
                <div className='block' style='margin-top: 25px'>
                    <label className='input-label text-highlight' style='font-size: 15px'>
                        <input ref='selectInput' className='input-radio' type='radio' name='authorRadio'/>
                        Select an existing author certificate
                    </label>
                </div>
                <div className='block' style='margin-top: 30px; float:right'>
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
        this.props.onClickNextBtn();
    }

    clickCancelBtn() {
        this.props.onClickCancelBtn();
    }

    isCreateNewSelected() {
        return this.refs.createInput.checked;
    }
}