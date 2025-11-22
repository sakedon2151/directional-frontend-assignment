export type TopCoffeeBrandsResponse = {
  brand: string;
  popularity: number;
};

export type PopularSnakeBrandsResponse = {
  name: string;
  share: number;
};

export type WeeklyMoodTrendResponse = {
  week: string;
  happy: number;
  tired: number;
  stressed: number;
};

export type WeeklyWorkoutTrendResponse = {
  week: string;
  running: number;
  cycling: number;
  stretching: number;
};

export type CoffeeConsumptionResponse = {
  teams: {
    team: string;
    series: {
      cups: number;
      bugs: number;
      productivity: number;
    }[];
  }[];
};

export type SnakeImpactResponse = {
  departments: {
    name: string;
    metrics: {
      snacks: number;
      meetingsMissed: number;
      morale: number;
    }[];
  }[];
};
