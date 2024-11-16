// models.ts

export class StrategyTag {
    constructor(public id: number, public name: string, public description: string) {}
}

export class SuccessRitual {
    constructor(public id: number, public name: string, public description: string) {}
}

export class FailurePitfall {
    constructor(public id: number, public name: string, public description: string) {}
}

export class Trade {
    constructor(
      public id: number,
      public userId: string,
      public symbol: string,
      public type: string,
      public entryPrice: number,
      public exitPrice: number | null,
      public quantity: number,
      public profit: number | null,
      public tags: StrategyTag[] = [],
      public successRituals: SuccessRitual[] = [],
      public failurePitfalls: FailurePitfall[] = [],
      public isOpen: boolean = true,
      public entryTime: Date = new Date(),
      public exitTime: Date | null = null,
      public comments: string = ''
    ) {}
  }
  