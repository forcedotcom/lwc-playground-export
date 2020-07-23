# playground-export

This is a CLI plugin to download your LWC Playground projects and optionally convert them to an SFDX project.

To use this plugin run the following:

````
$ sfdx plugin:install playground-export
$ sfdx playground:export -i <ID> --name myproj

<!-- toc -->
* [playground-export](#playground-export)
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
* [`sfdx playground:export -i <string> [-n <string>] [-p] [--internal] [--remote <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-playgroundexport--i-string--n-string--p---internal---remote-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx playground:export -i <string> [-n <string>] [-p] [--internal] [--remote <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

print a greeting and your org IDs

```
USAGE
  $ sfdx playground:export -i <string> [-n <string>] [-p] [--internal] [--remote <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -i, --id=id                                                                       (required) the id of the project to
                                                                                    download. The url is like
                                                                                    https://developer.salesforce.com/doc
                                                                                    s/component-library/tools/playground
                                                                                    /<id>/1/edit

  -n, --name=name                                                                   The name of your project

  -p, --project                                                                     Use an SFDX project type

  --internal                                                                        Use the internal version of
                                                                                    playground

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

  --remote=remote                                                                   The url of the git repository that
                                                                                    you want to push your project to

EXAMPLES
  $ sfdx playground:export --id 7yD2PkxT7
  $ sfdx playground:export --id 7yD2PkxT7 --name MyProject
  $ sfdx playground:export --id 7yD2PkxT7 --project
```

_See code: [lib/commands/playground/export.js](https://github.com/ntotten/lwc-playground-export/blob/v1.0.0/lib/commands/playground/export.js)_
<!-- commandsstop -->
