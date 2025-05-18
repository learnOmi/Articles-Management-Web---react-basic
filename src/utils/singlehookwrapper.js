// wrappedComp是一个高阶组件，用于hook功能注入到组件中
export function hookWrapper (Component, ...wrapFunction) {
  return function WrappedComponent(props) {
    const hookList =  wrapFunction;
    const hookObject = {};
    hookList.map((fn) => {
      if (typeof fn !== 'function') {
        throw new Error('Invalid argument type');
      }
      const hookName = fn.name;
      if (hookName === '') {
        throw new Error('Invalid function name');
      }
      hookObject[hookName] = fn();
    })
    return <Component {...props} {...hookObject} />;
  };
}
