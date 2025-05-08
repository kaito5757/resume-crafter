# フォルダ構成

このプロジェクトは、クリーンアーキテクチャの4層構造をベースに、以下の原則を厳密に守って設計されています：

- 全ての依存は内向きのみ（依存性逆転を遵守）
- UseCaseは抽象（InputPort / OutputPort）にのみ依存
- 外部との接点（Presenter / Gateway / Repository）はinterface + 実装で分離
- DTO / ViewModel / Mapper / Schemaはそれぞれの責務で分離

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
├── login/
|   ├── action.ts                      🟦 Server Action（formのaction属性に渡す）
|   └── page.tsx                       🟦 Server Component
├── resume/
|   ├── action.ts                      🟦 Server Action（formのaction属性に渡す）
|   └── page.tsx                       🟦 Server Component

src/
├── domain/
│   └── auth/
│       ├── authUser.ts                🟥 Entity
│       ├── authUserId.ts              🟥 Value Object
│   └── resume/
│       ├── resume.ts                  🟥 Entity
│       ├── resumeId.ts                🟥 Value Object


├── application/
│   └── auth/
│       ├── IAuthUseCase.ts            🟧 UseCase 抽象 (InputPort)
│       └── AuthInteractor.ts          🟧 UseCase 実装（ビジネス処理の本体）
│   └── resume/
│       ├── IResumeUseCase.ts          🟧 UseCase 抽象 (InputPort)
│       └── ResumeInteractor.ts        🟧 UseCase 実装（ビジネス処理の本体）

├── gateways/
│   └── IAuthGateway.ts                🟩 Gateway 抽象（外部サービスとの連携インターフェース）

├── repositories/
│   └── IResumeRepository.ts           🟩 Repository 抽象（DBアクセスのインターフェース）

├── presenters/
│   └── auth/
│       ├── IAuthPresenter.ts          🟩 Presenter 抽象（OutputPort/ドメイン → ViewModel 変換の入口）
│       └── AuthPresenter.ts           🟩 Presenter 実装（ViewModel への整形処理）
│   └── resume/
│       ├── IResumePresenter.ts        🟩 Presenter 抽象（OutputPort/ドメイン → ViewModel 変換の入口）
│       └── ResumePresenter.ts         🟩 Presenter 実装（ViewModel への整形処理）

├─ handlers/
│   └── authHandler.ts                 🟩 Handler
│   └── resumeHandler.ts               🟩 Handler

├── mappers/
│   └── authMapper.ts                  🟩 Mapper（DTO ⇄ Domain の変換処理）
│   └── resumeMapper.ts                🟩 Mapper（DTO ⇄ Domain の変換処理）

├── schemas/
│   └── authSchema.ts                  🟦 Input Validation Schema（zod）
│   └── resumeSchema.ts                🟦 Input Validation Schema（zod）

├── dtos/
|   └── auth/
│       ├── authDto.ts                 🟩 Input DTO（formなどから受け取るデータ）
│       └── authViewModel.ts           🟩 Output DTO（UI表示用のViewModel）
|   └── resume/
│       ├── resumeDto.ts               🟩 Input DTO（formなどから受け取るデータ）
│       └── resumeViewModel.ts         🟩 Output DTO（UI表示用のViewModel）

├── infrastructure/
│   ├── external/
│   │   └── supabase/
│   │       ├── supabaseClient.ts      🟦 Client（外部サービスの初期化）
│   │       └── authGateway.ts         🟦 Gateway 実装（外部サービスで実装）
│   ├── orm/
│   │   ├── db.ts                      🟦 Client（ORM Clientの初期化）
│   │   └── schema.ts                  🟦 DB Schema（ORM Modelの定義）
│   └── repository/
│       └── resumeRepository.ts        🟦 Repository 実装（DBで実装）
```
