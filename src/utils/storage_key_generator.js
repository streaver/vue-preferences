const DEFAULT_STORAGE_PREFIX = "vp";

function generateKey(name, prefix = DEFAULT_STORAGE_PREFIX) {
  return `${prefix}:${name}`;
}

export default generateKey;
export { generateKey, DEFAULT_STORAGE_PREFIX };
