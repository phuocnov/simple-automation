1. The CoreModule (The Orchestrator)
This module handles the storage and execution logic. In Clean Architecture, this contains your Domain and Application layers.

Entities: Workflow, Node, Edge, ExecutionLog.

Commands: CreateWorkflowCommand, ExecuteNodeCommand.

Logic: This module should implement a Topological Sort to determine the execution order of nodes based on their edges.

2. The IntegrationsModule (The Adapters)
This is where the "Third-Party" logic lives. To keep this "Clean," you should use the Strategy Pattern combined with a Factory.

Structure:

AbstractIntegration: An interface defining execute(data: any): Promise<any>.

TelegramProvider, GmailProvider, DiscordProvider: Concrete classes implementing the interface.

The Bridge: The CoreModule calls an IntegrationRegistry in this module to trigger a specific action without knowing the API details.

3. Backend Directory Structure (Clean Architecture + CQRS)
Following this structure ensures your unit tests are easy to write because your business logic is decoupled from the framework.

Plaintext
src/
├── modules/
│   ├── core/
│   │   ├── domain/              # Entities & Value Objects
│   │   ├── application/
│   │   │   ├── commands/        # CreateWorkflowHandler, ExecuteWorkflowHandler
│   │   │   ├── queries/         # GetWorkflowHandler
│   │   │   └── dto/
│   │   └── infrastructure/      # TypeORM Repositories
│   │
│   ├── integrations/
│   │   ├── providers/
│   │   │   ├── telegram.provider.ts
│   │   │   ├── discord.provider.ts
│   │   │   └── gmail.provider.ts
│   │   ├── integration.factory.ts # Returns the right provider based on Node type
│   │   └── integrations.module.ts
│
└── shared/                      # Custom decorators, filters, common types
4. The Frontend Approach (Mirroring the Backend)
Since you want the same approach for the Frontend, you should separate React Components from State Logic.

Clean Architecture in React:
Domain Layer: Define the types for your Blueprint (Nodes/Edges).

Application Layer (Zustand): Create a store that handles the logic of adding/connecting nodes.

Example: A useWorkflowStore that contains actions (Commands) like addNode() or updateEdge().

Presentation Layer: React Flow components. Use Custom Nodes to represent your third-party integrations (e.g., a node with a Telegram icon).

5. Implementation Step: The Execution Strategy
When a user clicks "Run," your CoreModule should perform these steps:

Fetch Blueprint: Load nodes/edges from the DB.

Sort: Use a graph algorithm to find the start node (Trigger).

Iterate: For each node, identify the provider from the IntegrationsModule.

Execute: Pass the output of Node A as the input to Node B.
