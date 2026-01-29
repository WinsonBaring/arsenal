# Universal Agent Protocol v3: Process Flow & Edge Cases

```mermaid
flowchart TD
    %% Nodes
    Start([🚀 Agent Starts])
    ContextCheck{New Session?}
    ReadMem[📖 Read PROJECT.md <br/> + current_state.md]
    CheckPlan{Plan Exists?}
    CreatePlan[📝 Create/Update <br/> task_plan.md]
    ClarifyCheck{Requirements Clear?}
    AskUser[❓ Create clarification.md <br/> & STOP]
    
    subgraph Planning [Phase 2: Planning]
        direction TB
        InjectBug[🐞 Inject Bug/Issue <br/> to TOP of Plan]
        IdentifyPhase[📍 Identify Active Phase]
    end

    subgraph Execution [Phase 3: Execution]
        direction TB
        Code[💻 Write/Edit Code]
        Test[🧪 Test/Compile]
        Log[💾 Update progress.md]
        
        subgraph AutoDoc [🤖 Zero-Touch Docs]
            CheckArch{Arch/Dep Change?}
            UpdateProject[📄 Update PROJECT.md]
        end
    end

    subgraph Completion [Phase 5: Completion]
        direction TB
        CheckDone{Phase Complete?}
        FlushLog[📝 Flush to CHANGELOG.md]
        UpdateState[💾 Update current_state.md]
        Commit[📦 Git Commit <br/> (Conventional)]
    end
    
    End([✅ Handoff to User])

    %% Flows
    Start --> ContextCheck
    ContextCheck -- Yes --> ReadMem
    ContextCheck -- No --> CheckPlan
    ReadMem --> CheckPlan
    
    CheckPlan -- No --> CreatePlan
    CheckPlan -- Yes --> IdentifyPhase
    
    %% Edge Case: Bug Injection
    IdentifyPhase -- "Urgent Bug?" --> InjectBug
    InjectBug --> IdentifyPhase
    
    %% Edge Case: Clarification
    IdentifyPhase --> ClarifyCheck
    ClarifyCheck -- No --> AskUser
    AskUser -.-> |User responds| CreatePlan
    
    %% Execution Loop
    ClarifyCheck -- Yes --> Code
    Code --> Test
    Test -- Fail --> Code
    Test -- Pass --> CheckArch
    
    %% Auto-Doc Loop
    CheckArch -- Yes --> UpdateProject
    CheckArch -- No --> Log
    UpdateProject --> Log
    
    %% Completion Loop
    Log --> CheckDone
    CheckDone -- Yes --> FlushLog
    CheckDone -- No --> UpdateState
    FlushLog --> UpdateState
    UpdateState --> Commit
    Commit --> End
```

## Explanation of Edge Cases in Diagram
1.  **New Session?**: If the Agent just woke up, it *must* read `PROJECT.md` and `current_state.md` to recover memory.
2.  **Urgent Bug?**: The "Inject Bug" node shows how a bug bypasses the normal flow by jumping to the top of the plan.
3.  **Requirements Unclear?**: The "AskUser" node creates a hard stop. The flow cannot proceed ("Yes") until the User responds.
4.  **Arch Change?**: The "AutoDoc" subgraph shows the side-effect where the Agent updates `PROJECT.md` *before* moving on.
