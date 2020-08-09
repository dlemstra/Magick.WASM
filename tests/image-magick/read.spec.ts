/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { MagickColor } from '../../src/magick-color';
import { MagickReadSettings } from '../../src/settings/magick-read-settings';
import { TestFiles } from '../test-files';
import { pixelColor } from '../pixel-color';
import * as fs from "fs";
import * as util from "util";

beforeAll(() => { ImageMagick._api = (global as any).native; });

describe('ImageMagick#read', () => {
    it('should read built-in image async', async () => {
        await ImageMagick.read('logo:', async (image) => {
            expect(image.width).toBe(640);
            expect(image.height).toBe(480);
        });
    });

    it('should read built-in image', () => {
        ImageMagick.read('wizard:', (image) => {
            expect(image.width).toBe(480);
            expect(image.height).toBe(640);
        });
    });

    it('should read image from array async', async () => {
        const readFile = util.promisify(fs.readFile);
        const data = await readFile(TestFiles.imageMagickJpg);
        await ImageMagick.read(data, (image) => {
            expect(image.width).toBe(123);
            expect(image.height).toBe(118);
        });
    });

    it('should read image from array', () => {
        const data = fs.readFileSync(TestFiles.imageMagickJpg);
        ImageMagick.read(data, (image) => {
            expect(image.width).toBe(123);
            expect(image.height).toBe(118);
        });
    });

    it('should read correct image when width and height are specified', () => {
        const settings = new MagickReadSettings(
        {
            width: 2,
            height: 3
        });

        ImageMagick.read('xc:red', settings, (image) => {
            expect(image.width).toBe(2);
            expect(image.height).toBe(3);
        });
    });

    it('should read correct image when width and height are specified async', async () => {
        const settings = new MagickReadSettings(
        {
            width: 2,
            height: 3
        });

        await ImageMagick.read('xc:red', settings, (image) => {
            expect(image.width).toBe(2);
            expect(image.height).toBe(3);
        });
    });

    it('should read correct image when color is specified', () => {
        ImageMagick.read(new MagickColor('lime'), 1, 2, (image) => {
            expect(image.width).toBe(1);
            expect(image.height).toBe(2);
            expect(pixelColor(image, 0, 1)).toBe('#00ff00ff');
        });
    });

    it('should read correct image when color is specified async', async () => {
        await ImageMagick.read(new MagickColor('lime'), 1, 2, (image) => {
            expect(image.width).toBe(1);
            expect(image.height).toBe(2);
            expect(pixelColor(image, 0, 1)).toBe('#00ff00ff');
        });
    });
});
