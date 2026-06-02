'use strict';

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
var VolumeMixer = imports.modules.VolumeMixer

function init() {
    log("init ${Me.metadata.name} ${Me.metadata.version}")
}

function enable() {
    log("enable ${Me.metadata.name} ${Me.metadata.version}")
    VolumeMixer = new VolumeMixer();
}

function disable() {
    log("disable ${Me.metadata.name} ${Me.metadata.version}")
    if (VolumeMixer !== null) {
        VolumeMixer.destroy();
        VolumeMixer = null;
    }
}
