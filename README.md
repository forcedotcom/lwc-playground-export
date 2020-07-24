# Playground Export CLI Plugin

This is a CLI plugin to download your [LWC Playground](https://developer.salesforce.com/docs/component-library/tools/playground) projects and optionally convert them to an SFDX project.

## Usage

To install the plugin run:

```
$ sfdx plugins:install playground-export
```

To export a project to a folder run the following. The <ID> value is found in the url: `https://developer.salesforce.com/docs/component-library/tools/playground/<ID>/1/edit`

```
$ sfdx playground:export -i <ID> --name myproj
```

If you want to have the project pushed to a git repo set the remote flag.

```
$ sfdx playground:export -i <ID> --name myproj --remote https://github.com/username/repo
```

If you want to export the modules as a SFDX project set the template flag.

```
$ sfdx playground:export -i <ID> --name myproj --template sfdx
```

## Documentation

<!-- toc -->

- [Playground Export CLI Plugin](#playground-export-cli-plugin)
  <!-- tocstop -->
    <!-- install -->
    <!-- usage -->

```sh-session
$ npm install -g playground-export
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
playground-export/1.1.0 darwin-x64 node-v12.18.1
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```

<!-- usagestop -->
<!-- commands -->

- [`sfdx playground:export -i <string> [-n <string>] [--template <string>] [--internal] [--remote <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-playgroundexport--i-string--n-string---template-string---internal---remote-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx playground:export -i <string> [-n <string>] [--template <string>] [--internal] [--remote <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

print a greeting and your org IDs

```
USAGE
  $ sfdx playground:export -i <string> [-n <string>] [--template <string>] [--internal] [--remote <string>] [--json]
  [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -i, --id=id                                                                       (required) the id of the project to
                                                                                    download. The url is like
                                                                                    https://developer.salesforce.com/doc
                                                                                    s/component-library/tools/playground
                                                                                    /<id>/1/edit

  -n, --name=name                                                                   The name of your project

  --internal                                                                        Use the internal version of
                                                                                    playground

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

  --remote=remote                                                                   The url of the git repository that
                                                                                    you want to push your project to

  --template=template                                                               The template to use. valid options
                                                                                    are sfdx and none

EXAMPLES
  $ sfdx playground:export --id 7yD2PkxT7
  $ sfdx playground:export --id 7yD2PkxT7 --name MyProject
  $ sfdx playground:export --id 7yD2PkxT7 --template sfdx
```

_See code: [lib/commands/playground/export.js](https://github.com/ntotten/lwc-playground-export/blob/v1.1.0/lib/commands/playground/export.js)_

<!-- commandsstop -->
