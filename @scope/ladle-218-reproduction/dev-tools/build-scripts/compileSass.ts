import { program } from 'commander';
import sass from 'sass';
import path from 'path';
import fs from 'fs';
import { mkdir } from 'node:fs/promises';

interface CliArgs {
  loadLibraries: string[];
  loadPaths: string[];
  input: string;
  output: string;
}
function parseCliArgs(): CliArgs {
  const collect = (value: string, previous: string[]): string[] => previous.concat(value);
  program
    .option(
      '--load-library <NAME>',
      'An external dependency to add to sass load-path, like @scope/clinicals-sass-utils',
      collect,
      []
    )
    .option('--load-path <PATH>', 'An internal dependency to add to sass load-path, like ../..', collect, [])
    .requiredOption('-n, --input <PATH>', 'The scss file to read')
    .requiredOption('-n, --output <PATH>', 'The css file to write')
    .parse();

  const parsedOptions = program.opts();
  const parsedArgs: CliArgs = {
    loadLibraries: parsedOptions.loadLibrary,
    loadPaths: parsedOptions.loadPath,
    input: parsedOptions.input,
    output: parsedOptions.output,
  };
  return parsedArgs;
}

async function compileSass(): Promise<void> {
  const { loadPaths, loadLibraries, input, output } = parseCliArgs();
  const allLoadPaths = [
    ...loadPaths,
    // dart-sass doesn't seem to play nicely with external imports and yarn PnP on
    // the command line. Get around that issue by using `require.resolve` to find the
    // main javascript import, then path.dirname until we find the virtual "node_modules"
    // directory.
    ...loadLibraries.map((library) => {
      const libraryPath = require.resolve(library);
      let lastModulesPath = libraryPath;
      let nodeModulesPath = path.dirname(lastModulesPath);
      while (path.basename(nodeModulesPath) !== 'node_modules' && nodeModulesPath !== lastModulesPath) {
        lastModulesPath = nodeModulesPath;
        nodeModulesPath = path.dirname(nodeModulesPath);
      }
      return path.basename(nodeModulesPath) === 'node_modules' ? nodeModulesPath : libraryPath;
    }),
  ];
  const result = sass.compile(input, {
    loadPaths: allLoadPaths,
    sourceMap: false,
    style: 'compressed',
    verbose: true,
  });
  await mkdir(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, result.css);
}
compileSass();
