export const once = fn => {
  let done = false;
  return (...args) => {
    if(!done) {
      done = true;
      console.log('once');
      fn(...args);
    }
  };
};