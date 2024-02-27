import { atom } from 'recoil';

export const imageState = atom({
  key: 'imageState',
  default: {
    uri: '',
    width: 510,
    height: 680,
  },
});