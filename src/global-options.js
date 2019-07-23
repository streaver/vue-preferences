export function isValidStorage(storage) {
  const hasValidGetItemFunction = typeof storage.getItem === 'function';
  const hasValidSetItemFunction = typeof storage.setItem === 'function';

  console.assert(
    hasValidGetItemFunction,
    "You must provide a 'getItem' function as part of the storage"
  );
  console.assert(
    hasValidSetItemFunction,
    "You must provide a 'setItem' function as part of the storage"
  );

  return hasValidGetItemFunction && hasValidSetItemFunction;
}

export const globalOptions = {
  storage: window.localStorage,
};
