#!/bin/sh
echo 'PARAM:' $BASH_SOURCE
RELATIVE_DIR=`dirname "$BASH_SOURCE"`
echo 'Dir:' $RELATIVE_DIR

cd $RELATIVE_DIR
SHELL_PATH=`pwd -P`
echo 'Script Dir:' $SHELL_PATH