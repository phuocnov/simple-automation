## Workflow

Workflow is the container or the "Recipe". It represent a single business automation from start to fines.

Attributes: id, name, status, ownerID, BluePrint (the JSON object containing all nodes and edges)

## Node (the action/step)

there are many type of node: 
- Triggers (the entry point). eg. when a new gmail is reeived
- Actions: the execution step (eg. sent an discord message)
- Logic/Control: Internal node that don't call external APIs (eg. Filter, delay, if/else)

attributes: id, type, data, position


## Edge (The data flow)
  or a connection is the directed line connecting 2 notes. It defines the sequence of execution and the "Pipe" through which data flow

attributes: source (node ID), target, sometimes sourceHandle


