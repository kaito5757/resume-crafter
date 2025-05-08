# フォルダ構成

このプロジェクトは、クリーンアーキテクチャの4層構造をベースに、以下の原則を厳密に守って設計されています：

- 全ての依存は内向きのみ（依存性逆転を遵守）
- UseCaseは抽象（InputPort / OutputPort）にのみ依存
- 外部との接点（Presenter / Gateway）はinterface + 実装で分離
- DTO / ViewModel / Mapper / Zod schemaはそれぞれの責務で分離

> ※構成はオーバーエンジニアリング気味ですが、大規模化・複数チーム開発に非常に強い構造です

## 参考画像

![Clean Architecture 図](/public/CleanArchitecture.jpg)

## 各層

- 🟦 - Frameworks & Drivers
- 🟩 - Interface Adapters
- 🟧 - Application Business Roles
- 🟥 - Enterprise Business Roles）

```markdown
app/
├── resume/
|   ├── action.ts　　　　　　　　　　　　　🟦 (Web) - Server Action（formのaction属性に渡す）
|   ├── handler.ts                     🟦 (Web) - Handler（Server Component / Actionから呼ばれる）
|   └── page.tsx                       🟦 (UI)  - Server Component

src/
├── domain/                            🟥 (Domain) - 値オブジェクト、エンティティ
│   └── resume/
│       ├── resume.ts
│       ├── resumeId.ts
│       └── resumeStatus.ts

├── application/                       🟧 (UseCase)
│   └── resume/
│       ├── IResumeUseCase.ts             # Controllerが依存するインターフェース（InputPort）
│       └── ResumeInteractor.ts           # Gatewayを呼ぶ実装

├── gateways/                          🟩 (Gateway)
│   └── resume/
│       ├── IResumeGateway.ts             # UseCaseが依存するインターフェース
│       └── ResumeGatewayImpl.ts          # Repositoryを呼び出し、永続化データをドメインモデルへ変換して返す（インフラ依存を吸収）

├── presenters/                        🟩 (Presenter)
│   └── resume/
│       ├── IResumePresenter.ts           # UseCaseが依存するインターフェース（OutputPort）
│       └── ResumePresenterImpl.ts        # ドメインモデルをUI用のViewModelに変換する（出力責務に特化）

├── controllers/                       🟩 (Controller)
│   └── resumeController.ts               # DTOをドメインに変換しUseCaseに渡し、Presenterの出力をHandlerに返す

├── mappers/                           🟩 - DTO → Domain 変換
│   └── resumeMapper.ts

├── schemas/                           🟦 (Web) - ZodによるDTOバリデーション
│   └── resumeSchema.ts

├── dtos/                              🟩 - 入出力のDTO型を責務ごとに分離（input: resumeDto / output: resumeViewModel）
│   ├── resumeDto.ts                     # input DTO（z.infer）
│   └── resumeViewModel.ts               # output（UI向け）型

├── infrastructure/
│   ├── external/                      🟦 (External Interfaces)
│   │   └── supabase/
│   │       ├── supabaseClient.ts
│   │       └── authGateway.ts
│   ├── orm/                           🟦 (DB)
│   │   ├── db.ts
│   │   └── schema.ts
│   └── repository/                    🟦 (DB)
│       └── resumeRepository.ts
```
