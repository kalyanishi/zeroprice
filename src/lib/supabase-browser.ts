// Mock Supabase Browser client for frontend-only mode
const createMockSupabase = () => {
  const handler: ProxyHandler<any> = {
    get(target, prop) {
      if (typeof target[prop] === 'function') {
        return (...args: any[]) => createMockSupabase();
      }
      if (prop === 'then') {
        return (resolve: any) => resolve({ data: [], error: null, count: 0 });
      }
      return createMockSupabase();
    },
    apply(target, thisArg, argumentsList) {
      return createMockSupabase();
    }
  };
  const mock: any = () => {};
  return new Proxy(mock, handler);
};

export const supabaseBrowser = createMockSupabase();

