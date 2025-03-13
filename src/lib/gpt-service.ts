
/**
 * Service for generating mermaid diagrams using GPT-4o-mini
 */

// This is a simplified implementation that would need to be connected to a real API
export const generateDiagramWithGPT = async (prompt: string): Promise<string> => {
  // In a real implementation, this would call an API endpoint
  // For now, we'll simulate a response with a timeout
  
  console.log("Generating diagram with prompt:", prompt);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // For demonstration purposes, we'll return different diagram types based on keywords in the prompt
  if (prompt.toLowerCase().includes("flow") || prompt.toLowerCase().includes("process")) {
    return `flowchart LR
    A[Start] --> B{Decision}
    B -->|Yes| C[Process 1]
    B -->|No| D[Process 2]
    C --> E[End]
    D --> E`;
  } 
  
  if (prompt.toLowerCase().includes("sequence") || prompt.toLowerCase().includes("interaction")) {
    return `sequenceDiagram
    participant User
    participant System
    User->>System: Request Data
    System->>Database: Query
    Database-->>System: Return Results
    System-->>User: Display Data`;
  }
  
  if (prompt.toLowerCase().includes("class") || prompt.toLowerCase().includes("object")) {
    return `classDiagram
    class Animal {
      +name: string
      +age: int
      +makeSound()
    }
    class Dog {
      +breed: string
      +fetch()
    }
    class Cat {
      +color: string
      +climb()
    }
    Animal <|-- Dog
    Animal <|-- Cat`;
  }
  
  if (prompt.toLowerCase().includes("gantt") || prompt.toLowerCase().includes("timeline") || prompt.toLowerCase().includes("schedule")) {
    return `gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    section Planning
    Requirements gathering :a1, 2023-01-01, 10d
    Design                 :a2, after a1, 15d
    section Development
    Implementation         :a3, after a2, 20d
    Testing                :a4, after a3, 10d
    section Deployment
    Deployment             :a5, after a4, 5d`;
  }
  
  // Default to a simple graph if no specific type is detected
  return `graph TD
    A[${prompt.split(' ').slice(0, 2).join(' ')}] --> B[Process]
    B --> C{Decision}
    C -->|Option 1| D[Result 1]
    C -->|Option 2| E[Result 2]
    D --> F[Finish]
    E --> F`;
};
