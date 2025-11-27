import { LifeStats, StatsInput } from '../types/Stats';

export const calculateLifeStats = (input: StatsInput): LifeStats => {
    const birthDate = new Date(input.dateOfBirth);
    const now = new Date();
    
    const diffInMilliseconds = now.getTime() - birthDate.getTime();
    const hoursLived = Math.round(diffInMilliseconds / (1000 * 60 * 60) * 10) / 10;
    const daysLived = Math.round(hoursLived / 24 * 10) / 10;
    
    const totalCoffeeCups = Math.round(daysLived * input.coffeeIntake * 10) / 10;
    const totalSleepHours = Math.round(hoursLived * (input.sleepHours / 24) * 10) / 10;
    const sleepPercentage = Math.round((input.sleepHours / 24) * 100 * 10) / 10;
    
    return {
        hoursLived,
        daysLived,
        totalCoffeeCups,
        totalSleepHours,
        sleepPercentage
    };
};