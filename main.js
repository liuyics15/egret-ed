const fs = require('fs');        //file system
const path = require('path');      //path work
const crypto = require('crypto');    //md5 tool
const chalk = require('chalk');


/*游戏根目录*/
const gameRoot = process.cwd();//'/../game_alpha/';
/*资源配置相对路径*/
const res_config_file_names = ['resource/default.res.json'];
/*脚本配置路径*/
const code_config_file_names = ['manifest.json', 'minfest.json'];
/*主题配置路径*/
const thm_config_file_names = ['resource/default.thm.json'];

async function assertPath() {
    return new Promise(function (resolve, reject) {
        let tocheck = res_config_file_names.concat(thm_config_file_names);
        tocheck.push(code_config_file_names[0]);
        let goodFile = 0;
        for (let i = 0; i < 3; i++) {
            let iPath = path.join(gameRoot, tocheck[i]);
            fs.access(iPath, fs.constants.R_OK | fs.constants.W_OK, function (err) {
                if (err) {
                    console.error(chalk.red(`no such file ${iPath}`));
                    return false;
                }
                goodFile++;
                if (goodFile == tocheck.length) {
                    resolve(true);
                }
            });
        }
    })
}

async function clearVersion() {
    let done = await assertPath();

    if (done) {
        console.log('clear version');
        unversonCode();
        unversonRes();
        unversonThm();
    }
}

async function setVersion() {
    let done = await assertPath();
    if (done) {
        console.log('add version');
        versionRes();
        versionThm();
        versionCode();
    }
}

/**
 * 文件MD5编码
 * @param text string
 * @return md5 string
 */
function md5(text) {
    return crypto.createHash('md5').update(text).digest('hex');
}

/**
 * url字符串加添加version
 * @param url 相对于root的路径 string
 * @param root 根目录 string
 * @return url+version string
 */
function versionUrl(url, root = gameRoot) {
    url = removeUrlVersion(url);
    let iPath = path.join(root, url);
    try {
        let file = fs.readFileSync(iPath);
        let back = url + '?v=' + md5(file.toString());
        return back;
    } catch (e) {
        console.warn(chalk.yellow(`  no such file: ${iPath}`));
        return url;
    }
}

/**
 * 删除url的version
 */
function removeUrlVersion(url) {
    let index = url.indexOf('?v');
    if (index > 0) {
        url = url.slice(0, index)
    }
    return url;
}

/**
 * 配置文件添加version
 * @param fileNames 配置文件名列表 string[]
 * @param listKeys 文件子列表键列表 string[]
 * @param interKey 条目url对应的键 string
 * @param root 根目录
 */
function versionConfig(fileNames, listKeys, interKey = null, root = gameRoot) {
    for (let i = 0; i < fileNames.length; i++) {
        let filePath = path.join(gameRoot, fileNames[i]);
        fs.readFile(filePath, function (err, data) {
            if (!data) {
                console.warn(`  no such config:${filePath}`);
            } else {
                try {
                    let config_data = JSON.parse(data.toString());
                    for (let j = 0; j < listKeys.length; j++) {
                        let files = config_data[listKeys[j]];
                        if (!files) {
                            console.warn(`    no such list :'${listKeys[j]}' at '${filePath}'`);
                            continue;
                        }
                        let length_k = files.length;
                        if (interKey) {
                            for (let k = 0; k < length_k; k++) {
                                let item = files[k];
                                item[interKey] = versionUrl(item[interKey], root);
                            }
                        } else {
                            for (let k = 0; k < length_k; k++) {
                                files[k] = versionUrl(files[k], root);
                            }
                        }
                    }
                    fs.writeFileSync(filePath, JSON.stringify(config_data, null, 2));
                } catch (e) {
                    console.warn(`  bad config,not a JSON:${filePath}`);
                }
            }
        });
    }
}

/**
 * 除去配置的version
 */
function unversionConfig(fileNames, listKeys, interKey = null) {
    for (let i = 0; i < fileNames.length; i++) {
        let filePath = path.join(gameRoot, fileNames[i]);
        fs.readFile(filePath, function (err, data) {
            if (!data) {
                console.warn(`  no such config:${filePath}`);
            } else {
                try {
                    let config_data = JSON.parse(data.toString());
                    for (let j = 0; j < listKeys.length; j++) {
                        let files = config_data[listKeys[j]];
                        if (!files) {
                            console.warn(chalk.reset.bold.yellow(`    no such list :'${listKeys[j]}' at '${filePath}'`));
                            continue;
                        }
                        let length_k = files.length;
                        if (interKey) {
                            for (let k = 0; k < length_k; k++) {
                                let item = files[k];
                                item[interKey] = removeUrlVersion(item[interKey]);
                            }
                        } else {
                            for (let k = 0; k < length_k; k++) {
                                files[k] = removeUrlVersion(files[k]);
                            }
                        }
                    }
                    fs.writeFileSync(filePath, JSON.stringify(config_data, null, 2));
                } catch (e) {
                    console.warn(`  bad config,not a JSON:${filePath}`);
                }
            }
        });
    }
}

/**
 * res配置加版本号
 */
function versionRes() {
    versionConfig(res_config_file_names, ['resources'], 'url', path.join(gameRoot, 'resource/'));
}

function unversonRes() {
    unversionConfig(res_config_file_names, ['resources'], 'url', path.join(gameRoot, 'resource/'));
}

/**
 * js代码加版本号
 */
function versionCode() {
    versionConfig(code_config_file_names, ['initial', 'game', 'min']);
}

function unversonCode() {
    unversionConfig(code_config_file_names, ['initial', 'game', 'min']);
}

/**
 * 皮肤配置加版本号
 */
function versionThm() {
    versionConfig(thm_config_file_names, ['exmls']);
}

function unversonThm() {
    unversionConfig(thm_config_file_names, ['exmls']);
}

module.exports = {
    clearVersion,
    setVersion
}