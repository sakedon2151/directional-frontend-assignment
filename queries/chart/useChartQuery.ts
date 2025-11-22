import {
  getTopCoffeeBrands,
  getPopularSnakeBrands,
  getWeeklyMoodTrend,
  getWeeklyWorkoutTrend,
  getCoffeeConsumption,
  getSnakeImpact,
} from '@/api/chart';
import { useQuery } from '@tanstack/react-query';

export const useGetTopCoffeeBrands = () => {
  return useQuery({
    queryKey: ['topCoffeeBrands'],
    queryFn: () => getTopCoffeeBrands(),
  });
};

export const useGetPopularSnakeBrands = () => {
  return useQuery({
    queryKey: ['popularSnakeBrands'],
    queryFn: () => getPopularSnakeBrands(),
  });
};

export const useGetWeeklyMoodTrend = () => {
  return useQuery({
    queryKey: ['weeklyMoodTrend'],
    queryFn: () => getWeeklyMoodTrend(),
  });
};

export const useGetWeeklyWorkoutTrend = () => {
  return useQuery({
    queryKey: ['weeklyWorkoutTrend'],
    queryFn: () => getWeeklyWorkoutTrend(),
  });
};

export const useGetCoffeeConsumption = () => {
  return useQuery({
    queryKey: ['coffeeConsumption'],
    queryFn: () => getCoffeeConsumption(),
  });
};

export const useGetSnakeImpact = () => {
  return useQuery({
    queryKey: ['snakeImpact'],
    queryFn: () => getSnakeImpact(),
  });
};
