# Universal Agent Protocol v4: Process Flow & Edge Cases

```mermaid
flowchart TD
    %% Nodes
    Start([🚀 Agent Starts])
    ContextCheck{New Session?}
    ReadMem[📖 Read PROJECT.md <br/> + current_state.md]
    
    %% The Fork
    ModeCheck{Request Type?}
    
    %% Ideation Branch
    subgraph Ideation [💡 Brainstorming Mode]
        CreateScratch[📝 Create ideation_topic.md]
        Research[🔍 Research Options]
        Propose[💡 Propose Solution]
        Discuss[🗣️ User Feedback]
        Consensus{Agreed?}
        MergeFacts[💾 Merge to findings.md]
    end

    %% Execution Branch
    subgraph ExecutionFlow [🛠️ Execution Mode]
        PlanCheck{Plan Exists?}
        CreatePlan[📝 Create/Update <br/> task_plan.md]
        
        subgraph Planning [Phase 2: Planning]
            InjectBug[🐞 Inject Bug/Issue <br/> to TOP of Plan]
            ClarifyCheck{Requirements Clear?}
            AskUser[❓ Create clarification.md <br/> & STOP]
        end

        subgraph Build [Phase 3: Execution]
            Code[💻 Write/Edit Code]
            Test[🧪 Test/Compile]
            
            subgraph AutoDoc [🤖 Zero-Touch Docs]
                CheckArch{Arch Change?}
                UpdateProject[📄 Update PROJECT.md]
            end
        end
    end

    subgraph Completion [Phase 5: Completion]
        FlushLog[📝 Flush to CHANGELOG.md]
        UpdateState[💾 Update current_state.md]
        Commit[📦 Git Commit]
        End([✅ Handoff])
    end

    %% Key Connections
    Start --> ContextCheck
    ContextCheck -- Yes --> ReadMem
    ContextCheck -- No --> ModeCheck
    ReadMem --> ModeCheck
    
    ModeCheck -- "Ideate / Help me think" --> CreateScratch
    ModeCheck -- "Do / Fix / Implement" --> PlanCheck
    
    %% Ideation Loop
    CreateScratch --> Research --> Propose --> Discuss --> Consensus
    Consensus -- No --> Research
    Consensus -- Yes --> MergeFacts --> PlanCheck
    
    %% Execution Connections
    PlanCheck -- No --> CreatePlan
    PlanCheck -- Yes --> InjectBug
    CreatePlan --> InjectBug
    
    InjectBug --> ClarifyCheck
    ClarifyCheck -- No --> AskUser
    AskUser -.-> |User responds| PlanCheck
    
    ClarifyCheck -- Yes --> Code --> Test
    Test -- Fail --> Code
    Test -- Pass --> CheckArch
    
    CheckArch -- Yes --> UpdateProject
    CheckArch -- No --> FlushLog
    UpdateProject --> FlushLog
    
    FlushLog --> UpdateState --> Commit --> End
```

## Edge Case Explanations
1.  **The Fork (ModeCheck)**: The workflow splits immediately. If you just want to "Think," we don't pollute the Task Plan yet. We loop in the "Ideation" subgraph until we agree on a solution.
2.  **Consensus -> Plan**: Once we agree on an idea, the result (MergeFacts) feeds *directly* into the Execution Mode (`PlanCheck`), turning thoughts into Actionable Items.
3.  **Clarification vs Ideation**:
    *   **Ideation**: "What should we build?" (Creative).
    *   **Clarification**: "How precisely should I build this feature?" (Technical constraint checking).
