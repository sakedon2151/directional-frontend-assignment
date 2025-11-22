import {
  CoffeeConsumptionResponse,
  PopularSnakeBrandsResponse,
  SnakeImpactResponse,
  TopCoffeeBrandsResponse,
  WeeklyMoodTrendResponse,
  WeeklyWorkoutTrendResponse,
} from '@/types/chart';
import axiosInstance from '../axios';

export const getTopCoffeeBrands = async (): Promise<TopCoffeeBrandsResponse> => {
  const { data } = await axiosInstance.get('/mock/top-coffee-brands');
  return data;
};

export const getPopularSnakeBrands = async (): Promise<PopularSnakeBrandsResponse> => {
  const { data } = await axiosInstance.get('/mock/popular-snack-brands');
  return data;
};

export const getWeeklyMoodTrend = async (): Promise<WeeklyMoodTrendResponse> => {
  const { data } = await axiosInstance.get('/mock/weekly-mood-trend');
  return data;
};

export const getWeeklyWorkoutTrend = async (): Promise<WeeklyWorkoutTrendResponse> => {
  const { data } = await axiosInstance.get('/mock/weekly-workout-trend');
  return data;
};

export const getCoffeeConsumption = async (): Promise<CoffeeConsumptionResponse> => {
  const { data } = await axiosInstance.get('/mock/coffee-consumption');
  return data;
};

export const getSnakeImpact = async (): Promise<SnakeImpactResponse> => {
  const { data } = await axiosInstance.get('/mock/snack-impact');
  return data;
};
