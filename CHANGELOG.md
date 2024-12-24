# Changelog

# [0.0.1](https://github.com/goliatone/go-commands/tree/v0.0.1) - (2024-12-24)

## <!-- 1 -->🐛 Bug Fixes

- Tests use better mockDB ([c1204a5](https://github.com/goliatone/go-commands/commit/c1204a5737d7c8b01f03bea55fa1b04fea23547b))  - (goliatone)
- Make test goroutine friendly ([496703f](https://github.com/goliatone/go-commands/commit/496703fd86ba8ff344f7a883ff8d6289d434d3b5))  - (goliatone)
- Remove logger interface ([6213dcf](https://github.com/goliatone/go-commands/commit/6213dcf0b5fe2958c596700e4a36ed58b65e2873))  - (goliatone)

## <!-- 13 -->📦 Bumps

- Bump version: v0.0.1 ([80e967c](https://github.com/goliatone/go-commands/commit/80e967cc960c32ce58977897d742ffaddb57ac27))  - (goliatone)

## <!-- 14 -->🎉 Initial Commit

- Initial commit ([8818fc2](https://github.com/goliatone/go-commands/commit/8818fc2f4096d5f747a18718619ae300550c8c54))  - (goliatone)

## <!-- 16 -->➕ Add

- Concurrency test for dispatcher ([cda4ccd](https://github.com/goliatone/go-commands/commit/cda4ccdef0bd0321eab2956c04a34561519de453))  - (goliatone)
- Runner add recover handler ([9edaa6d](https://github.com/goliatone/go-commands/commit/9edaa6d79c2382cde8b1cb2192f38a51b917653e))  - (goliatone)
- Dispatcher support for pointer messages ([77baca6](https://github.com/goliatone/go-commands/commit/77baca6d1fda6641c277037796f33dc34badb8a2))  - (goliatone)
- Dispatcher support for pointer messages ([2b1695a](https://github.com/goliatone/go-commands/commit/2b1695ac1762562138f886f83b4f8d60f37e288c))  - (goliatone)
- Message validation and pointer support ([8022fdf](https://github.com/goliatone/go-commands/commit/8022fdffaa881af49fb8b3c4b60e992d41371856))  - (goliatone)
- Subscription to cron ([d4c9896](https://github.com/goliatone/go-commands/commit/d4c9896ea993038891629fe18106c8a54f70fd34))  - (goliatone)
- Subscription to cron ([47f0857](https://github.com/goliatone/go-commands/commit/47f0857df4d0454677826f07d60d50fd1c5bc5dd))  - (goliatone)
- Subscription ([ed66e6e](https://github.com/goliatone/go-commands/commit/ed66e6ebfca9e0c60c020585d05f1c51d6d4ca03))  - (goliatone)
- Subscription ([a6b99e6](https://github.com/goliatone/go-commands/commit/a6b99e60dcb41984dd835ad7145ddbdf05813a43))  - (goliatone)
- Unsubscribe option ([3d9a04a](https://github.com/goliatone/go-commands/commit/3d9a04ab8c0337577a60460b61f7a0ab0f648a1c))  - (goliatone)
- Unsubscribe option ([b35aeb7](https://github.com/goliatone/go-commands/commit/b35aeb75949a6b4d673762f7cb5991a98cd0a02c))  - (goliatone)
- Runner to manage commands in dispatcher ([af405cc](https://github.com/goliatone/go-commands/commit/af405cc20538195549d034bf620c0b5f48f86dd9))  - (goliatone)
- Return errors from Run ([efbcd7c](https://github.com/goliatone/go-commands/commit/efbcd7c756271b144874d1285400f54b10c7375e))  - (goliatone)
- Runner options ([0e23eca](https://github.com/goliatone/go-commands/commit/0e23eca5af7e81b58fb85c9c34e06d44e7a47a96))  - (goliatone)
- Runner to manage execution of functions ([3412c3e](https://github.com/goliatone/go-commands/commit/3412c3e494d848fafc854b956987207427d06af5))  - (goliatone)
- Cron implementation ([2ede592](https://github.com/goliatone/go-commands/commit/2ede592ab2221ad5235d84ce02d72a64f9a793b8))  - (goliatone)
- Dispatcher imp ([cf16726](https://github.com/goliatone/go-commands/commit/cf1672654d5df97118babbb047fb6b63e63992b4))  - (goliatone)
- Dispatcher imp ([139ea58](https://github.com/goliatone/go-commands/commit/139ea580b18392255e0ac44399d18421c1af6628))  - (goliatone)
- MessageError ([8205443](https://github.com/goliatone/go-commands/commit/82054436d2c4d235c15f0ca88b785884f11dd322))  - (goliatone)
- Command interfaces ([926840a](https://github.com/goliatone/go-commands/commit/926840aa1cef7e944e3cb26aa72960923eb34424))  - (goliatone)

## <!-- 2 -->🚜 Refactor

- Move Message to own file ([bb28152](https://github.com/goliatone/go-commands/commit/bb2815205e1308627964cb8a1aa357eda71aef23))  - (goliatone)
- Clean up cron code ([4045c89](https://github.com/goliatone/go-commands/commit/4045c89eadca0d8f4da2d193a3010840695dcec3))  - (goliatone)
- Rename attributes ([d2909dc](https://github.com/goliatone/go-commands/commit/d2909dc813488289bb7faf80a7a86daa39336876))  - (goliatone)
- Rename attributes ([4b61e68](https://github.com/goliatone/go-commands/commit/4b61e68d9f0ce1500cf0cd2f7e54174af4411b77))  - (goliatone)
- Cron package to use handler ([dad11ad](https://github.com/goliatone/go-commands/commit/dad11adb81f7aadb8804ccb72cc46f4e4df6f092))  - (goliatone)
- Cron package to use handler ([2891556](https://github.com/goliatone/go-commands/commit/2891556b87d84a1cac4dc6ea258845a4fbbac13b))  - (goliatone)
- Cron use runner.Handler ([3c4031d](https://github.com/goliatone/go-commands/commit/3c4031d2b2b7fb969e6f2a843895c641fcb00e22))  - (goliatone)
- Rename MessageError to Error so we can use it in the package ([7c7ffbc](https://github.com/goliatone/go-commands/commit/7c7ffbc6abe5d96b2e70465fb7703e825f06cd62))  - (goliatone)
- Rename MessageError to Error so we can use it in the package ([acabf80](https://github.com/goliatone/go-commands/commit/acabf80880c4c82307e3ded80901fe2c9792327b))  - (goliatone)
- Rename MessageError to Error so we can use it in the package ([4d50bf0](https://github.com/goliatone/go-commands/commit/4d50bf0e53cd9dc45bbb33a0beb16e8839b137b6))  - (goliatone)

## <!-- 22 -->🚧 WIP

- Update tests ([7daf46a](https://github.com/goliatone/go-commands/commit/7daf46a3f2cc4910fb09cd99cfe151072f3ab935))  - (goliatone)
- Update tests ([d080be5](https://github.com/goliatone/go-commands/commit/d080be52f33f607e88d8553c26561372242dbb13))  - (goliatone)

## <!-- 7 -->⚙️ Miscellaneous Tasks

- Update tests to handle refactor changes ([ef3bd76](https://github.com/goliatone/go-commands/commit/ef3bd76aa6a8004f21ee3cab061d0e0b54da44e5))  - (goliatone)
- Update tests ([52e5298](https://github.com/goliatone/go-commands/commit/52e5298fd395ec96a55424187d120df44272da43))  - (goliatone)
- Add deps ([bc89da0](https://github.com/goliatone/go-commands/commit/bc89da0b8c929e0a4c3ae63f03545d65f1d376e8))  - (goliatone)

<!-- generated by git-cliff -->
