// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../../src/image-magick';
import { IMagickImage, MagickImage } from '../../../src/magick-image';
import { MagickColors } from '../../../src/magick-colors';
import { PixelCollection } from '../../../src/pixels/pixel-collection';
import { colorAssert } from '../../color-assert';

let image: IMagickImage;
let pixels: PixelCollection;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
    image.read('logo:');
    pixels = PixelCollection._create(image);
});

afterEach(() => {
    pixels.dispose();
    image.dispose();
});

describe('PixelCollection#setArea', () => {
    it('should set the pixels at the specified location', () => {
        const data = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
        pixels.setArea(0, 0, 2, 2, data);

        colorAssert(image, 0, 0, MagickColors.Black);
        colorAssert(image, 0, 1, MagickColors.Black);
        colorAssert(image, 1, 0, MagickColors.Black);
        colorAssert(image, 1, 1, MagickColors.Black);
    });
});