import React, { useState } from "react";
import { StrategyTag, SuccessRitual, FailurePitfall } from "../models";
import {
  defaultStrategyTags,
  defaultSuccessRituals,
  defaultFailurePitfalls,
} from "../default-configurations";

const CustomConfigurations: React.FC = () => {
  const [strategyTags, setStrategyTags] =
    useState<StrategyTag[]>(defaultStrategyTags);
  const [successRituals, setSuccessRituals] = useState<SuccessRitual[]>(
    defaultSuccessRituals
  );
  const [failurePitfalls, setFailurePitfalls] = useState<FailurePitfall[]>(
    defaultFailurePitfalls
  );

  // Functions to handle adding new tags/rituals/pitfalls
  const addStrategyTag = (name: string, description: string) => {
    const newTag = new StrategyTag(strategyTags.length + 1, name, description);
    setStrategyTags([...strategyTags, newTag]);
  };

  // Add similar functions for Success Rituals and Failure Pitfalls...

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">
        Manage Strategies, Rituals, and Pitfalls
      </h2>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Strategies</h3>
        <ul>
          {strategyTags.map((tag) => (
            <li key={tag.id} className="mb-2">
              <strong>{tag.name}:</strong> {tag.description}
            </li>
          ))}
        </ul>
        {/* Add a form for adding a new strategy here */}
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Success Rituals</h3>
        <ul>
          {successRituals.map((ritual) => (
            <li key={ritual.id} className="mb-2">
              <strong>{ritual.name}:</strong> {ritual.description}
            </li>
          ))}
        </ul>
        {/* Add a form for adding a new success ritual here */}
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Failure Pitfalls</h3>
        <ul>
          {failurePitfalls.map((pitfall) => (
            <li key={pitfall.id} className="mb-2">
              <strong>{pitfall.name}:</strong> {pitfall.description}
            </li>
          ))}
        </ul>
        {/* Add a form for adding a new failure pitfall here */}
      </div>
    </div>
  );
};

export default CustomConfigurations;
