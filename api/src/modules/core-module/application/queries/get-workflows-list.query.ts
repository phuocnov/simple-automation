export class GetWorkflowsListQuery {
  constructor(
    public readonly limit?: number,
    public readonly offset?: number
  ) { }
}
