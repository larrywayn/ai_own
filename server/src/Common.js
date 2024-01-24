const { spawn } = require("child_process");

async function spawnTerminalScript(type, scriptParameter, silent) {
  console.log("ScriptParameter:", scriptParameter);
  const child = spawn(type, scriptParameter, { shell: true });
  let gatheredData = "";
  if (!silent) {
    for await (const chunk of child.stdout) {
      console.log("stdout chunk: " + chunk);
      gatheredData += chunk;
    }
  }
  let error = "";
  for await (const chunk of child.stderr) {
    console.error("stderr chunk: " + chunk);
    error += chunk;
  }
  const exitCode = await new Promise((resolve, reject) => {
    child.on("close", resolve);
  });
  if (exitCode) {
    throw new Error(`subprocess error exit ${exitCode}, ${error}`);
  }
  return gatheredData;
}

async function spawnFFMPEGScript(scriptParameter) {
  return spawnTerminalScript("libs/ffmpeg", scriptParameter, true);
}

async function spawnPythonScript(scriptParameter) {
  return spawnTerminalScript("python", scriptParameter);
}

async function spawnBashScript(scriptParameter) {
  return spawnTerminalScript("bash", scriptParameter);
}

function getReturnParameter(returnValueString) {
  const gatheredTextList = returnValueString.split("+#&#+");
  const gatheredText = gatheredTextList[gatheredTextList.length - 1].replace(
    /(?:\\[rn]|[\r\n]+)+/g,
    ""
  );
  return gatheredText;
}

module.exports = {
  spawnBashScript,
  spawnPythonScript,
  spawnFFMPEGScript,
  getReturnParameter,
};
