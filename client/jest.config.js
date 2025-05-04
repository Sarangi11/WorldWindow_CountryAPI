export const testEnvironment = 'jsdom';
export const transform = {
    '^.+\\.[jt]sx?$': 'babel-jest'
};
export const setupFilesAfterEnv = ['<rootDir>/jest.setup.js'];
export const moduleNameMapper = {
    '\\.(css|scss)$': 'identity-obj-proxy'
};
  