/**
 * 单例 promise版
 * @param p
 * @param getKey 从参数里取一个直用于缓存该请求是否合并
 * @example
 * const getProjectSingle =  singlePromise(getProject, (projectId) => projectId)
 * /// 3合一
 * getProjectSingle('1');
 * getProjectSingle('1');
 * getProjectSingle('1');
 * /// 参数不一致，会发出
 * getProjectSingle('2');
 */
 export function singlePromise<T extends (...arg: any[]) => Promise<any>>(p: T, getKey: (...arg: Parameters<T>) => string | number) {
    const cache: Record<string, Promise<any> | undefined> = {}
    return (...arg: Parameters<T>): ReturnType<T> => {
      const key = getKey(...arg)
      if (cache[key]) {
        return cache[key] as ReturnType<T>
      }
      cache[key] = p(...arg).finally(() => {
        delete cache[key]
      })
      return cache[key] as ReturnType<T>
    }
}
  
