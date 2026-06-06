import St from 'gi://St';
import Clutter from 'gi://Clutter';
import GLib from 'gi://GLib';

import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource://org/gnome/shell/ui/popupMenu.js';
import * as Volume from 'resource://org/gnome/shell/ui/status/volume.js';

// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/extensions/extension.js
// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/main.js
// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/panelMenu.js
// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/popupMenu.js
// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/status/volume.js

export default class VolumeMixer extends Extension {
    enable() {
        // Create a panel button
        this._indicator = new PanelMenu.Button(0.5, this.metadata.name, false);
        // Add an icon
        const icon = new St.Icon({
            icon_name: 'face-laugh-symbolic',
            style_class: 'system-status-icon',
        });
        this._indicator.add_child(icon);
        // Add the indicator to the panel
        Main.panel.addToStatusArea(this.uuid, this._indicator);

        var mixerControl = new Volume.getMixerControl();
        this._indicator.menu.addMenuItem(new PopupMenu.PopupMenuItem(mixerControl.name));

        this._sourceId = GLib.timeout_add_seconds(
            GLib.PRIORITY_DEFAULT,
            1,
            this._callback
        );
    }

    _callback() {
        // https://gitlab.gnome.org/GNOME/gnome-control-center/-/blob/main/panels/sound/cc-volume-levels-page.c?ref_type=heads
        return GLib.SOURCE_CONTINUE;
    }

    disable() {
        this._indicator?.destroy();
        this._indicator = null;

        if (this._sourceId) {
            GLib.Source.remove(this._sourceId);
            this._sourceId = null;
        }
    }
}
