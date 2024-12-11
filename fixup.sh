cp dist/mjs/index.d.ts dist/index.d.ts
cp dist/mjs/retryable.d.ts dist/retryable.d.ts
cp dist/mjs/recover.d.ts dist/recover.d.ts

rm -rf dist/*/index.d.ts
rm -rf dist/*/retryable.d.ts
rm -rf dist/*/recover.d.ts

cat >dist/cjs/package.json <<!EOF
{
    "type": "commonjs"
}
!EOF

cat >dist/mjs/package.json <<!EOF
{
    "type": "module"
}
!EOF