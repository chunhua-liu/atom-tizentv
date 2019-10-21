var launchEmulatorApp = (function () {
	const launcher = require('./appLauncher');
	const common = require('./common');
    const logger = require('./logger');
    
	var moduleName = 'Run on TV Emulator';

	return {
		// Handle 'Run on TV Emulator' command
		handleCommand: function(debugMode) {
			if (debugMode == undefined) {
				debugMode = false;
			}

			let workspacePath = common.getWorkspacePath();
			if (typeof(workspacePath) == 'undefined')
			{
				let noWorkspace = 'No project in workspace, please check!';
				logger.error(moduleName, noWorkspace);
				common.showMsgOnWindow(common.ENUM_WINMSG_LEVEL.ERROR, noWorkspace);
				return;
			}
			if (debugMode) {
				launcher.debugAppOnEmualtor(workspacePath);
			}
			else {
				launcher.launchAppOnEmualtor(workspacePath);
			}
			
		}
	}
})(); 
module.exports = launchEmulatorApp; 
