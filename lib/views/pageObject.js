const { CompositeDisposable, Emitter } = require('atom');

var pageReference = 0;
var pageEmitter = null;
var pageDisposable = null;
var pageArray = null;

module.exports = class PageObject {
    constructor(props) {
        this.props = props,
        this.panel = null;
        this.isVisible = false;
        this.disposable = new CompositeDisposable();
        pageArray.push(this);
    }

    /* This function must be called before create any new page object */
    static addFinishListener(callback) {
        pageReference = 0;
        pageArray = new Array();
        pageEmitter = new Emitter();
        pageDisposable = pageEmitter.on('tizensdk-operation-finish', function() {
            pageArray.forEach((page) => {
                page.destroy();
            });
            pageArray = null;
            callback();
        });
    }

    static removeFinishListener() {
        pageDisposable.dispose();
        pageDisposable = null;
        pageEmitter = null;
        pageArray = null;
        pageReference = 0;
    }

    show() {
        if (this.panel == null) {
            pageReference++;
            this.panel = atom.workspace.addModalPanel({item: this.props.view.element, autoFocus: true});
            this.disposable.add(this.panel.onDidChangeVisible((visible) => {
                if (visible == false) {
                    pageReference--;
                    if (pageReference == 0) {
                        pageEmitter.emit('tizensdk-operation-finish');
                    }
                }  
            }));
            this.disposable.add(this.panel.onDidDestroy(() => {
                this.panel = null;
                this.props.view.destroy();
                this.props.view = null;
            }));
        }
        else {
            pageReference++;
            console.log(pageReference);
            this.panel.show();
        }
    }

    hide() {
        this.panel.hide();
    }

    destroy() {
        if (this.panel != null) {
            this.panel.destroy();
        }

        this.disposable.dispose();
    }

    getView() {
        return this.props.view;
    }
}


