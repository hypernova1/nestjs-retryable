cp dist/mjs/index.d.ts dist
cp dist/mjs/http-headers.d.ts dist
cp dist/mjs/response-entity.d.ts dist
cp dist/mjs/response-entity.interceptor.d.ts dist

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