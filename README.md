# YETI SFRA



> YETI SFRA Site Repository



**Table of Contents:**

* [Cartridges](#cartridges)
* [Prerequisites](#prerequisites)
* [Getting Started](#getting-started)
* [Automated Site Imports](#automated-site-import-instructions)
* [Inspecting Cartridge Bundle Size](#inspecting-cartridge-bundle-size)
* [Cherry Picking Cartridges](#cherry-picking-cartridges)
* [Troubleshooting](#troubleshooting)

## Cartridges

NAME                                | DESCRIPTION
------------------------------------|-------------------------------------------------------------
`app_custom_yeti`                   | Custom cartridge overlay containing Org/Site specifics and SFRA modifications
`storefront-reference-architecture` | SFRA base with no changes (version reference in folder `package.json`)

## Prerequisites

- [X] You need to install [Node.js](https://nodejs.org/en/download/releases/) version [10.22.x](https://nodejs.org/download/release/v10.22.0/)

- [X] We suggest [VS Code](https://code.visualstudio.com/) with [Prophet Debugger](https://marketplace.visualstudio.com/items?itemName=SqrTT.prophet) for uploads and debugging your sandbox.

- [X] You should have an SSH key created and installed on your computer, and have added that key to your [GitHub Account](https://help.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh).

## Getting Started

1. Clone this repository.

2. Open a command-line prompt and navigate to the root directory of this repo on your local machine.

3. Run `npm install` to install all of the local dependencies

4. Copy `example.dw.json` file in the root directory and rename it 'dw.json'. Then put in your specific credentials. Keep in mind, the dataFor will build all the data in the data folder for those specific cartridges. If you would like to leave some data out, you can modify the references here. Your package.json file (data:initialize) will reference this list. The dataFinal reference points to the last data set that needs to be built. This is where you would add your attribute groupings since grouping are a replace and not a merge when they get imported in SFCC.

    <details><summary><b>SAMPLE dw.json</b></summary>

    ```json
    {
        "hostname": "bgdt-xxx.sandbox.us01.dx.commercecloud.salesforce.com",
        "username": "your.name@yeti.com",
        "password": "yourpassword",
        "code-version": "version1",
        "clientId": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "clientSecret": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "dataFor": ["app_storefront_base","yeti_site"],
        "dataFinal": "attribute_groups"
    }
    ```

    </details>

5. Assuming you are using VS Code, you will need to create a `launch.json` file for Prophet Debugger. Go to the Run and Debug panel and click `create a launch.json file` and then select `Attach to Sandbox`, or you can go to the top menu `Run > Add Configuration...`. It should look like this:

    <details><summary><b>SAMPLE launch.json</b></summary></details>

    ```json
    {
        "version": "0.2.0",
        "configurations": [
            {
                "type": "prophet",
                "request": "launch",
                "name": "Attach to Sandbox"
            }
        ]
    }
    ```

6. Run `npm run dev:build` to compile all cartriges

At this point you are ready to start developing.  If you are doing client side development, you should run `npm run watch` to watch all your client side changes. Also make sure to Enable Upload for Prophet Debugger. Note: when running `npm run watch`, the cartridges start uploading before the code finishes compiling, so it's helpful to do a "Clean Project/Upload All" after the compile is finished.

**Recommended VS Code Extensions**

|  | Extension | Details |
| :-: | --- | --- |
| <img src="https://sqrtt.gallerycdn.vsassets.io/extensions/sqrtt/prophet/1.3.12/1591000736002/Microsoft.VisualStudio.Services.Icons.Default" height="16"> | [Prophet Debugger](https://marketplace.visualstudio.com/items?itemName=SqrTT.prophet) | This is pretty much required for SFCC/SFRA Work |
| <img src="https://aaron-bond.gallerycdn.vsassets.io/extensions/aaron-bond/better-comments/2.0.5/1557930515925/Microsoft.VisualStudio.Services.Icons.Default" height="16"> | [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments) | Makes Code Comments more useful |
| <img src="https://streetsidesoftware.gallerycdn.vsassets.io/extensions/streetsidesoftware/code-spell-checker/1.9.0/1589974448396/Microsoft.VisualStudio.Services.Icons.Default" height="16"> | [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) | Handy if your fingers don't always type what you thought they did |
| <img src="https://editorconfig.gallerycdn.vsassets.io/extensions/editorconfig/editorconfig/0.15.1/1590371230963/Microsoft.VisualStudio.Services.Icons.Default" height="16"> | [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) | Helps with line ending issues across macOS & Windows |
| <img src="https://eamodio.gallerycdn.vsassets.io/extensions/eamodio/gitlens/10.2.2/1591818157905/Microsoft.VisualStudio.Services.Icons.Default" height="16"> | [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) | Shows who worked on code where your cursor has focus |
| <img src="https://fabiowquixada.gallerycdn.vsassets.io/extensions/fabiowquixada/vscode-isml-linter/1.0.0/1560124783765/Microsoft.VisualStudio.Services.Icons.Default" height="16"> | [ISML Linter](https://marketplace.visualstudio.com/items?itemName=fabiowquixada.vscode-isml-linter) | Adds Linting support for ISML files |


**Recommended VS Code Settings**

To fix a few white spacing issues between macOS and Windows developers, it is recommended to use the following VS Code settings ( these are UNIX friendly ).

> VS Code ? Preferences ? Settings ? Search for "trim"

Option                          | Value
--------------------------------|------------
Editor: Trim Auto Whitespace    | CHECKED
Files: Trim Final Newlines      | UNCHECKED
Files: Trim Trailing Whitespace | CHECKED
Trailing-spaces: Trim On Save   | CHECKED

## Automated Site Imports



1. 	Configure Open Commerce API Settings in Business Manager

    * A. Log into the Business Manager.
    * B. Navigate to Administration > Site Development > Open Commerce API Settings.
    * C. Select 'Data API' and 'Global' from the available select boxes.
    * D. Add the following permission set for your clientId to the existing configuration settings.

    Remember that `client_id` needs to match the 'CLIENTID' configured in your `.env` file.  If you already have clientId permissions created, please add the resources outlined in the snippet below to the existing clientId configuration. (Version is subject to change depending on the sandbox you're using. There also may be more configuration already added to the file. If this is the case, please append and not overwrite existing settings).

    <details><summary><b>SAMPLE JSON</b></summary>

    ```json
    {
      "_v": "15.4",
      "clients": [{
        "client_id": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "resources": [{
            "resource_id": "/code_versions",
            "methods": ["get"],
            "read_attributes": "(**)",
            "write_attributes": "(**)"
          },
          {
            "resource_id": "/code_versions/*",
            "methods": ["patch", "delete"],
            "read_attributes": "(**)",
            "write_attributes": "(**)"
          },
          {
            "resource_id": "/jobs/*/executions",
            "methods": ["post"],
            "read_attributes": "(**)",
            "write_attributes": "(**)"
          },
          {
            "resource_id": "/jobs/*/executions/*",
            "methods": ["get"],
            "read_attributes": "(**)",
            "write_attributes": "(**)"
          }
        ]
      }]
    }
    ```
    </details>

2. Configure Your WebDAV Permissions in Business Manager

    * A. Log into the Business Manager.
    * B. Navigate to Administration > Organization > WebDAV Client Permissions.
    * C. Add the following permission sets for your clientId to the existing configuration settings.

    Remember use the `client_id` as the 'CLIENTID' that is configured in your `.env` file.  If you already have clientId permissions created, please add the resources outlined in the snippet below to the existing clientId configuration.

    <details><summary><b>SAMPLE JSON</b></summary>

    ```json
    {
      "clients": [{
        "client_id": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "permissions": [{
            "path": "/cartridges",
            "operations": [
              "read_write"
            ]
          },
          {
            "path": "/impex",
            "operations": [
              "read_write"
            ]
          }
        ]
      }]
    }
    ```
    </details>

4. In root (this step may run for a while) NOTE: if you have issues with node, and npm, we highly encourage you to use and install NVM (node version manager). This will allow you to easily switch between node versions. If you have issues installing NVM make sure you have .bashrc, .bash_profile, .profile at the root of your user dir.

    * A. `npm run data:initialize` or `npm run data:update` If you are setting this up for the first time or need ALL the data pushed (catalog, images etc) then choose data:initialize. If you are needing just updates to the data like metadata updates, then choose `npm run data:update`. `npm run data:update` will not push storefront content, for eaxmple: catalog, content libraries, inventory, price books, site prefs, customer list
     * B. Please note that we are using npm package `@redvanworkshop/autobahn-cli` to build the data segmented out by cartridge `https://www.npmjs.com/package/@redvanworkshop/autobahn-cli`. If you wish to customize how/what data you pull in, you can reference the README after running `npm install` from `node_modules/@redvanworkshop/autobahn-cli/README.md`

### NOTE: To add new cartridge and get it building correctly:

1. Add a reference to the specific cartridge data in the data folder under a directory using the same name as the cartridge  - please if you need to add attributes to a shared grouping - please add them in the `attribute_groups` folder. This is the last import to run and will override any other previous group definition.
2. Lastly - add the reference to the new cartridge data folder in the `example.dw.json`, `project.dw.json`, and your local `dw.json` file in the `dataFor` array. THIS IS IMPORTANT. This file is used as not only an example, but also to build the data referenced in the YML files for Github Actions. This is where you add and remove the data built with Github actions according to what cartridges you need.
3. Also consider adding the cartridge to the cartridge path settings in the `site.xml` for one or more of the sites so that the cartridge is in the site's cartridge path settings if or when the site data import is executed.
4. Add a reference to the cartridge in the yml files under .github/workflows so they will be built with github actions.


## Inspecting Cartridge Bundle Size

You can enable Cartridge Bundle Analyzing via:

```bash
ANALYZE_BUNDLES=true npm run dev:compile
```

This will analyze the node packages in each cartridge and generate a specific HTML report in a `.analyze-bundle` directory.

As the code is compiled via webpack, an HTML file is generated that contains statistics on which parts of the code are taking up the most space in the bundled package.

This file is ignored in the git repo, so it does not get committed, but you can view an interactive report at any time by simply opening the HTML file in your browser.

## Cherry Picking Cartridges

If you do not want to use all the cartridges this project has to offer, this is pretty straight forward to do.  All you need to do is define which cartridges you want to use in your `dw.json` file.

Setting which cartridges you want in your `dw.json` file will achieve two things:

1. Prophet Debugger will only upload these cartridges ( see [their notes](https://github.com/SqrTT/prophet#using-the-uploader) on this)
2. When you run a compile process, e.g. `npm run dev:compile` it will ignore cartridges not defined in your `dw.json` cartridges list

    <details><summary><b>SAMPLE dw.json</b></summary>

    ```json
    {
        "hostname": "bgdt-xxx.sandbox.us01.dx.commercecloud.salesforce.com",
        "username": "your.name@yeti.com",
        "password": "yourpassword",
        "code-version": "version1",
        "clientId": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "clientSecret": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "dataFor": ["app_storefront_base","yeti_site"],
        "dataFinal": "attribute_groups",
        "cartridges": [
            "storefront-reference-architecture",
            "app_yeti_site",
            "link_adyen"
        ]
    }
    ```

    </details>
3. To then also cherry pick Data, you can run 'npx autobahn-cli import --config dw.json' which will pull from the 'dataFor' array in the dw.json file. You can also choose to specifially exclude/include cartridges by running other commands outlined by autobahn-cli README `node_modules/@redvanworkshop/autobahn-cli/README.md`

## Working with Windows & VS Code

**Environment Variables**

You will likely need to add some directories to your Environment Variables.  Open your Environment Variables and edit the Path variable.  You will want to add the following 3 directories:

* A. `C:\Program Files\Git\cmd`
* B. `C:\Program Files\Git\usr\bin`
* C. `C:\Program Files\Git\mingw64\libexec\git-core`

![](.github/images/git-windows-paths.png)
