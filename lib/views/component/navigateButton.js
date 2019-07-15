'use babel'
const etch = require('etch');

module.exports = class NavigateButton {
    constructor(props) {
        this.props = props ? props : {};
        etch.initialize(this);
    }

    render() {
        let disableBack = !this.props.hasOwnProperty('firstpage') ? false : this.props.firstpage;
        let disableFinish = this.props.hasOwnProperty('lastpage') ? false : true;
        let disableNext = !disableFinish;
        /** @jsx etch.dom */
        return (
            <div className='block' style='margin-top: 10px; float:right'>
                <div className='inline-block btn-group'>
                    <button ref='backBtn' className='btn' disabled={disableBack}>{'< Back'}</button>
                    <button ref='nextBtn' className='btn' disabled={disableNext}>{'Next >'}</button>
                </div>
                <button ref='finishBtn' className='inline-block btn' disabled={disableFinish}>Finish</button>
                <button ref='cancelBtn' className='inline-block btn' >Cancel</button>
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

    addEventListener(type, listener) {
        switch(type) {
            case 'clickNext':
                this.refs.nextBtn.addEventListener('click', listener);
                break;
            case 'clickBack':
                this.refs.backBtn.addEventListener('click', listener);
                break;
            case 'clickFinish':
                this.refs.finishBtn.addEventListener('click', listener);
                break;
            case 'clickCancel':
                this.refs.cancelBtn.addEventListener('click', listener);
                break;
        }
    }

    removeEventListener(type, listener) {
        switch(type) {
            case 'clickNext':
                this.refs.nextBtn.removeEventListener('click', listener);
                break;
            case 'clickBack':
                this.refs.backBtn.removeEventListener('click', listener);
                break;
            case 'clickFinish':
                this.refs.finishBtn.removeEventListener('click', listener);
                break;
            case 'clickCancel':
                this.refs.cancelBtn.removeEventListener('click', listener);
                break;
        }
    }
}