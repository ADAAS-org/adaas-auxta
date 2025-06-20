import { AuxtaConditionWrapper, AuxtaLogicalGroup } from "@auxta/types/AuxtaCommand.types";

export class AuxtaConditionBuilder {
  private conditions: (AuxtaConditionWrapper | AuxtaLogicalGroup)[] = [];
  private current: AuxtaConditionWrapper[] = [];
  private logicalOperator?: 'AND' | 'OR';

  gte(val: number) {
    this.current.push({ value: { gte: val } });
    return this;
  }

  lte(val: number) {
    this.current.push({ value: { lte: val } });
    return this;
  }

  in(values: any[]) {
    this.current.push({ value: { in: values } });
    return this;
  }

  notIn(values: any[]) {
    this.current.push({ value: { notIn: values } });
    return this;
  }

  match(val: string) {
    this.current.push({ value: { match: val } });
    return this;
  }

  and() {
    if (this.logicalOperator !== 'AND')
      this.flush();
    this.logicalOperator = 'AND';
    return this;
  }

  or() {
    if (this.logicalOperator !== 'OR')
      this.flush();

    this.logicalOperator = 'OR';
    return this;
  }

  not() {
    const group = this.build();
    this.conditions = [{ NOT: group }];
    return this;
  }

  private flush() {
    if (this.current.length > 0 && this.logicalOperator) {
      this.conditions.push({ [this.logicalOperator]: this.current });
      this.current = [];
    }
  }

  build(): AuxtaLogicalGroup | AuxtaConditionWrapper {
    this.flush();

    if (this.conditions.length === 1) {
      return this.conditions[0];
    }
    if (this.current.length === 1)
      return this.current[0];

    if (this.current.length > 1) {
      this.logicalOperator = 'AND';
      return this.build();
    }

    return { AND: this.conditions as AuxtaConditionWrapper[] }; // default to AND
  }
}