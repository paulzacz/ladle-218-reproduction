#!/usr/bin/env groovy
if(env.BRANCH_NAME.startsWith('PR')) return;

String getProjectVersion(String projectPath) {
  String projectVersion = readJSON(file: "@scope/${projectPath}/package.json").version
  echo "${projectPath} version is ${projectVersion}";

  return projectVersion;
}

String gitTagForVersion(String version) {
  return "v" + version
}

Boolean gitTagAlreadyExists(String versionTag) {
  def foundTag = sh(script: "git tag -l  ${versionTag}", returnStdout: true).trim() ? true : false
  if (foundTag) {
    trace("Current commit: " + GIT_COMMIT);
    def tagRefs = sh(
      script: "git show-ref --dereference ${versionTag}",
      returnStdout: true
    )

    // If the tag points to the most recent commit, this is just a rebuild and that's ok.
    if (tagRefs.contains(GIT_COMMIT)) {
      trace("tag ${versionTag} already exists but commits are the same, continuing with build" as String);
      return false
    }
    else {
      return true
    }
  }
  else {
    return false
  }
}

node('worker-m5.xlarge-2') {
  def pipeline;
  def buildImage;
  String packageVersion;

  stage('Prepare Pipeline') {
    pipeline = new cicd.Pipeline();
    buildImage = docker.image('docker-prod.artifactory.aws.athenahealth.com/app-fabric/node:16');
    pipeline.cleanupAndCheckoutWithOptions([fetchTags: true])
  }

  buildImage.inside() {
    stage('Install dependencies') {
      // Optimization: Add --immutable-cache to ensure Jenkins never has to
      // download any modules.
      // Tradeoff: Must run `yarn install:jenkins` when updating certain packages
      // in order to install linux-specific packages. Must have Docker installed.
      sh("yarn install --immutable");
    }

    stage('Build') {
      sh("yarn turbo run build test lint");
    }

    if (env.BRANCH_NAME.equals('master') || env.BRANCH_NAME.equals('main')) {
      stage('Publish yarn packages') {
        withNPM(npmrcConfig: 'RPR_NPMRC_V2') {
          sh("YARN_NPM_AUTH_TOKEN=`cat .npmrc | awk -F\"=\" '\$1==\"//artifactory.aws.athenahealth.com:443/api/npm/npm-local/:_authToken\" {print \$2}'` yarn workspace @scope/ladle-218-reproduction npm publish")
        }
      }
    } // BRANCH_NAME.equals('master')
  } // buildImage.inside()

  if (env.BRANCH_NAME.equals('master') || env.BRANCH_NAME.equals('main')) {
    stage('Tag git') {
      packageVersion = getProjectVersion('ladle-218-reproduction');
      String tag = gitTagForVersion(packageVersion);
      // Production deployments must have a unique version.
      if (gitTagAlreadyExists(tag)) {
        // Fail the build because we're deploying new commits without changing the version.
        error("Error: release tag for ${versionTag} already exists. Failing Build.");
      }
      tagGit(tag);
    }
  } // BRANCH_NAME.equals('master')

  stage('Security scan') {
    if(['master', 'development'].contains(env.BRANCH_NAME)) {
      SCAScan();
    }
  }
}
