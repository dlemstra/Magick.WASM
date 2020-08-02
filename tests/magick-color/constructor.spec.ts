/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { MagickColor } from '../../src/magick-color';

beforeEach(() => {
    ImageMagick._api = (global as any).native;
});

describe('MagickColor#constructor', () => {
    it('should set throw error when color is invalid', () => {
        expect(() => {
            new MagickColor("foobar");
        }).toThrowError('invalid color specified');
    });

    it('should set the properties', () => {
        const color = new MagickColor("#abcdef42");
        expect(color.r).toEqual(171);
        expect(color.g).toEqual(205);
        expect(color.b).toEqual(239);
        expect(color.a).toEqual(66);
        expect(color.isCmyk).toEqual(false);
    });

    it('should read cmyk color', () => {
        const color = new MagickColor("cmyka(5%,10%,20%,40%,0.8)");
        expect(color.r).toEqual(13);
        expect(color.g).toEqual(26);
        expect(color.b).toEqual(51);
        expect(color.a).toEqual(204);
        expect(color.isCmyk).toEqual(true);
    });
});