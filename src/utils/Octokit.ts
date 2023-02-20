import Cookies from "js-cookie";
import { getUser, loginOAuth } from "../api/github";
import { Octokit } from "@octokit/rest";
import { singlePromise } from "./singlePromise";

const redirect_uri = window.location.href
const login_url = `https://github.com/login/oauth/authorize?client_id=6a421acdfb303b06a3bf&scope=public_repo&redirect_uri=${redirect_uri}`;
// const login_url = `https://github.com/login/oauth/authorize?client_id=6a421acdfb303b06a3bf&scope=public_repo`;

export const REPO = "gradict-charts-doc"; // 仓库名称
const ORGANIZATION = 'Plothis';
const OWNER = ORGANIZATION; // 仓库的 owner

const searchParams = new URL(window.location.href).searchParams;
const config = {
  p: window.location.pathname,
  s: window.location.search
}
const configStr = sessionStorage.getItem('config')
console.log(searchParams.get('code'))
if (!searchParams.get('code')) {
  sessionStorage.setItem('config', JSON.stringify(config))
} else if (configStr) {
  try {
    const config = JSON.parse(configStr)
    const u = new URL(window.location.href)
    u.pathname = config.p;
    u.search = config.s;
    console.log(u)
    // window.history.replaceState(null, '', u.href)
    // sessionStorage.removeItem('config')
  } catch (error) {
    
  }
}


export const getAccessToken = singlePromise(async function () {
  let githubToken = Cookies.get("github-token");
  const searchParams = new URL(window.location.href).searchParams;
  if (githubToken) {
    return githubToken;
  }

  let code =
    searchParams.get("code") ||
    Cookies.get("github-code") ||
    "8c2cb19fe6abbcc64a6c";

  if (!code) {
    window.location.href = login_url
    return;
  } else {
    Cookies.set("github-code", code);
  }
  try {
    const data = await loginOAuth(code);
    Cookies.set("github-token", data.access_token, {
      expires: 86400000 * 7,
    });
    return data.access_token;
  } catch (error) {
    window.location.href = login_url;
  }
}, () => 1)

export function initOctokit() {
  let octokit: Octokit;
  let user: string;
  function getToken() {
    if (octokit) {
      return;
    }
    return getAccessToken().then((githubToken) => {
      octokit = new Octokit({
        auth: githubToken,
      });
    });
  }

  return {
    toLogin() {
      Cookies.remove("github-token");
      Cookies.remove("github-code");
      window.location.href = login_url;
    },
    async submit() {
      await getToken();
      await octokit.request("GET /repos/{owner}/{repo}/commits", {
        owner: OWNER,
        repo: REPO,
      });
    },
    async forkRepo() {
      await getToken();
      const response = await octokit.rest.repos.createFork({
        owner: OWNER,
        repo: REPO,
        // organization: OWNER
      });
      console.log(`Forked repo ${OWNER}/${REPO} to ${response.data.name}`);
      return response.data;
    },
    async pushFile (params: {
      owner: string;
      repo: string;
      path: string;
      content: string
      message: string
      sha?: string;
      branch?: string;
    }) {
      await getToken();
      const response = await octokit.repos.createOrUpdateFileContents({
        ...params,
        branch: 'master',
        content: Buffer.from(params.content, 'utf-8').toString("base64"), // 将内容编码为 base64 格式
      });
  
      return response.data?.content?.sha; // 返回提交的 SHA 值
    },
    async getFile (params: {
      owner?: string;
      // repo: string;
      path: string;
    }) {
      await getToken();
      const response = await octokit.repos.getContent({
        owner: params.owner || OWNER,
        repo: REPO,
        path: params.path,
        branch: 'master',
      });
      (response.data as any).content = Buffer.from((response.data as any).content, 'base64').toString('utf-8')
      return response.data as {
        size: number;
        name: string;
        path: string;
        content?: string | undefined;
        sha: string;
      };
    },
    async  createPullRequest(loginId: string) {
      await getToken();
      const response = await octokit.rest.pulls.create({
        owner: OWNER,
        repo: REPO,
        title: "New file added", // PR 标题
        head: `${loginId}:master`, // 提交到自己 fork 的仓库
        base: "contribution", // PR 发送到的分支
        body: "This is a new file", // PR 描述
      });
      console.log(`Created pull request #${response.data.number}`);
    }
  };
}
