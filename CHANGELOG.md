# Changelog

## Unreleased

### Changed

- FSM flow bridge-removal policy completed: `Execute(ctx, msg)` is now the only compatibility bridge on `StateMachine`.
- Removed legacy FSM compatibility paths: `NewStateMachine`, `WithInitialFallback`, `TransitionRequestFromState`, and request-level `CurrentState` fallback inference.
- Config/bootstrap wiring now emits canonical `MachineDefinition` and builds runtime via `NewStateMachineFromDefinition`.
- Updated flow docs/examples and release audit coverage for canonical constructor usage and explicit persisted-state requirements.

# [0.14.0](https://github.com/goliatone/go-command/compare/v0.13.0...v0.14.0) - (2026-02-17)

## <!-- 1 -->🐛 Bug Fixes

- Date race in global registry ([3ab4064](https://github.com/goliatone/go-command/commit/3ab406426b055be8f14dc593a660b3ae7a8926c4))  - (goliatone)

## <!-- 13 -->📦 Bumps

- Bump version: v0.14.0 ([b883d88](https://github.com/goliatone/go-command/commit/b883d886e7d1456a29f46a61ada538a18d745cb7))  - (goliatone)

## <!-- 3 -->📚 Documentation

- Update changelog for v0.13.0 ([d0f69d8](https://github.com/goliatone/go-command/commit/d0f69d8d9e0123b25eb3a890b45d7181217e405c))  - (goliatone)

# [0.13.0](https://github.com/goliatone/go-command/compare/v0.12.0...v0.13.0) - (2026-01-16)

## <!-- 1 -->🐛 Bug Fixes

- Track subscriptions, reset dispatcher state ([ed44d61](https://github.com/goliatone/go-command/commit/ed44d61fcd895fbd5ce1225a3b1e4d05a0c7c6c9))  - (goliatone)
- Create fresh runner per item ([4a9d4df](https://github.com/goliatone/go-command/commit/4a9d4df0db6362c41a018432794d9ca540c7efef))  - (goliatone)
- Separate comd/query mux. add: Reset to clear subscriptions ([e50d84a](https://github.com/goliatone/go-command/commit/e50d84ab8564dc0d40526d02ddd050e3aceaa6cf))  - (goliatone)
- GetMessageType call Type on zero/nil pointers ([ab91c55](https://github.com/goliatone/go-command/commit/ab91c55d13b099363285d99b07150d5cf38d9dd9))  - (goliatone)

## <!-- 13 -->📦 Bumps

- Bump version: v0.13.0 ([5d18a02](https://github.com/goliatone/go-command/commit/5d18a0290edd5658cc940eea2e550dcad3099442))  - (goliatone)

## <!-- 16 -->➕ Add

- Expose commands for remote exec ([23c76e8](https://github.com/goliatone/go-command/commit/23c76e8368cc32dbbc856525a818c1958c05cab0))  - (goliatone)

## <!-- 3 -->📚 Documentation

- Update changelog for v0.12.0 ([ca700b4](https://github.com/goliatone/go-command/commit/ca700b4b870269e40bbe291e7b029ada5202cc73))  - (goliatone)

## <!-- 7 -->⚙️ Miscellaneous Tasks

- Update readme ([03b6c62](https://github.com/goliatone/go-command/commit/03b6c62cf44af31fa1f76806bb14d8b638eb5efd))  - (goliatone)
- Update tests ([e66867e](https://github.com/goliatone/go-command/commit/e66867e567433be0ee4e0e685c3aad580987ff0d))  - (goliatone)
- Update changelog ([9e8ad51](https://github.com/goliatone/go-command/commit/9e8ad5159f6468c26cfaa0fd5c0e4f79988c96f3))  - (goliatone)
- Update docs ([f16e2ac](https://github.com/goliatone/go-command/commit/f16e2ac353cda2f5cdddaa794cf7f2b9c6330948))  - (goliatone)

# [0.12.0](https://github.com/goliatone/go-command/compare/v0.11.0...v0.12.0) - (2026-01-05)

## <!-- 1 -->🐛 Bug Fixes

- Flow config merges options ([01fff85](https://github.com/goliatone/go-command/commit/01fff85e5619944f01170a96c2f998dcd7b266bf))  - (goliatone)
- Runner respects NoTimeout setup ([6396328](https://github.com/goliatone/go-command/commit/639632852cc442334f6e49a0465547ab0243c0c0))  - (goliatone)
- Cron schedule validates function savety and support Execute handlers, honors timeouts ([e169488](https://github.com/goliatone/go-command/commit/e1694884631fa876d02815b1428be546adcf7114))  - (goliatone)
- Inialization handling ([9a015ea](https://github.com/goliatone/go-command/commit/9a015ea1f0a956b8de356c1c4f4fce289bdc627a))  - (goliatone)
- Use msgType reflect ([7447639](https://github.com/goliatone/go-command/commit/744763959befca05c1f402c632421a437ba6ca54))  - (goliatone)

## <!-- 13 -->📦 Bumps

- Bump version: v0.12.0 ([1e12ab1](https://github.com/goliatone/go-command/commit/1e12ab17abc6aabd8134abb896fa3c6240cbefdd))  - (goliatone)

## <!-- 3 -->📚 Documentation

- Update changelog for v0.11.0 ([33afffe](https://github.com/goliatone/go-command/commit/33afffebae45364b61435d99f42ab5e5d4116a02))  - (goliatone)

## <!-- 7 -->⚙️ Miscellaneous Tasks

- Update docs ([4fe3650](https://github.com/goliatone/go-command/commit/4fe36507e844be74f6a63c163fc3a6b3dbb233e1))  - (goliatone)
- Update tests ([34d1dd8](https://github.com/goliatone/go-command/commit/34d1dd8e54de6637586e96b229126eb075eccc99))  - (goliatone)

# [0.11.0](https://github.com/goliatone/go-command/compare/v0.10.0...v0.11.0) - (2026-01-05)

## <!-- 13 -->📦 Bumps

- Bump version: v0.11.0 ([299a1ee](https://github.com/goliatone/go-command/commit/299a1ee6e2fe4fa1e3b5016d949f860c1c510d85))  - (goliatone)

## <!-- 16 -->➕ Add

- HasResolver and AddResolver methods to registry ([a7235e0](https://github.com/goliatone/go-command/commit/a7235e0f98ab620b99f6a57204fb58f2aa7682c4))  - (goliatone)
- Command meta ([b4c4159](https://github.com/goliatone/go-command/commit/b4c41594871d72f248f82f46ccda9440956a2d8b))  - (goliatone)

## <!-- 2 -->🚜 Refactor

- Registry can host custom command resolvers ([9686435](https://github.com/goliatone/go-command/commit/968643580722b9619e44e551d062c728be884915))  - (goliatone)

## <!-- 3 -->📚 Documentation

- Update changelog for v0.10.0 ([89f1d4a](https://github.com/goliatone/go-command/commit/89f1d4a093c15da04729bd8ada01319b2f77a21b))  - (goliatone)

## <!-- 7 -->⚙️ Miscellaneous Tasks

- Update docs ([c394390](https://github.com/goliatone/go-command/commit/c394390b37f59c9154d5cbcce330a062bf595900))  - (goliatone)
- Update tests ([d6434cb](https://github.com/goliatone/go-command/commit/d6434cbe22c7a2a5c500dc2e6fb471745c4f5b39))  - (goliatone)

# [0.10.0](https://github.com/goliatone/go-command/compare/v0.9.0...v0.10.0) - (2025-12-02)

## <!-- 13 -->📦 Bumps

- Bump version: v0.10.0 ([7ad16e0](https://github.com/goliatone/go-command/commit/7ad16e0e51f82ff1afaec2604b073b476bef3cc0))  - (goliatone)

## <!-- 16 -->➕ Add

- Validation wrap erros ([b262db2](https://github.com/goliatone/go-command/commit/b262db2ecc5c3fd1a26ecac68686726838a2e1d2))  - (goliatone)

## <!-- 3 -->📚 Documentation

- Update changelog for v0.9.0 ([1354145](https://github.com/goliatone/go-command/commit/1354145458ee07f5160456dd00fc44f46ce0bef1))  - (goliatone)

# [0.9.0](https://github.com/goliatone/go-command/compare/v0.8.0...v0.9.0) - (2025-11-26)

## <!-- 1 -->🐛 Bug Fixes

- Cli handler keep value ([31beebe](https://github.com/goliatone/go-command/commit/31beebe9d4627dd13f0835de080bbb304fbe0a8a))  - (goliatone)

## <!-- 13 -->📦 Bumps

- Bump version: v0.9.0 ([74de437](https://github.com/goliatone/go-command/commit/74de4373ff7e4ce2a18e429329812df69277a5dd))  - (goliatone)

## <!-- 3 -->📚 Documentation

- Update changelog for v0.8.0 ([b245c31](https://github.com/goliatone/go-command/commit/b245c31d8995d584bdb7985d872e22910c27dddf))  - (goliatone)

## <!-- 7 -->⚙️ Miscellaneous Tasks

- Update tests ([c9387d9](https://github.com/goliatone/go-command/commit/c9387d9496a44d80e8e648415a074bb6fb0be4ed))  - (goliatone)
- Update gitignore ([b864155](https://github.com/goliatone/go-command/commit/b8641550a7e42590279aa5008edeace8c9732463))  - (goliatone)
- Update readme ([2bf3927](https://github.com/goliatone/go-command/commit/2bf3927949cdb543a54daa4df0d195ade5c66267))  - (goliatone)

# [0.8.0](https://github.com/goliatone/go-command/compare/v0.7.0...v0.8.0) - (2025-11-26)

## <!-- 1 -->🐛 Bug Fixes

- Remove legacy code ([ddd5d1b](https://github.com/goliatone/go-command/commit/ddd5d1bf27279ec27d1c8d43147eaa926c91276d))  - (goliatone)

## <!-- 13 -->📦 Bumps

- Bump version: v0.8.0 ([c4fbedd](https://github.com/goliatone/go-command/commit/c4fbedd0e703084a0157ee162b2a165cfa44b137))  - (goliatone)

## <!-- 3 -->📚 Documentation

- Update changelog for v0.7.0 ([4e7b9a1](https://github.com/goliatone/go-command/commit/4e7b9a1f8b3f1d5eec71879c20578d531c3bfe0a))  - (goliatone)

# [0.7.0](https://github.com/goliatone/go-command/compare/v0.6.0...v0.7.0) - (2025-11-25)

## <!-- 1 -->🐛 Bug Fixes

- Explicit error if current state missing ([bdde49f](https://github.com/goliatone/go-command/commit/bdde49fd02ab116a2692a5315a446b0070d6a908))  - (goliatone)
- Example use current state ([5eba2f2](https://github.com/goliatone/go-command/commit/5eba2f275028b49289f09d54d1efb5a96d8bcbe0))  - (goliatone)
- Add error strategy to flow ([8f6bb28](https://github.com/goliatone/go-command/commit/8f6bb28614087cf88b4275544bf71e8a4f08e1d1))  - (goliatone)
- Merge options for flow exec ([463954a](https://github.com/goliatone/go-command/commit/463954a205db950f2130e31c02a461e30f18b2cd))  - (goliatone)

## <!-- 13 -->📦 Bumps

- Bump version: v0.7.0 ([0cf8b32](https://github.com/goliatone/go-command/commit/0cf8b32770cca1ccdb031bb361fe2f87cf2049e5))  - (goliatone)

## <!-- 16 -->➕ Add

- Cli group ([5764986](https://github.com/goliatone/go-command/commit/57649863c3dbfb0359412e87df054c8d50c39a72))  - (goliatone)
- Flow state machine options ([9fc9938](https://github.com/goliatone/go-command/commit/9fc9938c29ec6130c449ecf6232bdf4d985a5a24))  - (goliatone)
- Cli tree for submodules ([1b6b11c](https://github.com/goliatone/go-command/commit/1b6b11c65392c41b8623c14dfa2b4f8086d6d262))  - (goliatone)
- Flow state machine helper ([38335fb](https://github.com/goliatone/go-command/commit/38335fbffe95ae32a3559497ef74263e674458ac))  - (goliatone)
- Flow implementation ([e045aa9](https://github.com/goliatone/go-command/commit/e045aa9e8c99d07cf0a1cddb63eff77902c8c128))  - (goliatone)

## <!-- 3 -->📚 Documentation

- Update changelog for v0.6.0 ([0d72462](https://github.com/goliatone/go-command/commit/0d72462bfd3e4e7d8113c5c4e1101ca5df4647ce))  - (goliatone)

## <!-- 30 -->📝 Other

- PR [#6](https://github.com/goliatone/go-command/pull/6): testing issues ([5302e00](https://github.com/goliatone/go-command/commit/5302e00390409069124fe0a4261ef20bad3ee1e6))  - (goliatone)

## <!-- 7 -->⚙️ Miscellaneous Tasks

- Update readme ([8468be0](https://github.com/goliatone/go-command/commit/8468be00783ccd6147c3c9014d9db46f15c3a0dc))  - (goliatone)
- Update deps ([b229fef](https://github.com/goliatone/go-command/commit/b229fef1435207803be0f43fda0ffac1678bb55c))  - (goliatone)
- Update example ([0bc12cd](https://github.com/goliatone/go-command/commit/0bc12cd0b14d7f9461341ca3a9274a57b86bc6c7))  - (goliatone)
- Update tasks ([f5fecc7](https://github.com/goliatone/go-command/commit/f5fecc79b11c0c266989b432f59a9f3620bd5f53))  - (goliatone)

# [0.6.0](https://github.com/goliatone/go-command/compare/v0.5.0...v0.6.0) - (2025-10-01)

## <!-- 1 -->🐛 Bug Fixes

- Expose mux for tsts ([93cae75](https://github.com/goliatone/go-command/commit/93cae7534b4d2784e5144cb23fc5753eb189fdd7))  - (goliatone)

## <!-- 13 -->📦 Bumps

- Bump version: v0.6.0 ([89af010](https://github.com/goliatone/go-command/commit/89af0106c331d67cc92118b14d3b220a9df4bb53))  - (goliatone)

## <!-- 3 -->📚 Documentation

- Update changelog for v0.5.0 ([c511815](https://github.com/goliatone/go-command/commit/c5118152665db6917c77a91f6b2d8a4319f9046a))  - (goliatone)

## <!-- 30 -->📝 Other

- PR [#5](https://github.com/goliatone/go-command/pull/5): testing issues ([4714fb6](https://github.com/goliatone/go-command/commit/4714fb677a81ed29884fbda8fc770b671847d9c9))  - (goliatone)

## <!-- 7 -->⚙️ Miscellaneous Tasks

- Update deps ([b67cf51](https://github.com/goliatone/go-command/commit/b67cf514ac2b11b2520a3eba30b31c55b2e51099))  - (goliatone)

# [0.5.0](https://github.com/goliatone/go-command/compare/v0.4.0...v0.5.0) - (2025-10-01)

## <!-- 1 -->🐛 Bug Fixes

- Test handle serial exec ([d1f8bdf](https://github.com/goliatone/go-command/commit/d1f8bdffb554abd0d469e91c97bdbdbd05ee3ee0))  - (goliatone)

## <!-- 13 -->📦 Bumps

- Bump version: v0.5.0 ([c93c190](https://github.com/goliatone/go-command/commit/c93c190a0239fcfe3566319b8627569be7c8ba5f))  - (goliatone)

## <!-- 3 -->📚 Documentation

- Update changelog for v0.4.0 ([ed3f803](https://github.com/goliatone/go-command/commit/ed3f80339daaca3970c97c6fedfee12d0ca0cc86))  - (goliatone)

## <!-- 7 -->⚙️ Miscellaneous Tasks

- Update readme ([97f8d9f](https://github.com/goliatone/go-command/commit/97f8d9f1a2e61648b9fec3253ee586e84e3425e7))  - (goliatone)

# [0.4.0](https://github.com/goliatone/go-command/compare/v0.3.0...v0.4.0) - (2025-06-29)

## <!-- 1 -->🐛 Bug Fixes

- Test for custom matcher ([9446378](https://github.com/goliatone/go-command/commit/944637844754dc1bf58ba7f7e503598a063ee32c))  - (goliatone)
- Apply options to mux ([7958e46](https://github.com/goliatone/go-command/commit/7958e4664c7e8773df2f20bbd93ef278cdb09c6d))  - (goliatone)

## <!-- 13 -->📦 Bumps

- Bump version: v0.4.0 ([d2d2fcc](https://github.com/goliatone/go-command/commit/d2d2fcc857f7813ef3aca74c426a6cce34875372))  - (goliatone)

## <!-- 16 -->➕ Add

- Pattern transformer ([4cd31f2](https://github.com/goliatone/go-command/commit/4cd31f211c5f81f28e32b573adddf551e4ba2a5a))  - (goliatone)
- With matcher option ([b2e69a3](https://github.com/goliatone/go-command/commit/b2e69a3d8915181020a8eec2e8bf3b1a2c09b85a))  - (goliatone)
- Custom route matcher to implement MQTT and AMQP topics ([a16b8ca](https://github.com/goliatone/go-command/commit/a16b8ca0d1991c605e6bbf1fed6be17155bad26e))  - (goliatone)

## <!-- 3 -->📚 Documentation

- Update changelog for v0.3.0 ([3dd82e9](https://github.com/goliatone/go-command/commit/3dd82e94b8e83747397d594ff371b42c05b1e64c))  - (goliatone)

## <!-- 7 -->⚙️ Miscellaneous Tasks

- Update docs ([4a6651f](https://github.com/goliatone/go-command/commit/4a6651f2ef9191a007e27e7fea027973b74fc4d1))  - (goliatone)

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

