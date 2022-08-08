import os from 'os';
import which from 'which';
import { spawn } from 'node:child_process';

/** Helper script to run "yarn install" on the same Docker image used by Jenkins
 * Useful for Installing OS-specific packages to .yarn/cache.
 */

if (os.platform() !== 'linux') {
  which('docker').then((dockerPath) => {
    const cmd = spawn(dockerPath, [
      'run',
      '--rm',
      '--entrypoint',
      '/usr/bin/yarn',
      '--workdir=/var/lib/jenkins/workspace',
      '-v',
      `${process.cwd()}:/var/lib/jenkins/workspace`,
      'docker-iaas.artifactory.aws.athenahealth.com/app-fabric/node:16',
      'install',
    ]);
    cmd.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    cmd.stderr.on('data', (data) => {
      console.error(data.toString());
    });
    cmd.on('close', (code) => {
      if (code !== 0) {
        process.exit(code || 1);
      }
    });
  });
}
