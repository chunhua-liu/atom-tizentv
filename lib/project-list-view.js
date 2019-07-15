var Q = require('q');
const SelectListView = require('atom-select-list');

var selectList = null;
var inputBox = null;

var passwordValue = '';
var isPassword = false;

class ProjectListView {
    constructor() {
        this.selectListView = new SelectListView( {
        items:[], 
        infoMessage:'',
        query:'',
        filterKeyItem:(project) => project, 
        elementForItem:(project) =>  {
            const li = document.createElement('li');
            li.textContent = project;
            return li;
        }, 
        // for project select
        didConfirmSelection:(project) =>  {
            this.deferred.resolve(project);
            this.cancel();
        }, 
        // for project path input
        didConfirmEmptySelection:() =>  {
            this.deferred.resolve(this.getEmptyQuery());
            this.cancel();
        }, 
        didCancelSelection:() =>  {
            this.deferred.resolve(null);
            this.cancel();
        },
        didChangeQuery:(input) => {
            if (isPassword == true && input.length > 0) {
                var newWord = input.charAt(input.length - 1);
                //console.log('newWorld is ' + newWord);
                if (newWord != '*')
                {
                    passwordValue += newWord;
                    //console.log('input password :' + input);
                    this.hidePassword(input);
                }
            }
        }
    });
    this.selectListView.element.classList.add('project-list-view');
    this.panel = atom.workspace.addModalPanel( {item:this.selectListView});
    }

    getEmptyQuery () {
        if (isPassword == true) {
            return passwordValue;
        }
        else {
            return this.selectListView.getQuery();
        }
    }

    attach () {
        this.previousFocusedElement = document.activeElement;
        this.selectListView.reset();
        this.panel.show();
        this.selectListView.focus();
    }

    cancel () {
        isPassword = false;
        passwordValue = '';
        this.panel.hide();
        if (this.previousFocusedElement) {
            this.previousFocusedElement.focus();
            this.previousFocusedElement = null;
        }
    }

    destroy () {
        isPassword = false;
        passwordValue = '';
        this.cancel();
        this.panel.destroy();
        return this.selectListView.destroy();
    }

    hidePassword (input) {
        var hidepwd = input.replace(input.charAt(input.length - 1), '\*');
        //console.log('after replace, input is :' + hidepwd);
        this.selectListView.update({query:hidepwd});
    }

    async toggle (choices, msg) {
        this.deferred = Q.defer();
        await this.selectListView.update( {items:choices, infoMessage:msg});
        this.attach();
        return this.deferred.promise;
    }
}

function showSelectList (items, tips) {
    var deferred = Q.defer();

    if (selectList == null) {
        selectList = new ProjectListView();
    }

    selectList.toggle(items, tips).then(function (item) {
        deferred.resolve(item);
    });

    return deferred.promise;
}
exports.showSelectList = showSelectList;

function showInputBox (tips) {
    var deferred = Q.defer();
    
    if (inputBox == null) {
        inputBox = new ProjectListView();
    }

    inputBox.toggle('', tips).then(function (item) {
        deferred.resolve(item);
    });

    return deferred.promise;
}
exports.showInputBox = showInputBox;

function setPasswordMode () {
    passwordValue = '';
    isPassword = true;
}
exports.setPasswordMode = setPasswordMode;