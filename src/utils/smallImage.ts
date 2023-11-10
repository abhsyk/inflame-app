import { Game } from '../types';

export const smallImage = (
  imagePath: Game['background_image'] | undefined,
  size: number
) => {
  if (!imagePath) return;
  if (imagePath.match(/media\/screenshots/)) {
    return imagePath.replace(
      'media/screenshots',
      `media/resize/${size}/-/screenshots`
    );
  } else {
    return imagePath.replace('media/games', `media/resize/${size}/-/games`);
  }
};
