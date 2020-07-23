playground-export
=================

Download your playground project.

[![Version](https://img.shields.io/npm/v/playground-export.svg)](https://npmjs.org/package/playground-export)
[![CircleCI](https://circleci.com/gh/https://github.com/ntotten/lwc-playground-export/lwc-playground-export/tree/master.svg?style=shield)](https://circleci.com/gh/https://github.com/ntotten/lwc-playground-export/lwc-playground-export/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/https://github.com/ntotten/lwc-playground-export/lwc-playground-export?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/lwc-playground-export/branch/master)
[![Codecov](https://codecov.io/gh/https://github.com/ntotten/lwc-playground-export/lwc-playground-export/branch/master/graph/badge.svg)](https://codecov.io/gh/https://github.com/ntotten/lwc-playground-export/lwc-playground-export)
[![Greenkeeper](https://badges.greenkeeper.io/https://github.com/ntotten/lwc-playground-export/lwc-playground-export.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/https://github.com/ntotten/lwc-playground-export/lwc-playground-export/badge.svg)](https://snyk.io/test/github/https://github.com/ntotten/lwc-playground-export/lwc-playground-export)
[![Downloads/week](https://img.shields.io/npm/dw/playground-export.svg)](https://npmjs.org/package/playground-export)
[![License](https://img.shields.io/npm/l/playground-export.svg)](https://github.com/https://github.com/ntotten/lwc-playground-export/lwc-playground-export/blob/master/package.json)

<!-- toc -->
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g playground-export
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
playground-export/1.0.0 darwin-x64 node-v12.18.1
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx playground:export -i <string> [-n <string>] [-p] [--internal] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-playgroundexport--i-string--n-string--p---internal---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx playground:export -i <string> [-n <string>] [-p] [--internal] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

print a greeting and your org IDs

```
USAGE
  $ sfdx playground:export -i <string> [-n <string>] [-p] [--internal] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -i, --id=id                                                                       (required) the project to download
  -n, --name=name                                                                   The name of your project
  -p, --project                                                                     Use an SFDX project type

  --internal                                                                        Use the internal version of
                                                                                    playground

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLES
  $ sfdx playground:export --id 7yD2PkxT7
  $ sfdx playground:export --id 7yD2PkxT7 --name MyProject
  $ sfdx playground:export --id 7yD2PkxT7 --project
```

_See code: [lib/commands/playground/export.js](https://github.com/ntotten/lwc-playground-export/blob/v1.0.0/lib/commands/playground/export.js)_
<!-- commandsstop -->
<!-- debugging-your-plugin -->
# Debugging your plugin
We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `hello:org` command: 
1. Start the inspector
  
If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch: 
```sh-session
$ sfdx hello:org -u myOrg@example.com --dev-suspend
```
  
Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:
```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run hello:org -u myOrg@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program. 
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
<br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
Congrats, you are debugging!
