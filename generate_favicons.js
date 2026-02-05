const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE = 'source_logo.svg';
const OUTPUT_DIR = 'public';

const SIZES = [
    { name: 'favicon-16x16.png', width: 16 },
    { name: 'favicon-32x32.png', width: 32 },
    { name: 'apple-touch-icon.png', width: 180 },
    { name: 'android-chrome-192x192.png', width: 192 },
    { name: 'android-chrome-512x512.png', width: 512 },
    // Favicon.ico is special, typically 32x32 for modern browsers or multi-size. 
    // We will just copy the 32x32 png to favicon.ico for simple compatibility if needed, 
    // OR just rely on the link tags. 
    // Let's create a 32x32 ico buffer
];

async function generate() {
    console.log('Generating favicons...');

    // Ensure output dir exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }

    // Generate PNGs
    for (const size of SIZES) {
        await sharp(SOURCE)
            .resize(size.width, size.width)
            .png()
            .toFile(path.join(OUTPUT_DIR, size.name));
        console.log(`Generated ${size.name}`);
    }

    // Generate favicon.ico (using 32x32)
    // Note: Sharp usually outputs PNG. For true .ico, we might need simple-rename or specific format.
    // However, modern browsers handle PNG at favicon.ico perfectly fine usually.
    // Standard practice for reliable ICO is to use a specific lib, but let's try mostly-standard approach:
    // We will just save the 32x32 version as favicon.ico for backward compat.
    await sharp(SOURCE)
        .resize(32, 32)
        .toFile(path.join(OUTPUT_DIR, 'favicon.ico'));
    console.log('Generated favicon.ico');

    console.log('Done!');
}

generate().catch(console.error);
