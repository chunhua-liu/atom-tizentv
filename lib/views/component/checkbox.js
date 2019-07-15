'use babel'
const etch = require('etch');

module.exports = class Checkbox {
    constructor(props, children) {
        this.props = props ? props : {};
        this.children = children;
        etch.initialize(this);
        Object.defineProperty(this, 'value', {get: function() {return this.refs.checkBox.checked;}});
    }

    render() {
        let defaultChecked = this.props.hasOwnProperty('checked') && this.props.checked == true ? true : false;

        /** @jsx etch.dom */
        return (
            <div className='block'>
                <label className='input-label' style='margin-top: 20px'>
                    <input ref='checkBox' className='input-checkbox' type='checkbox' checked={defaultChecked}/>
                    {this.children}
                </label>
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

}