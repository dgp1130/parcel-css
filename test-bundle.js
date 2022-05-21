const css = require('./');
const fs = require('fs');
const path = require('path');

try {
    const { code } = css.bundle({
        filename: 'foo.css',
        // TODO: async
        resolver: {
            resolve(specifier, originatingFile) {
                return path.join(originatingFile, specifier);
            },

            read(filePath, cb) {
                console.error(`Reading ${filePath} and calling back to ${cb}`);
                try {
                    const contents = fs.readFileSync(filePath, 'utf-8');
                    cb(null, contents);
                } catch (err) {
                    cb(err);
                }
            },
        },
    });
    console.log(code.toString('utf-8'));
} catch (err) {
    console.error(err);
}

new Promise((resolve) => setTimeout(resolve, 1000)).then(() => process.exitCode = 0);

