import LRU from "lru-cache";

export const REPO_CACHE = new LRU({
  maxAge: 1000 * 60 * 60 // 1分钟
})

export function cache(repo) {
  const full_name = repo.full_name
  console.log('缓存的仓库信息', 'full_name', full_name, 'repo', repo)
  REPO_CACHE.set(full_name, repo)
}

// facebook/react
export function get(full_name) {
  return REPO_CACHE.get(full_name)
}

export function cacheArray(repos) {
  if (repos && Array.isArray(repos)) {
    repos.forEach(repo => cache(repo))
  }
}