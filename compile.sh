#!/bin/bash

mkdir -p ~/.local/share/gnome-shell/extensions/volume-mixer@cordeiro-bruno.github.io
cp -r  * ~/.local/share/gnome-shell/extensions/volume-mixer@cordeiro-bruno.github.io
#gnome-extensions enable volume-mixer@cordeiro-bruno.github.io
dbus-run-session gnome-shell --devkit --wayland
