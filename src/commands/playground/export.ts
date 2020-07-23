import { flags, SfdxCommand } from "@salesforce/command";
import { Messages } from "@salesforce/core";
import { AnyJson } from "@salesforce/ts-types";
import fetch from "node-fetch";
import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";
import * as child_process from "child_process";
import * as process from "process";

const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);
const exec = promisify(child_process.exec);

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages("playground-export", "export");

interface ProjectFileTree {
  name: string;
  content?: string;
  children?: ProjectFileTree[];
}

interface ProjectData {
  raptorVersion: string;
  componentsVersion: string;
  sldsVersion: string;
  namespace: string;
  minify: boolean;
  compat: boolean;
  fileTree: ProjectFileTree;
}

interface Project {
  id: string;
  alias: string;
  version: number;
  createdAt: string;
  data: ProjectData;
  title: string;
  description: string;
  componentsVersion: string;
  lwcVersion: string;
  sldsVersion: string;
}

export default class Org extends SfdxCommand {
  public static description = messages.getMessage("commandDescription");

  public static examples = [
    "$ sfdx playground:export --id 7yD2PkxT7",
    "$ sfdx playground:export --id 7yD2PkxT7 --name MyProject",
    "$ sfdx playground:export --id 7yD2PkxT7 --project",
  ];

  public static args = [{ name: "file" }];

  protected static flagsConfig = {
    // flag with a value (-p, --project=VALUE)
    id: flags.string({
      char: "i",
      description: messages.getMessage("idFlagDescription"),
      required: true,
    }),
    name: flags.string({
      char: "n",
      description: messages.getMessage("nameFlagDescription"),
    }),
    project: flags.boolean({
      char: "p",
      description: messages.getMessage("projectFlagDescription"),
    }),
    internal: flags.boolean({
      description: messages.getMessage("internalFlagDescription"),
    }),
    remote: flags.string({
      description: messages.getMessage("remoteFlagDescription"),
    }),
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = false;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  public async run(): Promise<AnyJson> {
    const { id, name, remote, internal } = this.flags;
    const isSfdx = this.flags.project;

    this.log(`Downloading project ${id}...`);

    let host = internal
      ? "playground.lwcjs.org"
      : "d3nm9grey5nsoo.cloudfront.net";

    if (internal) {
      process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
    }
    const res = await fetch(`https://${host}/api/projects/${id}`);
    const exported = await res.json();

    let projectName = name || id;

    let rootDir: string;
    let repoDir: string;
    if (isSfdx) {
      const output = await exec(
        `sfdx force:project:create -n ${name || id} --json`
      );

      const {
        result: { outputDir },
      } = JSON.parse(output.stdout);

      rootDir = path.join(
        outputDir,
        projectName,
        "force-app",
        "main",
        "default",
        "lwc"
      );

      repoDir = path.join(outputDir, projectName);
    } else {
      rootDir = path.join(process.cwd(), projectName);
      repoDir = rootDir;
      try {
        await mkdir(rootDir);
      } catch (err) {
        this.log(JSON.stringify(err));
      }
    }

    this.log(`Project created at ${repoDir}`);

    try {
      await this.writeProject(rootDir, exported, isSfdx);
    } catch (err) {
      this.log(JSON.stringify(err));
    }

    if (remote) {
      await this.pushGit(repoDir, remote);
    }

    return { id };
  }

  private async writeProject(
    rootDir: string,
    project: Project,
    isSfdx: boolean
  ) {
    project.data.fileTree?.children?.forEach((node) => {
      if (node.name === "main.js" && !isSfdx) {
        // Only write the main.js for non-sfdx projects
        this.writeNode(rootDir, node);
      } else {
        this.writeNode(rootDir, node);
      }
    });
  }

  private async writeNode(parentDir: string, node: ProjectFileTree) {
    if (node.content) {
      // This is a file.
      await writeFile(path.join(parentDir, node.name), node.content, "utf8");
    } else {
      const cmpDir = path.join(parentDir, node.name);
      await mkdir(cmpDir);
      node.children?.forEach((node) => this.writeNode(cmpDir, node));
    }
  }

  private async pushGit(rootDir: string, remote: string) {
    try {
      this.log(`Pushing repository to ${remote}`);
      await exec(
        `cd ${rootDir} && git init && git remote add origin ${remote} && git add -A && git commit -m "Exported source" && git checkout -b main && git push --set-upstream origin main --force`
      );
    } catch (err) {
      this.log(err.stderrd);
    }
  }
}
