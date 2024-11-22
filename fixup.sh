cp dist/mjs/index.d.ts dist
cp dist/mjs/retryable.d.ts dist
cp dist/mjs/recover.d.ts dist

rm -rf dist/*/index.d.ts

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