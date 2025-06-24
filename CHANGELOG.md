# Changelog

# [0.3.0](https://github.com/goliatone/go-command/compare/v0.2.0...v0.3.0) - (2025-06-24)

## <!-- 1 -->🐛 Bug Fixes

- Clean typo ([339a042](https://github.com/goliatone/go-command/commit/339a0423cd4b1d47ada9583446b01c477c6509ce))  - (goliatone)
- Make registry implement interface ([dff53d2](https://github.com/goliatone/go-command/commit/dff53d24b05d7dff42eab3c17a10be80ba0bddf4))  - (goliatone)
- Use new errors package ([6eaad3a](https://github.com/goliatone/go-command/commit/6eaad3ada4449af0b195e759d20612294b18350f))  - (goliatone)
- Runner offer retry logic ([4c38694](https://github.com/goliatone/go-command/commit/4c38694a091ade1dce73e6c646eb056fc2433986))  - (goliatone)
- Test handler ([2d7c183](https://github.com/goliatone/go-command/commit/2d7c1836c8a558cf48e5a7af8035a1280682b0b0))  - (goliatone)
- Cliff template use unique commit mesages ([7ea0a47](https://github.com/goliatone/go-command/commit/7ea0a473e7855325716d03ead9f364251fb519cc))  - (goliatone)
- Use correct repo name in changelog ([d5569d7](https://github.com/goliatone/go-command/commit/d5569d77bd234e2cb6483fcce3e7ad1814f1690c))  - (goliatone)
- Mux return empty list ([5036588](https://github.com/goliatone/go-command/commit/50365882a1b34c62374ee59f14759d18d45ecfcb))  - (goliatone)
- Remove unused flag ([949eff3](https://github.com/goliatone/go-command/commit/949eff3cccd10bd25eb8cde4484c25713db5fc8a))  - (goliatone)

## <!-- 13 -->📦 Bumps

- Bump version: v0.3.0 ([39d61d4](https://github.com/goliatone/go-command/commit/39d61d4d4404a36a122519e1600f0ff1c7fd7989))  - (goliatone)

## <!-- 16 -->➕ Add

- Use meaninful errors ([90f90c2](https://github.com/goliatone/go-command/commit/90f90c2e8c4c3fa10aff6b1a5aaafffaf93086b9))  - (goliatone)
- Tests for registyr ([48af921](https://github.com/goliatone/go-command/commit/48af92135e93da1b9f3d06f1b77e888efbe42d3f))  - (goliatone)
- Extended command types ([ee0732e](https://github.com/goliatone/go-command/commit/ee0732e6193fef8b4885b3a91e0818d3b6e46c9c))  - (goliatone)
- Command registry ([ffdb85d](https://github.com/goliatone/go-command/commit/ffdb85dcd72505809c7c36e0b409c0139700fd22))  - (goliatone)
- DispatchWithResult is for commands that return a result over the content ([0f99933](https://github.com/goliatone/go-command/commit/0f99933cceb7e4c1e5cdc3828d814e4e5e92a464))  - (goliatone)
- Result is a helper to pass results outside of a command ([9c8bc5e](https://github.com/goliatone/go-command/commit/9c8bc5e19cfc00f45b07991fc99f45c8844a4d58))  - (goliatone)
- Test task ([457f711](https://github.com/goliatone/go-command/commit/457f7115d1f99fd4d036b83a7bc125922552b7fb))  - (goliatone)
- Handler middleware ([0fbad58](https://github.com/goliatone/go-command/commit/0fbad58cf980b80428e8b574536a7a0b9ac8f32e))  - (goliatone)
- New error info ([46e62d8](https://github.com/goliatone/go-command/commit/46e62d8769a450e9647ebdaea0fd5e38fa76d415))  - (goliatone)
- Batch executor ([7ff40b1](https://github.com/goliatone/go-command/commit/7ff40b1340c22ab80e2bc6573e70bdaf90717af5))  - (goliatone)
- Parallel executor ([20c6fd7](https://github.com/goliatone/go-command/commit/20c6fd71f0fa2b033ebc2309a6042445f6f67f2e))  - (goliatone)
- Exit on error option for handler ([72dc4e9](https://github.com/goliatone/go-command/commit/72dc4e9b45732f7a9439a54afad0fceab677e643))  - (goliatone)

## <!-- 2 -->🚜 Refactor

- Move nil register ([0294c46](https://github.com/goliatone/go-command/commit/0294c461f8d211a2069e4b89d44b26c20ff6a6df))  - (goliatone)
- Clean up validate message ([e327e42](https://github.com/goliatone/go-command/commit/e327e4271f5ea66325c541738f5d9096f88629a8))  - (goliatone)
- Use errors from package ([288fae1](https://github.com/goliatone/go-command/commit/288fae17872d47825558c3ce088535ec550f4d58))  - (goliatone)
- Move getType as GetMessageType to command ([2fbabb6](https://github.com/goliatone/go-command/commit/2fbabb643e75f23ec507739f46c7cdd474052237))  - (goliatone)
- Use T any instead of T Message ([b6229e9](https://github.com/goliatone/go-command/commit/b6229e96ad3e729f1a1251859a0449e3a6c0aeae))  - (goliatone)
- Move handler config to top level ([e633490](https://github.com/goliatone/go-command/commit/e6334904d0f4f056e7e16835150c7bb084b8f69c))  - (goliatone)

## <!-- 22 -->🚧 WIP

- Registry for optional commands ([c08de62](https://github.com/goliatone/go-command/commit/c08de627b3dfc815946201aa8ddaaa2874740a84))  - (goliatone)
- Use any message type ([57a62e0](https://github.com/goliatone/go-command/commit/57a62e0ccc5c6fcc898d74f1fd11622583474ec1))  - (goliatone)
- Set logger ([3d334a7](https://github.com/goliatone/go-command/commit/3d334a7d4ea37175ff254587421fb22b0892f558))  - (goliatone)
- Fix getType ([a1c346d](https://github.com/goliatone/go-command/commit/a1c346d80e8d854e3a5391d217f7fdd3d1493d06))  - (goliatone)

## <!-- 3 -->📚 Documentation

- Update changelog for v0.2.0 ([7a8e95c](https://github.com/goliatone/go-command/commit/7a8e95c1ed3a13d548ccbca3481283957ec099fb))  - (goliatone)

## <!-- 30 -->📝 Other

- PR [#4](https://github.com/goliatone/go-command/pull/4): flow management ([26453ee](https://github.com/goliatone/go-command/commit/26453ee2a27e5782ea2d2b43baa5ac2793e493c8))  - (goliatone)
- Cron makeCommandJob should be able to take a message ([413eafc](https://github.com/goliatone/go-command/commit/413eafc58884e84275231408d2d667acae947b83))  - (goliatone)

## <!-- 7 -->⚙️ Miscellaneous Tasks

- Update readme ([430d24f](https://github.com/goliatone/go-command/commit/430d24fa1a5c2c901db2cd4a9ca6384b8a5406e4))  - (goliatone)
- Update deps ([3be7fb5](https://github.com/goliatone/go-command/commit/3be7fb5065d397ec9e5f57a8053ee48a4cab282c))  - (goliatone)
- Remove old code ([21a30cc](https://github.com/goliatone/go-command/commit/21a30cc6a790abc349aa002ebbf36c7bb4af1635))  - (goliatone)
- Clean up code ([371606f](https://github.com/goliatone/go-command/commit/371606f6eb4fba99376396ac7658483b95b54088))  - (goliatone)
- Clean cliff ([477c53f](https://github.com/goliatone/go-command/commit/477c53fc06f9532f3c7f33806dfe5cfb66238b33))  - (goliatone)

# [0.2.0](https://github.com/goliatone/go-command/compare/v0.1.0...v0.2.0) - (2025-02-26)

## <!-- 13 -->📦 Bumps

- Bump version: v0.2.0 ([cb1a0c0](https://github.com/goliatone/go-command/commit/cb1a0c0273613a9fb9656fbb10ea1867f1305977))  - (goliatone)

## <!-- 16 -->➕ Add

- PanicLogger to handel panics ([594c42f](https://github.com/goliatone/go-command/commit/594c42f6ab5bc6810a18a16013aa95a6a3be76bc))  - (goliatone)
- PanicHandler to runner ([f939696](https://github.com/goliatone/go-command/commit/f939696e11f0085f2838939be4a110d9ad86a745))  - (goliatone)

## <!-- 3 -->📚 Documentation

- Update changelog for v0.1.0 ([b1d1cda](https://github.com/goliatone/go-command/commit/b1d1cdae302ead28ceac26f76ebc07747695acb5))  - (goliatone)

## <!-- 30 -->📝 Other

- PR [#3](https://github.com/goliatone/go-command/pull/3): panic handler ([12778fa](https://github.com/goliatone/go-command/commit/12778fa037de3d9efa21bc05270a90dc84f96a24))  - (goliatone)

# [0.1.0](https://github.com/goliatone/go-command/compare/v0.0.2...v0.1.0) - (2024-12-26)

## <!-- 1 -->🐛 Bug Fixes

- Add missing commit ([113328c](https://github.com/goliatone/go-command/commit/113328cbe3cbbc4b44065684ce78657d5d875ac9))  - (goliatone)
- Test for conc ([bf76804](https://github.com/goliatone/go-command/commit/bf7680482d016e937db4966bef8341e2f4abb427))  - (goliatone)
- Log errors on handleError ([10e8a71](https://github.com/goliatone/go-command/commit/10e8a716c8943a513c4f3cb68471953a2b1d3872))  - (goliatone)
- Implement interface ([c41412b](https://github.com/goliatone/go-command/commit/c41412b6b4fa30fd1758f944a7e50df1d2938cfb))  - (goliatone)
- Update context ([e97f156](https://github.com/goliatone/go-command/commit/e97f1564c99b8b339d4f1540a378b1d751ac163f))  - (goliatone)
- Use options-setters ([3399096](https://github.com/goliatone/go-command/commit/3399096854b422eed1141be00560a57f90070171))  - (goliatone)

## <!-- 13 -->📦 Bumps

- Bump version: v0.1.0 ([72ae69d](https://github.com/goliatone/go-command/commit/72ae69da444a074c0b9ce149ded6246d0509650c))  - (goliatone)

## <!-- 16 -->➕ Add

- Mux base router ([0a7e3de](https://github.com/goliatone/go-command/commit/0a7e3de51547eb7f077d823fa1da09d301309708))  - (goliatone)
- Generate options setters ([9ca8c4d](https://github.com/goliatone/go-command/commit/9ca8c4d0bb81b0245258677ed3755b0a3dda106f))  - (goliatone)
- Options setters ([30c1123](https://github.com/goliatone/go-command/commit/30c11230d4fc00505197a0711a2fd54f6bdf40cf))  - (goliatone)
- Code generator for setters ([30d0a0c](https://github.com/goliatone/go-command/commit/30d0a0cb1a586ec5c346c58e7d0b556fcc042afc))  - (goliatone)

## <!-- 2 -->🚜 Refactor

- Remove subscription implementaiton ([55656fa](https://github.com/goliatone/go-command/commit/55656fa9893f6b006528b5f9ffc0493231bc629d))  - (goliatone)
- Move ExitOnErr to top level ([782ee5b](https://github.com/goliatone/go-command/commit/782ee5b9548dfc0a9e587e08006ca6bad5de5234))  - (goliatone)
- Use package generators ([c3c9bdf](https://github.com/goliatone/go-command/commit/c3c9bdf574481324f7cc27caba6bf21f8b767d7e))  - (goliatone)

## <!-- 22 -->🚧 WIP

- Make cron scheduler follow service interface ([ff39c7e](https://github.com/goliatone/go-command/commit/ff39c7e9d2d98b9b0dbbf9154d14593710180417))  - (goliatone)

## <!-- 3 -->📚 Documentation

- Update changelog for v0.0.2 ([795dd9d](https://github.com/goliatone/go-command/commit/795dd9db59d4106f71da6dba583fbd292b92b323))  - (goliatone)

## <!-- 30 -->📝 Other

- PR [#2](https://github.com/goliatone/go-command/pull/2): router mux ([bc8a0d1](https://github.com/goliatone/go-command/commit/bc8a0d117e686f335c26c377d0bdda9f7539329c))  - (goliatone)
- Merge fix ([d6b76b8](https://github.com/goliatone/go-command/commit/d6b76b8ad510a39031f94f964f8980c5adc17d86))  - (goliatone)
- PR [#1](https://github.com/goliatone/go-command/pull/1): generators ([412b13f](https://github.com/goliatone/go-command/commit/412b13f5eabba6270bc5a5c8439453acd7c6ab55))  - (goliatone)
- Clean up ([68a5e38](https://github.com/goliatone/go-command/commit/68a5e38b9dc852bd10dbc1d9dd3cc928ed4ee4a6))  - (goliatone)

## <!-- 7 -->⚙️ Miscellaneous Tasks

- Clean up ([5949ac5](https://github.com/goliatone/go-command/commit/5949ac5c67a46108295080784532f61f9a4714be))  - (goliatone)
- Readme content ([60bfdaa](https://github.com/goliatone/go-command/commit/60bfdaaa48b0dff0b676d4b61cc8ea711785d88b))  - (goliatone)

# [0.0.2](https://github.com/goliatone/go-command/compare/v0.0.1...v0.0.2) - (2024-12-24)

## <!-- 1 -->🐛 Bug Fixes

- Release task check for version before checkout ([3162359](https://github.com/goliatone/go-command/commit/3162359b4534d96e48997515e58084e3fa1390ee))  - (goliatone)

## <!-- 13 -->📦 Bumps

- Bump version: v0.0.2 ([e99c019](https://github.com/goliatone/go-command/commit/e99c019c54d98cca8a6b3bc7b0db57003ecc7b58))  - (goliatone)

## <!-- 2 -->🚜 Refactor

- Rename package ([5718d2e](https://github.com/goliatone/go-command/commit/5718d2e6c9976d5168e9dc5f7d6785d3970db6db))  - (goliatone)

## <!-- 3 -->📚 Documentation

- Update changelog for v0.0.1 ([5789a63](https://github.com/goliatone/go-command/commit/5789a63840bb5e37dabc0eba698591c79119182a))  - (goliatone)

# [0.0.1](https://github.com/goliatone/go-command/tree/v0.0.1) - (2024-12-24)

## <!-- 1 -->🐛 Bug Fixes

- Tests use better mockDB ([c1204a5](https://github.com/goliatone/go-command/commit/c1204a5737d7c8b01f03bea55fa1b04fea23547b))  - (goliatone)
- Make test goroutine friendly ([496703f](https://github.com/goliatone/go-command/commit/496703fd86ba8ff344f7a883ff8d6289d434d3b5))  - (goliatone)
- Remove logger interface ([6213dcf](https://github.com/goliatone/go-command/commit/6213dcf0b5fe2958c596700e4a36ed58b65e2873))  - (goliatone)

## <!-- 13 -->📦 Bumps

- Bump version: v0.0.1 ([80e967c](https://github.com/goliatone/go-command/commit/80e967cc960c32ce58977897d742ffaddb57ac27))  - (goliatone)

## <!-- 14 -->🎉 Initial Commit

- Initial commit ([8818fc2](https://github.com/goliatone/go-command/commit/8818fc2f4096d5f747a18718619ae300550c8c54))  - (goliatone)

## <!-- 16 -->➕ Add

- Concurrency test for dispatcher ([cda4ccd](https://github.com/goliatone/go-command/commit/cda4ccdef0bd0321eab2956c04a34561519de453))  - (goliatone)
- Runner add recover handler ([9edaa6d](https://github.com/goliatone/go-command/commit/9edaa6d79c2382cde8b1cb2192f38a51b917653e))  - (goliatone)
- Dispatcher support for pointer messages ([77baca6](https://github.com/goliatone/go-command/commit/77baca6d1fda6641c277037796f33dc34badb8a2))  - (goliatone)
- Message validation and pointer support ([8022fdf](https://github.com/goliatone/go-command/commit/8022fdffaa881af49fb8b3c4b60e992d41371856))  - (goliatone)
- Subscription to cron ([d4c9896](https://github.com/goliatone/go-command/commit/d4c9896ea993038891629fe18106c8a54f70fd34))  - (goliatone)
- Subscription ([ed66e6e](https://github.com/goliatone/go-command/commit/ed66e6ebfca9e0c60c020585d05f1c51d6d4ca03))  - (goliatone)
- Unsubscribe option ([3d9a04a](https://github.com/goliatone/go-command/commit/3d9a04ab8c0337577a60460b61f7a0ab0f648a1c))  - (goliatone)
- Runner to manage commands in dispatcher ([af405cc](https://github.com/goliatone/go-command/commit/af405cc20538195549d034bf620c0b5f48f86dd9))  - (goliatone)
- Return errors from Run ([efbcd7c](https://github.com/goliatone/go-command/commit/efbcd7c756271b144874d1285400f54b10c7375e))  - (goliatone)
- Runner options ([0e23eca](https://github.com/goliatone/go-command/commit/0e23eca5af7e81b58fb85c9c34e06d44e7a47a96))  - (goliatone)
- Runner to manage execution of functions ([3412c3e](https://github.com/goliatone/go-command/commit/3412c3e494d848fafc854b956987207427d06af5))  - (goliatone)
- Cron implementation ([2ede592](https://github.com/goliatone/go-command/commit/2ede592ab2221ad5235d84ce02d72a64f9a793b8))  - (goliatone)
- Dispatcher imp ([cf16726](https://github.com/goliatone/go-command/commit/cf1672654d5df97118babbb047fb6b63e63992b4))  - (goliatone)
- MessageError ([8205443](https://github.com/goliatone/go-command/commit/82054436d2c4d235c15f0ca88b785884f11dd322))  - (goliatone)
- Command interfaces ([926840a](https://github.com/goliatone/go-command/commit/926840aa1cef7e944e3cb26aa72960923eb34424))  - (goliatone)

## <!-- 2 -->🚜 Refactor

- Move Message to own file ([bb28152](https://github.com/goliatone/go-command/commit/bb2815205e1308627964cb8a1aa357eda71aef23))  - (goliatone)
- Clean up cron code ([4045c89](https://github.com/goliatone/go-command/commit/4045c89eadca0d8f4da2d193a3010840695dcec3))  - (goliatone)
- Rename attributes ([d2909dc](https://github.com/goliatone/go-command/commit/d2909dc813488289bb7faf80a7a86daa39336876))  - (goliatone)
- Cron package to use handler ([dad11ad](https://github.com/goliatone/go-command/commit/dad11adb81f7aadb8804ccb72cc46f4e4df6f092))  - (goliatone)
- Cron use runner.Handler ([3c4031d](https://github.com/goliatone/go-command/commit/3c4031d2b2b7fb969e6f2a843895c641fcb00e22))  - (goliatone)
- Rename MessageError to Error so we can use it in the package ([7c7ffbc](https://github.com/goliatone/go-command/commit/7c7ffbc6abe5d96b2e70465fb7703e825f06cd62))  - (goliatone)

## <!-- 22 -->🚧 WIP

- Update tests ([7daf46a](https://github.com/goliatone/go-command/commit/7daf46a3f2cc4910fb09cd99cfe151072f3ab935))  - (goliatone)

## <!-- 7 -->⚙️ Miscellaneous Tasks

- Update tests to handle refactor changes ([ef3bd76](https://github.com/goliatone/go-command/commit/ef3bd76aa6a8004f21ee3cab061d0e0b54da44e5))  - (goliatone)
- Update tests ([52e5298](https://github.com/goliatone/go-command/commit/52e5298fd395ec96a55424187d120df44272da43))  - (goliatone)
- Add deps ([bc89da0](https://github.com/goliatone/go-command/commit/bc89da0b8c929e0a4c3ae63f03545d65f1d376e8))  - (goliatone)


