import { selector } from 'recoil';
import { imageState } from './atoms';

export const uriSelector = selector({
  key: 'uriSelector',
  get: ({ get }) => {
    const { uri } = get(imageState);
    return uri;
  },
});

export const widthSelector = selector({
  key: 'widthSelector',
  get: ({ get }) => {
    const { width } = get(imageState);
    return width;
  },
});

export const heightSelector = selector({
  key: 'heightSelector',
  get: ({ get }) => {
    const { height } = get(imageState);
    return height;
  },
});
