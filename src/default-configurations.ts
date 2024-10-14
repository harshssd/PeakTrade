import { StrategyTag, SuccessRitual, FailurePitfall } from './models';

// Pre-populate Strategies, Success Rituals, and Failure Pitfalls

export const defaultStrategyTags: StrategyTag[] = [
  new StrategyTag(1, "Momentum Trading", "Buying or selling assets when they are moving strongly in a particular direction."),
  new StrategyTag(2, "Scalping", "Taking advantage of small price gaps created by order flows or spreads."),
  new StrategyTag(3, "Swing Trading", "Holding a position for a few days to profit from expected price movements.")
];

export const defaultSuccessRituals: SuccessRitual[] = [
  new SuccessRitual(1, "Followed the Setup", "Strictly followed the pre-defined setup without deviations."),
  new SuccessRitual(2, "Locked in Profits", "Took profits at the set target without letting greed affect the decision."),
  new SuccessRitual(3, "Managed Risk", "Stuck to the risk management plan and set stop losses appropriately.")
];

export const defaultFailurePitfalls: FailurePitfall[] = [
  new FailurePitfall(1, "Ignored Stop Loss", "Did not follow the stop-loss strategy, resulting in increased losses."),
  new FailurePitfall(2, "Over-Traded", "Executed more trades than planned, driven by emotion rather than logic."),
  new FailurePitfall(3, "Averaged Down", "Kept adding to a losing position without a valid technical reason.")
];
