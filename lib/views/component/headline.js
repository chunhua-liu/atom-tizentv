'use babel'
const etch = require('etch');

module.exports = class TizenTitle {
    constructor(props, children) {
        this.props = props ? props : {};
        this.children = children;
        etch.initialize(this);
    }

    render() {
        /** @jsx etch.dom */
        return (
            <div className='block' style='margin-bottom: 50px'>
                <h1 className='section-heading block'>{this.children}</h1>
                <p>{this.props.description}</p>
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