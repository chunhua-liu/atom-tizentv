var common = require('./common');
var logger = require('./logger');
var launchEmulatorApp = require('./launchEmulatorApp');
//var launchSimulator = require('./launchSimulator');
var launchTarget = require('./launchTarget'); 
const projectListView = require('./project-list-view');

function handleCommand() {

    var optionTips = 'Please select a target';
    var options = [
        'Debug On TV',
        'Debug On TV Emulator'
    ];

    projectListView.showSelectList(options, optionTips).then(function(target) {
        if (!target) {

            var waringMsg = 'Cancelled the "Run Application" without selecting target!';
        	logger.warning(moduleName, waringMsg);
			common.showMsgOnWindow(common.ENUM_WINMSG_LEVEL.WARNING, waringMsg);
			throw waringMsg;
        }
        if (target === 'Debug On TV') {
			common.setFuncMode(common.ENUM_COMMAND_MODE.WEB_INSPECTOR_ON_TV);
            launchTarget.handleCommand();
            return;
        }
        else if (target === 'Debug On TV Emulator') {
            common.setFuncMode(common.ENUM_COMMAND_MODE.WEB_INSPECTOR_ON_EMULATOR);
            launchEmulatorApp.handleCommand();
            return;
        }
    });
}
exports.handleCommand = handleCommand;