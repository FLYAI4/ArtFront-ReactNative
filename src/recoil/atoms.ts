import { atom } from 'recoil';

export const imageState = atom({
  key: 'imageState',
  default: {
    uri: '',
    width: 0,
    height: 0,
  },
});