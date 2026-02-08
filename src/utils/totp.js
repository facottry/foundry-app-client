/**
 * Simple TOTP Generator using Web Crypto API
 * Algorithm: HMAC-SHA1
 * Period: 30s
 * Digits: 6
 */

const stringToUint8Array = (str) => {
    const arr = [];
    for (let i = 0; i < str.length; i++) {
        arr.push(str.charCodeAt(i));
    }
    return new Uint8Array(arr);
};

const hexToUint8Array = (hexString) => {
    return new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
};

export const generateTOTP = async (secret) => {
    if (!secret) return '';

    // 1. Calculate counter (30s window)
    const epoch = Math.floor(Date.now() / 1000);
    const counter = Math.floor(epoch / 30);

    // 2. Convert counter to 8-byte buffer
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setUint32(4, counter, false); // Big-endian
    view.setUint32(0, 0, false);

    // 3. Import Key
    const keyData = stringToUint8Array(secret);
    const key = await window.crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-1' },
        false,
        ['sign']
    );

    // 4. Sign
    const signature = await window.crypto.subtle.sign('HMAC', key, buffer);
    const signatureArray = new Uint8Array(signature);

    // 5. Truncate
    const offset = signatureArray[signatureArray.length - 1] & 0xf;
    const binary =
        ((signatureArray[offset] & 0x7f) << 24) |
        ((signatureArray[offset + 1] & 0xff) << 16) |
        ((signatureArray[offset + 2] & 0xff) << 8) |
        (signatureArray[offset + 3] & 0xff);

    // 6. Project to digits
    const token = binary % 1000000;
    return token.toString().padStart(6, '0');
};
