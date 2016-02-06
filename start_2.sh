#!/bin/sh

react-native start > /dev/null 2>&1 &
eval $ANDROID_HOME/platform-tools/adb reverse tcp:8081 tcp:8081
react-native run-android
