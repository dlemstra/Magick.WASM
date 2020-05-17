/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { initializeImageMagick, ImageMagick } from "../lib/image-magick";
import { Magick } from "../lib/magick";
import { Quantum } from "../lib/quantum";

initializeImageMagick().then(async () => {
    console.log(Magick.imageMagickVersion);
    console.log('Delegates:', Magick.delegates);
    console.log('Features:', Magick.features);
    console.log('Quantum:', Quantum.depth);

    console.log('');
    ImageMagick.read('logo:', (image) => {
        console.log(image.toString());
    });

    ImageMagick.read('foobar:', (image) => {
        console.log(image.toString());
    });
}).catch((err) => {
    console.error(err);
});